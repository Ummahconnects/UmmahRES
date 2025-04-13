
export interface Article {
  id: string;
  title: string;
  description: string;
  author: string;
  readTime: string;
  level: string;
  tags: string[];
  savedOffline: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  author: string;
  duration: string;
  level: string;
  tags: string[];
  savedOffline: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalModules: number;
  completedModules: number;
}
