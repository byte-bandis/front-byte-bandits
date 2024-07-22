import Table from "react-bootstrap/Table";
import { Pencil, Eye, Trash3 } from "react-bootstrap-icons";
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
                                <div className="d-flex gap-2">
                                    <Button variant='outline-primary'>
                                        <Pencil size={18} />
                                    </Button>
                                    <Button variant='outline-primary'>
                                        <Eye size={18} />
                                    </Button>
                                    <Button variant='outline-primary'>
                                        <Trash3 size={18} />
                                    </Button>
                                </div>
							</td>
						</tr>
					</tbody>
				</Table>
			</>
		);
};

export default ProductList;
