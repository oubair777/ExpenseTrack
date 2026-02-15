import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const TransactionDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/transactions/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setTransaction(res.data));
  }, []);

  if (!transaction) return <p>Loading...</p>;

  return (
    <div>
      <h2>{transaction.title}</h2>
      <p>Amount: ₹{transaction.amount}</p>
      <p>Category: {transaction.category}</p>
      <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
      <p>Notes: {transaction.notes}</p>
    </div>
  );
};

export default TransactionDetails;
