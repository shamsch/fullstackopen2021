const Blog = require("../../models/blog");

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

module.exports = {
    initialBlogs,
    blogsInDb,
};
