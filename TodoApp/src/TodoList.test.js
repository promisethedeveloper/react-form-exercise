import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

const addTodo = (todoList, task = "Practice coding") => {
	const taskInput = todoList.getByLabelText("Task:");
	fireEvent.change(taskInput, { target: { value: task } });
	const submitButton = todoList.getByText("Add Todo");
	fireEvent.click(submitButton);
};

it("should render without crashing", () => {
	render(<TodoList />);
});

it("should match snapshot", () => {
	const { asFragment } = render(<TodoList />);
	expect(asFragment()).toMatchSnapshot();
});

it("should add a todo", () => {
	const list = render(<TodoList />);
	addTodo(list);

	expect(list.getByLabelText("Task:")).toHaveValue("");
	expect(list.getByText("Practice coding")).toBeInTheDocument();
	expect(list.getByText("Edit")).toBeInTheDocument();
	expect(list.getByText("X")).toBeInTheDocument();
});

it("should edit a todo", () => {
	const list = render(<TodoList />);
	addTodo(list);

	fireEvent.click(list.getByText("Edit"));
	const editInput = list.getByDisplayValue("Practice coding");
	fireEvent.change(editInput, { target: { value: "Read a book" } });
	fireEvent.click(list.getByText("Update!"));

	// expect only edited todo to appear
	expect(list.getByText("Read a book")).toBeInTheDocument();
	expect(list.queryByText("Practice coding")).not.toBeInTheDocument();
});

it("should delete a todo", () => {
	const list = render(<TodoList />);
	addTodo(list);

	fireEvent.click(list.getByText("X"));

	// expect todo to be deleted
	expect(list.queryByText("Practice coding")).not.toBeInTheDocument();
});
