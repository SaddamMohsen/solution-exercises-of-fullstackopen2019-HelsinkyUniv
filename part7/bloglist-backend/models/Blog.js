const mongoose = require("mongoose");
const User = require("./User");

const commentSchema = mongoose.Schema({
  comments: String
});
const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: String,
  likes: Number,
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  comments: [commentSchema]
});
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
/*blogSchema.pre('deleteOne',function(next) {
	console.log('from find and remove')
    /*this.model('users').update(
        { },
        { "$pull": { "blogs": this._id } },
        { "multi": true },
        next
    );*/

blogSchema.pre("delete", function(next) {
  console.log("from find and update");
  this.model("User").update(
    {},
    { $pull: { blogs: this._id } },
    { multi: true },
    next
  );
});
//const Blog = mongoose.model("Blog", blogSchema,'blogs');
//const Comment=mongoose.model('Comment', commentSchema,'comments');
module.exports=   mongoose.model("Blog", blogSchema);

