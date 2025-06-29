const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Data disimpan dalam array selama aplikasi berjalan
let todos = [
  {
    "id": 1,
    "title": "Belajar Cloud Computing",
    "description": "Mengerjakan tugas besar komputasi awan",
    "completed": false,
    "dueDate": "2025-06-25",
    "createdAt": "2025-06-16T13:00:00Z"
  }
];
let nextId = 2;

// Resource: http:domain/api
const apiRouter = express.Router();

// GET /api/todos: Mengambil seluruh data to-do 
apiRouter.get('/todos', (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Data to-do berhasil diambil",
    data: todos
  });
});

// POST /api/todos: Menambahkan to-do baru 
apiRouter.post('/todos', (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json({
      status: "error",
      message: "Title, description, dan dueDate wajib diisi"
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

  res.status(201).json({
    status: "success",
    message: "To-do baru berhasil ditambahkan",
    data: newTodo
  });
});

// GET /api/todos/:id: Mengambil detail to-do berdasarkan ID 
apiRouter.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({
      status: "error",
      message: "To-do dengan ID tersebut tidak ditemukan"
    });
  }
  res.status(200).json({
    status: "success",
    message: "Detail to-do berhasil diambil",
    data: todo
  });
});

// PUT /api/todos/:id: Memperbarui to-do berdasarkan ID 
apiRouter.put('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "To-do dengan ID tersebut tidak ditemukan"
    });
  }

  const { title, description, completed, dueDate } = req.body;
  const updatedTodo = {
    ...todos[todoIndex],
    title: title || todos[todoIndex].title,
    description: description || todos[todoIndex].description,
    completed: typeof completed === 'boolean' ? completed : todos[todoIndex].completed,
    dueDate: dueDate || todos[todoIndex].dueDate,
  };
  todos[todoIndex] = updatedTodo;

  res.status(200).json({
    status: "success",
    message: "To-do berhasil diperbarui",
    data: updatedTodo
  });
});

// DELETE /api/todos/:id: Menghapus to-do berdasarkan ID 
apiRouter.delete('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "To-do dengan ID tersebut tidak ditemukan"
    });
  }
  
  todos.splice(todoIndex, 1);
  res.status(200).json({
    status: "success",
    message: "To-do berhasil dihapus",
    data: null
  });
});

app.use('/api', apiRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});