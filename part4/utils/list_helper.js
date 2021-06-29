const dummy = (blogs) => {
  return 1; 
};
const totalLikes = (blogs) => {
  const calculateSum = (sum, value) => sum+ value.likes; 
  
  return blogs.length? blogs.reduce(calculateSum, 0): 0;

}

const favoriteBlog = (blogs) => {
  let currentFavPost=blogs[0];
  for (let element of blogs){
    if(element.likes>currentFavPost.likes){
      currentFavPost= element;
    }
  }
  return blogs.length? currentFavPost : null;
}

module.exports = {
  dummy, totalLikes,favoriteBlog
};
