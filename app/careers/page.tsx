'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Code, Palette, Users, MessageSquare, LineChart, Heart } from 'lucide-react';

const positions = [
  {
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    icon: Code,
  },
  {
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    icon: Palette,
  },
  {
    title: 'Community Manager',
    department: 'Operations',
    location: 'Remote',
    type: 'Full-time',
    icon: Users,
  },
  {
    title: 'Customer Success Specialist',
    department: 'Support',
    location: 'Remote',
    type: 'Full-time',
    icon: MessageSquare,
  },
  {
    title: 'Growth Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    icon: LineChart,
  },
];

const benefits = [
  {
    title: 'Remote-First Culture',
    description: 'Work from anywhere in the world with our distributed team.',
    icon: Users,
  },
  {
    title: 'Competitive Compensation',
    description: 'Salary, equity, and comprehensive benefits package.',
    icon: Heart,
  },
  {
    title: 'Learning & Development',
    description: 'Annual learning stipend and regular skill-sharing sessions.',
    icon: Code,
  },
  {
    title: 'Work-Life Balance',
    description: 'Flexible hours and unlimited PTO policy.',
    icon: LineChart,
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
              Join Our Mission to Transform{' '}
              <span className="text-primary">Tattoo Culture</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Help us build the future of the tattoo industry
            </p>
          </motion.div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Open Positions</h2>
            <p className="text-lg text-muted-foreground">
              Join our team of passionate individuals working to revolutionize the tattoo industry
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {positions.map((position, index) => {
              const Icon = position.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{position.title}</h3>
                      <p className="text-sm text-muted-foreground">{position.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Why Join Inqut?</h2>
            <p className="text-lg text-muted-foreground">
              We offer competitive benefits and a culture that puts people first
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary h-fit">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              Don't See the Right Role?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              We're always looking for talented individuals to join our team. Send us your resume!
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}