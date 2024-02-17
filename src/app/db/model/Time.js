import mongoose from "mongoose";

const { Schema } = mongoose;

const timeSchema = new Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
      required: true,
    },

    projectID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },

    date: { Date, default: Date.now, required: true },

    start: { type: Number, required: true },
    end: { type: Number, required: true },
    break: { type: Number, required: true },
    catering: { type: Boolean, required: true },
    travelTo: Number,
    travelBack: Number,
    type: { type: String, required: true },
    place: String,
    isHome: { type: Boolean, required: true },
    comment: String,
    create_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Time = mongoose.models.Time || mongoose.model("Time", timeSchema);

export default Time;
