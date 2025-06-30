const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Mengizinkan akses dari domain lain (frontend)
app.use(express.json()); // Mem-parsing body request JSON

// Data disimpan dalam array (in-memory)
let todos = [
  {
    "id": 1,
    "title": "Belajar Cloud Computing",
    "description": "Mengerjakan tugas besar komputasi awan",
    "completed": false,
    "dueDate": "2025-06-25",
    "createdAt": new Date().toISOString()
  }
];
let nextId = 2; // Untuk auto-increment ID to-do baru

// Router untuk semua endpoint di bawah resource /api
const apiRouter = express.Router();

// Endpoint: GET /api/todos (Mengambil seluruh data to-do)
apiRouter.get('/todos', (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Data to-do berhasil diambil",
    data: todos
  });
});

// Endpoint: POST /api/todos (Menambahkan to-do baru)
apiRouter.post('/todos', (req, res) => {
  const { title, description, dueDate } = req.body;

  // Validasi input
  if (!title || !description || !dueDate) {
    return res.status(400).json({
      status: "error",
      message: "Properti title, description, dan dueDate wajib diisi"
    });
  }

  const newTodo = {
    id: nextId++,
    title,
    description,
    completed: false,
    dueDate,
    createdAt: new Date().toISOString()
  };
  todos.push(newTodo);

  res.status(201).json({ // 201 Created
    status: "success",
    message: "To-do baru berhasil ditambahkan",
    data: newTodo
  });
});

// Endpoint: GET /api/todos/:id (Mengambil detail to-do berdasarkan ID)
apiRouter.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({
      status: "error",
      message: "To-do dengan ID yang diberikan tidak ditemukan"
    });
  }
  res.status(200).json({
    status: "success",
    message: "Detail to-do berhasil diambil",
    data: todo
  });
});

// Endpoint: PUT /api/todos/:id (Memperbarui to-do berdasarkan ID)
apiRouter.put('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "To-do dengan ID yang diberikan tidak ditemukan"
    });
  }

  // Ambil data yang ada dan perbarui dengan data baru jika ada
  const updatedTodo = {
    ...todos[todoIndex],
    title: req.body.title || todos[todoIndex].title,
    description: req.body.description || todos[todoIndex].description,
    completed: typeof req.body.completed === 'boolean' ? req.body.completed : todos[todoIndex].completed,
    dueDate: req.body.dueDate || todos[todoIndex].dueDate
  };
  todos[todoIndex] = updatedTodo;

  res.status(200).json({
    status: "success",
    message: "To-do berhasil diperbarui",
    data: updatedTodo
  });
});

// Endpoint: DELETE /api/todos/:id (Menghapus to-do berdasarkan ID)
apiRouter.delete('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "To-do dengan ID yang diberikan tidak ditemukan"
    });
  }
  
  todos.splice(todoIndex, 1);
  res.status(200).json({
    status: "success",
    message: "To-do berhasil dihapus",
    data: null // Data bisa null karena objeknya sudah dihapus
  });
});

// Gunakan router untuk path /api
app.use('/api', apiRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});