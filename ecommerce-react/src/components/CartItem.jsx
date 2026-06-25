// Single cart row displayed inside the cart table.
function CartItem({ item, itemId, onUpdateQuantity, onRemove }) {
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img
            src={item.image}
            alt={item.name}
            className="cart-item-img me-3"
          />
          <div>
            <h6>{item.name}</h6>
            <small className="text-muted">{item.category}</small>
          </div>
        </div>
      </td>
      <td>₹{item.price}</td>
      <td>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onUpdateQuantity(itemId, item.quantity - 1)}
          >
            -
          </button>
          <span className="mx-3">{item.quantity}</span>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onUpdateQuantity(itemId, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </td>
      <td>₹{(item.price * item.quantity).toFixed(2)}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onRemove(itemId)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
