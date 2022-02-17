const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blogs are returned in the correct amount", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("blogs has the identifier id instead of _id", async () => {
  const allBlogsArray = await helper.blogsInDb();

  const singleEntry = allBlogsArray[0];
  expect(singleEntry.id).toBeDefined();
  expect(singleEntry._id).toBe(undefined);
});

test("making a post request makes necessary changes in db", async () => {
  const testPost = {
    title: "Test title",
    author: "Test author",
    url: "Test url",
    likes: 0,
  };

  const blogsBefore = await helper.blogsInDb();
  const numberOfBlogsBefore = blogsBefore.length;

  const res = await api
    .post("/api/blogs")
    .send(testPost)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogAfter = await helper.blogsInDb();
  const numberOfBlogsAfter = blogAfter.length;

  expect(numberOfBlogsAfter - numberOfBlogsBefore).toBe(1);

  const allBlogTitles = blogAfter.map((blog) => blog.title);
  expect(allBlogTitles).toContain("Test title");
});

test("check to see whether likes property is missing and default value is 0", async () => {
  const newBlog = {
    title: "Test without like",
    author: "Test",
    url: "https://gmail.com/",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBeDefined();
  expect(response.body.likes).toBe(0);
});

test("verify test with no title and url gets 400 Bad Request", async () => {
  const newBlog = {
    author: "Test",
    likes: 12
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
