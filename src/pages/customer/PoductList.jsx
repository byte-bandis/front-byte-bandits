import Table from "react-bootstrap/Table";
import { Pencil, Eye } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
const ProductList = () => {
    return (
			<>
				<h3>My products</h3>
				<Table responsive>
					<thead>
						<tr>
							<th>#</th>
							<th>Image</th>
							<th>Name</th>
							<th>Price</th>
							<th>State</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>
								<img src='https://via.placeholder.com/100' alt='Product 1' />
							</td>
							<td>Product 1</td>
							<td>100</td>
							<td>Sale</td>
							<td>
								<Button variant='outline-primary'>
									<Pencil size={20} />
								</Button>
								<Button variant='outline-primary'>
									<Eye size={20} />
								</Button>
							</td>
						</tr>
					</tbody>
				</Table>
			</>
		);
};

export default ProductList;
