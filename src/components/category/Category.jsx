import React, { useState } from "react";
import "./style.css";

const initialFields = {
  name: "",
  color: "#000000",
};

function Category(props) {
  const [fields, setFields] = useState(initialFields);

  function handleChange(event) {
    setFields({
      ...fields,
      [event.target.name]:event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(fields)
    props.addCategory(fields);
    setFields(initialFields)
  }

  return (
    <div className="category-div">
      <form className="category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={fields.name}
          onChange={handleChange}
          className="category-text"
          placeholder="Create new category?"
        />
        <input
          type="color"
          name="color"
          value={fields.color}
          onChange={handleChange}
          className="category-color"
        />
        <button type="submit" className="category-btn">
          <i className="fas fa-plus"></i>
        </button>
      </form>
    </div>
  );
}

export default Category;
