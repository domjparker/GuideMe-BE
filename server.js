// * Server Setup
// Dependencies
const express = require("express");
const cors = require('cors');
const session = require("express-session")
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes");
const creds = require('./config');
// const { MemoryStore } = require("express-session");

// Express App Setup
const app = express();
const PORT = process.env.PORT || 3001;

app.use(logger("dev"));

// Sets up the Express app to handle data parsing.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000", "https://guidemedimma.herokuapp.com"],
  credentials: true
}));

// Session Setup
app.use(session({
  secret: creds.SESSIONSECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7200000
  }
  // store: new MemoryStore({ checkPeriod: 7200000 })
}))

// Connects with MongoDB via Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/guideme", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(routes);

// Starts Express Server
var server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
//Socket.io Setup
var io = require('socket.io')(server);
//Listens for incoming connections from Client.
var connectedUsers = []
io.on('connection', function (socket) {
  console.log("User Connected!")

  //Server listens for user login
  socket.on('login', (userId) => {
    //Sets socket nickname to user's database ID
    socket.nickname = userId
    // Set array that is all sockets connected
    connectedUsers.push(socket.id)
    console.log(socket.nickname)
  })

  //Server listens for user message
  socket.on('sendText', (messageObj) => {
    console.log(messageObj)
    // Loops through all connected users
    connectedUsers.forEach(userKey => {
      console.log(connectedUsers)
        //Checks if the reciever id matches the user nickname
        if(io.sockets.connected[userKey].nickname){
          if (io.sockets.connected[userKey].nickname === messageObj.recieverId) {
            //Sends the message to the intended user.
            console.log("MESSAGE SENT TO: " + userKey)
            io.to(userKey).emit('text', messageObj)
          }
        }
        
    
    })

  })
  socket.on('close', () => {
    function checkId(id) {
      return id !== socket.id
    }
    console.log(connectedUsers)
    connectedUsers  = connectedUsers.filter(checkId)
    console.log(connectedUsers)
  })
  socket.on('disconnect', () => {
    function checkId(id) {
      return id !== socket.id
    }
    console.log(connectedUsers)
    connectedUsers.filter(checkId)
    console.log(connectedUsers)
  })
})