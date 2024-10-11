import React, { useEffect, useState } from "react";
import { getComments } from "../services/api";
import {
  List,
  ListItem,
  Typography,
  Button,
  Box,
  Collapse,
  Divider,
} from "@mui/material";
import parse from "html-react-parser";
import Commentor from "./Commentor";
import CommentAddForm from "./CommentAddForm";

const CommentList = ({ comments, questionId, answerId }) => {
  const [expanded, setExpanded] = useState(false);
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
            <CommentAddForm
              answerId={answerId}
              questionId={questionId}
              commentArray={commentArray}
              setCommentArray={setCommentArray}
            />
          </Collapse>
        </>
      ) : (
        <>
          <Button onClick={handleExpandClick}>
            {expanded ? "▲" : "▼"} No comments yet
          </Button>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CommentAddForm
              answerId={answerId}
              questionId={questionId}
              commentArray={commentArray}
              setCommentArray={setCommentArray}
            />
          </Collapse>
        </>
      )}
    </Box>
  );
};

export default CommentList;
