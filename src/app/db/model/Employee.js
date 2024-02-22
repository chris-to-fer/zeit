import mongoose from "mongoose";

const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phone: Number,

    department: { type: String, required: true },
    position: { type: String, required: true },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    active: { type: Boolean, required: true },
    // project: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Project",
    //   required: true,
    // },
    // create_at: { type: Date, default: Date.now },
    times: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Time",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
