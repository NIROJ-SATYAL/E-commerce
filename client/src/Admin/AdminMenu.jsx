import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center">
      <h1>Admin Pannel</h1>
      <div className="list-group">
        <NavLink
          to="/admin-dashboard/create-category"
          className="list-group-item list-group-item-action"
        >
          Create Category
        </NavLink>

        <NavLink
          to="/admin-dashboard/create-product"
          className="list-group-item list-group-item-action"
        >
          Create Products
        </NavLink>
        <NavLink
          to="/admin-dashboard/product-list"
          className="list-group-item list-group-item-action"
        >
          Product List
        </NavLink>

        <NavLink
          to="/admin-dashboard/user"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
