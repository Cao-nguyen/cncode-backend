const mongoose = require("mongoose");

const TestCaseSchema = new mongoose.Schema({
  input: { type: String },
  output: { type: String },
  hidden: { type: Boolean, default: false },
});

const Excirses = new mongoose.Schema({
  question: { type: String },
  type: {
    type: String,
    enum: ["trac-nghiem", "nhieu-dap-an", "dung-sai", "tra-loi-ngan", "code"],
  },
  options: [
    {
      text: { type: String },
      correct: { type: Boolean },
    },
  ],
  shortAnswer: {
    type: String,
  },
  explanation: { type: String },
  codeSample: {
    inputDescription: { type: String },
    outputDescription: { type: String },
    codeDefault: { type: String },
    validateBy: { type: String },
    testCases: [TestCaseSchema],
  },
  point: { type: String },
});

const ContestSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  level: { type: Number },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  openTime: { type: Date },
  closeTime: { type: Date },
  time: { type: String },
  password: { type: String },
  show: { type: String },
  excirses: [Excirses],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  finish: [
    {
      student_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      point: { type: String },
      answer: [{}],
    },
  ],
  slug: { type: String },
});

const Contest = mongoose.model("contest", ContestSchema);
module.exports = Contest;
