import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    let query = {};
    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate && endDate)
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };

    const transactions = await Transaction.find(query).sort({ date: -1 });

    res.json({ data: transactions }); // returning {data: []}
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addTransaction = async (req, res) => {
  try {
    const newTransaction = await Transaction.create(req.body);
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
