Games = new Mongo.Collection('games');

Games.helpers({
  currentRound: function() {
    return Rounds.findOne(this.currentRoundId);
  },

  init: function() {
    Rounds.insert({
      gameId: this._id,
      dealer: this.players[0]
    });
  }
});

