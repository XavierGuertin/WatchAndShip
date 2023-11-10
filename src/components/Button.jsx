import React from "react";

const Button = ({ styles }) => (
    <button type="button"
        className={`quoteButton py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
        Get a Quote
    </button>
);

export default Button;
