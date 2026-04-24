const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const PYTHON_PATH = process.env.PYTHON_PATH || '/usr/bin/python3'; // Use environment variable

app.get('/run', (req, res) => {
    const scriptPath = path.join(__dirname, 'script.py');
    const pythonProcess = spawn(PYTHON_PATH, [scriptPath]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python Output: ${data}`);
        res.send(data.toString());
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
        res.status(500).send(data.toString());
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code: ${code}`);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
