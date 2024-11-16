'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DialogWrapper } from '@/components/ui/dialog-wrapper';
import { Button } from '@/components/ui/button';

const searchExamples = [
  "Traditional Japanese sleeve artist in New York",
  "Minimalist fine line tattoo specialist",
  "Color realism portrait expert",
  "Black and grey geometric designs",
  "Watercolor style tattoo artist",
  "Custom script lettering specialist"
];

export function AnimatedSearch() {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const animateText = () => {
      const currentExample = searchExamples[currentIndex];
      
      if (!isDeleting) {
        if (text.length < currentExample.length) {
          setText(currentExample.slice(0, text.length + 1));
          timeout = setTimeout(animateText, 50 + Math.random() * 50);
        } else {
          timeout = setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
          timeout = setTimeout(animateText, 30);
        } else {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % searchExamples.length);
        }
      }
    };

    timeout = setTimeout(animateText, 100);

    return () => clearTimeout(timeout);
  }, [text, currentIndex, isDeleting]);

  const handleSearch = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Button
            variant="ghost"
            className="w-full rounded-full border bg-white px-12 py-4 text-lg text-left shadow-lg dark:bg-gray-950 h-auto font-normal hover:bg-white dark:hover:bg-gray-950"
            onClick={handleSearch}
          >
            {text}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className={cn(
                "inline-block w-[2px] h-5 ml-[2px] align-middle",
                "bg-primary"
              )}
            />
          </Button>
        </div>
      </motion.div>

      <DialogWrapper
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Search Artists"
        description="Find the perfect artist for your next tattoo"
      >
        <div className="grid gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search artists, styles, or locations..."
              className="w-full rounded-md border pl-9 py-2"
              defaultValue={text}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Popular Searches</h3>
            <div className="grid gap-2">
              {searchExamples.map((example, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setText(example);
                    setIsDialogOpen(false);
                  }}
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogWrapper>
    </div>
  );
}