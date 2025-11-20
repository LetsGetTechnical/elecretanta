import { clsx, type ClassValue } from 'clsx';
import { redirect } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { createClient } from '@/lib/supabase/client';
import { ToastVariants } from '@/components/Toast/Toast.enum';
import { GiftExchangeWithMemberCount } from '@/app/types/giftExchange';
import {
  IToastFunction,
  IProcessExchangeForToastProps,
} from './interfaces/Iutils';
import { BackendError } from './errors/CustomErrors';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateGroupExchangeDates = (
  drawingDate: Date,
  exchangeDate: Date,
): null => {
  if (drawingDate >= exchangeDate) {
    throw new BackendError('Drawing date must be before exchange date', 400);
  }
  return null;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const signInWithGoogle = async (options?: { redirectPath?: string }) => {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: options?.redirectPath
          ? `${window.location.origin}/auth/callback?redirect_to=${options.redirectPath}`
          : `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Error signing in with Google:', error);
      redirect('/auth/error');
    }
  } catch (error) {
    console.error('Unexpected error signing in with Google:', error);
    redirect('/auth/error');
  }
};

export const processExchangeForToast = ({
  exchange,
  toast,
}: IProcessExchangeForToastProps) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const drawingDateStart = new Date(exchange.drawing_date);
  drawingDateStart.setHours(0, 0, 0, 0);

  const timeDifference = drawingDateStart.getTime() - todayStart.getTime();

  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  if (dayDifference > 0 && dayDifference <= 3) {
    toast({
      variant: ToastVariants.Warning,
      title: `Upcoming Draw - ${exchange.name}`,
      description: `The draw is in ${dayDifference} day(s)!`,
      group: exchange.gift_exchange_id,
    });
  } else if (dayDifference === 0) {
    toast({
      variant: ToastVariants.Success,
      title: `Draw Today - ${exchange.name}`,
      description: `Go to your group to initiate the gift exchange draw.`,
      group: exchange.gift_exchange_id,
    });
  } else if (dayDifference < 0) {
    toast({
      variant: ToastVariants.Error,
      title: `Draw date has passed - ${exchange.name}`,
      description:
        'Your Secret Santas are still secret! Please draw now or reschedule drawing date.',
      group: exchange.gift_exchange_id,
    });
  }
};

export const notifyAboutExchanges = (
  data: GiftExchangeWithMemberCount[],
  toast: IToastFunction,
) => {
  for (const exchange of data) {
    processExchangeForToast({ exchange, toast });
  }
};
