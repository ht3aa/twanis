"use client";
import { Fragment, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  Drawer,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";

export default function Home() {
  let socket: Socket;
  const [msg, setMsg] = useState("");
  const [drawerState, setDrawerState] = useState(false);
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    const response = await fetch("http://localhost:8000/api/v1/video");
    const data = await response.json();
    console.log(data);
    setVideos(data);
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
    // socket = io("http://localhost:8000");
    // socket.on("connect", () => {
    //   console.log("connected");
    // });

    // socket.on("disconnect", () => {
    //   console.log("disconnected");
    // });

    // socket.on("message", function (data) {
    //   console.log(data);
    //   setMsg(data);
    // });
  }, []);

  function sendMessage() {
    socket.emit("message", "hello");
  }

  const list = () => (
    <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <Link href={"/video-upload"}>
          <ListItem key={"Upload Video"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Upload Video"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Fragment key={"left"}>
        <Button onClick={toggleDrawer(true)}>{"left"}</Button>
        <Drawer anchor={"left"} open={drawerState} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </Fragment>
      <main>
        {videos.map((video: any) => (
          <Card key={video.id} sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={`http://localhost:8000/api/v1/video/thumbnail/${video.id}`}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {video.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {video.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </main>
    </div>
  );
}
