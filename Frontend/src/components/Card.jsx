import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatISO9075 } from "date-fns";
import { truncateText } from "../utils/lib";

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

export default function BlogCard({ title, content, cover, name, date }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const truncatedContent = truncateText(content, 10);
  const trucatedTitle = truncateText(title, 6);

  return (
    <Card sx={{ maxWidth: 345 }} style={{ marginBottom: "0.75rem" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#000000' }} aria-label="recipe">
            {name}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={trucatedTitle}
        subheader={date ? formatISO9075(new Date(date)) : "none"}
      />
      <CardMedia
        component="img"
        image={`${import.meta.env.VITE_API_URL}/${cover}`}
        alt="Paella dish"
        sx={{ objectFit: "cover", aspectRatio: "16/9" }}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <span dangerouslySetInnerHTML={{ __html: truncatedContent }}></span>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
