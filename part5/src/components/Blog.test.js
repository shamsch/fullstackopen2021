import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useEvent from '@testing-library/user-event'
import {Blog} from "./Blog";

const testBlog = {
  title: "test",
  author: "mr test",
  likes: "2", 
  url: "https://www.facebook.com/"
};


test("checks component displaying blog's title and author, not url or likes by default.", () => {
  const {container} = render(<Blog blog={testBlog}/>)

  const url = container.querySelector('.url')
  const author = container.querySelector('.author')
  const likes = container.querySelector('.like')

  expect(url).toHaveStyle("display: none;")
  expect(author).toHaveStyle("display: none;")
  expect(likes).toHaveStyle("display: none;")

  const title = container.querySelector('.title')

  expect(title).toHaveTextContent("test")
});

test('blog url and like visible when view is clicked', () => {
  const {container} = render(<Blog blog={testBlog}/>)

  const viewButton = container.querySelector(".view")

  userEvent.click(viewButton)

  const url = container.querySelector('.url')
  const likes = container.querySelector('.like')

  expect(url).toHaveStyle("display: block;")
  expect(likes).toHaveStyle("display: block;")

})

test("check when like button is clicked twice the handler function is called twice", ()=>{
  const mockEventHandler = jest.fn();

  const {container} = render(<Blog blog={testBlog} handlerFunction={mockEventHandler}/>)
  
  const viewButton = container.querySelector(".view")
  userEvent.click(viewButton)

  const likeButton = container.querySelector(".like-btn")
  userEvent.click(likeButton)
  userEvent.click(likeButton)

  expect(mockEventHandler.mock.calls).toHaveLength(2)
})
