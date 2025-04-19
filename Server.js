const express = require("express");
const app = express();
const port = 1000;
const db = require("./db");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/getTasks", (req, res) => {
  db.query("SELECT * FROM operation", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/addTask", (req, res) => {
  const { taskname, taskdescription, taskcategory } = req.body;

  if (!taskname || !taskdescription || !taskcategory) {
    res.send("Please provide all details");
  }

  db.query(
    "INSERT INTO operation (taskname , taskdescription , taskcategory) VALUES (? , ? , ?)",
    [taskname, taskdescription, taskcategory],
    function (err, result) {
      if (err) {
        console.log(err);
        throw err;
      }
      res.send("Task added successfully");
    }
  );
});

app.put("/updateTask/:id", (req, res) => {
  const { taskname, taskdescription, taskcategory } = req.body;
  const taskId = req.params.id;

  db.query(
    "SELECT * FROM operation WHERE taskid = ?",
    [taskId],
    function (err, result) {
      if (err) {
        res.send("Task not found");
      }
    }
  );

  db.query(
    "UPDATE operation SET taskname = ? , taskdescription = ?, taskcategory = ?  WHERE taskid = ?",
    [taskname, taskdescription, taskcategory, taskId],
    function (err, result) {
      if (err) {
        throw err;
      }
    }
  );
  res.send("Task updated successfully");
});

app.delete("/deleteTask/:id", (req, res) => {
  const taskId = req.params.id;

  db.query(
    "DELETE FROM operation WHERE taskid = ?",
    [taskId],
    function (err, result) {
      if (err) throw err;
      res.send("Task deleted successfully");
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
