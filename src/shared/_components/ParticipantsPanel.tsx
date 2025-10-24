import { Participant } from '../types/conference';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Crown, 
  MoreVertical,
  UserMinus,
  UserCheck,
  Hand
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface ParticipantsPanelProps {
  participants: Participant[];
  localParticipant: Participant;
  isLocalModerator: boolean;
  onKickParticipant?: (participantId: string) => void;
  onMakeModeratorParticipant?: (participantId: string) => void;
}

export function ParticipantsPanel({ 
  participants, 
  localParticipant,
  isLocalModerator,
  onKickParticipant,
  onMakeModeratorParticipant
}: ParticipantsPanelProps) {
  const allParticipants = [localParticipant, ...participants];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Активен';
      case 'away':
        return 'Отошел';
      case 'presenting':
        return 'Презентует';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'presenting':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatJoinTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    
    if (diff < 1) return 'только что';
    if (diff === 1) return '1 минуту назад';
    if (diff < 60) return `${diff} минут назад`;
    
    const hours = Math.floor(diff / 60);
    if (hours === 1) return '1 час назад';
    return `${hours} часов назад`;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Заголовок */}
      <div className="p-4 border-b">
        <h3>Участники</h3>
        <p className="text-sm text-slate-600">{allParticipants.length} в комнате</p>
      </div>

      {/* Список участников */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {allParticipants.map((participant) => {
            const isLocal = participant.id === localParticipant.id;
            
            return (
              <div
                key={participant.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {/* Аватар */}
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={participant.avatar} alt={participant.name} />
                    <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(participant.status)}`} />
                </div>

                {/* Информация */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate">
                      {participant.name}
                      {isLocal && ' (Вы)'}
                    </p>
                    {participant.isModerator && (
                      <Crown className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                    )}
                    {participant.isHandRaised && (
                      <Hand className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{getStatusText(participant.status)}</span>
                    <span>•</span>
                    <span>{formatJoinTime(participant.joinedAt)}</span>
                  </div>
                </div>

                {/* Статусы медиа */}
                <div className="flex items-center gap-1">
                  {participant.audioEnabled ? (
                    <div className="p-1.5 rounded-full bg-slate-100">
                      <Mic className="w-3.5 h-3.5 text-slate-600" />
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-full bg-red-100">
                      <MicOff className="w-3.5 h-3.5 text-red-600" />
                    </div>
                  )}
                  
                  {participant.videoEnabled ? (
                    <div className="p-1.5 rounded-full bg-slate-100">
                      <Video className="w-3.5 h-3.5 text-slate-600" />
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-full bg-red-100">
                      <VideoOff className="w-3.5 h-3.5 text-red-600" />
                    </div>
                  )}
                </div>

                {/* Меню модератора */}
                {isLocalModerator && !isLocal && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!participant.isModerator && (
                        <DropdownMenuItem
                          onClick={() => onMakeModeratorParticipant?.(participant.id)}
                        >
                          <UserCheck className="w-4 h-4 mr-2" />
                          Сделать модератором
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onKickParticipant?.(participant.id)}
                        className="text-red-600"
                      >
                        <UserMinus className="w-4 h-4 mr-2" />
                        Удалить из комнаты
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
