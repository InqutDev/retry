'use client';

import { motion } from 'framer-motion';
import { Star, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
}

// This would come from your API
const reviews: Review[] = [
  {
    id: 1,
    author: 'Alex Thompson',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    rating: 5,
    date: '2024-03-15',
    content: 'Sarah is an incredible artist! She took my simple idea and transformed it into something beautiful. Her attention to detail and steady hand produced a tattoo that exceeded my expectations.',
    helpful: 24,
  },
  {
    id: 2,
    author: 'Maria Rodriguez',
    avatar: 'https://i.pravatar.cc/150?u=maria',
    rating: 5,
    date: '2024-03-10',
    content: 'Amazing experience from start to finish. Sarah made me feel comfortable throughout the entire process. The final result is exactly what I wanted.',
    helpful: 18,
  },
  {
    id: 3,
    author: 'James Wilson',
    avatar: 'https://i.pravatar.cc/150?u=james',
    rating: 4,
    date: '2024-03-05',
    content: 'Great artist with a keen eye for detail. The studio was clean and professional. Would definitely recommend!',
    helpful: 12,
  },
];

interface ArtistReviewsProps {
  artistId: number;
}

export function ArtistReviews({ artistId }: ArtistReviewsProps) {
  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card rounded-lg border p-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={review.avatar} alt={review.author} />
                <AvatarFallback>{review.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{review.author}</h3>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(review.date)}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-primary text-primary'
                          : 'fill-muted text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">{review.content}</p>
          <div className="mt-4 flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Helpful ({review.helpful})
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}