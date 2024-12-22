"use client";

import React from "react";
import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";
import { Task } from "@/utils/types";

interface TaskItemProps {
  task: Task;
  removeTask: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, removeTask }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      bg="white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <div>
        <Heading as="h3" size="md" mb={2}>
          {task.title}
        </Heading>
        <Text mb={4}>{task.description}</Text>
      </div>
      <Flex justifyContent="space-between">
        <Button size="sm" colorScheme="red" onClick={() => removeTask(task.id)}>
          Delete
        </Button>
      </Flex>
    </Box>
  );
};
