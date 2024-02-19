import mongoose from "mongoose";

const { Schema } = mongoose;

const timeSchema = new Schema(
  {
    // employeeId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Employee",
    //   required: true,
    // },

    // projectId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Project",
    //   required: true,
    // },

    date: { Date },

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
