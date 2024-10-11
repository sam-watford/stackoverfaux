import React from "react";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import CommentList from "./CommentList";
import Commentor from "./Commentor";
import { transformBodyWithNoReferrer } from "../utils/helpers";

const Answer = ({ answer }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="body1">
          {transformBodyWithNoReferrer(answer.body)}
        </Typography>
        <Commentor comment={answer} type={"answer"} />
        <Divider sx={{ my: 1 }} />
        <CommentList answerId={answer.id} />
      </CardContent>
    </Card>
  );
};

export default Answer;
