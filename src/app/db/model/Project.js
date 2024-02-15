import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    required: true,
    projectCode: String,
    required: true,
    companyName: String,
    required: true,
    companyAddress: String,
    required: true,
    companyPhone: Number,
    companyEmail: String,
    required: true,
    contact: String,
    required: true,
    email: String,
    required: true,
    invoiceAddress: String,
    required: true,
    active: Boolean,

    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  },
  {
    timestamps: true,
  }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
