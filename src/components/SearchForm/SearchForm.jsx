import { useState } from "react";
import css from './SearchForm.module.css'
import clsx from 'clsx';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (evt) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSearch(query);
    setQuery("");
  };

  const btnClasses = clsx(
    css.item,
    css.btn
  );


  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        onChange={handleChange}
        autoComplete="off"
        autoFocus
        placeholder="Search movie..."
        value={query}
        className={css.item}
      />
      <button type="submit" className={btnClasses}>Submit</button>
    </form>
  );
};

export default SearchForm;
