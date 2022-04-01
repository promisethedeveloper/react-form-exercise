import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const NewTodoForm = ({ addTodo }) => {
	const [task, setTask] = useState("");

	const handleChange = (e) => {
		setTask(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addTodo({ task, id: uuid() });
		setTask("");
	};

	return (
		<div>
			<h1>Task</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="task">Task:</label>
				<input
					id="task"
					type="text"
					name="task"
					value={task}
					onChange={handleChange}
				/>
				<button>Add Todo</button>
			</form>
		</div>
	);
};

export default NewTodoForm;
