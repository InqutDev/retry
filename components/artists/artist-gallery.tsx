'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ArtistGalleryProps {
  images: string[];
}

export function ArtistGallery({ images }: ArtistGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative aspect-square rounded-lg overflow-hidden cursor-pointer",
              "group hover:shadow-lg transition-shadow"
            )}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt="Portfolio piece"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          {selectedImage && (
            <div className="relative aspect-square">
              <Image
                src={selectedImage}
                alt="Portfolio piece"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}