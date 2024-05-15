import { Link } from "react-router-dom";

import Header from './include/Header';
import Nav from './include/Nav';
import Footer from './include/Footer';

function Dashboard({children}) {
    return (
      <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">

        <Header />

      <div className="layout-page">

      <Nav />

        <div className="content-wrapper">

        <div className="container-xxl flex-grow-1 container-p-y">
          {children}
        </div>

      <Footer />

        <div className="content-backdrop fade"></div>
      </div>
    </div>
    </div>
    <div className="layout-overlay layout-menu-toggle"></div>
  </div>

    );
}

export default Dashboard;
