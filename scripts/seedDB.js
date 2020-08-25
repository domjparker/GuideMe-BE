const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/guideme"
);


const userSeed = [
  {
      "firstName": "Andrea",
      "lastName": "Berg",
      "email":"andrea@email.com",
      "password": "password",
      "bio": "fearless explorer",
      "location":"Global",
      "verifed":"false",
      "host": "false",
      "hostedAdventures": [],
      "completedAdventures": [],
      "profilePicture": "https://images.pexels.com/photos/4503592/pexels-photo-4503592.jpeg?cs=srgb&dl=pexels-mateusz-sa%C5%82aciak-4503592.jpg&fm=jpg",
      "bannerPicture": "https://images.pexels.com/photos/4177561/pexels-photo-4177561.jpeg?cs=srgb&dl=pexels-retha-ferguson-4177561.jpg&fm=jpg",
      "tags": []
    },
  {
      "firstName": "Andrew",
      "lastName": "Bergstrom",
      "email":"andrew@email.com",
      "password": "password",
      "bio": "bestest greatest ever guide for most amazing spectacular adventures",
      "location":"Global",
      "veriifed":"true",
      "host": "true",
      "hostedAdventures": [],
      "completedAdventures": [],
      "profilePicture": "https://images.pexels.com/photos/732632/pexels-photo-732632.jpeg?cs=srgb&dl=pexels-lalu-fatoni-732632.jpg&fm=jpg",
      "bannerPicture": "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?cs=srgb&dl=pexels-roberto-nickson-2559941.jpg&fm=jpg",
      "tags": ["biking", "hiking", "kayaking", "climbing", "swimming", "flying"]
    }
]

db.User
.remove({})
.then(() => db.User.collection.insertMany(userSeed))
.then(data => {
  console.log(data.result.n + " records inserted!");
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});

const adventureSeed = [
  {
      "adventureName": "Adventure 1",
      "hostId": "5f35a5080550a70bc8047484",
      "usersOnAdventure":[],
      "description":"This is a super cool first ever best ever adventure that takes you far and wide to Neverland",
      "location": "Seattle,WA",
      "itinerary": "Meet up and then fun fun fun",
      "duration": {
          "number": 1,
          "unit": "days"
      },
      "difficulty": "extra advanced",
      "minGroupSize":1,
      "maxGroupSize":4,
      "price":1000,
      "gearList":"shoes, clothes, smile",
      "imageId":"https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg",
  },
  {
      "adventureName": "Adventure 2",
      "hostId": "5f35a5080550a70bc8047484",
      "usersOnAdventure":[],
      "description":"This is a super cool first ever best ever adventure that takes you far and wide to Neverland",
      "location": "Seattle,WA",
      "itinerary": "Meet up and then fun fun fun",
      "duration": {
          "number": 1,
          "unit": "days"
      },
      "difficulty": "extra advanced",
      "minGroupSize":1,
      "maxGroupSize":4,
      "price":1000,
      "gearList":"shoes, clothes, smile",
      "imageId":"https://images.pexels.com/photos/1497585/pexels-photo-1497585.jpeg?cs=srgb&dl=pexels-spencer-gurley-1497585.jpg&fm=jpg",
  },
  {
      "adventureName": "Adventure 3",
      "hostId": "5f35a5080550a70bc8047484",
      "usersOnAdventure":[],
      "description":"This is a super cool first ever best ever adventure that takes you far and wide to Neverland",
      "location": "Seattle,WA",
      "itinerary": "Meet up and then fun fun fun",
      "duration": {
          "number": 1,
          "unit": "days"
      },
      "difficulty": "extra advanced",
      "minGroupSize":1,
      "maxGroupSize":4,
      "price":1000,
      "gearList":"shoes, clothes, smile",
      "imageId":"https://images.pexels.com/photos/258045/pexels-photo-258045.jpeg?cs=srgb&dl=pexels-pixabay-258045.jpg&fm=jpg",
  }
]

db.Adventure
  .remove({})
  .then(() => db.Adventure.collection.insertMany(adventureSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

