import mongoose from "mongoose";

const { Schema } = mongoose;

const timeSchema = new Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    required: true,
    projectID: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    required: true,
    date: Date,
    default: Date.now,
    required: true,
    start: Number,
    required: true,
    end: Number,
    required: true,
    break: Number,
    required: true,
    catering: Boolean,
    required: true,
    travelTo: Number,
    travelBack: Number,
    type: String,
    required: true,
    place: String,
    isHome: Boolean,
    required: true,
    comment: String,
  },
  {
    timestamps: true,
  }
);

const Time = mongoose.models.Time || mongoose.model("Time", timeSchema);

export default Time;
