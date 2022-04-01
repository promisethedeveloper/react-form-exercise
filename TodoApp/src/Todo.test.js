import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Todo from "./Todo";

it("should render without crashing", () => {
	render(<Todo />);
});

it("should match snapshot", () => {
	const { asFragment } = render(<Todo />);
	expect(asFragment()).toMatchSnapshot();
});

it("should match snapshot when editing", () => {
	const { asFragment, getByText } = render(<Todo />);
	const editButton = getByText("Edit");
	fireEvent.click(editButton);
	expect(asFragment()).toMatchSnapshot();
});

it("should run the update function on form submission", () => {
	const updateMock = jest.fn();
	const { getByText } = render(<Todo update={updateMock} />);
	const editButton = getByText("Edit");
	fireEvent.click(editButton);
	const updateButton = getByText("Update!");
	fireEvent.click(updateButton);
	expect(updateMock).toHaveBeenCalled();
});

it("should run the delete function on button click", () => {
	const removeMock = jest.fn();
	const { getByText } = render(<Todo remove={removeMock} />);
	const deleteButton = getByText("X");
	fireEvent.click(deleteButton);
	expect(removeMock).toHaveBeenCalled();
});
