import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  answerLetter: {
    type: String,
    required: true,
    maxLength: 1,
  },
  answerText: {
    type: String,
    required: true,
  },
  answerImage: {
    type: String,
    required: false,
  },
});

export const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  answers: [answerSchema],
  correctAnswers: [answerSchema],
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
