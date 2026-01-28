import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Send, Search, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { validateMessageContent } from "@/lib/validation";

interface Conversation {
  id: string;
  participant_one: string;
  participant_two: string;
  last_message_at: string;
  other_profile: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    user_type: string;
  };
  last_message?: string;
}

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  read_at: string | null;
}

const Messages = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const toProfileId = searchParams.get("to");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileList, setShowMobileList] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (profile) {
      fetchConversations();
      if (toProfileId) {
        startConversationWith(toProfileId);
      }
    }
  }, [profile, toProfileId]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
      subscribeToMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchConversations = async () => {
    if (!profile) return;

    const { data } = await supabase
      .from("conversations")
      .select(`
        id,
        participant_one,
        participant_two,
        last_message_at
      `)
      .or(`participant_one.eq.${profile.id},participant_two.eq.${profile.id}`)
      .order("last_message_at", { ascending: false });

    if (!data) {
      setLoading(false);
      return;
    }

    // Fetch other profiles
    const otherIds = data.map((c) =>
      c.participant_one === profile.id ? c.participant_two : c.participant_one
    );

    const { data: profiles } = await supabase
      .from("profiles_public")
      .select("id, full_name, avatar_url, user_type")
      .in("id", otherIds);

    const conversationsWithProfiles = data.map((conv) => {
      const otherId = conv.participant_one === profile.id ? conv.participant_two : conv.participant_one;
      const otherProfile = profiles?.find((p) => p.id === otherId);
      return {
        ...conv,
        other_profile: otherProfile || { id: otherId, full_name: null, avatar_url: null, user_type: "unknown" },
      };
    });

    setConversations(conversationsWithProfiles);
    setLoading(false);
  };

  const startConversationWith = async (otherProfileId: string) => {
    if (!profile) return;

    // Check if conversation already exists
    const existing = conversations.find(
      (c) => c.other_profile.id === otherProfileId
    );

    if (existing) {
      setSelectedConversation(existing);
      setShowMobileList(false);
      return;
    }

    // Fetch the other profile
    const { data: otherProfile } = await supabase
      .from("profiles_public")
      .select("id, full_name, avatar_url, user_type")
      .eq("id", otherProfileId)
      .single();

    if (!otherProfile) {
      toast({ title: "User not found", variant: "destructive" });
      return;
    }

    // Create new conversation
    const { data: newConv, error } = await supabase
      .from("conversations")
      .insert({
        participant_one: profile.id,
        participant_two: otherProfileId,
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        // Already exists, fetch it
        const { data: existingConv } = await supabase
          .from("conversations")
          .select("*")
          .or(
            `and(participant_one.eq.${profile.id},participant_two.eq.${otherProfileId}),and(participant_one.eq.${otherProfileId},participant_two.eq.${profile.id})`
          )
          .single();

        if (existingConv) {
          const conv = {
            ...existingConv,
            other_profile: otherProfile,
          };
          setSelectedConversation(conv);
          setShowMobileList(false);
        }
      }
      return;
    }

    const conv = {
      ...newConv,
      other_profile: otherProfile,
    };
    setConversations((prev) => [conv, ...prev]);
    setSelectedConversation(conv);
    setShowMobileList(false);
  };

  const fetchMessages = async (conversationId: string) => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (data) setMessages(data);
  };

  const subscribeToMessages = (conversationId: string) => {
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !selectedConversation) return;

    // Validate message content before submission
    const validation = validateMessageContent(newMessage);
    if (validation.success === false) {
      toast({ title: "Validation Error", description: validation.error, variant: "destructive" });
      return;
    }

    setSending(true);

    try {
      const { error } = await supabase.from("messages").insert({
        conversation_id: selectedConversation.id,
        sender_id: profile.id,
        content: validation.data,
      });

      if (error) throw error;

      // Update last_message_at
      await supabase
        .from("conversations")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", selectedConversation.id);

      setNewMessage("");
    } catch (error: any) {
      toast({ title: "Failed to send message", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const formatTime = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return d.toLocaleDateString([], { weekday: "short" });
    } else {
      return d.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const filteredConversations = conversations.filter((c) =>
    c.other_profile.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout showGroupsPanel={false}>
      <div className="h-[calc(100vh-4rem)] flex border border-border bg-card">
        {/* Conversations List */}
        <div
          className={cn(
            "w-full md:w-80 lg:w-96 border-r border-border flex flex-col",
            !showMobileList && "hidden md:flex"
          )}
        >
          <div className="p-4 border-b border-border">
            <h2 className="font-display text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            {loading ? (
              <div className="p-4 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-secondary" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-secondary rounded w-3/4" />
                      <div className="h-3 bg-secondary rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredConversations.length > 0 ? (
              <div className="p-2">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => {
                      setSelectedConversation(conv);
                      setShowMobileList(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left",
                      selectedConversation?.id === conv.id
                        ? "bg-primary/10"
                        : "hover:bg-secondary"
                    )}
                  >
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      {conv.other_profile.avatar_url ? (
                        <img
                          src={conv.other_profile.avatar_url}
                          alt=""
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold truncate">
                          {conv.other_profile.full_name || "User"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(conv.last_message_at)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate capitalize">
                        {conv.other_profile.user_type}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <p>No conversations yet</p>
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div
          className={cn(
            "flex-1 flex flex-col",
            showMobileList && "hidden md:flex"
          )}
        >
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center gap-3">
                <button
                  className="md:hidden text-muted-foreground hover:text-foreground"
                  onClick={() => setShowMobileList(true)}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  {selectedConversation.other_profile.avatar_url ? (
                    <img
                      src={selectedConversation.other_profile.avatar_url}
                      alt=""
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className="font-semibold">
                    {selectedConversation.other_profile.full_name || "User"}
                  </div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {selectedConversation.other_profile.user_type}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => {
                    const isOwn = msg.sender_id === profile?.id;
                    return (
                      <div
                        key={msg.id}
                        className={cn("flex", isOwn ? "justify-end" : "justify-start")}
                      >
                        <div
                          className={cn(
                            "max-w-[70%] rounded-2xl px-4 py-2",
                            isOwn
                              ? "bg-primary text-primary-foreground rounded-br-md"
                              : "bg-secondary rounded-bl-md"
                          )}
                        >
                          <p>{msg.content}</p>
                          <p
                            className={cn(
                              "text-xs mt-1",
                              isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                            )}
                          >
                            {formatTime(msg.created_at)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <form onSubmit={sendMessage} className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={sending}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={sending || !newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <Send className="w-6 h-6" />
                </div>
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
