import React, { useState } from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const questions = [
  {
    id: 1,
    question: 'Jaki jest stolica Francji?',
    answers: ['Berlin', 'Londyn', 'Paryż', 'Madryt'],
    correctAnswer: 'Paryż',
    hint: 'Stolica Francji to Paryż.'
  },
  {
    id: 2,
    question: 'Która planeta jest najbliższa Słońcu?',
    answers: ['Mars', 'Jowisz', 'Ziemia', 'Merkury'],
    correctAnswer: 'Merkury',
    hint: 'Najbliżej Słońca znajduje się planeta Merkury.'
  },
  {
    id: 3,
    question: 'Który kraj jest największy pod względem powierzchni?',
    answers: ['Chiny', 'Rosja', 'Kanada', 'Stany Zjednoczone'],
    correctAnswer: 'Rosja',
    hint: 'Pod względem powierzchni największy jest kraj Rosja.'
  },
  {
    id: 4,
    question: 'Który pierwiastek chemiczny ma symbol "H"?',
    answers: ['Hel', 'Węgiel', 'Hydrogen', 'Hafn'],
    correctAnswer: 'Hydrogen',
    hint: 'Pierwiastek chemiczny o symbolu "H" to wodór (Hydrogen).'
  }
];

const QuizScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 10);
    } else if (showHint) {
      setScore(score - 5); // Odejmowanie punktów za wyświetlenie podpowiedzi
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowHint(false);
    } else {
      // Po ostatnim pytaniu wyświetlenie wyniku
      alert('End of quiz. Your score: ' + (score >= 0 ? score : 0)); // Upewnienie się, że wynik nie jest ujemny
    }
  };

  const handleHintToggle = () => {
    setShowHint(!showHint);
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pytanie {currentQuestion + 1}</Text>
      <Text>{questions[currentQuestion]?.question}</Text>
      <TouchableOpacity onPress={handleHintToggle} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="information-circle-outline" size={24} color="black" />
        {showHint && <Text style={{ fontStyle: 'italic', marginTop: 5 }}>{questions[currentQuestion]?.hint}</Text>}
      </TouchableOpacity>
      {questions[currentQuestion]?.answers.map((answer, index) => (
        <TouchableOpacity key={index} onPress={() => handleAnswerSelection(answer)}>
          <Text style={{ marginVertical: 5, color: selectedAnswer === answer ? 'blue' : 'black' }}>{answer}</Text>
        </TouchableOpacity>
      ))}
      <Button title="Dalej" onPress={handleNextQuestion} />
    </View>
  );
};

export default QuizScreen;
