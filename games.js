Games = new Mongo.Collection('games');

Games.helpers({
  currentRound: function() {
    return Rounds.findOne(this.currentRoundId);
  },
  addPlayer: function(name) {
    Games.update({_id:this._id}, {$addToSet: {players: name}})
  },
  init: function() {
    Rounds.insert({
      gameId: this._id,
      dealer: this.players[0],
      // Ace - 14, K - 13 etc.
      // Clubs - 1, Diamonds - 2, Hears - 3, Spades - 4
      hands: [
        [{figure: 14, color: 1}, {figure: 2, color: 1}],
        [{figure: 14, color: 2}, {figure: 2, color: 2}],
        [{figure: 14, color: 3}, {figure: 2, color: 3}],
        [{figure: 14, color: 4}, {figure: 2, color: 4}]
      ]
    });
  }
});

