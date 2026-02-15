const Transaction = require("../models/Transaction");

exports.add = async (req, res) => {
  const t = await Transaction.create({ ...req.body, user: req.user });
  res.json(t);
};

exports.getAll = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  let q = { user: req.user };
  if (search) q.title = { $regex: search, $options: "i" };

  const data = await Transaction.find(q)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ date: -1 });

  const total = await Transaction.countDocuments(q);

  res.json({ data, total });
};

exports.update = async (req, res) => {
  const d = await Transaction.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    req.body,
    { new: true }
  );
  res.json(d);
};

exports.remove = async (req, res) => {
  await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.json({ message: "Deleted" });
};
