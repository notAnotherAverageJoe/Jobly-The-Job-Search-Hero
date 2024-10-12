import React, { useState } from "react";

const SearchForm = ({ searchFunction }) => {
  const INITIAL_STATE = { search: "Enter search term..." };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchFunction(formData);
    setFormData(INITIAL_STATE);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search"></label>
      <br />
      <input
        id="search"
        name="search"
        value={formData.search}
        onChange={handleChange}
      />
      <br />

      <button>Search</button>
    </form>
  );
};
export default SearchForm;
