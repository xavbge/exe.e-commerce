import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface Product {
    _id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
}

interface ModalEditProductProps {
    show: boolean;
    onHide: () => void;
    product: Product | null;
    onUpdate: () => void;
}

const UpdateModale: React.FC<ModalEditProductProps> = ({ show, onHide, product, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setDescription(product.description);
            setPrice(product.price.toString());
            setThumbnail(product.thumbnail);
        }
    }, [product]);

    const handleUpdate = async () => {
        if (!product) return;
        const updatedProduct = {
            title,
            description,
            price: Number(price),
            thumbnail,
        };

        try {
            await fetch(`http://localhost:8000/products/update/${product._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            alert('Produit mis à jour avec succès !');
            onUpdate(); // Refresh list
            onHide();   // Close modal
        } catch (error) {
            console.error('Erreur lors de la mise à jour :', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Modifier le produit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Label>Prix (€)</Form.Label>
                        <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Label>Image (URL)</Form.Label>
                        <Form.Control type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Annuler</Button>
                <Button variant="success" onClick={handleUpdate}>Sauvegarder</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateModale;
