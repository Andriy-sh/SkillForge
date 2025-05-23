"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { upsertCourseWithResources } from "@/lib/actions/courses/upsertCourses";
import { ResourceInterface } from "@/types/resourses";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseLevel } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const courseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  level: z.nativeEnum(CourseLevel),
  duration: z.number().min(1, "Duration is required"),
  image: z.string().min(0, "Image URL is required"),
  instructorId: z.string().min(0, "Instructor is required"),
  price: z.number().min(0, "Price must be positive"),
  resources: z.string().array().optional(),
});

type CourseSchema = z.infer<typeof courseSchema>;

export default function CourseForm({
  resourses,
}: {
  resourses: ResourceInterface[];
}) {
  const form = useForm<CourseSchema>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      description: "",
      level: "BEGINNER",
      duration: 0,
      image: "",
      instructorId: "",
      price: 0,
      resources: [],
    },
  });

  const handleSubmit = async (data: CourseSchema) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("level", data.level);
      formData.append("duration", data.duration.toString());
      formData.append("image", data.image);
      formData.append("instructorId", data.instructorId);
      formData.append("price", data.price.toString());

      if (data.resources) {
        data.resources.forEach((resourceId) => {
          formData.append("resources", resourceId);
        });
      }

      await upsertCourseWithResources(formData);
      console.log("Course submitted successfully:", data);
    } catch (error) {
      console.error("Failed to submit course:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Adding Course</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(CourseLevel).map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (hours)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructor ID</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resources"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resources</FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => field.onChange([value])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a resource" />
                    </SelectTrigger>
                    <SelectContent>
                      {resourses.map((resource) => (
                        <SelectItem key={resource.id} value={resource.id}>
                          {resource.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>
      </Form>
    </div>
  );
}
