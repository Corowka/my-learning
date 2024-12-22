"use-client";

import AddTaskForm from "@/components/add-task-form/add-task-form";
import { Container, Heading } from "@chakra-ui/react";

export default function AddTask() {
  return (
    <main className="main">
      <Container maxW="container.md" py={6}>
        <Heading as="h1" mb={4}>
          Add New Task{" "}
        </Heading>
        <AddTaskForm />
      </Container>
    </main>
  );
}
