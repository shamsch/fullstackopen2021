const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { findById, findOne } = require("../models/blog");
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = new Blog({ ...body, user: user.id });

  const res = await blog.save();

  user.blogs = user.blogs.concat(res.id);
  await user.save();

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

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    const user = request.user;

    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    }

    response
      .status(400)
      .send("user do not have right to delete this blog")
      .end();
  }
);

module.exports = blogRouter;
