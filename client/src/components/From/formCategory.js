import React from "react";

const formCategory = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="nhập category mới"
              /* ????? */
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default formCategory;
