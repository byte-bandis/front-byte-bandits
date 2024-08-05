import { useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Offcanvas from "react-bootstrap/Offcanvas";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const AccountMenu = () => {
	const [show, setShow] = useState(false);
	const userName = "userdemo";
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<Row>
				<Col className='d-flex justify-content-end'>
					<Button variant='primary' onClick={handleShow}>
						Account menu
					</Button>

					<Offcanvas show={show} onHide={handleClose}>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title>Menu Account</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Navbar className='bg-body-tertiary'>
								<Container>
									<Navbar.Brand href='/'>Brand link</Navbar.Brand>
								</Container>
							</Navbar>

							<Navbar className='bg-body-tertiary'>
								<Container>
									<Navbar.Brand>Brand text</Navbar.Brand>
								</Container>
							</Navbar>

							<Navbar className='bg-body-tertiary'>
								<Container>
									<Link to={`/${userName}/whishlist`}>Wishlist</Link>
								</Container>
							</Navbar>
							<Navbar className='bg-body-tertiary'>
								<Container>
									<Link to={`/${userName}/new`}>New</Link>
								</Container>
							</Navbar>
							<Navbar className='bg-body-tertiary'>
								<Container>
									<Link to={`/${userName}/delete-account`}>Delete account</Link>
								</Container>
							</Navbar>
						</Offcanvas.Body>
					</Offcanvas>
				</Col>
			</Row>
		</>
	);
};

export default AccountMenu;
