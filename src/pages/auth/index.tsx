import { Button, Input, Tabs, Tab, Card, CardBody, CardHeader } from '@heroui/react';
import { FC, useState } from 'react';

import { Label } from '@/shared/_components/ui/label';
import {
  Card as UICard,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/shared/_components/ui/card';

import cls from './index.module.scss';

const AuthPage: FC = () => {
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomLink, setRoomLink] = useState('');

  const onJoinRoom = (
    roomId: string,
    userName: string,
    isModerator: boolean
  ) => {
    // Ваша логика входа в комнату
    console.log('Joining room:', roomId, userName, isModerator);
  };

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

  return (
    <main >
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4'>
        <div className='w-full max-w-4xl'>
          {/* Заголовок */}
          <div className='mb-8 text-center'>
            <div className='mb-4 flex items-center justify-center gap-3'>
              <div className='rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-3'>
                {/* <Video className='h-8 w-8 text-white' /> */}
              </div>
              <h1 className='text-4xl'>ConferenceHub</h1>
            </div>
            <p className='text-slate-600'>
              Безопасные видеоконференции с end-to-end шифрованием
            </p>
          </div>

          {/* Основная карточка */}
          <Card className='border-0 shadow-2xl'>
            <CardHeader className='pb-0'>
              <CardTitle>Начало работы</CardTitle>
              <CardDescription>
                Создайте новую комнату или присоединитесь к существующей
              </CardDescription>
            </CardHeader>
            <CardBody>
              <Tabs 
                aria-label="Options" 
                className="w-full"
                color="primary"
                variant="underlined"
              >
                <Tab key="create" title={
                  <div className="flex items-center gap-2">
                    {/* <Plus className='h-4 w-4' /> */}
                    Создать комнату
                  </div>
                }>
                  <div className='space-y-4 pt-4'>
                    <div className='space-y-2'>
                      <Label>Ваше имя</Label>
                      <Input
                        id='create-name'
                        placeholder='Введите ваше имя'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label>Название комнаты</Label>
                      <Input
                        id='room-name'
                        placeholder='Например: Встреча команды'
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                      />
                    </div>
                    <Button
                      onPress={handleCreateRoom}
                      className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      size='lg'
                    >
                      {/* <Plus className='mr-2 h-4 w-4' /> */}
                      Создать и войти
                    </Button>
                  </div>
                </Tab>
                
                <Tab key="join" title={
                  <div className="flex items-center gap-2">
                    {/* <LinkIcon className='h-4 w-4' /> */}
                    Войти по ссылке
                  </div>
                }>
                  <div className='space-y-4 pt-4'>
                    <div className='space-y-2'>
                      <Label>Ваше имя</Label>
                      <Input
                        id='join-name'
                        placeholder='Введите ваше имя'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label>Ссылка на комнату или ID</Label>
                      <Input
                        id='room-link'
                        placeholder='Вставьте ссылку или ID комнаты'
                        value={roomLink}
                        onChange={(e) => setRoomLink(e.target.value)}
                      />
                    </div>
                    <Button
                      onPress={handleJoinByLink}
                      className='w-full'
                      size='lg'
                      variant='bordered'
                    >
                      {/* <LinkIcon className='mr-2 h-4 w-4' /> */}
                      Присоединиться
                    </Button>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>

          {/* Функции */}
          <div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-3'>
            <div className='rounded-lg bg-white/50 p-4 text-center backdrop-blur-sm'>
              <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100'>
                {/* <Video className='h-6 w-6 text-blue-600' /> */}
              </div>
              <h3 className='mb-1'>HD видео/аудио</h3>
              <p className='text-sm text-slate-600'>
                Качественная связь в реальном времени
              </p>
            </div>
            <div className='rounded-lg bg-white/50 p-4 text-center backdrop-blur-sm'>
              <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100'>
                {/* <Shield className='h-6 w-6 text-purple-600' /> */}
              </div>
              <h3 className='mb-1'>Безопасность</h3>
              <p className='text-sm text-slate-600'>
                End-to-end шифрование данных
              </p>
            </div>
            <div className='rounded-lg bg-white/50 p-4 text-center backdrop-blur-sm'>
              <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100'>
                {/* <Users className='h-6 w-6 text-pink-600' /> */}
              </div>
              <h3 className='mb-1'>Совместная работа</h3>
              <p className='text-sm text-slate-600'>
                Чат, демонстрация экрана, запись
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;