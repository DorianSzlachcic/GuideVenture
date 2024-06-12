import React, { useState, useEffect } from 'react';
import { View, Text, Button, CheckBox, TextInput, StyleSheet, Alert } from 'react-native';
import Settings from '../settings';

const QuizScreen = ({ step, onNextAction }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [points, setPoints] = useState(0);

  useEffect(() => {
    fetch(`${Settings.ApiUrl}games/${Settings.GameId}/steps/${step.step_index}/questions`)
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, [step]);

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    let additionalPoints = 0;

    if (currentQuestion.question_type === 'single_choice' && selectedAnswer === currentQuestion.answers.split(';')[currentQuestion.num_of_correct_ans - 1]) {
      additionalPoints = step.points / questions.length;
    }

    if (currentQuestion.question_type === 'text_answer' && userAnswer.trim().toLowerCase() === currentQuestion.answers.trim().toLowerCase()) {
      additionalPoints = step.points / questions.length;
    }

    setPoints(points + additionalPoints);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setUserAnswer('');
    } else {
      onNextAction(points + additionalPoints, null);
    }
  };

  if (!questions.length) {
    return (
      <View style={styles.loader}>
        <Text>Ładowanie pytań...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answers = currentQuestion.answers.split(';');

  return (
    <View style={styles.container}>
      <Text>{currentQuestion.question}</Text>
      {currentQuestion.question_type === 'single_choice' && answers.map((answer, index) => (
        <View key={index} style={styles.answerContainer}>
          <CheckBox
            value={selectedAnswer === answer}
            onValueChange={() => setSelectedAnswer(answer)}
          />
          <Text>{answer}</Text>
        </View>
      ))}
      {currentQuestion.question_type === 'text_answer' && (
        <TextInput
          style={styles.input}
          value={userAnswer}
          onChangeText={setUserAnswer}
        />
      )}
      <Button title="Dalej" onPress={handleNextQuestion} disabled={!selectedAnswer && !userAnswer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default QuizScreen;
