import React, { useEffect, useState } from "react";
import { getQuestions } from "../../services/api";
import { Link } from "react-router-dom";
import { Card, Box, Grid } from "@mui/material";
import QuestionSidebar from "./QuestionSidebar";
import Commentor from "../Commentor";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getQuestions();
      setQuestions(response.data);
    };
    fetchQuestions();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {questions.map((q) => (
          <Grid item xs={12} key={q.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <QuestionSidebar
                score={q.score}
                answerCount={q.answerCount}
                commentCount={q.commentCount}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flex: 1,
                  padding: "16px",
                }}
              >
                <Box>
                  <Link
                    to={`/questions/${q.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <p
                      style={{
                        display: "inline",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      {q.title}
                    </p>
                  </Link>

                  <p
                    style={{
                      color: "gray",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {q.body}
                  </p>
                </Box>

                <Commentor comment={q} type={"question"} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuestionList;
