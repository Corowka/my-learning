"use client";

import React, { useState } from "react";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import useStore from "@/app/store/useStore";
import { useRouter } from "next/navigation";

export const Auth = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const currentUser = useStore((state) => state.currentUser);
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);
  const [username, setUsername] = useState("");
  const router = useRouter();

  return (
    <Flex alignItems="center">
      {isLoggedIn ? (
        <Flex alignItems="center">
          <Text fontSize="xl" mr={4}>
            Hi, {currentUser?.userName}!
          </Text>
          <Button
            colorScheme="teal"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            Log Out
          </Button>
        </Flex>
      ) : (
        <Flex alignItems="center">
          <Input
            width={333}
            type="text"
            placeholder="Имя пользователя"
            mr={4}
            _placeholder={{ color: "#fff" }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            colorScheme="teal"
            onClick={() => {
              login(username);
              setUsername("");
            }}
            width="full"
          >
            Log In
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
