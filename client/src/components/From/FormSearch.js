import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormSearch = () => {
  const [values, setValues] = useSearch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      console.log(...values);
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormSearch;
