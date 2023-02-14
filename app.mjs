// 1st Installing dependencies

//2nd create express app

import express from 'express';
import  sqlite3  from 'sqlite3';
import bodyParser from 'body-parser';
const app = express();

//Pacakge body-parser
// read the data send in the request

//3rd Task Connecting to database
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// create a new database
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// create the todos table
db.run(`
CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task TEXT NOT NULL
)
`);

//4th Part Define endpoints

// •	GET /todos: Returns a list of all to-do items
// •	GET /todos/:id: Returns a single to-do item with a specific ID
// •	POST /todos: Adds a new to-do item to the list
// •	PUT /todos/:id: Updates a to-do item with a specific ID


//Root endpoint
//Callback function -It has two parameteres- dependent to each other
//Arrow functions-It does not have any difference in usage- we dont have to use this and arguments variables.
// app.get('/', (req,res)=> {
//     res.send('Hello World from Express!');
// });

// GET /todos: Returns a list of all to-do items


app.get('/todos',(req,res)=>{
    db.all('SELECT *  FROM todos',(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message});
            return;
        }
        res.json({
            todos:rows
        });
    });
});
//POST /todos: Adds a new to-do item to the list

app.post('/todos', (req, res) => {
    const task = req.body.task;
    if (!task) {
      res.status(400).json({ error: 'Task is required' });
      return;
    }
    db.run('INSERT INTO todos (task) VALUES (?)', [task], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        task: task
      });
    });
  });
  // Delete method 
  app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM todos WHERE id = ?', [id], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'To-do item deleted successfully'
      });
    });
  });

  //Update Method

  app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const task = req.body.task;
    if (!task) {
      res.status(400).json({ error: 'Task is required' });
      return;
    }
    db.run('UPDATE todos SET task = ? WHERE id = ?', [task, id], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'To-do item updated successfully'
      });
    });
  });
  //In order to post method we have to add JSON in payload in the new request 
// Select "POST" as the request method in thunder client and enter the URL http://localhost:3000/todos.

// In the "Body" section, select "raw" and change the format to "JSON (application/json)".

// Enter the following JSON payload in the text area:
// {
//     "task": "Take out the trash"
//   }
// Click on the "Send" button to send the request.
app.listen(3000);