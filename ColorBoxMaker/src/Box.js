import React from "react";

const Box = ({
	id,
	backgroundColor = "orangered",
	width = 10,
	height = 10,
	handleRemove,
}) => {
	const remove = () => handleRemove(id);
	return (
		<>
			<div
				style={{
					backgroundColor: backgroundColor,
					width: `${width}em`,
					height: `${height}em`,
				}}
			></div>
			<button onClick={remove}>Remove Box</button>
		</>
	);
};

export default Box;
