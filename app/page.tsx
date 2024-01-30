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

export default function Home() {
  const [drawerState, setDrawerState] = useState(false);
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    const response = await fetch("http://192.168.0.122:8000/api/v1/video");
    const data = await response.json();
    console.log(data);
    setVideos(data);
  };

  const deleteVideo = async (id: number) => {
    const response = await fetch(`http://192.168.0.122:8000/api/v1/video/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    fetchVideos();
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerState(open);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

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
                  <ChakraLink as={Link} href={`/video/room/${Lib.generateRoomId()}/${video.id}?host=true`}>
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
