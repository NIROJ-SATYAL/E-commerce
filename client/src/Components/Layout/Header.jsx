import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const handlelogOut = () => {
    setAuth({ ...auth, user: null, token: null });
    localStorage.removeItem("auth");
  };
  return (
    <div style={{ minheight: '"10vh"' }}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            logo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              {/* xuttai category page banaunai baki xa  */}

           
               
                
                
                {/* <li className="nav-item">
                <NavLink to="/categories" className="nav-link">
                  Categories
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink to="/user/cart" className="nav-link position-relative">
                  Cart
                  <span class="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-primary ">
                    {cart.length}
                  </span>
                </NavLink>
              </li>
            
            
              

              {auth?.user ? (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to={
                          auth?.user?.role === true
                            ? "/admin-dashboard"
                            : "user-dashboard"
                        }
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/login"
                        onClick={handlelogOut}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
