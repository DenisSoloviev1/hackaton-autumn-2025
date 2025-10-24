export interface User {
    id: string;
    name: string;
    avatar?: string;
    isSpeaking?: boolean;
    isVideoOn?: boolean;
    isAudioOn?: boolean;
    role?: 'moderator' | 'participant';
}

export const mockUsers: User[] = [
    {
        id: '1',
        name: 'Анна Смирнова',
        avatar: '👩',
        isSpeaking: true,
        isVideoOn: true,
        isAudioOn: true,
        role: 'moderator'
    },
    {
        id: '2',
        name: 'Дмитрий Козлов',
        avatar: '👨',
        isSpeaking: false,
        isVideoOn: true,
        isAudioOn: true,
        role: 'participant'
    },
    {
        id: '3',
        name: 'Мария Петрова',
        avatar: '👩',
        isSpeaking: false,
        isVideoOn: true,
        isAudioOn: false,
        role: 'participant'
    },
    {
        id: '4',
        name: 'Алексей Новиков',
        avatar: '👨',
        isSpeaking: true,
        isVideoOn: false,
        isAudioOn: true,
        role: 'participant'
    },
    {
        id: '5',
        name: 'Елена Иванова',
        avatar: '👩',
        isSpeaking: false,
        isVideoOn: true,
        isAudioOn: true,
        role: 'participant'
    },
    {
        id: '6',
        name: 'Сергей Волков',
        avatar: '👨',
        isSpeaking: false,
        isVideoOn: true,
        isAudioOn: true,
        role: 'participant'
    },
    {
        id: '7',
        name: 'Ольга Ковалева',
        avatar: '👩',
        isSpeaking: false,
        isVideoOn: false,
        isAudioOn: true,
        role: 'participant'
    },
    {
        id: '8',
        name: 'Иван Соколов',
        avatar: '👨',
        isSpeaking: false,
        isVideoOn: true,
        isAudioOn: false,
        role: 'participant'
    }
];