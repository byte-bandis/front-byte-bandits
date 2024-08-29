import Header from "../shared/Header";
import PropTypes from "prop-types";
import ReplaceHeaderSpace from "../shared/ReplaceHeaderSpace";

const Layout = ({ children }) => {
  return (
    <>
      <ReplaceHeaderSpace></ReplaceHeaderSpace>
      <Header />
      {children}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
