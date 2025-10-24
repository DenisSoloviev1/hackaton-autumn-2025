import { useState, useRef, useEffect } from 'react';
import { Message } from '../types/conference';
import { Button } from './ui/button';
import { Input } from './ui/input';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Send, Shield, ShieldCheck } from 'lucide-react';
import { encryptionInstance } from '../utils/encryption';

interface ChatPanelProps {
  messages: Message[];
  currentUserId: string;
  onSendMessage: (text: string) => void;
  isEncrypted: boolean;
}

export function ChatPanel({ messages, currentUserId, onSendMessage, isEncrypted }: ChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Автопрокрутка к последнему сообщению
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Заголовок */}
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h3>Чат</h3>
          <p className="text-sm text-slate-600">{messages.length} сообщений</p>
        </div>
        {isEncrypted && (
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Зашифровано</span>
          </div>
        )}
      </div>

      {/* Список сообщений */}
      <div className="flex-1 p-4 overflow-y-auto" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => {
            const isOwn = message.userId === currentUserId;
            
            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Аватар */}
                {!isOwn && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="text-xs">
                      {getInitials(message.userName)}
                    </AvatarFallback>
                  </Avatar>
                )}

                {/* Сообщение */}
                <div className={`flex-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                  {!isOwn && (
                    <div className="text-sm text-slate-600 mb-1">
                      {message.userName}
                    </div>
                  )}
                  <div
                    className={`inline-block px-4 py-2 rounded-2xl max-w-[80%] ${
                      isOwn
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-slate-100 text-slate-900 rounded-bl-sm'
                    }`}
                  >
                    <p className="break-words">{message.text}</p>
                    <div className={`text-xs mt-1 flex items-center gap-1 ${
                      isOwn ? 'text-blue-100' : 'text-slate-500'
                    }`}>
                      {formatTime(message.timestamp)}
                      {message.isEncrypted && (
                        <Shield className="w-3 h-3" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {messages.length === 0 && (
            <div className="text-center text-slate-400 py-8">
              <p>Пока нет сообщений</p>
              <p className="text-sm">Начните общение с участниками</p>
            </div>
          )}
        </div>
      </div>

      {/* Поле ввода */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Написать сообщение..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {isEncrypted && (
          <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Сообщения защищены end-to-end шифрованием
          </div>
        )}
      </div>
    </div>
  );
}
