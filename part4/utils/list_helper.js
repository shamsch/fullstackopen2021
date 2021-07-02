const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  const calculateSum = (sum, value) => sum + value.likes;

  return blogs.length ? blogs.reduce(calculateSum, 0) : 0;
};

const favoriteBlog = (blogs) => {
  let currentFavPost = blogs[0];
  for (let element of blogs) {
    if (element.likes > currentFavPost.likes) {
      currentFavPost = element;
    }
  }
  return blogs.length ? currentFavPost : null;
};

const mostBlogs = (blogs) => {
  if(!blogs.length){
    return null;
  }
  let listOfAuthors = {};
  for (let blog of blogs) {
    if (listOfAuthors[blog.author] !== undefined) {
      listOfAuthors[blog.author] += 1;
    } else {
      listOfAuthors[blog.author] = 1;
    }
  }

  const authors = Object.keys(listOfAuthors);
  let authorWithMaxBlogs = authors[0];
  let maxBlog = listOfAuthors[authorWithMaxBlogs];
  for (let element in listOfAuthors) {
    if (listOfAuthors[element] > maxBlog) {
      authorWithMaxBlogs = element;
      maxBlog = listOfAuthors[element];
    }
  }
  return { author: authorWithMaxBlogs, blogs: maxBlog };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
