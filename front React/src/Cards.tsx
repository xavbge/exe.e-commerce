import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import UpdateModale from './UpdateModale';
import { useCart } from './CartContext';

interface Product {
    _id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
}

const Cards: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [quantity, setQuantity] = useState<{ [key: number]: number }>({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const [modalShow, setModalShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8000/products/');
            const data = await response.json();
            setProducts(data);

            const initialQuantity: { [key: number]: number } = {};
            data.forEach((product: Product) => {
                initialQuantity[product._id] = 1;
            });
            setQuantity(initialQuantity);
        } catch (error) {
            console.error('Erreur lors du chargement des produits :', error);
        }
    };

    const handleAddToCart = (product: Product) => {
        const quantityValue = quantity[product._id] || 1;
        addToCart({
            _id: product._id,
            title: product.title,
            price: product.price,
            quantity: quantityValue,
            thumbnail: product.thumbnail,
        });
    };

    const handleChange = (productId: number, value: number) => {
        setQuantity((prev) => ({
            ...prev,
            [productId]: value < 1 ? 1 : value,
        }));
    };

    const handleDelete = async (productId: number) => {
        if (!window.confirm('Confirmer la suppression du produit ?')) return;
        try {
            await fetch(`http://localhost:8000/products/delete/${productId}`, {
                method: 'DELETE',
            });
            setProducts(products.filter(p => p._id !== productId));
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setModalShow(true);
    };

  
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <>
            <div className="d-flex flex-wrap gap-5 justify-content-center">
                {currentProducts.map((product) => {
                    const quantit = quantity[product._id] || 1;
                    const totalPrice = product.price * quantit;

                    return (
                        <Card key={product._id} className="card-hover" style={{ width: '18rem', border:'1px solid black',
                             boxShadow:'10px 10px 10px rgba(255, 251, 0, 0.53)',
                         borderRadius:'10px' }} >
                            <Card.Img variant="top" src={product.thumbnail}  style={{ boxShadow:'5px 5px 5px rgba(0, 0, 0, 0.09)'}} />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    {product.description}
                                    <hr />
                                    Prix unitaire : {product.price} €
                                    <br />
                                    Quantité :
                                    <input
                                        type="number"
                                        min={1}
                                        value={quantit}
                                        onChange={(e) =>
                                            handleChange(product._id, parseInt(e.target.value, 10))
                                        }
                                        style={{ width: '60px', marginLeft: '10px' }}
                                    />
                                    <br />
                                    <strong>Total : {totalPrice} €</strong>
                                </Card.Text>
                                <hr />
                                <div className='d-flex flex-column gap-2' >
                                    <Button variant="primary" className="card-hover" style={{ boxShadow:'10px 10px 10px rgba(0, 68, 255, 0.4)'}} onClick={() => handleAddToCart(product)}>Ajouter au panier</Button>
                                    <Button variant="warning" className="card-hover" style={{ boxShadow:'10px 10px 10px rgba(255, 251, 0, 0.42)'}} onClick={() => handleEdit(product)}>Modifier</Button>
                                    <Button variant="danger" className="card-hover" style={{ boxShadow:'10px 10px 10px rgba(255, 0, 0, 0.4)'}} onClick={() => handleDelete(product._id)}>Supprimer</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
<hr />
            <div className="d-flex justify-content-center mt-4">
                <Pagination>{paginationItems}</Pagination>
            </div>

            <UpdateModale
                show={modalShow}
                onHide={() => setModalShow(false)}
                product={selectedProduct}
                onUpdate={fetchProducts}
            />
        </>
    );
};

export default Cards;
