'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChatWindow } from '@/components/chat/chat-window';
import { Badge } from '@/components/ui/badge';

interface ChatContact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  unreadCount: number;
  lastActive: Date;
}

// This would come from your API/database
const contacts: ChatContact[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16',
    lastMessage: 'Looking forward to our consultation!',
    unreadCount: 2,
    lastActive: new Date(),
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1580465446361-8aae5321522b',
    lastMessage: 'The design looks perfect!',
    unreadCount: 0,
    lastActive: new Date(Date.now() - 3600000),
  },
];

export function ChatList() {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  return (
    <div className="w-full max-w-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Messages</h2>
        <Button variant="outline" size="sm">
          <MessageSquare className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="h-[400px]">
        {contacts.map((contact) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-lg hover:bg-muted cursor-pointer"
            onClick={() => setActiveChat(contact.id)}
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{contact.name}</span>
                  {contact.unreadCount > 0 && (
                    <Badge variant="secondary">{contact.unreadCount}</Badge>
                  )}
                </div>
                {contact.lastMessage && (
                  <p className="text-sm text-muted-foreground truncate">
                    {contact.lastMessage}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </ScrollArea>

      {activeChat && (
        <ChatWindow
          recipientId={activeChat}
          recipientName={contacts.find((c) => c.id === activeChat)?.name || ''}
          recipientAvatar={contacts.find((c) => c.id === activeChat)?.avatar}
          onClose={() => setActiveChat(null)}
        />
      )}
    </div>
  );
}