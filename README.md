# TodoList
Express App :REST API -SQULITE


## Build a REST API with Node.js SQLite and Express JS
To-do list App:

+-----------------+   sends   +----------------+   uses   +---------------+
| Client (cURL)   | ---------> | Express API    | -------> | SQLite        |
+-----------------+            +----------------+          +---------------+
                                                                      |
                                                                      | reads/writes
                                                                      v
                                                              +---------------+
                                                              | to-do list    |
                                                              +---------------+


## This code is for building a REST API using Node.js, SQLite, and Express JS. An API is like a menu at a restaurant - it tells you what you can order and how to order it.
#### The API we're building here is for a to-do list app. You can use it to add things to your to-do list, see what's on your list, change something on your list, and remove something from your list.
#### We use a package called "express" to create the API. It makes it easy for us to handle incoming requests and send responses.
#### We use another package called "sqlite3" to store our to-do list items. SQLite is a database that can store lots of information in a structured way.
#### We also use a package called "body-parser" to help us read the data sent in the request. This data is used to add, update, or remove items from our to-do list.
