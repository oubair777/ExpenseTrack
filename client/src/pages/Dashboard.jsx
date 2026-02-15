import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
const Dashboard = () => {
const navigate = useNavigate();
const token = localStorage.getItem("token");
const [transactions, setTransactions] = useState([]);
const [totalAmount, setTotalAmount] = useState(0);
const [categorySummary, setCategorySummary] = useState({});
const totalCategoryAmount = Object.values(categorySummary)
    .reduce((a, b) => a + b, 0);

const chartData = Object.entries(categorySummary).map(
    ([name, value]) => ({
      name,
      value,
      percentage:
        totalCategoryAmount > 0
          ? ((value / totalCategoryAmount) * 100).toFixed(1)
          : 0
    })
  );

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchTransactions();
    }
  }, [token, navigate]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/transactions?limit=100",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = res.data.data || [];
      setTransactions(data);

      
      const total = data.reduce(
        (sum, t) => sum + Number(t.amount),
        0
      );
      setTotalAmount(total);

    
      const categoryData = {};
      data.forEach((t) => {
        if (!categoryData[t.category]) {
          categoryData[t.category] = 0;
        }
        categoryData[t.category] += Number(t.amount);
      });

      setCategorySummary(categoryData);

    } catch (error) {
      console.log("Error loading dashboard", error);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">

        <h1 className="dashboard-title">Dashboard</h1>

      
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Transactions</h3>
            <p>{transactions.length}</p>
          </div>

          <div className="stat-card">
            <h3>Total Expense</h3>
            <p>₹{totalAmount}</p>
          </div>
        </div>

      
        <div className="category-section">

          <div className="category-list">
            <h2>Category Breakdown</h2>

            {Object.entries(categorySummary).length === 0 ? (
              <p>No data available</p>
            ) : (
              Object.entries(categorySummary).map(([cat, amount]) => (
                <div key={cat} className="category-item">
                  <span>{cat}</span>
                  <span>₹{amount}</span>
                </div>
              ))
            )}
          </div>

          {chartData.length > 0 && (
            <div className="chart-container">
            
<PieChart width={400} height={320}>
  <Pie
    data={chartData}
    dataKey="value"
    nameKey="name"
    outerRadius={120}
    innerRadius={60}   
    label={({ percent }) =>
      percent > 0.03   
        ? `${(percent * 100).toFixed(1)}%`
        : ""
    }
  >
    {chartData.map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={COLORS[index % COLORS.length]}
      />
    ))}
  </Pie>

  <Tooltip formatter={(value) => `₹${value}`} />
  <Legend />
</PieChart>

            </div>
          )}

        </div>

        
        <div className="recent-section">
          <h2>Recent Transactions</h2>

          {transactions.length === 0 ? (
            <p>No recent transactions</p>
          ) : (
            transactions.slice(0, 5).map((t) => (
              <div key={t._id} className="recent-card">
                <div>
                  <strong>{t.title}</strong>
                  <p>{t.category}</p>
                </div>

                <div className="recent-amount">
                  ₹{t.amount}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
