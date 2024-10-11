import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionById, postAnswer } from "../../services/api";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import Answer from "../Answer";
import parse from "html-react-parser";
import Commentor from "../Commentor";
import CommentList from "../CommentList";

const Question = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answerBody, setAnswerBody] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await getQuestionById(id);
      setQuestion(response.data);
    };
    fetchQuestion();
  }, [id]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    await postAnswer({ body: answerBody, questionId: id });
    setAnswerBody("");
  };

  return (
    <Box sx={{ p: 3 }}>
      {question ? (
        <Card sx={{ p: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {question.title}
            </Typography>

            <div>{parse(question.body)}</div>

            <Commentor comment={question} type={"question"} />

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" sx={{ mt: 2 }}>
              {question.answers.length} Answer
              {question.answers.length !== 1 ? "s" : ""}
            </Typography>

            {question.answers.map((answer) => (
              <Box key={answer.id} sx={{ mt: 3, display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <Button variant="text">▲</Button>
                  <Typography variant="body1">{answer.score}</Typography>
                  <Button variant="text">▼</Button>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Answer answer={answer} />
                </Box>
              </Box>
            ))}
            <Divider sx={{ my: 4 }} />

            <CommentList
              comments={question.comments}
              questionId={question.id}
            />

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" sx={{ mb: 2 }}>
              Your Answer
            </Typography>
            <form onSubmit={handleAnswerSubmit}>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={answerBody}
                onChange={(e) => setAnswerBody(e.target.value)}
                placeholder="Write your answer"
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
                disabled={!localStorage.getItem("user")}
              >
                Post Your Answer
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6">Loading question...</Typography>
      )}
    </Box>
  );
};

export default Question;
