import asyncHandler from "express-async-handler";
import Test from "../models/testModel.js";
import Question, { Answer, answerSchema } from "../models/questionModel.js";
import User from "../models/userModel.js";
import e from "express";

export const getQuestions = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);

  if (test) {
    res.json(test.questions);
  } else {
    res.status(404);
    throw new Error("Questions not found");
  }
});

// @desc        get question
// @route       GET /api/tests/:id/questions/:question_id
// @access      Private

export const getQuestion = asyncHandler(async (req, res) => {
  const testId = req.params.id;
  const questionId = req.params.qid;

  const test = await Test.findById(testId);
  if (test) {
    const question = test.questions.find(
      (question) => question._id.toString() === questionId
    );

    if (question) {
      res.json(question);
    } else {
      res.status(404);
      throw new Error("Question not found");
    }
  } else {
    res.status(404);
    throw new Error("Test not found");
  }
});
// @desc        Create question
// @route       POST /api/tests/:id/questions
// @access      Private
export const createQuestion = asyncHandler(async (req, res) => {
  // const { name, description, image, brand, category } = req.body;
  const testId = req.params.id;
  const test = await Test.findById(testId);
  if (test) {
    const question = new Question({
      test: testId,
      image: "",
      content: "New Question",
      answers: [],
      correctAnswers: [],
    });
    test.questions.push(question);
    await test.save();
    await question.save();
    res.status(201).json(question);
  } else {
    res.status(404);
    throw new Error("Test not found");
  }
});

// @desc        Delete question
// @route       DELETE /api/tests/:id/questions/:qid
// @access      Private
export const deleteQuestion = asyncHandler(async (req, res) => {
  const testId = req.params.id;
  const questionId = req.params.qid;

  const test = await Test.updateOne(
    { _id: testId },
    { $pull: { questions: { _id: questionId } } }
  );
  if (test) {
    res.json({ message: "Question removed" });
  } else {
    res.status(404);
    throw new Error("Test not found");
  }
});

// @desc        Update Question
// @route       PUT /api/tests/:id/questions/:qid
// @access      Private/Admin
export const updateQuestion = asyncHandler(async (req, res) => {
  const { content, image, answers, correctAnswers } = req.body;
  const testId = req.params.id;
  const qid = req.params.qid;
  console.log(qid);
  const test = await Test.findById(testId);
  const updateQuestion = test.questions.find(
    (question) => question._id.toString() === qid
  );
  console.log(updateQuestion);
  if (updateQuestion) {
    console.log("got here 1");
    updateQuestion.content = content;
    updateQuestion.image = image;
    updateQuestion.answers = answers;
    updateQuestion.correctAnswers = correctAnswers;
    const updatedQuestion = await updateQuestion.save();
    console.log("got here 2");
    const index = test.questions.findIndex((object) => {
      return object.id === qid;
    });

    console.log("got here 3");
    test.questions.splice(index, 1);
    test.questions.push(updateQuestion);
    await test.save();
    res.status(201).json(updatedQuestion);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

// @desc        Create Answer
// @route       POST /api/tests/:id/questions/:qid
// @access      Private/Admin

export const createAnswer = asyncHandler(async (req, res) => {
  const testId = req.params.id;
  const questionId = req.params.qid;
  const test = await Test.findById(testId);
  const answer = new Answer({
    answerText: " ",
  });
  if (test) {
    // const test = await Test.updateOne(
    //   { _id: testId, "questions._id": questionId },
    //   { $push: { "questions.$.answers": answer } }
    // );\
    test.questions
      .find((question) => question._id.toString() === questionId)
      .answers.push(answer);
    await test.save();
    console.log(answer._id);
    res.status(201).json(answer);
  } else {
    res.status(404);
    throw new Error("Test not found");
  }
});

// @desc        Delete Answer
// @route       Delete /api/tests/:id/questions/:qid/:aid
// @access      Private/Admin

export const deleteAnswer = asyncHandler(async (req, res) => {
  const testId = req.params.id;
  const qid = req.params.qid;
  const answerId = req.params.aid;
  const test = await Test.findById(testId);

  const updateQuestion = await Question.findById(req.params.qid);
  if (updateQuestion) {
    const question = test.questions.find((q) => {
      return q.id === qid;
    });
    const answers = question.answers.filter((a) => {
      return a._id != answerId;
    });
    updateQuestion.answers = answers;
    const updatedQuestion = await updateQuestion.save();
    question.answers = answers;
    const index = test.questions.findIndex((object) => {
      return object.id === qid;
    });
    test.questions.splice(index, 1);
    test.questions.push(updateQuestion);
    await test.save();
    res.status(201).json(updatedQuestion);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

// @desc        Get Test Questions
// @route       GET /api/tests/:id/test
// @access      Private
export const getTestQuestions = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);
  const user = await User.findById(req.user._id);
  // const questionNumber = req.query.question || 0;
  if (user) {
    if (test) {
      if (user.activeTest == [] || !user.activeTest) {
        // -----------Shuffle-----------------
        function shuffleArray(array) {
          var m = array.length,
            t,
            i;
          while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
          }
          return array;
        }
        // ------------------------------------

        test.questions = shuffleArray(test.questions);
        user.activeTest = test._id;
        console.log("DUUDUUDU");
        await user.save();
      }
      res.json(test);
    } else {
      res.status(404);
      throw new Error("Test not found");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
