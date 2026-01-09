export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified?: boolean;
  bio?: string;
  following: number;
  followers: number;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  images?: string[];
  createdAt: string;
  likes: number;
  reposts: number;
  commentsCount: number;
  comments: Comment[];
  isLiked?: boolean;
}

export enum TabType {
  FOLLOWING = 'following',
  HOT = 'hot',
  NEARBY = 'nearby'
}

export interface HotTopic {
  id: number;
  title: string;
  volume: number;
  tag?: 'new' | 'hot' | '爆';
}