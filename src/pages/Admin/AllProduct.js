import Layout from "../../components/layout/Layout";
import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/AdminProducts.css";
const AllProduct = () => {
  const [products, setProducts] = useState([]);

  //all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product`);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error displaying products!!");
    }
  };

  useEffect(() => {
    getAllProducts();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Layout title={"Dashboard-All Products"}>
        <div className="container-flui p-3 m-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu></AdminMenu>
            </div>
            <div className="col-md-9 product-container">
              <div className="card-container">
                <h2>Products</h2>
                <div className="d-flex flex-wrap">
                  {products?.map((p) => (
                    <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id}>
                      <div className="product-card">
                        <div className="card" style={{ width: "18rem" }}>
                          <img
                            className="card-img-top"
                            src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                            alt={p.name}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AllProduct;
