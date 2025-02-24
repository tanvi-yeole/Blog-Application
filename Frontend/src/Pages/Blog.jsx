import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { formatISO9075 } from 'date-fns';
import { Container, Typography, Box, Avatar, Divider, CircularProgress, Paper, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const BlogPost = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    axios.get(`https://blogger-lxs5.onrender.com//getPost/${id}`)
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
        setLikes(res.data.likes || 0); // Assuming the post data includes a 'likes' field
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    // Optionally, send a request to the backend to update the like count
    // axios.post(`https://blogger-lxs5.onrender.com//likePost/${id}`, { liked: !liked });
  };

  if (!posts.data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="center" my={2}>
          <Avatar alt={posts.data.author.name} src="/path/to/author/image.jpg" />
          <Box ml={2}>
            <Typography variant="subtitle1">{posts.data.author.name}</Typography>
            <Typography variant="caption" color="textSecondary">
              {formatISO9075(new Date(posts.data.createdAt))}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          {posts.data.title}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="center" my={2}>
          <img src={`https://blogger-lxs5.onrender.com//${posts.data.cover}`} alt="Banner" style={{ maxWidth: '100%', borderRadius: 8 }} />
        </Box>
        <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: posts.data.content }} sx={{ mt: 3, lineHeight: 1.7 }} />
        <Box display="flex" alignItems="center" justifyContent="center" my={2}>
          <IconButton onClick={handleLike} color={liked ? 'error' : 'default'}>
            <FavoriteIcon />
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            {likes} {likes === 1 ? 'like' : 'likes'}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogPost;