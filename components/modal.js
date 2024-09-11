// components/Modal.js
const Modal = ({ product, onClose }) => {
    if (!product) return null;
  
    return (
      <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 w-1/2">
          <button className="mb-4" onClick={onClose}>Close</button>
          <h1>{product.title}</h1>
          <img src={product.image} alt={product.title} className="w-full h-60 object-cover" />
          <p>{product.description}</p>
          <p>Price: {product.price} USD</p>
          <p>Category: {product.category}</p>
          <p>Rating: {product.rating.rate} / 5</p>
        </div>
      </div>
    );
  };
  
  export default Modal;
  