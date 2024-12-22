import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <Flex
      as="footer"
      justifyContent="center"
      alignItems="center"
      p={4}
      bg="gray.800"
      color="white"
      mt={8}
    >
      <Box>
        <Text fontSize="sm">© 2024 Task Manager. All rights reserved.</Text>
      </Box>
    </Flex>
  );
};
