import { User } from '@/entities/user/mock/users';
import { Chip } from '@heroui/react';
import { MicrophoneIcon, VideoCameraIcon, VideoCameraSlashIcon } from '@heroicons/react/24/outline';

interface UserVideoCardProps {
    user: User;
    isLarge?: boolean;
}

export const UserVideoCard: React.FC<UserVideoCardProps> = ({ user, isLarge = false }) => {
    return (
        <div className={`relative bg-gray-800 rounded-lg overflow-hidden ${isLarge ? 'col-span-2 row-span-2' : ''}`}>
            {/* Видео поток или аватар */}
            {user.isVideoOn ? (
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className={`${isLarge ? 'text-6xl' : 'text-2xl'} mb-2`}>{user.avatar}</div>
                        <p className={`${isLarge ? 'text-xl' : 'text-sm'} font-semibold`}>{user.name}</p>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <div className="text-center">
                        <div className={`${isLarge ? 'text-8xl' : 'text-4xl'} mb-2`}>{user.avatar}</div>
                        <p className={`${isLarge ? 'text-xl' : 'text-sm'} font-semibold text-white`}>{user.name}</p>
                    </div>
                </div>
            )}

            {/* Индикатор речи */}
            {user.isSpeaking && (
                <div className="absolute top-2 left-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
            )}

            {/* Роль модератора */}
            {user.role === 'moderator' && (
                <div className="absolute top-2 right-2">
                    <Chip size="sm" color="primary" variant="flat">
                        👑
                    </Chip>
                </div>
            )}

            {/* Статус микрофона и камеры */}
            <div className="absolute bottom-2 left-2 flex gap-1">
                {user.isAudioOn ? (
                    <MicrophoneIcon className="w-4 h-4 text-green-500" />
                ) : (
                    <MicrophoneIcon className="w-4 h-4 text-red-500" />
                )}
                {user.isVideoOn ? (
                    <VideoCameraIcon className="w-4 h-4 text-green-500" />
                ) : (
                    <VideoCameraSlashIcon className="w-4 h-4 text-red-500" />
                )}
            </div>

            {/* Имя пользователя */}
            <div className="absolute bottom-2 right-2">
                <span className="text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                    {user.name}
                </span>
            </div>
        </div>
    );
};