import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Participant, Reaction } from '../types/conference';
import { Mic, MicOff, Video, VideoOff, Hand, Crown, Presentation } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface VideoTileProps {
  participant: Participant;
  stream?: MediaStream;
  isLocal?: boolean;
  isSpeaking?: boolean;
  reactions?: Reaction[];
  isScreenShare?: boolean;
}

export function VideoTile({ participant, stream, isLocal = false, isSpeaking = false, reactions = [], isScreenShare = false }: VideoTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visibleReactions, setVisibleReactions] = useState<Reaction[]>([]);

  useEffect(() => {
    if (videoRef.current && stream && participant.videoEnabled) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, participant.videoEnabled]);

  // Управление видимыми реакциями
  useEffect(() => {
    if (reactions.length > 0) {
      const latest = reactions[reactions.length - 1];
      setVisibleReactions([latest]);

      const timer = setTimeout(() => {
        setVisibleReactions([]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [reactions]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = () => {
    switch (participant.status) {
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

  return (
    <div className={`
      relative rounded-xl overflow-hidden bg-slate-900 aspect-video
      ${isSpeaking ? 'ring-4 ring-blue-500' : 'ring-1 ring-slate-700'}
      transition-all duration-200
    `}>
      {/* Видео или аватар */}
      {(participant.videoEnabled || isScreenShare) && stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal && !isScreenShare}
          className={`w-full h-full ${isScreenShare ? 'object-contain bg-black' : 'object-cover'}`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
          <Avatar className="w-24 h-24">
            <AvatarImage src={participant.avatar} alt={participant.name} />
            <AvatarFallback className="text-2xl">
              {getInitials(participant.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      {/* Оверлей с информацией */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Имя и статус */}
      <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm drop-shadow-lg">
            {participant.name}
            {isLocal && ' (Вы)'}
          </span>
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
        </div>

        <div className="flex items-center gap-1">
          {!participant.audioEnabled && (
            <div className="bg-red-500 p-1.5 rounded-full">
              <MicOff className="w-3 h-3 text-white" />
            </div>
          )}
          {!participant.videoEnabled && (
            <div className="bg-red-500 p-1.5 rounded-full">
              <VideoOff className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Бейджи статуса */}
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        {participant.isModerator && (
          <Badge className="bg-yellow-500/90 hover:bg-yellow-500 text-white gap-1">
            <Crown className="w-3 h-3" />
            Модератор
          </Badge>
        )}
        {participant.status === 'presenting' && (
          <Badge className="bg-blue-500/90 hover:bg-blue-500 text-white gap-1">
            <Presentation className="w-3 h-3" />
            Презентация
          </Badge>
        )}
      </div>

      {/* Поднятая рука */}
      {participant.isHandRaised && (
        <div className="absolute top-3 right-3 animate-bounce">
          <div className="bg-yellow-500 p-2 rounded-full">
            <Hand className="w-4 h-4 text-white" />
          </div>
        </div>
      )}

      {/* Индикатор говорящего */}
      {isSpeaking && participant.audioEnabled && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-green-500 rounded-full animate-pulse"
                style={{
                  height: `${12 + i * 4}px`,
                  animationDelay: `${i * 0.15}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Реакции */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <AnimatePresence>
          {visibleReactions.map((reaction) => (
            <motion.div
              key={reaction.id}
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{ opacity: 1, scale: 1.5, y: -30 }}
              exit={{ opacity: 0, scale: 0, y: -60 }}
              transition={{ duration: 0.5 }}
              className="text-6xl absolute"
            >
              {reaction.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
