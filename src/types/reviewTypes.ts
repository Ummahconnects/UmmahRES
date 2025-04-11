
// Type definitions for reviews
export interface ReviewData {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string;
  users?: {
    email?: string;
  };
}

export interface ReviewItemProps {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: Date;
  helpful?: number;
  verified?: boolean;
  userId?: string;
  className?: string;
}

export interface SubmitReviewData {
  rating: number;
  comment: string;
}

// Mock data for testing or when no entityId is provided
export const mockReviews: ReviewItemProps[] = [
  {
    id: "1",
    author: "Ahmad S.",
    rating: 5,
    comment: "Excellent service, very professional and accommodating to my needs. Would highly recommend to others in the community.",
    date: new Date(2023, 10, 15),
    helpful: 12,
    verified: true,
    userId: "mock1"
  },
  {
    id: "2",
    author: "Fatima K.",
    rating: 4.5,
    comment: "Great place with friendly staff. The service was prompt and they were very respectful.",
    date: new Date(2023, 11, 3),
    helpful: 8,
    verified: true,
    userId: "mock2"
  },
  {
    id: "3",
    author: "Omar J.",
    rating: 3.5,
    comment: "Decent service but could improve on timeliness. They were professional though.",
    date: new Date(2023, 11, 20),
    helpful: 4,
    verified: false,
    userId: "mock3"
  },
  {
    id: "4",
    author: "Aisha M.",
    rating: 5,
    comment: "MashaAllah, very impressed with the quality and attention to detail. They went above and beyond.",
    date: new Date(2024, 0, 5),
    helpful: 15,
    verified: true,
    userId: "mock4"
  },
  {
    id: "5",
    author: "Yusuf R.",
    rating: 4,
    comment: "Good service overall. Pricing was fair and they were honest about the work needed.",
    date: new Date(2024, 1, 12),
    helpful: 6,
    verified: true,
    userId: "mock5"
  }
];
