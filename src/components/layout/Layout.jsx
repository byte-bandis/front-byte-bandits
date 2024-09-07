import Header from "../shared/Header";
import Footer from "../shared/Footer";
import PropTypes from "prop-types";
import ReplaceHeaderSpace from "../shared/ReplaceHeaderSpace";

const Layout = ({ children }) => {
  return (
    <>
      <ReplaceHeaderSpace></ReplaceHeaderSpace>
      <Header />
      {children}
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
