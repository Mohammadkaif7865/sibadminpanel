import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from '../../Store';
import { BASE_URL } from '../../Constants';

function Nav() {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { adminInfo } = state;
  const navigate = useNavigate();

  const doLogout = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'ADMIN_SIGNOUT' });
    localStorage.removeItem('adminInfo');
    navigate("/");
  }

    return (
      <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a className="nav-item nav-link px-0 me-xl-4" href="#">
            <i className="bx bx-menu bx-sm"></i>
          </a>
        </div>

        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">

          <ul className="navbar-nav flex-row align-items-center ms-auto">

            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown">
                <div className="avatar avatar-online">
                  <img src={`${BASE_URL+adminInfo[0].image}`}  className="w-px-40 h-auto rounded-circle" />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img src={`${BASE_URL+adminInfo[0].image}`}  className="w-px-40 h-auto rounded-circle" />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-semibold d-block">{adminInfo[0].name}</span>
                        <small className="text-muted">{adminInfo[0].role}</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-cog me-2"></i>
                    <span className="align-middle">Settings</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={doLogout}>
                    <i className="bx bx-power-off me-2"></i>
                    <span className="align-middle">Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
}

export default Nav;
