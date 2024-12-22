"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "@/utils/types";
import useStore from "@/app/store/useStore";
import { useRouter } from "next/navigation";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

type TaskFormData = z.infer<typeof taskSchema>;

const AddTaskForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });
  const addTask = useStore((state) => state.addTask);
  const router = useRouter();

  const onSubmit: SubmitHandler<TaskFormData> = (data) => {
    const newTask: Task = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
    };
    addTask(newTask);
    reset({
      title: "",
      description: "",
    });
    router.push("/");
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      p={5}
      shadow="md"
      borderWidth="1px"
    >
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input id="title" {...register("title")} />
          {errors.title && <Text color="red.500">{errors.title.message}</Text>}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input id="description" {...register("description")} />
          {errors.description && (
            <Text color="red.500">{errors.description.message}</Text>
          )}
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Add Task
        </Button>
      </VStack>
    </Box>
  );
};

export default AddTaskForm;
