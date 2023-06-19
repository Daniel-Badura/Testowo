import users from "./data/users.js";
import User from "./models/userModel.js";
import connectDB from "./config/db.js";

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    // const sampleTests = Tests.map((Test) => {
    //   return { ...Test, user: adminUser };
    // });
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const removeData = async () => {
  try {
    await User.deleteMany();
    console.log("Data successfully removed!".red.inverse);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  removeData();
} else {
  importData();
}
