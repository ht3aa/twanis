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
import Lib from "./lib";
import { useQuery } from "@tanstack/react-query";

export default function Home() {


  const fetchVideos = async () => {
    const response = await fetch("http://192.168.0.122:8000/api/v1/video");

    if (!response.ok) {
      throw new Error("Something went wrong. Refresh the page");
    }
   
    return response.json();
  };

  const { isLoading, isError, error, data: videos, refetch: refetchVideos } = useQuery({
    queryKey: ["videos"],
    queryFn: fetchVideos,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;


  console.log(videos)


  const deleteVideo = async (id: number) => {
    const response = await fetch(`http://192.168.0.122:8000/api/v1/video/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    refetchVideos();
  };


  return (
    <div>
      <main>
        <div className="flex flex-wrap m-2">
          {videos.map((video: any) => (
            <Card key={video.id} mx={2} shadow={"md"} maxW="sm">
              <CardBody>
                <Image
                  src={`http://192.168.0.122:8000/api/v1/video/thumbnail/${video.id}`}
                  alt="Thumbnail Image"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{video.title}</Heading>
                  <Text>{video.description}</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <ChakraLink as={Link} href={`/video/room/${Lib.generateRoomId()}/${video.id}`}>
                    <Button variant="solid" colorScheme="blue">
                      Make Room
                    </Button>
                  </ChakraLink>
                  <Button onClick={() => deleteVideo(video.id)} variant="ghost" colorScheme="red">
                    Delete
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
