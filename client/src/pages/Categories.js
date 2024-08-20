import Layout from "../components/Layout/Layout";
import React from "react";
import { useState, useEffect } from "react";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Category"}>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3">
              <Link
                className="text-white btn btn-primary"
                to={`/categories/${c.slug}`}
              >
                {c.name}{" "}
              </Link>{" "}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
