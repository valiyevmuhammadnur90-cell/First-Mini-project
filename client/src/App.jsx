import { useState, useEffect } from "react";
import { getAll, create, update, deleteProduct } from "./service/services";

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAll();
      setProducts(data);
    } catch (error) {
      console.error("Ma'lumotni yuklashda xatolik:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    const productData = {
      name: formData.name,
      price: Number(formData.price),
    };

    try {
      if (editId) {
        const updatedData = await update(editId, productData);
        setProducts(products.map((p) => (p._id === editId ? updatedData : p)));

        setEditId(null);
      } else {
        const newData = await create(productData);
        setProducts([...products, newData]);
      }

      setFormData({ name: "", price: "" });
    } catch (error) {
      console.error("Saqlashda xatolik:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("O'chirishda xatolik");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
    });

    setEditId(product._id);
  };

  return (
    <div className="container">
      <h1>Fullstack CRUD</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Product name"
          value={formData.name || ""}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price || ""}
          onChange={handleChange}
        />
        <button type="submit">
          {editId ? "Update Product" : "Add Product"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setFormData({ name: "", price: "" });
            }}
            style={{ backgroundColor: "gray", marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>

      <div className="products">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="card" key={product.id}>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <div className="btns">
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button
                  className="delete"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Empty data.</p>
        )}
      </div>
    </div>
  );
}

export default App;
