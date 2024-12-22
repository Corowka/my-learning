import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";

export const PleaseLogin = () => {
  return (
    <Box
      mt={100}
      p={6}
      maxWidth="400px"
      mx="auto"
      boxShadow="md"
      borderRadius="md"
      bg="gray.100"
      textAlign="center"
    >
      <Text fontSize="xl" fontWeight="bold">
        To get started, please Log In
      </Text>
    </Box>
  );
};
