// user.js se relate mat kro
const mongoose = require("mongoose");
const { Schema } = mongoose; // const schema = mongoose.schema
// schema = schema (shyad)

main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/relationDemo");
}

const userSchema = new Schema({
  name: String,
  email: String,
});

const postSchema = new Schema({
  content: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const addData = async () => {
  let user = await User.findOne({ email: "Rahul@gmail.com" });

  let post2 = new Post({
    content: "bye bye",
    likes: 7,
  });

  post2.user = user; // we are storing the user object in the post object
  await post2.save();
};

addData();
