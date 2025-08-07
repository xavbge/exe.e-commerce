import { useCart } from './CartContext';
import Button from 'react-bootstrap/Button';

function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mt-4 glow-text">
      <h2>Votre Panier</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.title}</strong> — {item.quantity} x {item.price} €
                </div>
                <Button variant="danger" onClick={() => removeFromCart(item._id)}>  Supprimer  </Button>
              </li>
            ))}
          </ul>
          <h4>Total : {total.toFixed(2)} €</h4>
        </>
      )}
    </div>
  );
}

export default CartPage;
