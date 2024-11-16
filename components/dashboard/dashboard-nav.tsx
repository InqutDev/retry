'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuthStore } from '@/store/auth-store';
import {
  Calendar,
  CreditCard,
  MessageSquare,
  Settings,
  User,
  Users,
  Image,
  BarChart,
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const artistNavItems: NavItem[] = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: BarChart,
  },
  {
    title: 'Bookings',
    href: '/dashboard/bookings',
    icon: Calendar,
  },
  {
    title: 'Portfolio',
    href: '/dashboard/portfolio',
    icon: Image,
  },
  {
    title: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
  },
  {
    title: 'Payments',
    href: '/dashboard/payments',
    icon: CreditCard,
  },
  {
    title: 'Clients',
    href: '/dashboard/clients',
    icon: Users,
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

const clientNavItems: NavItem[] = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: BarChart,
  },
  {
    title: 'My Bookings',
    href: '/dashboard/bookings',
    icon: Calendar,
  },
  {
    title: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
  },
  {
    title: 'Payments',
    href: '/dashboard/payments',
    icon: CreditCard,
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const navItems = user?.role === 'artist' ? artistNavItems : clientNavItems;

  return (
    <nav className="relative border-r bg-card w-72 min-h-screen">
      <ScrollArea className="py-6 pr-6 lg:py-8">
        <div className="pl-6">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-2 mb-1',
                pathname === item.href && 'bg-muted'
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </nav>
  );
}