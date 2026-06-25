import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCartContext } from "../context/CartContext";

// Cart page for quantity updates, removal, and checkout navigation.
function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCartContext();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="page-section">
      <div className="container">
        <h2 className="section-title text-center">Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-shopping-cart fa-5x text-muted mb-3"></i>
            <h4>Your cart is empty</h4>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-8">
              <div className="table-responsive cart-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        itemId={item.id}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-md-4">
              <div className="cart-summary">
                <h4 className="mb-4">Cart Summary</h4>
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal:</span>
                  <strong>₹{total.toFixed(2)}</strong>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping:</span>
                  <strong>Free</strong>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <h5>Total:</h5>
                  <h5>₹{total.toFixed(2)}</h5>
                </div>
                <button
                  className="btn btn-primary w-100 mb-2"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </button>
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPage;
