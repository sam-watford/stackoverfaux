import React from "react";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import CommentList from "./CommentList";
import parse from "html-react-parser";
import Commentor from "./Commentor";

const Answer = ({ answer }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="body1">{parse(answer.body)}</Typography>
        <Commentor comment={answer} type={"answer"} />
        <Divider sx={{ my: 1 }} />
        <CommentList answerId={answer.id} />
      </CardContent>
    </Card>
  );
};

export default Answer;
