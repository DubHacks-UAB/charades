const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

const temp = {
  team1: {
    members: []
  },
  team2: {
    members: []
  }
};

const getApiAndEmit = socket => {
    // const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
  };


let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("updateTeam", (data) => {
    console.log("Hey!" + data.teamSelected)
    const team1Members = temp.team1.members;
    const team2Members = temp.team2.members;
    
    // TODO data.teamSelected === 'TEAM_1' OR change to newTeam vs oldTeam
    // TODO data.previousTeam === ...
    if (data.teamSelected === 'TEAM_1') {
      if (team2Members.includes(data.userName)) {
        const indexOfName = team2Members.indexOf(data.userName)
        team2Members.splice(indexOfName, 1)
      }
      team1Members.push(data.userName)
      // TODO - condition if enough team members
    } else if (data.teamSelected === 'TEAM_2') {
      if (team1Members.includes(data.userName)) {
        const indexOfName = team1Members.indexOf(data.userName)
        team1Members.splice(indexOfName, 1)
      }
      team2Members.push(data.userName)
    }
    console.log(temp)
    socket.emit("updateTeamForUser", {
      userName: data.userName,
      newTeam: data.teamSelected,
      status: 'SUCCESS'
    })
  })
  // if (interval) {
  //   clearInterval(interval);
  // }
  // interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  //   clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));