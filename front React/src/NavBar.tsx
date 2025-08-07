import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ShowModal from './ModalAddProduct';


function NavBar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Navbar className="bg-body-primary navbar">
      <Container>
        <DropdownButton id="dropdown-basic-button" title={<><TfiMenuAlt /> Menu</>} style={{ boxShadow:'10px 10px 10px rgba(29, 126, 253, 0.56)'}} className="card-hover">

          <Dropdown.Item as={Link} to="/">Produits </Dropdown.Item>
          <Dropdown.Item as={Link} to="/Cart">Panier </Dropdown.Item>
        </DropdownButton>
        <Navbar.Brand href="http://localhost:5174/"> </Navbar.Brand>
        <Navbar.Toggle />
        <ShowModal className="justify-content-center"/>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Link to="/cart">
              <Button variant="primary" style={{ boxShadow:'10px 10px 10px rgba(29, 126, 253, 0.56)'}} className="card-hover">
                <MdOutlineShoppingCart /> Panier{' '}
                {totalItems > 0 && (
                  <Badge bg="light" text="dark">{totalItems}</Badge>
                )}
              </Button>
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
