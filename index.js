const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { title, member } = req.body;
    
    if (!title || !member) {
        return res.status(400).json({ error: 'Brak wymaganego pola "title".' });
    }
    
    const newTask = {
        id: tasks.length + 1,
        title: title,
        member: member,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.listen(PORT, () => {
    console.log(`Serwer uruchomiony na porcie ${PORT}`);
});
