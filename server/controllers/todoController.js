import pool from "../db.js";

// get all todos
export const getTodos = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC",
      [req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// create todo
export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const result = await pool.query(
      "INSERT INTO todos (title, user_id) VALUES ($1, $2) RETURNING *",
      [title, req.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// update todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const result = await pool.query(
      "UPDATE todos SET title = $1, completed = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, completed, id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// delete todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
