"use client";

import { AlertType } from "@/app/lib/types";
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Login() {
  const searchParams = useSearchParams();
  const [alertType, setAlertType]: [AlertType, any] = useState(
    searchParams.get("alertType") as AlertType,
  );
  const [alertMessage, setAlertMessage] = useState(searchParams.get("alertMessage") as AlertType);
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });


  useEffect(() => {
    if (searchParams.get("alertType")) {
      onOpen();
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <Heading size="lg" mb="4">
        Login
      </Heading>
      <Card
        bg="#f6f8fa"
        variant="outline"
        borderColor="#d8dee4"
        w="508px"
        size="lg"
        borderRadius={8}
        boxShadow="lg"
      >
        <CardBody>
          {isVisible ? (
            <Alert status={alertType} justifyContent="space-between">
              <Box display="flex" alignItems="center">
              <AlertIcon />
                <AlertTitle>
                  {alertType === "error"
                    ? "Error"
                    : alertType === "warning"
                    ? "Warning"
                    : alertType === "info"
                    ? "Info"
                    : "Success"}
                </AlertTitle>
                <AlertDescription>{alertMessage}</AlertDescription>
              </Box>
              <CloseButton
                alignSelf="flex-start"
                justifySelf="flex-end"
                position="relative"
                right={-15}
                top={-1}
                onClick={onClose}
              />
            </Alert>
          ) : (
            ""
          )}
          <form
            action="http://localhost:8000/api/v1/user/login"
            method="post"
            // onSubmit={handelSumbit}
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
                Login
              </Button>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
}
