import asyncHandler from "express-async-handler";
import Test from "../models/testModel.js";
import User from "../models/userModel.js";
import DeletedObject from "../models/deletedObjects.js";

// @desc        Fetch all  tests
// @route       GET /api/tests
// @access      Public
export const getTests = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = req.query.pageNumber || 1;

  const name = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const brand = req.query.keyword
    ? {
        brand: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const description = req.query.keyword
    ? {
        description: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const category = req.query.keyword
    ? {
        category: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const search = [
    { ...name },
    { ...brand },
    { ...description },
    { ...category },
  ];
  const count = await Test.countDocuments({
    $or: search,
  });
  const tests = await Test.find({
    $or: search,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ tests, page, pages: Math.ceil(count / pageSize) });
});

// @desc        Fetch single tests
// @route       GET /api/tests/:id
// @access      Public
export const getTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);
  const testDetails = {
    _id: test._id,
    name: test.name,
    image: test.image,
    user: test.user,
    category: test.category,
    brand: test.brand,
    description: test.description,
    rating: test.rating,
    numReviews: test.numReviews,
    featured: test.featured,
    reviews: test.reviews,
    questions: test.questions.length,
  };

  if (test) {
    res.json(testDetails);
  } else {
    res.status(404);
    throw new Error("Test not found");
  }
});

// @desc        Delete test
// @route       DELETE /api/tests/:id
// @access      Private
export const deleteTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);
  const deletedTest = new DeletedObject({
    deleted: test,
  });
  await deletedTest.save();
  // const test = await Test.findByIdAndRemove(req.params.id);
  if (test) {
    res.json("Test removed");
  } else {
    res.status(404);
    throw new Error("Test not found");
  }
});

// @desc        Create test
// @route       POST /api/tests/
// @access      Private
export const createTest = asyncHandler(async (req, res) => {
  // const { name, description, image, brand, category } = req.body;
  const test = new Test({
    name: "New Test",
    image: "image",
    user: req.user._id,
    category: "category",
    brand: "brand",
    description: "description",
  });
  const createdTest = await test.save();
  res.status(201).json(createdTest);
});

// @desc        Update test
// @route       PUT /api/tests/
// @access      Private/Admin
export const updateTest = asyncHandler(async (req, res) => {
  const { name, description, image, brand, category, featured } = req.body;
  const test = await Test.findById(req.params.id);
  if (test) {
    test.name = name;
    test.description = description;
    test.image = image;
    test.brand = brand;
    test.category = category;
    test.featured = featured ? featured : false;
    const updatedTest = await test.save();
    res.status(201).json(updatedTest);
  } else {
    res.status(404);
    throw new Error("Test not found");
  }
});

// @desc        Create review
// @route       POST /api/tests/:id/review
// @access      Private
export const createTestReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const test = await Test.findById(req.params.id);
  if (test) {
    const alreadyReviewed = test.reviews.find(
      (r) => r.user.toString() == req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Test already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
    };
    test.reviews.push(review);
    test.rating =
      test.reviews.reduce((acc, item) => item.rating + acc, 0) /
      test.reviews.length;
    test.numReviews = test.reviews.length;
    await test.save();
    res.status(201).json({ message: "Review successfully added" });
  } else {
    res.status(404);
    throw new Error("Test not found");
  }
});

// @desc        get top rated tests
// @route       GET /api/tests/top
// @access      Public
export const getTopRatedTests = asyncHandler(async (req, res) => {
  const tests = await Test.find({}).sort({ rating: -1 }).limit(5);
  res.json(tests);
});
// @desc        get featured tests
// @route       GET /api/tests/top
// @access      Public
export const getFeaturedTests = asyncHandler(async (req, res) => {
  const tests = await Test.find({ featured: true }).sort({ createdAt: -1 });
  res.json(tests);
});
// @desc        enroll test
// @route       PUT /api/tests/:id/enroll/
// @access      Private

export const enrollTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (test) {
    const user = await User.findByIdAndUpdate(req.user._id, {
      $push: { enrolledTests: test },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } else {
    res.status(404);
    throw new Error("Test not found");
  }
  const user = await User.findById(req.user._id);
});

// @desc        Submit Test Answers
// @route       Put /api/tests/:id/test/check
// @access      Private

export const submitTestAnswers = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);
  const user = await User.findById(req.user._id);
  if (user) {
    if (test) {
      if (
        user.submittedAnswers.find((question) => question._id === req.body._id)
      ) {
        const submittedAnswers = user.submittedAnswers.filter((question) => {
          return question._id != req.body._id;
        });
        user.submittedAnswers = submittedAnswers;
        user.submittedAnswers.push(req.body);
      } else {
        user.submittedAnswers.push(req.body);
      }
      await user.save();
      res.json(req.body);
    } else {
      res.status(404);
      throw new Error("Test not found");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc        Check Test Answers
// @route       Put /api/tests/:id/test/check
// @access      Private

export const checkTestAnswers = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);
  const user = await User.findById(req.user._id);
  if (user) {
    if (test) {
      function Question(correctAnswers, submittedAnswers, questionId) {
        this.correctAnswers = correctAnswers;
        this.submittedAnswers = submittedAnswers;
        this.questionId = questionId;
      }

      const summary = [];
      let score = 0;
      test.questions.map((question) => {
        let submittedAnswers = user.submittedAnswers.find(
          (q) => q._id.toString() === question._id.toString()
        );

        const result = new Question(
          question.correctAnswers,
          submittedAnswers?.selectedAnswers,
          question._id
        );
        summary.push(result);
      });
      const countScore = (summary) => {
        summary.map((question) => {
          if (
            question?.correctAnswers?.length ===
            question?.submittedAnswers?.length
          ) {
            let correct = true;
            question?.correctAnswers.map((answer) => {
              if (
                question.submittedAnswers.find(
                  (ans) => ans._id.toString() === answer._id.toString()
                )
              ) {
              } else {
                correct = false;
              }
            });
            if (correct) {
              score++;
            }
          }
        });
      };
      countScore(summary);
      user.submittedAnswers = [];

      await user.save();
      res.json({ summary: summary, score: score });
    } else {
      res.status(404);
      throw new Error("Test not found");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
