import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action list-group-item-primary"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action list-group-item-primary"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action list-group-item-primary"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action list-group-item-primary"
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/profile"
            className="list-group-item list-group-item-action list-group-item-primary"
          >
            Profile
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
