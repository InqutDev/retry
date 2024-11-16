'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold tracking-tighter mb-8">Terms of Service</h1>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                <p className="text-muted-foreground mb-4">
                  By accessing or using Inqut's platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
                <p className="text-muted-foreground mb-4">
                  Permission is granted to temporarily access the materials (information or software) on Inqut's platform for personal, non-commercial viewing only. This is the grant of a license, not a transfer of title.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose</li>
                  <li>attempt to decompile or reverse engineer any software contained on the platform</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                  <li>transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Artist Services</h2>
                <p className="text-muted-foreground mb-4">
                  Artists using our platform agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Provide accurate information about their services and availability</li>
                  <li>Maintain professional standards in client interactions</li>
                  <li>Comply with local health and safety regulations</li>
                  <li>Honor appointments and booking commitments</li>
                  <li>Maintain appropriate licensing and insurance</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Client Responsibilities</h2>
                <p className="text-muted-foreground mb-4">
                  Clients using our platform agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Provide accurate information when booking appointments</li>
                  <li>Follow artist guidelines and aftercare instructions</li>
                  <li>Honor appointments and cancellation policies</li>
                  <li>Make payments as agreed upon with artists</li>
                  <li>Respect artist intellectual property rights</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Disclaimer</h2>
                <p className="text-muted-foreground mb-4">
                  The materials on Inqut's platform are provided on an 'as is' basis. Inqut makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Limitations</h2>
                <p className="text-muted-foreground mb-4">
                  In no event shall Inqut or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Inqut's platform, even if Inqut or an authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Revisions and Errata</h2>
                <p className="text-muted-foreground mb-4">
                  The materials appearing on Inqut's platform could include technical, typographical, or photographic errors. Inqut does not warrant that any of the materials on its platform are accurate, complete, or current. Inqut may make changes to the materials contained on its platform at any time without notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <ul className="list-none pl-6 space-y-2 text-muted-foreground mt-4">
                  <li>Email: legal@inqut.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Address: 123 Tattoo Street, Art District, NY 10001</li>
                </ul>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}