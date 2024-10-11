import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import QuestionList from "./components/Questions/QuestionList";
import Question from "./components/Questions/Question";
import Auth from "./components/Auth";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <div className="container mx-auto mt-6">
        <Routes>
          <Route path="/" element={<QuestionList />} />
          <Route path="/questions/:id" element={<Question />} />
          <Route path="/auth" element={<Auth setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
