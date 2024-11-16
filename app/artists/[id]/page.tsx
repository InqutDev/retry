'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Star, Clock, Instagram, Mail } from 'lucide-react';
import { ArtistGallery } from '@/components/artists/artist-gallery';
import { ArtistReviews } from '@/components/artists/artist-reviews';
import { BookingCalendar } from '@/components/artists/booking-calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// This would come from your database
const artistData = {
  id: 1,
  name: 'Sarah Chen',
  avatar: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=800&q=80',
  coverImage: 'https://images.unsplash.com/photo-1590246814883-57c511e9e6b6?auto=format&fit=crop&w=2000&q=80',
  location: 'New York, NY',
  rating: 4.9,
  reviews: 127,
  bio: 'Specializing in fine line and minimalist designs with over 8 years of experience. Every piece is custom-designed to tell your unique story.',
  styles: ['Fine Line', 'Minimalist', 'Geometric', 'Custom Script'],
  experience: '8 years',
  instagram: '@sarahchen.ink',
  email: 'sarah@inqut.com',
  portfolio: [
    'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590246814883-57c511e9e6b6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598211686290-a8ef209d87c5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598211686754-89f5e7b12ec8?auto=format&fit=crop&w=800&q=80',
  ],
};

export default function ArtistProfilePage() {
  const [activeTab, setActiveTab] = useState('portfolio');

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={artistData.coverImage}
          alt="Cover"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Artist Info */}
      <div className="container px-4 md:px-6 -mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Left Column */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-lg border p-6">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={artistData.avatar}
                  alt={artistData.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold text-center mb-2">{artistData.name}</h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium">{artistData.rating}</span>
                <span className="text-muted-foreground">
                  ({artistData.reviews} reviews)
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{artistData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{artistData.experience} experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-muted-foreground" />
                  <span>{artistData.instagram}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{artistData.email}</span>
                </div>
              </div>
              <div className="mt-6">
                <Button className="w-full" size="lg">
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2">
            <div className="bg-card rounded-lg border p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-muted-foreground mb-4">{artistData.bio}</p>
              <div className="flex flex-wrap gap-2">
                {artistData.styles.map((style) => (
                  <Badge key={style} variant="secondary">
                    {style}
                  </Badge>
                ))}
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="booking">Book Now</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="portfolio">
                <ArtistGallery images={artistData.portfolio} />
              </TabsContent>
              <TabsContent value="booking">
                <BookingCalendar artistId={artistData.id} />
              </TabsContent>
              <TabsContent value="reviews">
                <ArtistReviews artistId={artistData.id} />
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
}