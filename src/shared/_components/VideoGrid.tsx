import { motion } from 'motion/react';
import { Participant, ViewMode, Reaction } from '../types/conference';
import { VideoTile } from './VideoTile';

interface VideoGridProps {
  participants: Participant[];
  localParticipant: Participant;
  localStream?: MediaStream;
  screenStream?: MediaStream;
  isScreenSharing: boolean;
  mockStreams: Map<string, MediaStream>;
  speakingParticipants: Set<string>;
  viewMode: ViewMode;
  reactions: Reaction[];
}

export function VideoGrid({ 
  participants, 
  localParticipant, 
  localStream,
  screenStream,
  isScreenSharing,
  mockStreams,
  speakingParticipants,
  viewMode,
  reactions
}: VideoGridProps) {
  const allParticipants = [localParticipant, ...participants];
  
  // Определение количества колонок в зависимости от количества участников
  const getGridCols = (count: number) => {
    if (count <= 1) return 'grid-cols-1';
    if (count <= 2) return 'grid-cols-1 md:grid-cols-2';
    if (count <= 4) return 'grid-cols-2';
    if (count <= 6) return 'grid-cols-2 md:grid-cols-3';
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  };

  // Режим докладчика или демонстрация экрана
  if (viewMode === 'speaker' || isScreenSharing) {
    // При демонстрации экрана показываем экран крупно, при режиме speaker - говорящего
    let speakerParticipant: Participant;
    let speakerStream: MediaStream | undefined;

    if (isScreenSharing) {
      // Показываем демонстрацию экрана крупно
      speakerParticipant = localParticipant;
      speakerStream = screenStream;
    } else {
      // Находим говорящего участника или первого
      const speakerId = Array.from(speakingParticipants)[0];
      speakerParticipant = speakerId 
        ? allParticipants.find(p => p.id === speakerId) || allParticipants[0]
        : allParticipants[0];
      
      speakerStream = speakerParticipant.id === localParticipant.id 
        ? localStream 
        : mockStreams.get(speakerParticipant.id);
    }
    
    const otherParticipants = allParticipants.filter(p => p.id !== speakerParticipant.id);

    return (
      <div className="h-full flex flex-col gap-4 p-4">
        {/* Главное видео */}
        <motion.div
          layout
          className="flex-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <VideoTile
            participant={speakerParticipant}
            stream={speakerStream}
            isLocal={speakerParticipant.id === localParticipant.id}
            isSpeaking={speakingParticipants.has(speakerParticipant.id)}
            reactions={reactions.filter(r => r.userId === speakerParticipant.id)}
            isScreenShare={isScreenSharing}
          />
        </motion.div>

        {/* Миниатюры остальных участников */}
        {otherParticipants.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {otherParticipants.map(participant => {
              const stream = participant.id === localParticipant.id 
                ? localStream 
                : mockStreams.get(participant.id);
              
              return (
                <motion.div
                  key={participant.id}
                  layout
                  className="w-40 flex-shrink-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <VideoTile
                    participant={participant}
                    stream={stream}
                    isLocal={participant.id === localParticipant.id}
                    isSpeaking={speakingParticipants.has(participant.id)}
                    reactions={reactions.filter(r => r.userId === participant.id)}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Режим сетки (по умолчанию)
  return (
    <motion.div
      layout
      className={`grid ${getGridCols(allParticipants.length)} gap-4 p-4 h-full auto-rows-fr`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Локальное видео */}
      <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <VideoTile
          participant={localParticipant}
          stream={localStream}
          isLocal={true}
          isSpeaking={speakingParticipants.has(localParticipant.id)}
          reactions={reactions.filter(r => r.userId === localParticipant.id)}
        />
      </motion.div>

      {/* Удаленные участники */}
      {participants.map(participant => (
        <motion.div
          key={participant.id}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <VideoTile
            participant={participant}
            stream={mockStreams.get(participant.id)}
            isSpeaking={speakingParticipants.has(participant.id)}
            reactions={reactions.filter(r => r.userId === participant.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
