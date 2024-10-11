import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const QuestionSidebar = ({ score, answerCount, commentCount }) => {
  const renderScore = (score) => {
    let color = "black";
    if (score > 0) color = "green";
    else if (score < 0) color = "red";

    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        color={color}
      >
        <Typography variant="body2">{score} score</Typography>
      </Box>
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="right"
      alignItems="flex-end"
      textAlign="center"
      minWidth={100}
      sx={{ padding: "16px" }}
    >
      {renderScore(score)}
      <Divider sx={{ width: "100%", my: 1 }} />

      <Typography variant="body2" sx={{ color: "gray" }}>
        {answerCount} answers
      </Typography>
      <Divider sx={{ width: "100%", my: 1 }} />

      <Typography variant="body2" sx={{ color: "gray" }}>
        {commentCount} comments
      </Typography>
    </Box>
  );
};

export default QuestionSidebar;
