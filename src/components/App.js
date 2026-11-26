import { useState } from "react";

// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: true },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ itemsProp, setItemsProp }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false
    };

    handleAddItem(newItem);

    setItemsProp((prevItems) => [...prevItems, newItem]);

    setDescription("");
    setQuantity(1);
  }

  function handleAddItem(item) {  
    setItemsProp((prevItems) => [...prevItems, item]);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

       <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <input type="text" placeholder="Item name..." value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit" onClick={handleAddItem}>Add</button>
    </form>
  );
}

function Items({ item }) {
  return (
    <li style={{ 
      textDecoration: item.packed ? "line-through" : "none" 
      }}>
      {item.description} {item.quantity}
    </li>
  );
}

function PackingList({ itemsProp }) {
  return (
    <div className="list">
      <ul>
        {itemsProp.map((item) => (
          <Items key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function Stats({ itemsProp }) {
  const numItems = itemsProp.length;
  const numPacked = itemsProp.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>You have {numItems} items in the list. You already packed {numPacked} ({percentage}%).</em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);
  return (
    <div className="app">
      <Logo />
      <Form itemsProp={items} setItemsProp={setItems} />
      <PackingList itemsProp={items} />
      <Stats itemsProp={items} />
    </div>
  );
}

export default App;
