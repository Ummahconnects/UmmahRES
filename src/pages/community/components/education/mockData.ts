
import { Article, Video, LearningPath } from "./types";

// Mock data for articles
export const MOCK_ARTICLES: Article[] = [
  {
    id: "a1",
    title: "Understanding the Five Pillars of Islam",
    description: "An introduction to the fundamental practices of Islam for beginners.",
    author: "Sheikh Abdullah",
    readTime: "12 min read",
    level: "Beginner",
    tags: ["Basics", "Pillars of Islam"],
    savedOffline: false
  },
  {
    id: "a2",
    title: "The History of Ramadan",
    description: "Explore the origins and significance of the holy month of Ramadan.",
    author: "Dr. Aisha Rahman",
    readTime: "15 min read",
    level: "Intermediate",
    tags: ["Ramadan", "History"],
    savedOffline: true
  },
  {
    id: "a3",
    title: "Prayer Positions Explained",
    description: "A detailed guide to the positions and movements during Islamic prayer.",
    author: "Imam Yusuf",
    readTime: "10 min read",
    level: "Beginner",
    tags: ["Prayer", "Practical Guide"],
    savedOffline: false
  }
];

// Mock data for videos
export const MOCK_VIDEOS: Video[] = [
  {
    id: "v1",
    title: "Tajweed Rules for Beginners",
    description: "Learn the basic rules of Quranic recitation with proper pronunciation.",
    author: "Qari Muhammad",
    duration: "24 min",
    level: "Beginner",
    tags: ["Quran", "Tajweed"],
    savedOffline: false
  },
  {
    id: "v2",
    title: "The Life of Prophet Muhammad (PBUH)",
    description: "A biographical series about the life and teachings of the Prophet.",
    author: "Islamic History Channel",
    duration: "45 min",
    level: "All Levels",
    tags: ["Prophet Muhammad", "Biography"],
    savedOffline: false
  },
  {
    id: "v3",
    title: "Understanding Hadith Sciences",
    description: "An academic approach to the study and authentication of Hadith.",
    author: "Dr. Hamza Yusuf",
    duration: "60 min",
    level: "Advanced",
    tags: ["Hadith", "Islamic Studies"],
    savedOffline: true
  }
];

// Mock data for learning paths
export const MOCK_LEARNING_PATHS: LearningPath[] = [
  {
    id: "lp1",
    title: "New Muslim Essentials",
    description: "Core knowledge for those new to Islam",
    progress: 45,
    totalModules: 12,
    completedModules: 5
  },
  {
    id: "lp2",
    title: "Quran Recitation Mastery",
    description: "From basic pronunciation to fluent recitation",
    progress: 30,
    totalModules: 20,
    completedModules: 6
  }
];
