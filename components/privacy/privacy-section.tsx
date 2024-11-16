'use client';

import { motion } from 'framer-motion';

interface PrivacySectionProps {
  title: string;
  content: string;
  listItems?: string[];
}

export function PrivacySection({ title, content, listItems }: PrivacySectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="text-muted-foreground mb-4">{content}</p>
      {listItems && listItems.length > 0 && (
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          {listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </motion.section>
  );
}