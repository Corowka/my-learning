"use client";

import Link from "next/link";
import { Flex, Box, Button, HStack } from "@chakra-ui/react";
import styles from "./header.module.css";
import { Auth } from "../auth/auth";
import useStore from "@/app/store/useStore";

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  return (
    <Flex
      as="header"
      className={styles.header}
      justifyContent="space-between"
      p={4}
      bg="teal.500"
      color="white"
    >
      <HStack spacing={4}>
        <Box as="h1" fontSize="xl" mr={10}>
          Task Manager
        </Box>
        {isLoggedIn && (
          <>
            <Link href="/">
              <Button colorScheme="teal" size="sm">
                Tasks
              </Button>
            </Link>
            <Link href="/add-task">
              <Button colorScheme="teal" size="sm">
                Add Task
              </Button>
            </Link>
          </>
        )}
      </HStack>
      <Auth />
    </Flex>
  );
};
