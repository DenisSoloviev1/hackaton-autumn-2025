import { useState, useEffect, useRef } from 'react';
import { Participant, Message, Room, Reaction, ViewMode } from '../types/conference';
import { VideoGrid } from './VideoGrid';
import { ChatPanel } from './ChatPanel';
import { ParticipantsPanel } from './ParticipantsPanel';
import { ControlBar } from './ControlBar';
import { ModeratorPanel } from './ModeratorPanel';
import { SecurityIndicator } from './SecurityIndicator';
import { ReactionOverlay } from './ReactionOverlay';
import { useWebRTC } from '../hooks/useWebRTC';
import { useConnectionStats } from '../hooks/useConnectionStats';
import { useMediaRecorder } from '../hooks/useMediaRecorder';
import { useScreenShare } from '../hooks/useScreenShare';
import { mockParticipants, mockMessages, generateMockVideoStream } from '../utils/mockData';
import { encryptionInstance } from '../utils/encryption';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { toast } from 'sonner';

interface ConferenceRoomProps {
  room: Room;
  localParticipant: Participant;
  onLeave: () => void;
}

export function ConferenceRoom({ room, localParticipant, onLeave }: ConferenceRoomProps) {
  // Состояние участников и сообщений
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants);
  const participantsRef = useRef<Participant[]>(mockParticipants);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [speakingParticipants, setSpeakingParticipants] = useState<Set<string>>(new Set());
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  // Состояние панелей
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showModeratorPanel, setShowModeratorPanel] = useState(false);

  // Состояние комнаты
  const [isLocked, setIsLocked] = useState(room.isLocked);

  // WebRTC хук
  const {
    localStream,
    audioEnabled,
    videoEnabled,
    availableDevices,
    selectedAudioDevice,
    selectedVideoDevice,
    localVideoRef,
    toggleAudio,
    toggleVideo,
    switchDevice,
    initMediaStream,
    stopAllTracks
  } = useWebRTC();

  // Статистика соединения
  const connectionStats = useConnectionStats();

  // Демонстрация экрана
  const { isScreenSharing, screenStream, toggleScreenShare } = useScreenShare();

  // Запись встречи (записываем экран если демонстрация активна, иначе камеру)
  const { isRecording, toggleRecording } = useMediaRecorder(localStream, screenStream);

  // Mock видео потоки для удаленных участников
  const [mockStreams] = useState<Map<string, MediaStream>>(() => {
    const streams = new Map();
    mockParticipants.forEach(p => {
      streams.set(p.id, generateMockVideoStream());
    });
    return streams;
  });

  // Синхронизация ref с состоянием участников
  useEffect(() => {
    participantsRef.current = participants;
  }, [participants]);

  // Инициализация медиа при монтировании
  useEffect(() => {
    initMediaStream();
    
    // Симуляция говорящих участников
    const interval = setInterval(() => {
      const currentParticipants = participantsRef.current;
      if (currentParticipants.length > 0) {
        const randomParticipant = currentParticipants[Math.floor(Math.random() * currentParticipants.length)];
        setSpeakingParticipants(new Set([randomParticipant.id]));
        
        setTimeout(() => {
          setSpeakingParticipants(new Set());
        }, 2000);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      stopAllTracks();
    };
  }, []);

  // Обработка отправки сообщения
  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      userId: localParticipant.id,
      userName: localParticipant.name,
      text,
      timestamp: new Date(),
      isEncrypted: room.encryptionEnabled
    };
    
    setMessages([...messages, newMessage]);
    
    // Имитация ответа от другого участника (только если есть другие участники)
    if (participantsRef.current.length > 0) {
      setTimeout(() => {
        const currentParticipants = participantsRef.current;
        if (currentParticipants.length === 0) return;
        
        const randomParticipant = currentParticipants[Math.floor(Math.random() * currentParticipants.length)];
        const responseMessage: Message = {
          id: `msg-${Date.now()}-response`,
          userId: randomParticipant.id,
          userName: randomParticipant.name,
          text: 'Понял, спасибо!',
          timestamp: new Date(),
          isEncrypted: room.encryptionEnabled
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 2000 + Math.random() * 3000);
    }
  };

  // Обработка реакций
  const handleReaction = (emoji: string) => {
    const newReaction: Reaction = {
      id: `reaction-${Date.now()}`,
      userId: localParticipant.id,
      userName: localParticipant.name,
      emoji,
      timestamp: new Date()
    };
    
    setReactions([...reactions, newReaction]);
    
    // Удаляем старые реакции через 3 секунды
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 3000);

    // Имитация реакции от других участников
    if (participantsRef.current.length > 0) {
      setTimeout(() => {
        const randomParticipant = participantsRef.current[Math.floor(Math.random() * participantsRef.current.length)];
        const mockReaction: Reaction = {
          id: `reaction-${Date.now()}-mock`,
          userId: randomParticipant.id,
          userName: randomParticipant.name,
          emoji: ['👍', '❤️', '😂'][Math.floor(Math.random() * 3)],
          timestamp: new Date()
        };
        setReactions(prev => [...prev, mockReaction]);
        
        setTimeout(() => {
          setReactions(prev => prev.filter(r => r.id !== mockReaction.id));
        }, 3000);
      }, 1000 + Math.random() * 2000);
    }
  };

  // Управление блокировкой
  const handleToggleLock = () => {
    setIsLocked(!isLocked);
    if (!isLocked) {
      toast.warning('Комната заблокирована', {
        description: 'Новые участники не смогут присоединиться'
      });
    } else {
      toast.success('Комната разблокирована', {
        description: 'Новые участники могут присоединиться по ссылке'
      });
    }
  };

  // Управление участниками
  const handleKickParticipant = (participantId: string) => {
    const participant = participants.find(p => p.id === participantId);
    setParticipants(participants.filter(p => p.id !== participantId));
    toast.success(`${participant?.name} удален из комнаты`);
  };

  const handleMakeModerator = (participantId: string) => {
    setParticipants(participants.map(p => 
      p.id === participantId ? { ...p, isModerator: true } : p
    ));
    const participant = participants.find(p => p.id === participantId);
    toast.success(`${participant?.name} назначен модератором`);
  };

  // Поднять/опустить руку
  const handleToggleHand = () => {
    setIsHandRaised(!isHandRaised);
    if (!isHandRaised) {
      toast.info('Вы подняли руку');
    }
  };

  // Обновляем статус участника при демонстрации экрана
  useEffect(() => {
    if (isScreenSharing) {
      // Обновляем статус локального участника
      setParticipants(prev => prev.map(p => ({
        ...p,
        status: 'active' as const
      })));
    }
  }, [isScreenSharing]);

  // Покинуть комнату
  const handleLeave = () => {
    if (confirm('Вы уверены, что хотите покинуть конференцию?')) {
      stopAllTracks();
      onLeave();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      {/* Индикатор безопасности */}
      <SecurityIndicator
        encryptionEnabled={room.encryptionEnabled}
        connectionQuality="excellent"
      />

      {/* Видео сетка */}
      <div className="flex-1 overflow-hidden relative">
        {isRecording && (
          <div className="absolute top-4 right-4 z-10 bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 animate-pulse">
            <div className="w-3 h-3 bg-white rounded-full" />
            <span>Запись</span>
          </div>
        )}

        <VideoGrid
          participants={participants}
          localParticipant={{
            ...localParticipant,
            audioEnabled,
            videoEnabled,
            isHandRaised,
            status: isScreenSharing ? 'presenting' : 'active'
          }}
          localStream={localStream || undefined}
          screenStream={screenStream || undefined}
          isScreenSharing={isScreenSharing}
          mockStreams={mockStreams}
          speakingParticipants={speakingParticipants}
          viewMode={viewMode}
          reactions={reactions}
        />

        {/* Оверлей реакций */}
        <ReactionOverlay reactions={reactions} />
      </div>

      {/* Панель управления */}
      <ControlBar
        audioEnabled={audioEnabled}
        videoEnabled={videoEnabled}
        isHandRaised={isHandRaised}
        isRecording={isRecording}
        onToggleAudio={toggleAudio}
        onToggleVideo={toggleVideo}
        onToggleHand={handleToggleHand}
        onLeave={handleLeave}
        onToggleChat={() => setShowChat(!showChat)}
        onToggleParticipants={() => {
          setShowParticipants(!showParticipants);
          if (localParticipant.isModerator) {
            setShowModeratorPanel(!showParticipants);
          }
        }}
        onStartScreenShare={toggleScreenShare}
        isScreenSharing={isScreenSharing}
        onReaction={handleReaction}
        onToggleRecording={toggleRecording}
        availableDevices={availableDevices}
        selectedAudioDevice={selectedAudioDevice}
        selectedVideoDevice={selectedVideoDevice}
        onSwitchDevice={switchDevice}
        connectionStats={connectionStats}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Боковая панель чата */}
      <Sheet open={showChat} onOpenChange={setShowChat}>
        <SheetContent side="right" className="w-full sm:w-96 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Чат</SheetTitle>
            <SheetDescription>Текстовый чат конференции</SheetDescription>
          </SheetHeader>
          <ChatPanel
            messages={messages}
            currentUserId={localParticipant.id}
            onSendMessage={handleSendMessage}
            isEncrypted={room.encryptionEnabled}
          />
        </SheetContent>
      </Sheet>

      {/* Боковая панель участников */}
      <Sheet open={showParticipants} onOpenChange={setShowParticipants}>
        <SheetContent side="right" className="w-full sm:w-96 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Участники</SheetTitle>
            <SheetDescription>Список участников конференции</SheetDescription>
          </SheetHeader>
          <ParticipantsPanel
            participants={participants}
            localParticipant={{
              ...localParticipant,
              audioEnabled,
              videoEnabled,
              isHandRaised
            }}
            isLocalModerator={localParticipant.isModerator}
            onKickParticipant={handleKickParticipant}
            onMakeModeratorParticipant={handleMakeModerator}
          />
        </SheetContent>
      </Sheet>

      {/* Панель модератора */}
      {localParticipant.isModerator && (
        <Sheet open={showModeratorPanel} onOpenChange={setShowModeratorPanel}>
          <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Управление комнатой</SheetTitle>
              <SheetDescription>
                Инструменты модерации и управления конференцией
              </SheetDescription>
            </SheetHeader>
            <ModeratorPanel
              isRecording={isRecording}
              isLocked={isLocked}
              encryptionEnabled={room.encryptionEnabled}
              onToggleRecording={toggleRecording}
              onToggleLock={handleToggleLock}
              roomId={room.id}
            />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
