import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// Central store for cart, product selection, and order tracking.
const CartContext = createContext(null);
const CART_STORAGE_KEY = "easybuy_cart";

const getInitialCart = () => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart);
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
};

// Product catalog used across the app.
const productsData = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    rating: 4.5,
    description:
      "Premium wireless headphones with noise cancellation and superior sound quality.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
    ],
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    rating: 4.8,
    description: "Advanced smartwatch with health tracking and notifications.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop",
    ],
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 89.99,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    rating: 4.3,
    description:
      "Comfortable running shoes with excellent cushioning and support.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop",
    ],
  },
  {
    id: 4,
    name: "Coffee Maker",
    price: 129.99,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
    rating: 4.6,
    description: "Programmable coffee maker with multiple brewing options.",
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
    ],
  },
  {
    id: 5,
    name: "Laptop Backpack",
    price: 49.99,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    rating: 4.4,
    description: "Durable laptop backpack with multiple compartments.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    ],
  },
  {
    id: 6,
    name: "Desk Lamp",
    price: 39.99,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    rating: 4.2,
    description: "Modern LED desk lamp with adjustable brightness.",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    ],
  },
  {
    id: 7,
    name: "Yoga Mat",
    price: 29.99,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&h=500&fit=crop",
    rating: 4.7,
    description: "Non-slip yoga mat for all types of exercises.",
    images: [
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&h=500&fit=crop",
    ],
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    price: 59.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    rating: 4.5,
    description: "Portable Bluetooth speaker with amazing sound quality.",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    ],
  },
];

// Category list used by home and category views.
const categoriesData = [
  {
    id: 1,
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=300&fit=crop",
    description: "Latest gadgets and electronic devices",
  },
  {
    id: 2,
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=300&fit=crop",
    description: "Trendy clothing and accessories",
  },
  {
    id: 3,
    name: "Home",
    image:
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&h=300&fit=crop",
    description: "Home decor and furniture",
  },
  {
    id: 4,
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop",
    description: "Sports equipment and gear",
  },
];

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getInitialCart);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find((item) => item.id === product.id);

      if (existingItem) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== productId),
    );
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      setCart((previousCart) =>
        previousCart.filter((item) => item.id !== productId),
      );
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        productsData,
        categoriesData,
        cart,
        cartCount,
        selectedProduct,
        orderNumber,
        setSelectedProduct,
        setOrderNumber,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within CartProvider");
  }

  return context;
}
