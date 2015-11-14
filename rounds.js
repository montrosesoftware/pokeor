Rounds = new Mongo.Collection('rounds');

Rounds.helpers({
  game: function() {
    return Games.findOne(this.gameId);
  }
});
