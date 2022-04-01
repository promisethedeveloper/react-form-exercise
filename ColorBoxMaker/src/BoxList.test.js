import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

const addBox = (boxList, height = "5", width = "5", color = "brown") => {
	const heightInput = boxList.getByLabelText("Height");
	const widthInput = boxList.getByLabelText("Width");
	const backgroundInput = boxList.getByLabelText("Background color");
	fireEvent.change(backgroundInput, { target: { value: color } });
	fireEvent.change(widthInput, { target: { value: width } });
	fireEvent.change(heightInput, { target: { value: height } });
	const button = boxList.getByText("Add Box");
	fireEvent.click(button);
};

it("should render without crashing", () => {
	render(<BoxList />);
});

it("should match snapshot", () => {
	const { asFragment } = render(<BoxList />);
	expect(asFragment()).toMatchSnapshot();
});

it("should add a new box", () => {
	const boxList = render(<BoxList />);

	// no boxes in the DOM yet
	expect(boxList.queryByText("Remove Box")).not.toBeInTheDocument();

	addBox(boxList);

	// expect a box to be in the DOM
	const removeButton = boxList.getByText("Remove Box");
	expect(removeButton).toBeInTheDocument();
	expect(removeButton.previousSibling).toHaveStyle(`
    width: 5em;
    height: 5em; 
    background-color: brown
    `);
});

it("should remove a box", () => {
	const boxList = render(<BoxList />);
	addBox(boxList);
	const removeButton = boxList.getByText("Remove Box");

	// click the removeButton and the box should not be in the document
	fireEvent.click(removeButton);
	expect(removeButton).not.toBeInTheDocument();
});
