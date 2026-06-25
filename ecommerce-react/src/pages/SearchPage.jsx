import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

function SearchPage() {
  const { productsData, setSelectedProduct, addToCart } = useCartContext();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return productsData;

    return productsData.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized) ||
        product.description.toLowerCase().includes(normalized)
      );
    });
  }, [productsData, query]);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    navigate("/product");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card p-4">
            <h1>Search Products</h1>
            <p>Type a keyword to find products by name, category, or description.</p>

            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            {results.length === 0 ? (
              <div className="alert alert-warning" role="alert">
                No products matched your search.
              </div>
            ) : (
              <div className="row">
                {results.map((product) => (
                  <div key={product.id} className="col-md-6 mb-4">
                    <div className="card h-100">
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.name}
                        style={{ maxHeight: 220, objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5>{product.name}</h5>
                        <p className="mb-2 text-muted">{product.category}</p>
                        <p className="mb-3">{product.description}</p>
                        <div className="mt-auto">
                          <p className="h5">₹{product.price}</p>
                          <button
                            className="btn btn-outline-primary me-2"
                            onClick={() => handleViewProduct(product)}
                          >
                            View
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
