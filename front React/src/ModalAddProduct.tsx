import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

function ModalAddProduct(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async () => {
        const product = {
            title,
            description,
            price: Number(price),
            quantity: Number(quantity),
            image,
        };

        try {
            const response = await fetch('http://localhost:8000/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });

            const data = await response.json();
            alert(data.message || 'Produit ajouté avec succès');
            props.onHide(); // Ferme la modale
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit :", error);
        }
    };

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Ajoutez un produit
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="mb-3">
                        <Col xs={12}>
                            <input
                                type="text"
                                placeholder="URL de l'image"
                                className="form-control"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12}>
                            <input
                                type="text"
                                placeholder="Nom du produit"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12}>
                            <textarea
                                placeholder="Description"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={6}>
                            <input
                                type="number"
                                placeholder="Prix (€)"
                                className="form-control"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Col>
                        <Col xs={6}>
                            <input
                                type="number"
                                placeholder="Quantité"
                                min={0}
                                className="form-control"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleSubmit}>
                    Ajouter
                </Button>
                <Button variant="secondary" onClick={props.onHide}>
                    Annuler
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function ShowModal() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button variant="outline-success"  style={{ boxShadow:'10px 10px 10px rgba(40, 199, 0, 0.4)'}} onClick={() => setModalShow(true)} className="card-hover">
                Ajouter un produit
            </Button>

            <ModalAddProduct show={modalShow} onHide={() => setModalShow(false)} />
        </>
    );
}

export default ShowModal;
