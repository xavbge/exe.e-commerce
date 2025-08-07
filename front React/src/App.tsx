import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Cards from './Cards';
import ShowModal from './ModalAddProduct';
import { Routes, Route } from 'react-router-dom';
import CartPage from './CartPage';
import './App.css';
import StarField from './bg-stellar';


function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <h1 style={{color: 'white'}} className='d-flex justify-content-center glow-text mt-5'>SpaceShop</h1>
             <StarField />
            <Container className="mt-4 ">
                <hr />
               
                <hr />
                <hr />
                <Routes>
                    <Route path="/" element={<Cards />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
