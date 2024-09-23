import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../../Store";

function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { adminInfo } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminInfo) {
      navigate("/");
    }
  }, [navigate, adminInfo]);

  const [isActives, setActives] = useState({
    categories: false,
    services: false,
    enquiries: false,
    careers: false,
  });

  const toggleDropdown = (menu) => {
    switch (menu) {
      case "services":
        setActives({ ...isActives, services: !isActives.services });
        break;
      case "blogs":
        setActives({ ...isActives, blogs: !isActives.blogs });
        break;
      case "enquiries":
        setActives({ ...isActives, enquiries: !isActives.enquiries });
        break;
      case "careers":
        setActives({ ...isActives, careers: !isActives.careers });
        break;
      case "categories":
        setActives({ ...isActives, categories: !isActives.categories });
        break;
      default:
        setActives(isActives);
    }
  };

  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme"
    >
      <div className="app-brand demo">
        <Link to="/dashboard" className="app-brand-link">
          <span className="app-brand-logo demo">
            <img src="/sibms/images/logo.png" class="img-fluid rounded-top" alt="" />
          </span>
          {/* <span className="app-brand-text demo menu-text fw-bolder ms-2">SIB Infotech</span> */}
        </Link>

        <a
          href="#"
          className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
        >
          <i className="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
      </div>

      <div className="menu-inner-shadow"></div>
      <hr/>

      <ul className="menu-inner py-1 mt-3">
        <li className="menu-item">
          <Link to="/dashboard" className="menu-link">
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <div data-i18n="Analytics">Dashboard</div>
          </Link>
        </li>

        {adminInfo[0].can_access.split(",").includes("CategoryManage") && (
          <li className="menu-item">
            <Link to="/category" className="menu-link">
              <i className="menu-icon tf-icons bx bx-star"></i>
              <div data-i18n="Categories">Categories</div>
            </Link>
          </li>
        )}

        {adminInfo[0].can_access.split(",").includes("BlogManage") && (
          <li className="menu-item">
            <Link to="/blog" className="menu-link">
              <i className="menu-icon tf-icons bx bx-star"></i>
              <div data-i18n="Blogs">Blogs</div>
            </Link>
          </li>
        )}

        {adminInfo[0].can_access.split(",").includes("EnquiryManage") && (
          <li className="menu-item">
            <Link to="/enquiry" className="menu-link">
              <i className="menu-icon tf-icons bx bx-star"></i>
              <div data-i18n="Enquiries">Enquiries</div>
            </Link>
          </li>
        )}

        {adminInfo[0].can_access.split(",").includes("CareerManage") && (
          <li className="menu-item">
            <Link to="/career" className="menu-link">
              <i className="menu-icon tf-icons bx bx-star"></i>
              <div data-i18n="Careers">Career Forms</div>
            </Link>
          </li>
        )}

        {adminInfo[0].can_access.split(",").includes("UserManage") && (
          <li className="menu-item">
            <Link to="/user" className="menu-link">
              <i className="menu-icon tf-icons bx bx-star"></i>
              <div data-i18n="Users">Users</div>
            </Link>
          </li>
        )}

        {/*<li className={`menu-item ${ isActives.categories ? 'open' : '' }`} onClick={(e) => {e.preventDefault(); toggleDropdown('categories');}}>
            <a href="#" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-star"></i>
              <div data-i18n="Categories">Categories</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <Link to="/category/add" className="menu-link">
                  <div data-i18n="Without menu">Add</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/category" className="menu-link">
                  <div data-i18n="Without navbar">Manage</div>
                </Link>
              </li>
            </ul>
          </li>

          <li className={`menu-item ${ isActives.blogs ? 'open' : '' }`} onClick={(e) => {e.preventDefault(); toggleDropdown('blogs');}}>
            <a href="#" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-star"></i>
              <div data-i18n="Blogs">Blogs</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <Link to="/blog/add" className="menu-link">
                  <div data-i18n="Without menu">Add</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/blog" className="menu-link">
                  <div data-i18n="Without navbar">Manage</div>
                </Link>
              </li>
            </ul>
          </li>*/}

        {/*<li className={`menu-item ${ isActives.services ? 'open' : '' }`} onClick={(e) => {e.preventDefault(); toggleDropdown('services');}}>
            <a href="#" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-star"></i>
              <div data-i18n="Services">Services</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <Link to="/service/add" className="menu-link">
                  <div data-i18n="Without menu">Add</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/service" className="menu-link">
                  <div data-i18n="Without navbar">Manage</div>
                </Link>
              </li>
            </ul>
          </li>*/}

        {/*<li className={`menu-item ${ isActives.enquiries ? 'open' : '' }`} onClick={(e) => {e.preventDefault(); toggleDropdown('enquiries');}}>
            <a href="#" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-star"></i>
              <div data-i18n="Enquiries">Enquiries</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <Link to="/enquiry" className="menu-link">
                  <div data-i18n="Without navbar">Manage</div>
                </Link>
              </li>
            </ul>
          </li>

          <li className={`menu-item ${ isActives.careers ? 'open' : '' }`} onClick={(e) => {e.preventDefault(); toggleDropdown('careers');}}>
            <a href="#" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-star"></i>
              <div data-i18n="Careers">Career Forms</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <Link to="/career" className="menu-link">
                  <div data-i18n="Without navbar">Manage</div>
                </Link>
              </li>
            </ul>
          </li>*/}
      </ul>
    </aside>
  );
}

export default Header;
