import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Circle,
  Lock,
  Unlock,
  Shield,
  AlertCircle,
  Download
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface ModeratorPanelProps {
  isRecording: boolean;
  isLocked: boolean;
  encryptionEnabled: boolean;
  onToggleRecording: () => void;
  onToggleLock: () => void;
  roomId: string;
}

export function ModeratorPanel({
  isRecording,
  isLocked,
  encryptionEnabled,
  onToggleRecording,
  onToggleLock,
  roomId
}: ModeratorPanelProps) {
  const [recordingDuration, setRecordingDuration] = useState(0);

  const copyInviteLink = async () => {
    const link = `${window.location.origin}/?room=${roomId}`;
    try {
      await navigator.clipboard.writeText(link);
      alert('Ссылка скопирована в буфер обмена!');
    } catch (error) {
      // Fallback: show the link to copy manually
      prompt('Скопируйте ссылку для приглашения:', link);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3>Панель модератора</h3>
          <p className="text-sm text-slate-600">Управление комнатой</p>
        </div>
        <Badge variant="outline" className="gap-1">
          <Shield className="w-3 h-3" />
          Модератор
        </Badge>
      </div>

      {/* Запись встречи */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Circle className={`w-4 h-4 ${isRecording ? 'text-red-600 animate-pulse' : 'text-slate-400'}`} />
            Запись встречи
          </CardTitle>
          <CardDescription>
            {isRecording 
              ? `Идет запись: ${formatDuration(recordingDuration)}`
              : 'Сохранение видео и аудио конференции'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="recording-switch">
              {isRecording ? 'Остановить запись' : 'Начать запись'}
            </Label>
            <Switch
              id="recording-switch"
              checked={isRecording}
              onCheckedChange={onToggleRecording}
            />
          </div>

          {isRecording && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Участники уведомлены о записи встречи
              </AlertDescription>
            </Alert>
          )}

          {!isRecording && recordingDuration > 0 && (
            <Button variant="outline" className="w-full gap-2">
              <Download className="w-4 h-4" />
              Скачать последнюю запись ({formatDuration(recordingDuration)})
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Блокировка комнаты */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            {isLocked ? (
              <Lock className="w-4 h-4 text-amber-600" />
            ) : (
              <Unlock className="w-4 h-4 text-slate-400" />
            )}
            Доступ к комнате
          </CardTitle>
          <CardDescription>
            {isLocked 
              ? 'Комната заблокирована - новые участники не могут войти'
              : 'Комната открыта для всех с приглашением'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="lock-switch">
              {isLocked ? 'Разблокировать комнату' : 'Заблокировать комнату'}
            </Label>
            <Switch
              id="lock-switch"
              checked={isLocked}
              onCheckedChange={onToggleLock}
            />
          </div>
        </CardContent>
      </Card>

      {/* Безопасность */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            Безопасность
          </CardTitle>
          <CardDescription>
            Статус шифрования и защиты данных
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>End-to-end шифрование</span>
            <Badge variant={encryptionEnabled ? 'default' : 'secondary'} className="bg-green-600">
              {encryptionEnabled ? 'Активно' : 'Неактивно'}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Защита видео</span>
            <Badge variant="default" className="bg-green-600">Активно</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Защита аудио</span>
            <Badge variant="default" className="bg-green-600">Активно</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Пригласить участников */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Пригласить участников</CardTitle>
          <CardDescription>
            Поделитесь ссылкой для присоединения
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={copyInviteLink}
          >
            Копировать ссылку-приглашение
          </Button>
          <p className="text-xs text-slate-500 mt-2 break-all">
            {window.location.origin}/?room={roomId.slice(0, 20)}...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
