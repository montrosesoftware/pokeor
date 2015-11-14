Games = new Mongo.Collection('games');
Rounds = new Mongo.Collection('rounds');

Games.helpers({
  currentRound: function() {
    return Rounds.findOne(this.currentRoundId);
  }
});

Rounds.helpers({
  game: function() {
    return Games.findOne(this.gameId);
  }
});
