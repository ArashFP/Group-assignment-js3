'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  eventName: z.string().min(2).max(50),
  eventPrice: z.coerce.number().min(1),
  eventDescription: z.string().min(1),
  eventLocation: z.string().min(1),
  eventDate: z.coerce.date(),
  eventQuantity: z.coerce.number().min(1),
});

export const CreateEventForm = () => {
  const router = useRouter();
  const fileInputRef = useRef();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      location: "",
      date: "",
      quantity: "",
    },
  });

  // submit handler
  async function onSubmit(values) {
    const file = fileInputRef.current.files[0];
    if (!file) {
      toast.error("Please upload an event image.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "events"), values);
      const imageRef = ref(storage, `events/${docRef.id}/${file.name}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "events", docRef.id), {
        imageURL: downloadURL,
      });
      toast.success("Event created successfully!");
      router.push("/admin/controll");
    } catch (error) {
      toast.error("Failed to create event. Please try again.");
      console.error("Error creating event: ", error);
    }
  }

  return (
    <>
      <div className="mb-7 m-7 p-10">
        <Label>Upload event image</Label>
        <Input type="file" className="w-60" ref={fileInputRef} accept="image/*" />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 m-7 p-10">
          <FormField
            control={form.control}
            name="eventName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>The name of the event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Price of the event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Description of the event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Location of the event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input {...field} type="datetime-local" />
                </FormControl>
                <FormDescription>Date of the event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Quantity of the event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </>
  );
};
