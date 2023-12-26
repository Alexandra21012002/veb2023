import React from "react";
import "./button.css"

const Button = ({ onClick, disabled, text }) => {
	const buttonClass = text.toLowerCase() === "отменить" ? "btn-cancel" : "btn-add";

	return (
		<button className={buttonClass} disabled={disabled} onClick={onClick}>
			<p className="btn-add-text">{text}</p>
		</button>
	);

};

export default Button;
