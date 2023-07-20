import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProducts = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();

  //get all category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
      console.log(category);
    } catch (error) {
      console.log(error);
      toast.error("Error showing categories!!");
    }
  };

  useEffect(() => {
    getAllCategories();
    //eslint-disable-next-line
  }, []);

  //create Product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product created successfully!!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating product!!");
    }
  };

  return (
    <>
      <Layout title={"Dashboard-Products"}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu></AdminMenu>
          </div>
          <div className="col-md-9">
            <h1>Create Products</h1>
            <div className="m-1 w-75">
              {/*Select category*/}
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/*Pic Upload*/}

              <div className="mb-3">
                <label className="btn btn-outline-secondary">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  ></input>
                </label>
                <div className="mb-3">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      ></img>
                    </div>
                  )}
                </div>
              </div>
              {/*Product Name*/}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Write Product Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              {/*Product description*/}
              <div className="mb-3">
                <textarea
                  type="text"
                  placeholder="Write Product Description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              {/*Product Price*/}
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Write Product Price"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
              {/*Product Quantity*/}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Write Product Quantity"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                ></input>
              </div>
              {/*Product Shipping*/}
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Product Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProducts;
