import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import BlogCard from "../components/Card";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function Homepage() {
  const [expanded, setExpanded] = React.useState(false);
  const [posts, setPosts] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getPosts");
        setPosts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {/* Centered Banner Image */}
      <Container maxWidth="lg" style={{ marginBottom: "2rem" }}>
        <Box
          position="relative"
          style={{ borderRadius: "8px", overflow: "hidden", marginTop: "30px" }}
        >
          <img
            src="img/bloog.jpg"
            alt="Blogging Banner"
            style={{
              height: "30rem",
              width: "100%",
              objectFit: "cover",
              filter: "brightness(0.8)",
            }}
          />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            style={{
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "white",
              zIndex: 10,
            }}
          >
            <Typography
              variant="h3"
              style={{ fontWeight: 600, marginBottom: "1rem" }}
            >
              Share Your Story with the World
            </Typography>
            <Button
              variant="contained"
              color="gray"
              size="large"
              style={{
                borderRadius: "24px",
                padding: "0.8rem 2rem",
                fontSize: "1rem",
                textTransform: "none",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              <a href="/createblog">Create Your Blog</a>
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Recipe Card */}
      <Container
        maxWidth="lg"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginLeft: "10rem",
        }}
      >
        <Stack
          spacing={2}
          direction={"row"}
          sx={{ flexWrap: "wrap", justifyContent: "space-between" }}
        >
          {posts.map((post) => (
            <Link to={`/blog/${post._id}`} key={post._id}>
              <BlogCard
                title={post.title}
                content={post.content}
                cover={post.cover}
                name={post.name}
                date={post.createdAt}
              />
            </Link>
          ))}
        </Stack>
      </Container>
    </div>
  );
}
