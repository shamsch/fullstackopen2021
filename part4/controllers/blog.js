const blogRouter = require("express").Router();
const { findById, findOne } = require("../models/blog");
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne();

  const blog = new Blog({ ...body, user: user.id });

  const res = await blog.save();

  user.blogs = user.blogs.concat(res.id);
  await user.save()

  response.status(200).json(res);
});

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const updatedBlogObject = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlogObject,
    { new: true }
  );
  response.json(updatedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(202).end();
});

module.exports = blogRouter;
