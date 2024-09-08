import Header from "../shared/Header";
import Footer from "../shared/Footer";
import PropTypes from "prop-types";
import ReplaceHeaderSpace from "../shared/ReplaceHeaderSpace";

const Layout = ({ children }) => {
  return (
    <div className="layout" >
      <ReplaceHeaderSpace></ReplaceHeaderSpace>
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
