'use client';

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
import { Check, ChevronsUpDown, ChevronLeft } from 'lucide-react';
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
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { GiftExchange } from '@/app/types/giftExchange';
import LinkCustom from '@/components/LinkCustom/LinkCustom';

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
    group_image: z
      .string()
      .refine((val) => groupImageUrls.includes(val), {
        message: 'Group Theme Image must be selected',
      }),
  })
  .refine((data) => data.exchange_date > data.drawing_date, {
    message: 'Exchange Date must be after the Drawing Date',
    path: ['exchange_date'],
  });

export default function EditGroupPage() {
  const { id } = useParams();
  const router = useRouter();
  const [giftExchangeData, setGiftExchangeData] = useState<GiftExchange | null>(
    null,
  );
  const [budgetPopoverOpen, setBudgetPopoverOpen] = useState(false);
  const [drawingDatePopoverOpen, setDrawingDatePopoverOpen] = useState(false);
  const [exchangeDatePopoverOpen, setExchangeDatePopoverOpen] = useState(false);

  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      drawing_date: undefined,
      exchange_date: undefined,
      budget: '',
      group_image: '',
    },
  });

  useEffect(() => {
    async function fetchGiftExchange() {
      try {
        const response = await fetch(`/api/gift-exchanges/${id}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user?.id !== data.owner_id) {
          router.push(`/gift-exchanges/${data.id}`);
          return;
        }

        setGiftExchangeData(data);

        form.reset({
          name: data.name,
          description: data.description,
          drawing_date: new Date(data.drawing_date),
          exchange_date: new Date(data.exchange_date),
          budget: data.budget,
          group_image: data.group_image,
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchGiftExchange();
  }, [id, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`/api/gift-exchanges/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      router.push(`/gift-exchanges/${data.id}`);
    } catch (error) {
      console.error('Failed to update gift exchange:', error);
    }
  }

  async function deleteGiftExchange() {
    try {
      const updatedGiftExchangeData = {
        ...giftExchangeData,
        status: 'cancelled',
      };

      const response = await fetch(`/api/gift-exchanges/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedGiftExchangeData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      router.push(`/dashboard`);
    } catch (error) {
      console.error('Failed to delete gift exchange:', error);
    }
  }

  const giftDrawingDate = form.watch('drawing_date');

  return (
    <div className="edit-group-page flex justify-center align-center flex-col px-4 md:px-16 lg:px-32 xl:px-52 pt-12">
      <div className="flex flex-row">
        <LinkCustom href="/dashboard">
          <ChevronLeft size={16} strokeWidth={2.25} />
          <span>Back to Dashboard</span>
        </LinkCustom>
      </div>
      <div className="flex items-center justify-center h-full">
        <div className="bg-white w-full xl:w-1/2 mb-5 flex justify-center align-center rounded flex-col ">
          <h2 className="font-bold m-5">Edit Secret Santa Page</h2>
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
                      <ImageSelector {...field} />
                    </FormControl>
                    <FormDescription className="ml-5">
                      Choose one of the images above.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mx-5 mt-5">Price Range</FormLabel>
                    <Popover open={budgetPopoverOpen} onOpenChange={setBudgetPopoverOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-60 justify-between mx-5 mt-5',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? priceRanges.find(
                                  (priceRanges) =>
                                    priceRanges.value === field.value,
                                )?.label
                              : 'Budget Per Person.'}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-50 p-0">
                        <Command>
                          <CommandInput
                            placeholder="Select a price range."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No Price Selected</CommandEmpty>
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
                      When names will be randomly drawn for the gift exchange.
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
              <div className="flex md:justify-start justify-center md:m-5 m-0 w-full">
                <Button className="m-2" type="submit">
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white m-2"
                  onClick={deleteGiftExchange}
                >
                  Delete Group
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
