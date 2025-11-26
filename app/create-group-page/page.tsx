'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form/form';
import { Check, ChevronsUpDown, ChevronLeft, X } from 'lucide-react';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/Calendar/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/Popover/popover';
import { addDays, format } from 'date-fns';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/Command/Command';
import { Textarea } from '@/components/TextArea/textarea';
import {
  GROUP_IMAGES,
  ImageSelector,
} from '@/components/ImageSelector/ImageSelector';
import { useRouter } from 'next/navigation';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import Link from 'next/link';

const priceRanges = [
  { label: '$10 - $20', value: '10-20' },
  { label: '$20 - $30', value: '20-30' },
  { label: '$30 - $40', value: '30-40' },
  { label: '$40 - $50', value: '40-50' },
  { label: '$50 - $60', value: '50-60' },
  { label: '$60 - $70', value: '60-70' },
  { label: '$70 - $80', value: '70-80' },
  { label: '$80 - $90', value: '80-90' },
  { label: '$90 - $100', value: '90-100' },
] as const;

const groupImageUrls = GROUP_IMAGES.map((image) => image.src);

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Group name must be at least 2 characters long',
    }),
    description: z.string().min(2, {
      message: 'Group name must be at least 2 characters long',
    }),
    drawing_date: z.date(),
    exchange_date: z.date(),
    budget: z.string({
      required_error: 'Please select a Price Range.',
    }),
    group_image: z.string().refine((val) => groupImageUrls.includes(val), {
      message: 'Group Theme Image must be selected',
    }),
  })
  .refine((data) => data.exchange_date > data.drawing_date, {
    message: 'Exchange Date must be after the Drawing Date',
    path: ['exchange_date'],
  });

export default function CreateGroupPage() {
  const router = useRouter();
  const [budgetPopoverOpen, setBudgetPopoverOpen] = useState(false);
  const [drawingDatePopoverOpen, setDrawingDatePopoverOpen] = useState(false);
  const [exchangeDatePopoverOpen, setExchangeDatePopoverOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      drawing_date: undefined,
      exchange_date: undefined,
      budget: '',
      group_image: GROUP_IMAGES[0].src,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const response = await fetch('/api/gift-exchanges', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      router.push(`/gift-exchanges/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  const giftDrawingDate = form.watch('drawing_date');

  return (
    <div className="create-group-page flex justify-center align-center flex-col px-4 md:px-16 lg:px-32 xl:px-52 pt-12">
      <div className="flex flex-row">
        <LinkCustom href="/dashboard">
          <ChevronLeft size={16} strokeWidth={2.25} />
          Back to Dashboard
        </LinkCustom>
      </div>
      <div className="flex items-center justify-center h-full">
        <div className="bg-white w-full xl:w-1/2 mb-5 flex justify-center align-center rounded flex-col ">
          <div className="flex justify-end m-1.5">
            <Button variant="ghost" asChild data-testid="x-button">
              <Link href="/dashboard">
                <X className="text-black" />
              </Link>
            </Button>
          </div>
          <h2 className="font-bold mx-5 mb-5">Create Secret Santa Page</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="m-5">Group Name</FormLabel>
                    <FormControl>
                      <Input
                        className="m-5 w-4/5"
                        placeholder="Secret Santa"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="m-5">Group Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="m-5 w-4/5"
                        placeholder="Secret Santa"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="group_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="m-5">Group Theme Image</FormLabel>
                    <FormControl>
                      <ImageSelector
                        {...field}
                        onChange={(image) => field.onChange(image)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="m-5">Price Range</FormLabel>
                    <Popover open={budgetPopoverOpen} onOpenChange={setBudgetPopoverOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-60 justify-between m-5',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? priceRanges.find(
                                  (priceRanges) =>
                                    priceRanges.value === field.value,
                                )?.label
                              : 'Select a price range'}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-52 p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search Price Ranges..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {priceRanges.map((priceRanges) => (
                                <CommandItem
                                  value={priceRanges.label}
                                  key={priceRanges.value}
                                  onSelect={() => {
                                    form.setValue('budget', priceRanges.value);
                                    setBudgetPopoverOpen(false);
                                  }}
                                >
                                  {priceRanges.label}
                                  <Check
                                    className={cn(
                                      'ml-auto',
                                      priceRanges.value === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription className="m-5">
                      Please select the price range for your Secret Santa group!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="drawing_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mx-5 mt-5">
                      Gift Drawing Date
                    </FormLabel>
                    <Popover open={drawingDatePopoverOpen} onOpenChange={setDrawingDatePopoverOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-60 pl-3 text-left font-normal m-5',
                              !field.value && 'text-muted-foreground ',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setDrawingDatePopoverOpen(false);
                          }}
                          disabled={[{ before: new Date() }]} 
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className="ml-5">
                      When names will be drawn for the gift exchange.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="exchange_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mx-5 mt-5">
                      Gift Exchange Date
                    </FormLabel>
                    <Popover open={exchangeDatePopoverOpen} onOpenChange={setExchangeDatePopoverOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-60 pl-3 text-left font-normal m-5',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setExchangeDatePopoverOpen(false);
                          }}
                          disabled={[{ before: addDays(new Date(giftDrawingDate), 1) }]}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className="ml-5">
                      When the gift exchange will take place.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 justify-center md:justify-end p-3">
                <Button variant="secondary" className="bg-slate-300" asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
                <Button type="submit">Create Group</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
