Games = new Mongo.Collection('games');

// Players = new Mongo.Collection('players');

// Players.helpers({
//   game: function() {
//     return Games.findOne(this.playerId);
//   }
// });

// Games.helpers({
//   players: function() {
//     return Players.find({ gameId: this._id });
//   }
// });