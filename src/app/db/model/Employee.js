import mongoose from "mongoose";

const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    name: String,
    required: true,
    lastName: String,
    required: true,
    email: String,
    required: true,
    address: String,
    required: true,
    phone: Number,
    required: true,
    department: String,
    required: true,
    position: String,
    required: true,
    project: String,
    required: true,
    active: Boolean,
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    required: true,
  },

  {
    timestamps: true,
  }
);

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
