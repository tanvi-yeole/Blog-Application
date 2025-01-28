import React from "react";
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
              Create Your Blog
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
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </Stack>
      </Container>
    </div>
  );
}
