"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form/form";
import { Input } from "@/components/Input/input";
import { Button } from "@/components/Button/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/Calendar/calendar";
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Group name must be at least 2 characters long",
  }),
  groupName: z.string().min(2, {
    message: "Group name must be at least 2 characters long",
  }),
  groupDescription: z.string().min(2, {
    message: "Group name must be at least 2 characters long",
  }),
  groupBudget: z.number().min(0, {
    message: "Budget must be a positive number",
  }),
  giftDrawingDate: z.date(),
  giftExchangeDate: z.date(),
});
export default function CreateGroupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="bg-white">
      <h2>Edit Secret Santa Page</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="groupName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Name</FormLabel>
                <FormControl>
                  <Input placeholder="Secret Santa" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name of your group.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="groupDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Description</FormLabel>
                <FormControl>
                  <Input placeholder="Secret Santa" {...field} />
                </FormControl>
                <FormDescription>
                  This is the description of your group.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
