import {
  Button,
  Input,
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from '@heroui/react';
import { FC, useState } from 'react';
import {
  VideoCameraIcon,
  UserIcon,
  BoltIcon,
  LinkIcon,
  PlayIcon,
  PlusIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { appRouting } from '@/app/config';

const AuthPage: FC = () => {
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomLink, setRoomLink] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const onJoinRoom = (
    roomId: string,
    userName: string,
    isModerator: boolean
  ) => {
    localStorage.setItem('user', JSON.stringify({
      name: userName,
      isModerator,
      roomId
    }));

    window.location.href = appRouting.meeting.path;
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

    const roomId = roomLink.includes('room=')
      ? new URLSearchParams(roomLink.split('?')[1]).get('room') || roomLink
      : roomLink;

    onJoinRoom(roomId, userName, false);
  };

  const handleGuestLogin = () => {
    const guestName = `Гость-${Math.random().toString(36).substr(2, 6)}`;
    setUserName(guestName);
    // Автоматический вход в демо-комнату
    onJoinRoom('demo-room', guestName, false);
  };

  const handleAuth = () => {
    if (!email.trim() || !password.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    // Здесь будет логика авторизации/регистрации
    console.log(`${isLogin ? 'Login' : 'Register'} with:`, email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="flex flex-col items-center justify-center p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <VideoCameraIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">VideoMeet</h1>
          </div>
          <p className="text-gray-600 text-center">Присоединяйтесь к видео встрече</p>
        </CardHeader>

        <CardBody className="p-6">
          <Tabs aria-label="Auth options" fullWidth>
            <Tab key="guest" title={
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                Гость
              </div>
            }>
              <div className="flex flex-col gap-4 mt-4">
                <Input
                  label="Ваше имя"
                  placeholder="Введите ваше имя"
                  value={userName}
                  onValueChange={setUserName}
                  startContent={
                    <UserIcon className="w-4 h-4 text-gray-400" />
                  }
                />

                <div className="relative flex items-center justify-center">
                  <Divider className="flex-1" />
                  <Chip variant="flat" className="absolute mx-2">или</Chip>
                </div>

                <Button
                  color="primary"
                  variant="flat"
                  onPress={handleGuestLogin}
                  startContent={
                    <BoltIcon className="w-4 h-4" />
                  }
                >
                  Быстрый вход как гость
                </Button>

                <Divider />

                <div className="space-y-3">
                  <Input
                    label="Ссылка на встречу"
                    placeholder="Введите ссылку на встречу"
                    value={roomLink}
                    onValueChange={setRoomLink}
                    startContent={
                      <LinkIcon className="w-4 h-4 text-gray-400" />
                    }
                  />

                  <Button
                    color="primary"
                    onPress={handleJoinByLink}
                    fullWidth
                    startContent={
                      <PlayIcon className="w-4 h-4" />
                    }
                  >
                    Присоединиться к встрече
                  </Button>
                </div>
              </div>
            </Tab>

            <Tab key="create" title={
              <div className="flex items-center gap-2">
                <PlusIcon className="w-4 h-4" />
                Создать встречу
              </div>
            }>
              <div className="flex flex-col gap-4 mt-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <InformationCircleIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Требуется авторизация</span>
                  </div>
                  <p className="text-xs text-blue-600">
                    Для создания встречи необходимо войти в систему или зарегистрироваться
                  </p>
                </div>

                <Tabs
                  aria-label="Auth type"
                  size="sm"
                  selectedKey={isLogin ? "login" : "register"}
                  onSelectionChange={(key) => setIsLogin(key === "login")}
                >
                  <Tab key="login" title="Вход">
                    <div className="space-y-4 mt-4">
                      <Input
                        label="Email"
                        type="email"
                        placeholder="Введите ваш email"
                        value={email}
                        onValueChange={setEmail}
                        startContent={
                          <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                        }
                      />
                      <Input
                        label="Пароль"
                        type="password"
                        placeholder="Введите пароль"
                        value={password}
                        onValueChange={setPassword}
                        startContent={
                          <LockClosedIcon className="w-4 h-4 text-gray-400" />
                        }
                      />
                      <Button color="primary" onPress={handleAuth} fullWidth>
                        Войти
                      </Button>
                    </div>
                  </Tab>

                  <Tab key="register" title="Регистрация">
                    <div className="space-y-4 mt-4">
                      <Input
                        label="Email"
                        type="email"
                        placeholder="Введите ваш email"
                        value={email}
                        onValueChange={setEmail}
                        startContent={
                          <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                        }
                      />
                      <Input
                        label="Пароль"
                        type="password"
                        placeholder="Создайте пароль"
                        value={password}
                        onValueChange={setPassword}
                        startContent={
                          <LockClosedIcon className="w-4 h-4 text-gray-400" />
                        }
                      />
                      <Button color="primary" onPress={handleAuth} fullWidth>
                        Зарегистрироваться
                      </Button>
                    </div>
                  </Tab>
                </Tabs>

                <Divider />

                <div className="space-y-3">
                  <Input
                    label="Название комнаты"
                    placeholder="Введите название встречи"
                    value={roomName}
                    onValueChange={setRoomName}
                    startContent={
                      <ChatBubbleLeftRightIcon className="w-4 h-4 text-gray-400" />
                    }
                  />

                  <Button
                    color="success"
                    variant="shadow"
                    onPress={handleCreateRoom}
                    fullWidth
                    startContent={
                      <PlusIcon className="w-4 h-4" />
                    }
                  >
                    Создать встречу
                  </Button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default AuthPage;