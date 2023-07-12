import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { transporter, mailOptions } from "../config/nodemailer.js";
import { generateToken } from "../config/tokenGenerator.js";
import { testSchema } from "./testModel.js";
import { questionSchema } from "./questionModel.js";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    verificationCode: {
      type: String,
      required: false,
      default: false,
      createdAt: { type: Date, expires: "1d", default: Date.now },
    },
    activeTest: [testSchema],
    enrolledTests: [testSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.checkPassword = async function (inputPassword) {
  return bcrypt.compareSync(inputPassword, this.password);
};

// Add pre conditions on database save
userSchema.pre("save", async function (next) {
  // on password change
  if (!this.isModified("password")) {
    next();
  } else {
    console.log("Password Changed".yellow);
    this.password = bcrypt.hashSync(this.password, 10);
  }
  //on email change
  if (this.isModified("email")) {
    this.isVerified = false;
    const token = generateToken(4);
    this.verificationCode = token;
    // email contents:
    mailOptions.to = this.email;
    mailOptions.text = `Your Verification Code is ${this.verificationCode}`;
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log(("Email sent:", info.response).green);
      }
    });
  }
});

const User = mongoose.model("User", userSchema);

export default User;
