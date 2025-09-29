import React from 'react';

interface User {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
  hasStory?: boolean;
  storyColor?: string;
}

interface ActiveUsersProps {
  className?: string;
}

export function ActiveUsers({ className = '' }: ActiveUsersProps) {
  const users: User[] = [
    {
      id: 1,
      name: 'علی احمدی',
      avatar: '👨‍💼',
      isOnline: true,
      hasStory: true,
      storyColor: 'var(--grad-peach)'
    },
    {
      id: 2,
      name: 'فاطمه کریمی',
      avatar: '👩‍💻',
      isOnline: true,
      hasStory: true,
      storyColor: 'var(--grad-turquoise)'
    },
    {
      id: 3,
      name: 'محمد رضایی',
      avatar: '👨‍🎨',
      isOnline: false,
      hasStory: true,
      storyColor: 'var(--grad-mint-soft)'
    },
    {
      id: 4,
      name: 'زهرا نوری',
      avatar: '👩‍🔬',
      isOnline: true,
      hasStory: false
    },
    {
      id: 5,
      name: 'حسین مرادی',
      avatar: '👨‍💻',
      isOnline: true,
      hasStory: true,
      storyColor: 'var(--grad-gentle-sunrise)'
    },
    {
      id: 6,
      name: 'مریم جعفری',
      avatar: '👩‍🎨',
      isOnline: false,
      hasStory: false
    }
  ];

  return (
    null
  );
}