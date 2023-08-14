import mongoose from "mongoose";

export const answerSchema = new mongoose.Schema({
  answerText: {
    type: String,
    // required: true,
  },
});

export const questionSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Test",
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  answers: [answerSchema],
  correctAnswers: [answerSchema],
  explanation: { type: String, required: false },
});
export const Question = mongoose.model("Question", questionSchema);
export const Answer = mongoose.model("Answer", answerSchema);

export default Question;
