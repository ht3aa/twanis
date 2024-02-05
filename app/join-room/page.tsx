"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Image,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  Divider,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Lib from "../lib";
import { useQuery } from "@tanstack/react-query";

export default function joinRome() {

  const fetchRooms = async () => {
    console.log("fetching rooms")
    const response = await fetch("http://192.168.0.122:8000/api/v1/video/rooms");

    if (!response.ok) {
      throw new Error("Something went wrong. Refresh the page");
    }
   
    return response.json();
  };

  const { isLoading, isError, error, data: rooms, refetch: refetchRooms } = useQuery({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;


  // const deleteVideo = async (id: number) => {
  //   const response = await fetch(`http://192.168.0.122:8000/api/v1/video/${id}`, {
  //     method: "DELETE",
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   refetchRooms();
  // };


  return (
    <div>
      <main>
        <div className="flex flex-wrap m-2">
          {rooms.map((room: any) => (
            <Card key={room.id} mx={2} shadow={"md"} maxW="sm">
              <CardBody>
                <Image
                  src={`http://192.168.0.122:8000/api/v1/video/thumbnail/${room.video.id}`}
                  alt="Thumbnail Image"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">video title: {room.video.title}</Heading>
                  <Text>video description: {room.video.description}</Text>
                  <Text>host name: {room.hostName}</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <ChakraLink as={Link} href={`${room.roomPath}`}>
                    <Button variant="solid" colorScheme="blue">
                      Join Room
                    </Button>
                  </ChakraLink>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
