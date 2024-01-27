"use client";

import {
  Input,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  Stack,
  Button,
  Box,
  Heading,
} from "@chakra-ui/react";

export default function VideoUpload() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <Heading size="lg" mb="4">
        Register
      </Heading>
      <Card
        bg="#f6f8fa"
        variant="outline"
        borderColor="#d8dee4"
        w="308px"
        size="lg"
        borderRadius={8}
        boxShadow="lg"
      >
        <CardBody>
          <form
            action="http://localhost:8000/api/v1/user"
            method="post"
          >
            <Stack spacing="4">
              <FormControl isRequired>
                <FormLabel size="sm">username</FormLabel>

                <Input
                  type="text"
                  bg="white"
                  borderColor="#d8dee4"
                  size="sm"
                  name="username"
                  accept="video/*"
                  borderRadius="6px"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel size="sm">Email</FormLabel>

                <Input
                  type="email"
                  bg="white"
                  name="email"
                  borderColor="#d8dee4"
                  size="sm"
                  borderRadius="6px"
                  accept="image/*"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel size="sm">password</FormLabel>

                <Input
                  type="password"
                  bg="white"
                  name="password"
                  borderColor="#d8dee4"
                  size="sm"
                  borderRadius="6px"
                />
              </FormControl>

              <Button
                type="submit"
                bg="#2da44e"
                color="white"
                size="sm"
                _hover={{ bg: "#2c974b" }}
                _active={{ bg: "#298e46" }}
              >
                Register
              </Button>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
}
