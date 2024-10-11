import React, { useEffect, useState } from "react";
import { getComments, postComment } from "../services/api";
import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Box,
  Collapse,
  Divider,
} from "@mui/material";
import parse from "html-react-parser";
import Commentor from "./Commentor";

const CommentList = ({ comments, questionId, answerId }) => {
  const [commentBody, setCommentBody] = useState("");
  const [expanded, setExpanded] = useState(!!comments);
  const [commentArray, setCommentArray] = useState(comments);

  useEffect(() => {
    const fetchComments = async () => {
      if (questionId || answerId) {
        const response = await getComments(questionId, answerId);
        setCommentArray(response.data);
      }
    };
    if (!comments) {
      fetchComments();
    }
  }, [comments, questionId, answerId]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const response = await postComment({
      body: commentBody,
      questionId,
      answerId,
    });
    const comment = response.data;
    setCommentBody("");
    console.log(comment);
    comment["userName"] = localStorage.getItem("user");
    setCommentArray([...commentArray, comment]);
  };

  return (
    <Box>
      {commentArray && commentArray.length > 0 ? (
        <>
          <Button onClick={handleExpandClick}>
            {expanded
              ? `▲ Hide Comments (${commentArray.length})`
              : `▼ View Comments (${commentArray.length})`}
          </Button>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <List>
              {commentArray?.map((comment) => (
                <ListItem
                  key={comment.id}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"flex-end"}
                    width={"100%"}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2">
                        {parse(comment.body)}
                      </Typography>
                      <Divider sx={{ width: "100%", my: 1 }} />
                    </Box>
                    <Box
                      sx={{
                        width: "250px",
                        ml: 2,
                      }}
                    >
                      <Commentor comment={comment} />
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
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
          </Collapse>
        </>
      ) : (
        <Button disabled>No comments yet.</Button>
      )}
    </Box>
  );
};

export default CommentList;
