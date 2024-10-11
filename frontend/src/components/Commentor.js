import React from "react";
import { Box } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

const Commentor = ({ type, comment }) => {
  if (!comment) {
    return <></>;
  }

  const { userName, creation, createdAt } = comment;

  const timestamp =
    type === "question" || type === "answer" ? creation : createdAt;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        color: "gray",
        fontSize: "14px",
        gap: "4px",
      }}
    >
      {userName && (
        <p>
          <strong>{userName}</strong>{" "}
          {type === "question"
            ? "asked"
            : type === "answer"
            ? "answered"
            : "commented"}
        </p>
      )}
      {timestamp && (
        <p
          style={{
            cursor: "pointer",
          }}
          title={new Date(timestamp).toISOString()}
        >
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </p>
      )}
    </Box>
  );
};

export default Commentor;
