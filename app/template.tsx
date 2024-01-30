"use client";

import { ReactNode, useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
  Stack,
  StackDivider,
  Box,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";

export default function Template({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <div>
      <Button
        pos="fixed"
        leftIcon={<HamburgerIcon />}
        right={10}
        bottom={10}
        zIndex={900}
        boxShadow="dark-lg"
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
      >
        Menu
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Stack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
              <Box>
                <ChakraLink as={Link} href="/">
                  Home
                </ChakraLink>
              </Box>
              <Box>
                <ChakraLink as={Link} href="/video/upload">
                  Upload a Video
                </ChakraLink>
              </Box>
              <Box>
                <ChakraLink as={Link} href="/user/register">
                  Register
                </ChakraLink>
              </Box>
              <Box>
                <ChakraLink as={Link} href="/user/login">
                  Login
                </ChakraLink>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {children}
    </div>
  );
}
