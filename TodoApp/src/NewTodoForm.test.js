import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm";

it("should render without crashing", () => {
	render(<NewTodoForm />);
});

it("should match snapshot", () => {
	const { asFragment } = render(<NewTodoForm />);
	expect(asFragment).toMatchSnapshot();
});

it("should run the create todo function when form is submitted", () => {
	const createMock = jest.fn();
	const { getByText } = render(<NewTodoForm addTodo={createMock} />);
	const createButton = getByText("Add Todo");
	fireEvent.click(createButton);
	expect(createMock).toHaveBeenCalled();
});
