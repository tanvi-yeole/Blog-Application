import React, { useState } from "react";
import Editor from "../components/Editor";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Stack, Container } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Createblog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("file", files);

    setLoading(true);
    await axios
      .post("http://localhost:4000/createPost", formData, {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        setRedirect(true);
        console.log(res.json());
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Stack spacing={3}>
      <Container>
        <form action="">
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="file"
            label="Cover Image"
            onChange={(e) => setFiles(e.target.files[0])}
          />

          <Editor value={content} onChange={setContent} />

          <br />

          <Button
            variant="primary"
            onClick={handleFormSubmit}
            disabled={loading}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Container>
    </Stack>
  );
};

export default Createblog;
