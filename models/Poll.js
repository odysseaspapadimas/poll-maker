import mongoose from "mongoose";

const PollSchema = new mongoose.Schema(
  {
    question: String,
    options: [
      {
        _id: false,
        id: Number,
        option: String,
        votes: Number,
      },
    ],
  },
  { versionKey: false }
);

export default mongoose.models.Poll || mongoose.model("Poll", PollSchema);
