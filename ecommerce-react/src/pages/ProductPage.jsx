import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";

// Product browsing page that also handles category and single-product views.
function ProductPage() {
  const {
    productsData,
    categoriesData,
    selectedProduct,
    setSelectedProduct,
    addToCart,
  } = useCartContext();
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const pageMode =
    location.pathname === "/categories"
      ? "categories"
      : location.pathname === "/product"
        ? "product-view"
        : "products";

  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(500);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(
    selectedProduct?.images?.[0] || "",
  );

  const handleProtectedAddToCart = (product, count = 1) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }

    for (let index = 0; index < count; index += 1) {
      addToCart(product);
    }
  };

  useEffect(() => {
    let filtered = productsData;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    filtered = filtered.filter((item) => item.price <= Number(priceRange));
    setFilteredProducts(filtered);
  }, [productsData, selectedCategory, priceRange]);

  useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
      setMainImage(selectedProduct.images[0]);
    }
  }, [selectedProduct]);

  if (pageMode === "categories") {
    return (
      <section className="page-section">
        <div className="container">
          <h2 className="section-title text-center">Categories</h2>
          <p className="section-subtitle text-center">
            Browse products by category
          </p>

          <div className="row">
            {categoriesData.map((category) => (
              <div key={category.id} className="col-md-6 mb-4">
                <div
                  className="card category-card"
                  onClick={() => navigate("/products")}
                >
                  <img
                    src={category.image}
                    className="card-img-top"
                    alt={category.name}
                  />
                  <div className="card-body">
                    <h3 className="card-title">{category.name}</h3>
                    <p className="card-text">{category.description}</p>
                    <button className="btn btn-primary">Browse Category</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (pageMode === "product-view" && !selectedProduct) {
    return <Navigate to="/products" replace />;
  }

  if (pageMode === "product-view" && selectedProduct) {
    const relatedProducts = productsData
      .filter(
        (item) =>
          item.category === selectedProduct.category &&
          item.id !== selectedProduct.id,
      )
      .slice(0, 4);

    return (
      <section className="product-view-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4">
              <img
                src={mainImage}
                alt={selectedProduct.name}
                className="product-image-main"
              />
              <div className="product-thumbnails mt-3">
                {selectedProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${selectedProduct.name} ${index + 1}`}
                    className={mainImage === image ? "active" : ""}
                    onClick={() => setMainImage(image)}
                  />
                ))}
              </div>
            </div>

            <div className="col-md-6">
              <div className="product-details">
                <h1>{selectedProduct.name}</h1>
                <div className="product-rating mb-3">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`fas fa-star ${index < Math.floor(selectedProduct.rating) ? "" : "text-muted"}`}
                    ></i>
                  ))}
                  <span className="ms-2">({selectedProduct.rating} / 5)</span>
                </div>

                <h2 className="product-price">₹{selectedProduct.price}</h2>

                <div className="product-meta">
                  <p>
                    <strong>Category:</strong> {selectedProduct.category}
                  </p>
                  <p>
                    <strong>Availability:</strong>{" "}
                    <span className="text-success">In Stock</span>
                  </p>
                </div>

                <div className="product-description">
                  <h5>Description</h5>
                  <p>{selectedProduct.description}</p>
                </div>

                <div className="quantity-selector">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input type="number" value={quantity} readOnly />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>

                <button
                  className="btn btn-primary btn-lg w-100 mt-3"
                  onClick={() => {
                    handleProtectedAddToCart(selectedProduct, quantity);
                    if (isAuthenticated) {
                      alert("Added to cart!");
                    }
                  }}
                >
                  <i className="fas fa-shopping-cart me-2"></i>Add to Cart
                </button>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-4">Related Products</h3>
              <div className="row">
                {relatedProducts.map((product) => (
                  <div key={product.id} className="col-md-3 col-sm-6 mb-4">
                    <div className="card product-card">
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="product-price">₹{product.price}</p>
                        <button
                          className="btn btn-primary w-100"
                          onClick={() => {
                            setSelectedProduct(product);
                            window.scrollTo(0, 0);
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="container">
        <h2 className="section-title text-center">Our Products</h2>
        <p className="section-subtitle text-center">
          Browse our extensive collection
        </p>

        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="filter-sidebar">
              <div className="filter-section">
                <h5>Category Filter</h5>
                <div className="category-filter">
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value="All"
                      checked={selectedCategory === "All"}
                      onChange={(event) =>
                        setSelectedCategory(event.target.value)
                      }
                    />{" "}
                    All
                  </label>
                  {["Electronics", "Fashion", "Home", "Sports"].map(
                    (category) => (
                      <label key={category}>
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(event) =>
                            setSelectedCategory(event.target.value)
                          }
                        />{" "}
                        {category}
                      </label>
                    ),
                  )}
                </div>
              </div>

              <div className="filter-section">
                <h5>Price Range</h5>
                <div className="price-filter">
                  <input
                    type="range"
                    className="price-range-input"
                    min="0"
                    max="500"
                    value={priceRange}
                    onChange={(event) => setPriceRange(event.target.value)}
                  />
                  <p>Max: ₹{priceRange}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="row">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onView={() => {
                    setSelectedProduct(product);
                    navigate("/product");
                  }}
                  onAddToCart={() => handleProtectedAddToCart(product)}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-5">
                <h4>No products found</h4>
                <p>Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
