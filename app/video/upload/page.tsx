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
  Textarea,
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
        Add New Video
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
            action="http://localhost:8000/api/v1/video"
            method="post"
            encType="multipart/form-data"
          >
            <Stack spacing="4">
              <FormControl isRequired>
                <FormLabel size="sm">Video File</FormLabel>

                <Input
                  type="file"
                  bg="white"
                  borderColor="#d8dee4"
                  size="sm"
                  name="videoFile"
                  accept="video/*"
                  borderRadius="6px"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel size="sm">Thumbnail File</FormLabel>

                <Input
                  type="file"
                  bg="white"
                  name="thumbnailFile"
                  borderColor="#d8dee4"
                  size="sm"
                  borderRadius="6px"
                  accept="image/*"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel size="sm">Video Title</FormLabel>

                <Input
                  type="text"
                  bg="white"
                  name="title"
                  borderColor="#d8dee4"
                  size="sm"
                  borderRadius="6px"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel size="sm">Vide Description</FormLabel>

                <Textarea
                  bg="white"
                  name="description"
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
                Upload
              </Button>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
}
