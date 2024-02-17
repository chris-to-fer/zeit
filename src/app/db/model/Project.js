import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    projectCode: { type: String, required: true },

    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    companyPhone: Number,
    companyEmail: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    invoiceAddress: { type: String },
    active: { type: Boolean },

    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "employees" }],
  },
  {
    timestamps: true,
  }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
