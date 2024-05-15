import { Link } from "react-router-dom";

function Footer() {
    return (
      <footer className="content-footer footer bg-footer-theme">
        <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
          <div className="mb-2 mb-md-0">
            ©2022 <a target="_blank" href="https://www.sibinfotech.com" target="_blank" className="footer-link fw-bolder">SIB Infotech</a>
          </div>

        </div>
      </footer>
    );
}

export default Footer;
