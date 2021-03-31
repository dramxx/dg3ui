const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

const PORT = 5000;

app.get('/api/v1/folders', cors(), (req, res) => {
  res.json({
    folders: ['folder_a', 'folder_b', 'folder_c'],
  });
});

app.get('/api/v1/projects', cors(), (req, res) => {
  res.json({
    projects: [
      {
        "name": "Non technical losses analysis",
        "ip": "127.0.0.1",
        "importProgress": "DONE",
        "log": []
      },
      {
        "name": 'project_a',
        "ip": '172.22.16.201',
        "importProgress": "DONE",
        "log": []
      },
      {
        "name": 'project_b',
        "ip": '172.22.16.201',
        "importProgress": "ERROR",
        "log": [
          {
            "level": "ERROR",
            "message": "Invalid input data, Meter 1524 not found."
          }
        ]
      },
      {
        "name": 'project_c',
        "ip": '172.22.16.201',
        "importProgress": "IMPORTING",
        "log": [
          {
            "level": "WARN",
            "message": "Warning warning warning."
          }
        ]
      },
    ],
  });
});

app.options('/api/v1/import', cors());
app.post('/api/v1/import', cors(), (req, res) => {
  console.log(req.body);

  res.status(200);
});

app.options('/api/v1/deleteProject', cors());
app.post('/api/v1/deleteProject', cors(), (req, res) => {
  console.log(req.body);

  res.status(200);
});

app.listen(PORT, async (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`🚀  Applications Server running at: http://localhost:${PORT}`);
});
