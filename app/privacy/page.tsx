'use client';

import { motion } from 'framer-motion';
import { PrivacySection } from '@/components/privacy/privacy-section';
import { privacyContent } from '@/components/privacy/privacy-content';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold tracking-tighter mb-8">Privacy Policy</h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>

            {privacyContent.map((section, index) => (
              <PrivacySection
                key={index}
                title={section.title}
                content={section.content}
                listItems={section.listItems}
              />
            ))}

            <section className="mt-12 border-t pt-8">
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>Email: privacy@inqut.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Tattoo Street, Art District, NY 10001</li>
              </ul>
            </section>
          </motion.div>
        </div>
      </section>
    </div>
  );
}