import { useState } from "react";
import "./index.css";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Iphone 15", price: 1200 },
    { id: 2, name: "Samsung S24", price: 1000 },
  ]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price) return;

    if (editId) {
      const updatedProducts = products.map((product) =>
        product.id === editId ? { ...product, name, price } : product,
      );

      setProducts(updatedProducts);
      setEditId(null);
    } else {
      const newProduct = {
        id: Date.now(),
        name,
        price,
      };

      setProducts([...products, newProduct]);
    }

    setName("");
    setPrice("");
  };

  const handleDelete = (id) => {
    const filtered = products.filter((product) => product.id !== id);
    setProducts(filtered);
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setEditId(product.id);
  };

  return (
    <div className="container">
      <h1>Product CRUD</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="products">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>

            <div className="btns">
              <button onClick={() => handleEdit(product)}>Edit</button>

              <button
                className="delete"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
