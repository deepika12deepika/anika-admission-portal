const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5001;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Helper to read DB
const readDB = () => {
    const data = fs.readFileSync(DB_FILE);
    return JSON.parse(data);
};

// Helper to write DB
const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// GET all data
app.get('/api/data', (req, res) => {
    try {
        const data = readDB();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to read database" });
    }
});

// Update entire data (simple synchronization)
app.post('/api/sync', (req, res) => {
    try {
        const newData = req.body;
        writeDB(newData);
        res.json({ message: "Sync successful" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update database" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
