import { FC, useState } from 'react';
import { Header } from '@/widgets/header';
import { MeetingControls } from '@/features/meeting-controls/meeting-controls';
import { mockUsers, User } from '@/entities/user/mock/users';
import { UserVideoCard } from '@/entities/user/ui/user-video-card';

const Meeting: FC = () => {
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [participants, setParticipants] = useState<User[]>(mockUsers);

  const handleToggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  const handleToggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const handleShareScreen = () => {
    console.log('Sharing screen...');
  };

  const handleLeaveCall = () => {
    if (confirm('Вы уверены, что хотите покинуть встречу?')) {
      window.location.href = '/';
    }
  };

  // Первый пользователь - основной докладчик (крупный вид)
  const mainSpeaker = participants[0];
  const otherParticipants = participants.slice(1);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-6 h-[calc(100vh-80px)]">
        {/* Основная сетка видео */}
        <div className="grid grid-cols-4 grid-rows-3 gap-4 h-full mb-4">
          {/* Основной докладчик (занимает 2x2) */}
          <div className="col-span-2 row-span-2">
            <UserVideoCard user={mainSpeaker} isLarge={true} />
          </div>

          {/* Остальные участники */}
          {otherParticipants.map((user) => (
            <UserVideoCard key={user.id} user={user} />
          ))}

          {/* Заглушки для пустых слотов */}
          {Array.from({ length: 8 - participants.length }).map((_, index) => (
            <div key={`empty-${index}`} className="bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Ожидание...</span>
            </div>
          ))}
        </div>

        {/* Панель управления */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <MeetingControls
            isAudioOn={isAudioOn}
            isVideoOn={isVideoOn}
            onToggleAudio={handleToggleAudio}
            onToggleVideo={handleToggleVideo}
            onShareScreen={handleShareScreen}
            onLeaveCall={handleLeaveCall}
          />
        </div>

        {/* Информация о встрече */}
        <div className="fixed top-24 right-6 bg-black bg-opacity-50 text-white p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Информация о встрече</h3>
          <p className="text-sm">Участников: {participants.length}</p>
          <p className="text-sm">Время: 45:23</p>
          <p className="text-sm">Код: ABC-123-XYZ</p>
        </div>
      </main>
    </div>
  );
};

export default Meeting;