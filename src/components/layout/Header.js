import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { toast } from "react-hot-toast";
import SearchForm from "../Form/SearchForm";
import useCategory from "../../hooks/useCategory";
import { CartContext } from "../../context/cart";
import { Badge } from "antd";
const Header = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const categories = useCategory();
  const [cart, setCart] = useContext(CartContext);

  const handleOnClickLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfull!!");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-dark text-center text-white"
        id="navBar"
      >
        <Link className="navbar-brand" to="/">
          Brown Object
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <SearchForm />
            </li>
            <li className="nav-item">
              <Link
                className="nav-link common-link"
                aria-current="page"
                to="/"
                id="home"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <div className="dropdown">
                <Link
                  className="nav-link common-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  role="button"
                >
                  Categories
                </Link>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <Link
                      className="dropdown-item common-link"
                      to={`/categories`}
                    >
                      All categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item common-link"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link common-link">
                <Badge count={cart?.length} showZero>
                  <Link
                    className="nav-link common-link"
                    to="/cart"
                    id="features"
                  >
                    Cart
                  </Link>
                </Badge>
              </Link>
            </li>
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link common-link"
                    to="/register"
                    id="features"
                  >
                    SignUp
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link common-link"
                    to="/login"
                    id="features"
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <div className="dropdown" style={{ marginLeft: "10px" }}>
                  <button
                    className="btn btn-primary common-link dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <Link
                        className="dropdown-item common-link"
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item common-link"
                        to="/login"
                        onClick={handleOnClickLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
