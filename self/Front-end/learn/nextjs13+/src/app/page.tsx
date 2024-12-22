"use client";

import { Container, SimpleGrid, Text } from "@chakra-ui/react";
import { TaskItem } from "@/components/task-item/task-item";
import useStore from "./store/useStore";
import { PleaseLogin } from "@/components/please-auth/please-lofig";
export default function Tasks() {
  const tasks = useStore((state) => state.currentUser?.tasks);
  const removeTask = useStore((state) => state.removeTask);
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  return (
    <main className="main">
      {isLoggedIn ? (
        tasks?.length ? (
          <Container maxW="container.md" py={6}>
            <SimpleGrid columns={[1, null, 2]} spacing={6}>
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} removeTask={removeTask} />
              ))}
            </SimpleGrid>
          </Container>
        ) : (
          <Container
            maxW="container.md"
            py={6}
            display="flex"
            justifyContent="center"
          >
            <Text fontSize="xl" mt={100}>
              No active Tasks
            </Text>
          </Container>
        )
      ) : (
        <PleaseLogin />
      )}
    </main>
  );
}
