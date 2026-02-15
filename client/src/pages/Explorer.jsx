import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Explorer = () => {
    const navigate = useNavigate();
const token = localStorage.getItem("token");

useEffect(() => {
  if (!token) {
    navigate("/");
  }
}, [token, navigate]);

  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");


  const limit = 5;


  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
     `http://localhost:5000/api/transactions?search=${search}&page=${page}&limit=${limit}&category=${category}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(res.data.data);
      setTotal(res.data.total);
    } catch (error) {
      console.log("Error fetching transactions");
    }
  };

useEffect(() => {
  fetchTransactions();
}, [search, page, category, startDate, endDate]);


  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/transactions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchTransactions();
  };

  const totalPages = Math.ceil(total / limit);

  return (
  <div className="explorer-container">
    <h2 className="heading">Transaction Explorer</h2>

  
    <div className="filter-section">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setPage(1);
        }}
      >
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
      </select>

      <input
        type="date"
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
          setPage(1);
        }}
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => {
          setEndDate(e.target.value);
          setPage(1);
        }}
      />
    </div>

  <div className="top-bar">
  <p className="total-count">Total Transactions: {total}</p>

  <button
    className="add-btn button" 
    onClick={() => navigate("/add")}
  >
    + Add Transaction
  </button>
</div>


    
    <div className="transaction-list">
      {transactions.length === 0 ? (
        <div className="empty-state">
          <p>No transactions found</p>
          <button onClick={() => navigate("/add")}>
            Add First Transaction
          </button>
        </div>
      ) : (
        transactions.map((t) => (
          <div key={t._id} className="transaction-card">
            <div>
              <h4 onClick={() => navigate(`/transaction/${t._id}`)}>
                {t.title}
              </h4>
              <p>₹{t.amount}</p>
              <p>{t.category}</p>
              <p>{new Date(t.date).toLocaleDateString()}</p>
            </div>

            <div className="card-actions">
              <button onClick={() => navigate(`/edit/${t._id}`)}>
                Edit
              </button>
              <button onClick={() => handleDelete(t._id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>

  
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    
  </div>
);
};

export default Explorer;
