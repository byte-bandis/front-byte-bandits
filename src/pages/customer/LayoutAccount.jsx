import { Outlet } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import { Container, Row } from "react-bootstrap";

const LayoutAccount = () => {
	return (
		<>
			<Container>
				<Row>
					<AccountMenu />
					<Outlet />
				</Row>
			</Container>
		</>
	);
};

export default LayoutAccount;
