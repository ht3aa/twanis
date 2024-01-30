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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

type AlertType = "error" | "success" | "warning" | "info";

export default function Login() {
  const router = useRouter(); // Add this line
  const searchParams = useSearchParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertType, setAlertType]: [AlertType, any] = useState(
    searchParams.get("alertType") as AlertType,
  );
  const [alertMessage, setAlertMessage] = useState(searchParams.get("alertMessage") as AlertType);
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const handelSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // solution: https://stackoverflow.com/questions/62500804/is-it-possible-to-show-a-404-page-for-not-found-routes-in-nestjs
    const { data } = await axios.post(
      "http://192.168.0.122:8000/api/v1/user/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
        headers: {
          cookie:
            "_ga_NGM0W3DP8X=GS1.1.1699972346.2.0.1699972346.0.0.0; _ga=GA1.1.337570161.1699963064; _ga_PP9LDWEZMD=GS1.1.1699972350.2.0.1699972350.0.0.0",
        },
      },
    );

    console.log(data);

    if (data.statusCode === 404 || data.statusCode === 400) {
      onOpen();
    } else {
      console.log(data);
      // router.push("/"); // Add this line
    }
  };

  useEffect(() => {
    if (searchParams.get("alertType")) {
      onOpen();
    }
  }, []);
  // {
  //   host: 'localhost:8000',
  //   'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
  //   accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  //   'accept-language': 'en-US,en;q=0.5',
  //   'accept-encoding': 'gzip, deflate, br',
  //   'content-type': 'application/x-www-form-urlencoded',
  //   'content-length': '21',
  //   origin: 'http://localhost:3000',
  //   connection: 'keep-alive',
  //   referer: 'http://localhost:3000/',
  //   'upgrade-insecure-requests': '1',
  //   'sec-fetch-dest': 'document',
  //   'sec-fetch-mode': 'navigate',                                                                                           │ ✓ Compiled in 1026ms (3073 modules)
  //   'sec-fetch-site': 'same-site',                                                                                          │ ✓ Compiled in 1179ms (3073 modules)
  //   'sec-fetch-user': '?1'                                                                                                  │ ✓ Compiled in 1212ms (3073 modules)
  // }
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
                  onChange={(e) => setUsername(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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
