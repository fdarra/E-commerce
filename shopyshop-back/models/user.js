// require mongoose
const mongoose = require("mongoose");

// require Schema
const Schema = mongoose.Schema;

// create user Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: Number,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: [
      {
        product_id: Schema.Types.ObjectId,
        quantity: Number,
      },
    ],
    wishes: [
      {
        product_id: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true },
  { collection: "users" }
);

// export schema
module.exports = User = mongoose.model("User", userSchema);
