import React, { useState } from "react";
import "./style.css";

function Form(props) {
  const initialFields = {
    name: "",
    date: "",
    dateSort: "",
    category: "",
    isCompleted: false,
    isPrioritary: false,
    isLate: false,
    id: "",
  };
  const [fields, setFields] = useState(initialFields);

  function handleChange(event) {
  
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
      id: Math.random()*1000,
    });
  }


  function handleSubmit(event) {
    event.preventDefault();
    props.addTodo(fields);
    setFields(initialFields);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="form-text"
        type="text"
        placeholder="What do you need to do?"
        name="name"
        value={fields.name}
        onChange={handleChange}
      />
      <input
        className="form-date"
        type="date"
        name="date"
        value={fields.date}
        id=""
        onChange={handleChange}
      />
      <select
        className="form-select"
        name="category"
        id=""
        value={fields.category}
        onChange={handleChange}
      >
        {props.categories.map((ctg, index)=>(
          <option key={index} value={ctg.name} className="form-select-option">{ctg.name}</option>
        ))}
      </select>
      <button className="form-button" type="submit" value="submit">
        <i className="fas fa-plus"></i>
      </button>
    </form>
  );
}

export default Form
