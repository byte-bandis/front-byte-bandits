import Header from "../shared/Header";
import Footer from "../shared/Footer";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="layout" >
     
      <Header />
      {children}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
