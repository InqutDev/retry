'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface BookingCalendarProps {
  artistId: number;
}

const timeSlots = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

export function BookingCalendar({ artistId }: BookingCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const { toast } = useToast();

  const handleBooking = () => {
    if (!date || !selectedTime) {
      toast({
        title: 'Please select a date and time',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Consultation requested!',
      description: `We'll contact you to confirm your ${selectedTime} appointment.`,
    });
  };

  return (
    <Card className="p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-4">Select Date</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div>
          <h3 className="font-semibold mb-4">Select Time</h3>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a time slot" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-6">
            <Button
              className="w-full"
              size="lg"
              onClick={handleBooking}
              disabled={!date || !selectedTime}
            >
              Request Consultation
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Free consultation. No payment required at this stage.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}