import Header from "../header/Header";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
