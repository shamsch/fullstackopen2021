const Blog = require("../../models/blog");
const User = require("../../models/user");

const initialBlogs = [
  {
    title: "abc",
    author: "kkk",
    url: "https://google.com/",
    likes: 7,
  },
  {
    title: "xyz",
    author: "qqq",
    url: "http://yahoo.com",
    likes: 5,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
};
