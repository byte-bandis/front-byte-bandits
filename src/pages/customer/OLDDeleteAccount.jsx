import { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";

const DeleteAccount = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<Container>
				<h1>Delete Account</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur unde
					dolores laborum odit, corrupti praesentium fuga incidunt omnis enim.
					Neque, illum dolorum. Velit veritatis eius enim natus iste accusantium
					eveniet.
				</p>
				<Button variant='danger' onClick={handleShow}>
					Delete Account
				</Button>

				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							Close
						</Button>
						<Button variant='danger' onClick={handleClose}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			</Container>
		</>
	);
};

export default DeleteAccount;
