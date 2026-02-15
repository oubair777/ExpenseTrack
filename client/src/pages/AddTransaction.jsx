import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddTransaction = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  try {
    await axios.post(
      "https://expense-track-sage-xi.vercel.app//api/transactions",
      { title, amount, category, date, notes },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  alert("Transaction Added Successfully!");
navigate("/explorer");


    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
    setNotes("");

  } catch (error) {
    alert("Error adding transaction");
  }
};


  return (
    <div className="container">
      <h2>Add Transaction</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTransaction;
