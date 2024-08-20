import mongoose from "mongoose";
/* API Category */
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    /* chu thuong */
    lowercase: true,
  },
});

export default mongoose.model("Category", categorySchema);
