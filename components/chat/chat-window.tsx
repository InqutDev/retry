'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatStore } from '@/store/chat-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

interface ChatWindowProps {
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  onClose: () => void;
}

export function ChatWindow({
  recipientId,
  recipientName,
  recipientAvatar,
  onClose,
}: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, subscribeToMessages } = useChatStore();

  useEffect(() => {
    const unsubscribe = subscribeToMessages(recipientId);
    return () => unsubscribe();
  }, [recipientId, subscribeToMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;
    await sendMessage(recipientId, message);
    setMessage('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 w-80 bg-card rounded-lg shadow-lg border"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={recipientAvatar} />
            <AvatarFallback>{recipientName[0]}</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{recipientName}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-96 p-4" ref={scrollRef}>
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex flex-col mb-4 ${
                msg.senderId === recipientId ? 'items-start' : 'items-end'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.senderId === recipientId
                    ? 'bg-muted'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                {msg.content}
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(msg.timestamp, { addSuffix: true })}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </motion.div>
  );
}