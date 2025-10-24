import { useState } from 'react';
import { Button } from './ui/button';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Settings,
  Hand,
  Monitor,
  Users,
  MessageSquare,
  MoreVertical,
  CircleSlash,
  Circle
} from 'lucide-react';
import { ReactionsPicker } from './ReactionsPicker';
import { ConnectionStats } from './ConnectionStats';
import { ViewModeToggle } from './ViewModeToggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MediaDevice, ConnectionStats as Stats, ViewMode } from '../types/conference';

interface ControlBarProps {
  audioEnabled: boolean;
  videoEnabled: boolean;
  isHandRaised: boolean;
  isRecording?: boolean;
  isScreenSharing?: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onToggleHand: () => void;
  onLeave: () => void;
  onToggleChat: () => void;
  onToggleParticipants: () => void;
  onStartScreenShare?: () => void;
  onReaction?: (emoji: string) => void;
  onToggleRecording?: () => void;
  availableDevices: MediaDevice[];
  selectedAudioDevice: string;
  selectedVideoDevice: string;
  onSwitchDevice: (deviceId: string, kind: 'audioinput' | 'videoinput') => void;
  connectionStats?: Stats;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ControlBar({
  audioEnabled,
  videoEnabled,
  isHandRaised,
  isRecording = false,
  isScreenSharing = false,
  onToggleAudio,
  onToggleVideo,
  onToggleHand,
  onLeave,
  onToggleChat,
  onToggleParticipants,
  onStartScreenShare,
  onReaction,
  onToggleRecording,
  availableDevices,
  selectedAudioDevice,
  selectedVideoDevice,
  onSwitchDevice,
  connectionStats,
  viewMode,
  onViewModeChange
}: ControlBarProps) {
  const [showSettings, setShowSettings] = useState(false);

  const audioDevices = availableDevices.filter(d => d.kind === 'audioinput');
  const videoDevices = availableDevices.filter(d => d.kind === 'videoinput');

  return (
    <TooltipProvider delayDuration={300}>
      <div className="bg-slate-900 border-t border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Левая группа - основные контролы */}
          <div className="flex items-center gap-3">
            {/* Микрофон */}
            <DropdownMenu>
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={onToggleAudio}
                      className={`rounded-full ${
                        audioEnabled
                          ? 'bg-slate-700 hover:bg-slate-600 text-white'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                    >
                      {audioEnabled ? (
                        <Mic className="w-5 h-5" />
                      ) : (
                        <MicOff className="w-5 h-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{audioEnabled ? 'Выключить микрофон' : 'Включить микрофон'}</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-12 w-8 px-0 text-white hover:bg-slate-700 rounded-full"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
              </div>
              <DropdownMenuContent>
                <DropdownMenuLabel>Микрофон</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {audioDevices.map(device => (
                  <DropdownMenuItem
                    key={device.deviceId}
                    onClick={() => onSwitchDevice(device.deviceId, 'audioinput')}
                    className={selectedAudioDevice === device.deviceId ? 'bg-slate-100' : ''}
                  >
                    {device.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Камера */}
            <DropdownMenu>
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={onToggleVideo}
                      className={`rounded-full ${
                        videoEnabled
                          ? 'bg-slate-700 hover:bg-slate-600 text-white'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                    >
                      {videoEnabled ? (
                        <Video className="w-5 h-5" />
                      ) : (
                        <VideoOff className="w-5 h-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{videoEnabled ? 'Выключить камеру' : 'Включить камеру'}</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-12 w-8 px-0 text-white hover:bg-slate-700 rounded-full"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
              </div>
              <DropdownMenuContent>
                <DropdownMenuLabel>Камера</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {videoDevices.map(device => (
                  <DropdownMenuItem
                    key={device.deviceId}
                    onClick={() => onSwitchDevice(device.deviceId, 'videoinput')}
                    className={selectedVideoDevice === device.deviceId ? 'bg-slate-100' : ''}
                  >
                    {device.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Демонстрация экрана */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={onStartScreenShare}
                  className={`rounded-full ${
                    isScreenSharing
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  <Monitor className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{isScreenSharing ? 'Остановить демонстрацию' : 'Поделиться экраном'}</p>
              </TooltipContent>
            </Tooltip>

            {/* Поднять руку */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={onToggleHand}
                  className={`rounded-full ${
                    isHandRaised
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  <Hand className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{isHandRaised ? 'Опустить руку' : 'Поднять руку'}</p>
              </TooltipContent>
            </Tooltip>

            {/* Реакции */}
            {onReaction && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <ReactionsPicker onReaction={onReaction} />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Отправить реакцию</p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Запись */}
            {onToggleRecording && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={onToggleRecording}
                    className={`rounded-full ${
                      isRecording
                        ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    <Circle className={`w-5 h-5 ${isRecording ? 'fill-white' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{isRecording ? 'Остановить запись' : 'Начать запись'}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* Центр - завершить звонок */}
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={onLeave}
                  className="rounded-full bg-red-600 hover:bg-red-700 px-8"
                >
                  <PhoneOff className="w-5 h-5 mr-2" />
                  Покинуть
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Завершить конференцию</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Правая группа - панели */}
          <div className="flex items-center gap-3">
            {/* Режим просмотра */}
            <ViewModeToggle mode={viewMode} onModeChange={onViewModeChange} />

            {/* Статистика соединения */}
            {connectionStats && <ConnectionStats stats={connectionStats} />}

            {/* Участники */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={onToggleParticipants}
                  className="rounded-full bg-slate-700 hover:bg-slate-600 text-white"
                >
                  <Users className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Участники</p>
              </TooltipContent>
            </Tooltip>

            {/* Чат */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={onToggleChat}
                  className="rounded-full bg-slate-700 hover:bg-slate-600 text-white"
                >
                  <MessageSquare className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Чат</p>
              </TooltipContent>
            </Tooltip>

            {/* Настройки */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setShowSettings(true)}
                  className="rounded-full bg-slate-700 hover:bg-slate-600 text-white"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Настройки устройств</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Диалог настроек */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Настройки</DialogTitle>
            <DialogDescription>
              Управление устройствами и параметрами конференции
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Микрофон */}
            <div className="space-y-2">
              <Label>Микрофон</Label>
              <Select value={selectedAudioDevice} onValueChange={(value) => onSwitchDevice(value, 'audioinput')}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите микрофон" />
                </SelectTrigger>
                <SelectContent>
                  {audioDevices.filter(device => device.deviceId).map(device => (
                    <SelectItem key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Камера */}
            <div className="space-y-2">
              <Label>Камера</Label>
              <Select value={selectedVideoDevice} onValueChange={(value) => onSwitchDevice(value, 'videoinput')}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите камеру" />
                </SelectTrigger>
                <SelectContent>
                  {videoDevices.filter(device => device.deviceId).map(device => (
                    <SelectItem key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Информация */}
            <div className="pt-4 border-t">
              <p className="text-sm text-slate-600">
                Для лучшего качества рекомендуется использовать проводное подключение и закрыть другие приложения.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
