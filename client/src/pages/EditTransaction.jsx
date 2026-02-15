import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/transactions/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm(res.data);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:5000/api/transactions/${id}`,
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    navigate("/explorer");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
        <div className="edit">
      <input name="title" value={form.title} onChange={handleChange}  placeholder="Title"/>
      <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount"/>
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category"/>
      <input type="date" name="date" value={form.date?.substring(0,10)} onChange={handleChange} placeholder="Date" />
      <input name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />
      <button type="submit" className="button">Update</button>
      </div>
    </form>
  );
};

export default EditTransaction;
