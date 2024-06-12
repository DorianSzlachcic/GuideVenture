import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { RadioButton } from "../components/RadioButton";

const questions = [
  {
    id: 1,
    question: "Jaki jest stolica Francji?",
    answers: ["Berlin", "Londyn", "Paryż", "Madryt"],
    correctAnswer: "Paryż",
  },
  {
    id: 2,
    question: "Która planeta jest najbliższa Słońcu?",
    answers: ["Mars", "Jowisz", "Ziemia", "Merkury"],
    correctAnswer: "Merkury",
  },
  {
    id: 3,
    question: "Który kraj jest największy pod względem powierzchni?",
    answers: ["Chiny", "Rosja", "Kanada", "Stany Zjednoczone"],
    correctAnswer: "Rosja",
  },
  {
    id: 4,
    question: 'Który pierwiastek chemiczny ma symbol "H"?',
    answers: ["Hel", "Węgiel", "Hydrogen", "Hafn"],
    correctAnswer: "Hydrogen",
  },
];

const QuizScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Code to handle end of quiz
      // You can navigate to another screen or display results
      alert("End of quiz");
    }
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pytanie {currentQuestion + 1}</Text>
      <Progress.Bar
        indeterminate={false}
        progress={(currentQuestion + 1) / questions.length}
        style={{ width: "80%", marginBottom: 10 }}
      />
      <Text>{questions[currentQuestion].question}</Text>
      {questions[currentQuestion].answers.map((answer, index) => (
        <View
          key={index}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <RadioButton
            value={answer}
            status={selectedAnswer === answer ? "checked" : "unchecked"}
            onPress={() => handleAnswerSelection(answer)}
          />
          <Text>{answer}</Text>
        </View>
      ))}
      <Button
        title="Dalej"
        onPress={handleNextQuestion}
        disabled={!selectedAnswer}
      />
    </View>
  );
};

export default QuizScreen;
