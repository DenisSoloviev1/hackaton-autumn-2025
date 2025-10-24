import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Video, Users, Shield, Link as LinkIcon, Plus } from 'lucide-react';

interface LobbyPageProps {
  onJoinRoom: (roomId: string, userName: string, isModerator: boolean) => void;
}

export function LobbyPage({ onJoinRoom }: LobbyPageProps) {
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomLink, setRoomLink] = useState('');

  const handleCreateRoom = () => {
    if (!userName.trim() || !roomName.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const roomId = `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    onJoinRoom(roomId, userName, true);
  };

  const handleJoinByLink = () => {
    if (!userName.trim() || !roomLink.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    // Извлечение ID комнаты из ссылки
    const roomId = roomLink.includes('room=') 
      ? new URLSearchParams(roomLink.split('?')[1]).get('room') || roomLink
      : roomLink;

    onJoinRoom(roomId, userName, false);
  };

  const generateInviteLink = (roomId: string) => {
    return `${window.location.origin}/?room=${roomId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl">ConferenceHub</h1>
          </div>
          <p className="text-slate-600">
            Безопасные видеоконференции с end-to-end шифрованием
          </p>
        </div>

        {/* Основная карточка */}
        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle>Начало работы</CardTitle>
            <CardDescription>
              Создайте новую комнату или присоединитесь к существующей
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="create" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="create" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Создать комнату
                </TabsTrigger>
                <TabsTrigger value="join" className="gap-2">
                  <LinkIcon className="w-4 h-4" />
                  Войти по ссылке
                </TabsTrigger>
              </TabsList>

              {/* Создание комнаты */}
              <TabsContent value="create" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="create-name">Ваше имя</Label>
                  <Input
                    id="create-name"
                    placeholder="Введите ваше имя"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-name">Название комнаты</Label>
                  <Input
                    id="room-name"
                    placeholder="Например: Встреча команды"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleCreateRoom}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Создать и войти
                </Button>
              </TabsContent>

              {/* Вход по ссылке */}
              <TabsContent value="join" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="join-name">Ваше имя</Label>
                  <Input
                    id="join-name"
                    placeholder="Введите ваше имя"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-link">Ссылка на комнату или ID</Label>
                  <Input
                    id="room-link"
                    placeholder="Вставьте ссылку или ID комнаты"
                    value={roomLink}
                    onChange={(e) => setRoomLink(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleJoinByLink}
                  className="w-full"
                  size="lg"
                  variant="outline"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Присоединиться
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Функции */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="mb-1">HD видео/аудио</h3>
            <p className="text-sm text-slate-600">
              Качественная связь в реальном времени
            </p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="mb-1">Безопасность</h3>
            <p className="text-sm text-slate-600">
              End-to-end шифрование данных
            </p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="mb-1">Совместная работа</h3>
            <p className="text-sm text-slate-600">
              Чат, демонстрация экрана, запись
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
