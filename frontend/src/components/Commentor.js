import React from "react";
import { Box } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

const Commentor = ({ type, comment }) => {
  if (!comment) {
    return <></>;
  }

  const { userName, creation } = comment;

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
          {type === "question" ? "asked" : type === "answer" ? "answered" : ""}
        </p>
      )}
      {creation && (
        <p
          style={{
            cursor: "pointer",
          }}
          title={new Date(creation).toISOString()}
        >
          {formatDistanceToNow(new Date(creation), { addSuffix: true })}
        </p>
      )}
    </Box>
  );
};

export default Commentor;
