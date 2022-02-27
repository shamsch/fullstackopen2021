import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import {Blog} from "./Blog";

test("checks component displaying blog's title and author, not url or likes by default.", () => {
  const testBlog = {
      title: "test",
      author: "mr test",
      likes: "2", 
      url: "https://www.facebook.com/"
  };

  const {container} = render(<Blog blog={testBlog}/>)

  const url = container.querySelector('.url')
  const author = container.querySelector('.author')
  const likes = container.querySelector('.like')

  expect(url).toHaveStyle("display: none;")
  expect(author).toHaveStyle("display: none;")
  expect(likes).toHaveStyle("display: none;")

  const title = container.querySelector('.title')

  expect(title).toHaveTextContent("test")
  expect(title).to


});
