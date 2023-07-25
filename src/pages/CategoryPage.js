import React from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import "../styles/CategoryPage.css";

const CategoryPage = () => {
  const categories = useCategory();

  return (
    <Layout title={"All-categories"}>
      <div className="container">
        <div className="row py-3 px-2">
          {categories?.map((c) => (
            <div className="col-md-4 col-sm-6" key={c._id}>
              <Link to={`/category/${c.slug}`}>
                <div
                  className="card "
                  id="categoryCard"
                  style={{
                    backgroundImage: `url(/images/wooden-background.jpg)`,
                  }}
                >
                  <div className="card-body" id="categorycard-body">
                    <h3 id="card-title">{c.name}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
