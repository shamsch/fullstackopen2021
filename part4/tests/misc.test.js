const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const listWithManyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const favBlog = {
  _id: "5a422b3a1b54a676234d17f9",
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes: 12,
  __v: 0,
};

describe("Total likes", () => {
  test("of empty list is zero.", () =>
    expect(listHelper.totalLikes([])).toBe(0));

  test("when list has only one blog, equals the likes of that.", () =>
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5));

  test("of a bigger list is calculated right.", () =>
    expect(listHelper.totalLikes(listWithManyBlogs)).toBe(36));
});

describe("Favorite blog", () => {
  test("of empty list is null.", () =>
    expect(listHelper.favoriteBlog([])).toBe(null));

  test("when list has only one blog is the blog itself.", () =>
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(
      listWithOneBlog[0]
    ));

  test("of a bigger list is calculated right.", () =>
    expect(listHelper.favoriteBlog(listWithManyBlogs)).toEqual(favBlog));
});

describe("Most blogs of an author", () => {
  test("of empty list is null.", () =>
    expect(listHelper.mostBlogs([])).toEqual(null));

  test("when list has only one blog, equals the author of that.", () =>
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
      author: listWithOneBlog[0].author,
      blogs: 1,
    }));

  test("of a bigger list is calculated right.", () =>
    expect(listHelper.mostBlogs(listWithManyBlogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    }));
});

describe("Author with the most likes", () => {
  test("of empty list is null.", () =>
    expect(listHelper.mostLikes([])).toEqual(null));

  test("when list has only one blog, equals the author of that.", () =>
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
    }));

  test("of a bigger list is calculated right.", () =>
    expect(listHelper.mostLikes(listWithManyBlogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    }));
});
