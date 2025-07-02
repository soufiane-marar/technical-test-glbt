const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

let items = [
    {
        student: {first_name: "John", last_name: "Doe"},
        meeting_point: "Library Entrance",
        date: "2025-07-03T10:00:00Z",
        status: "A organiser"
    },
    {
        student: {first_name: "Emma", last_name: "Smith"},
        meeting_point: "Cafeteria",
        date: "2025-07-03T12:30:00Z",
        status: "Annulé"
    },
    {
        student: {first_name: "Liam", last_name: "Johnson"},
        meeting_point: "Main Hall",
        date: "2025-07-04T09:15:00Z",
        status: "Confirmé"
    },
    {
        student: {first_name: "Olivia", last_name: "Brown"},
        meeting_point: "Study Room 3",
        date: "2025-07-04T14:45:00Z",
        status: "Recherche de place"
    },
    {
        student: {first_name: "Noah", last_name: "Davis"},
        meeting_point: "Lecture Hall A",
        date: "2025-07-05T11:00:00Z",
        status: "Confirmé"
    }
];

app.get('/api/exams', (req, res) => {
    res.json(items);
});

app.post('/api/exams', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json(newItem);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});