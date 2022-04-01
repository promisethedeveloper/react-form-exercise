import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const NewBoxForm = ({ addBox }) => {
	const initialState = {
		width: "",
		height: "",
		backgroundColor: "",
	};
	const [formData, setFormData] = useState(initialState);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		addBox({ ...formData, id: uuid() });
		setFormData(initialState);
	};
	return (
		<div>
			<h1>Create a new box</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="width">Width</label>
				<input
					id="width"
					type="text"
					name="width"
					placeholder="Box width"
					value={formData.width}
					onChange={handleChange}
				/>
				<label htmlFor="height">Height</label>
				<input
					id="height"
					type="text"
					name="height"
					placeholder="Box height"
					value={formData.height}
					onChange={handleChange}
				/>
				<label htmlFor="backgroundColor">Background color</label>
				<input
					id="backgroundColor"
					type="text"
					name="backgroundColor"
					placeholder="Box backgroundColor"
					value={formData.backgroundColor}
					onChange={handleChange}
				/>
				<button>Add Box</button>
			</form>
		</div>
	);
};

export default NewBoxForm;
