import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateNewBlog } from "./CreateNewBlog";

const testBlog = {
    title: "test",
    author: "mr test",
    url: "https://www.facebook.com/"
  };

test("tests the functions call the event handler and receives all right details of new blog", () => {
    const mockFunction = jest.fn();

    const {container} = render(<CreateNewBlog handleBlogCreate={mockFunction}/>)

    const title = container.querySelector(".title")
    const author = container.querySelector(".author")
    const url = container.querySelector(".url")
    const createBtn = container.querySelector(".create")

    userEvent.type(title, testBlog.title)
    userEvent.type(author, testBlog.author)
    userEvent.type(url, testBlog.url)
    userEvent.click(createBtn)
    
    expect(mockFunction.mock.calls).toHaveLength(1)
    expect(mockFunction.mock.calls[0][0]).toEqual(testBlog)
});
