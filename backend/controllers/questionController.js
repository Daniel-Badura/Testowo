import asyncHandler from "express-async-handler";
import Test from "../models/testModel.js";
import Question, { Answer, answerSchema } from "../models/questionModel.js";

// @desc        get questions
// @route       GET /api/tests/:id/questions
// @access      Private

// export const getQuestions = asyncHandler(async (req, res) => {
//   const testId = req.params.id;
//   const pageSize = 10;
//   const page = req.query.pageNumber || 1;

//   const content = req.query.keyword
//     ? {
//         content: {
//           $regex: req.query.keyword,
//           $options: "i",
//         },
//       }
//     : {};
//   const search = [{ ...content }, { ...answers }];
//   const count = await Question.countDocuments({
//     test: testId,
//     $or: search,
//   });
//   const questions = await Question.find({
//     test: testId,
//     $or: search,
//   })
//     .limit(pageSize)
//     .skip(pageSize * (page - 1));
//   res.json({ questions, page, pages: Math.ceil(count / pageSize) });
// });
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
      content: "New Question",
      image: "image",
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
  const tests = await Test.findById(testId);
  console.log(tests);
  if (test) {
    res.json({ message: "Question removed" });
  } else {
    res.status(404);
    throw new Error("Test not found");
  }
});

// @desc        Update question
// @route       PUT /api/tests/:id/questions/:qid
// @access      Private/Admin
export const updateQuestion = asyncHandler(async (req, res) => {
  const { content, description, image } = req.body;
  const question = await Question.findById(req.params.qid);
  if (question) {
    question.content = description;
    question.image = image;

    const updatedTest = await question.save();
    res.status(201).json(updatedTest);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

export const createAnswer = asyncHandler(async (req, res) => {
  const testId = req.params.id;
  const questionId = req.params.qid;
  const test = await Test.findById(testId);
  // console.log(test.questions.find((item) => item._id === questionId));
  const answer = new Answer({
    answerText: "whatever",
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

    res.status(201).json(question);
  } else {
    res.status(404);
    throw new Error("Test not found");
  }
});
