const router = require("express").Router();
const protect = require("../middleware/auth");
const Transaction = require("../models/Transaction");

router.use(protect);



router.post("/", async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      user: req.user.id,
    });

    await transaction.save();
    res.status(201).json(transaction);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});



router.get("/", async (req, res) => {
  try {
    const { search, page = 1, limit = 5, category, startDate, endDate } = req.query;

    const query = { user: req.user.id };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const total = await Transaction.countDocuments(query);

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      data: transactions,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(transaction);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});



router.put("/:id", async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});



router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
