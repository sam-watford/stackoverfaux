import { useState } from "react";
import { postComment } from "../services/api";
import { Button, TextField } from "@mui/material";

const CommentAddForm = ({
  answerId,
  questionId,
  commentArray,
  setCommentArray,
}) => {
  const [commentBody, setCommentBody] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const response = await postComment({
      body: commentBody,
      questionId,
      answerId,
    });
    const comment = response.data;
    comment["userName"] = localStorage.getItem("user");
    setCommentArray([...commentArray, comment]);
    setCommentBody("");
  };

  return (
    <form onSubmit={handleCommentSubmit} style={{ padding: "15px" }}>
      <TextField
        fullWidth
        multiline
        rows={2}
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        placeholder="Write your comment"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!localStorage.getItem("user")}
      >
        Add Comment
      </Button>
    </form>
  );
};

export default CommentAddForm;
