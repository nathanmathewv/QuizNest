
package com.exam.controller;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

        @Autowired
        private QuestionService service;

        @Autowired
        private QuizService quizService;
    
        //add question
        @PostMapping("/")
        public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
            return ResponseEntity.ok(this.service.addQuestion(question));
        }
    
        //update the question
        @PutMapping("/")
        public ResponseEntity<Question> updateQuestion(@RequestBody Question question) {
            return ResponseEntity.ok(this.service.updateQuestion(question));
        }
    
        //get all question of any quesid
        @GetMapping("/quiz/{quesid}")
        public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("quesid") Long qid) {
        Quiz quiz = this.quizService.getQuiz(qid);
        List<Question> list = new ArrayList<Question>(this.service.getQuestionsOfQuiz(quiz));
        // Shuffle the entire list
        Collections.shuffle(list);

        int numberOfQuestions = Integer.parseInt(quiz.getNumberOfQuestions());
        // Take a random subset of questions, ensuring the size doesn't exceed the available questions
        List<Question> randomQuestions = list.size() > numberOfQuestions ? list.subList(0, numberOfQuestions) : list;
        return ResponseEntity.ok(randomQuestions);

        }


    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid) {
        Quiz quiz = new Quiz();
        quiz.setQid(qid);
        Set<Question> questionsOfQuiz = this.service.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);

//        return ResponseEntity.ok(list);


    }


    //get single question
    @GetMapping("/{quesId}")
    public Question get(@PathVariable("quesId") Long quesId) {
        return this.service.getQuestion(quesId);
    }

    //delete question
    @DeleteMapping("/{quesId}")
    public void delete(@PathVariable("quesId") Long quesId) {
        this.service.deleteQuestion(quesId);
    }


    //eval quiz
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions) {
        System.out.println(questions);
        double marksGot = 0;
        int correctAnswers = 0;
        int attempted = 0;
        for (Question q : questions) {
            //single questions
            Question question = this.service.get(q.getQuesId());
            if (question.getAnswer().equals(q.getGivenAnswer())) {
                //correct
                correctAnswers++;

                double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks()) / questions.size();
                //       this.questions[0].quiz.maxMarks / this.questions.length;
                marksGot += marksSingle;

            }

            if (q.getGivenAnswer() != null) {
                attempted++;
            }

        }
        ;

        Map<String, Object> map = Map.of("marksGot", marksGot, "correctAnswers", correctAnswers, "attempted", attempted);
        return ResponseEntity.ok(map);

    }

}
