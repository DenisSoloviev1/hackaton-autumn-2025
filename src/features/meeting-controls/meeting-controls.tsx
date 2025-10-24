import { Button } from '@heroui/react';
import {
    MicrophoneIcon,
    VideoCameraIcon,
    VideoCameraSlashIcon,
    PhoneIcon,
    UsersIcon,
    ChatBubbleLeftRightIcon,
    EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

interface MeetingControlsProps {
    isAudioOn: boolean;
    isVideoOn: boolean;
    onToggleAudio: () => void;
    onToggleVideo: () => void;
    onShareScreen: () => void;
    onLeaveCall: () => void;
}

export const MeetingControls: React.FC<MeetingControlsProps> = ({
    isAudioOn,
    isVideoOn,
    onToggleAudio,
    onToggleVideo,
    onShareScreen,
    onLeaveCall
}) => {
    return (
        <div className="flex items-center justify-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <Button
                isIconOnly
                color={isAudioOn ? "default" : "danger"}
                variant="flat"
                onPress={onToggleAudio}
                className="w-12 h-12"
            >
                {isAudioOn ? (
                    <MicrophoneIcon className="w-6 h-6" />
                ) : (
                    // <MicrophoneSlashIcon className="w-6 h-6" />
                    'MicrophoneSlashIcon'
                )}
            </Button>

            <Button
                isIconOnly
                color={isVideoOn ? "default" : "danger"}
                variant="flat"
                onPress={onToggleVideo}
                className="w-12 h-12"
            >
                {isVideoOn ? (
                    <VideoCameraIcon className="w-6 h-6" />
                ) : (
                    <VideoCameraSlashIcon className="w-6 h-6" />
                )}
            </Button>

            <Button
                isIconOnly
                color="primary"
                variant="flat"
                onPress={onShareScreen}
                className="w-12 h-12"
            >
                {/* <ShareScreenIcon className="w-6 h-6" /> */}\
                ShareScreenIcon
            </Button>

            <Button
                isIconOnly
                color="danger"
                onPress={onLeaveCall}
                className="w-12 h-12"
            >
                <PhoneIcon className="w-6 h-6" />
            </Button>

            <Button
                isIconOnly
                variant="light"
                className="w-12 h-12"
            >
                <UsersIcon className="w-6 h-6" />
            </Button>

            <Button
                isIconOnly
                variant="light"
                className="w-12 h-12"
            >
                <ChatBubbleLeftRightIcon className="w-6 h-6" />
            </Button>

            <Button
                isIconOnly
                variant="light"
                className="w-12 h-12"
            >
                <EllipsisHorizontalIcon className="w-6 h-6" />
            </Button>
        </div>
    );
};