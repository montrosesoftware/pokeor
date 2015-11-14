Rounds = new Mongo.Collection('rounds');

Rounds.helpers({
  game: function() {
    return Games.findOne(this.gameId);
  },

  currentDeal: function() {
    return _.last(this.deals);
  },

  nextDeal: function() {
    Rounds.update({_id:this._id}, {
      $addToSet: {
        deals: {
          cards: [],
          bets: [],
          currentPlayer: this.nextPlayer(this.dealer)
        }
      }
    });
  },

  nextPlayer: function(player) {
    var gamePlayers = this.game().players;
    return gamePlayers[(gamePlayers.indexOf(player) + 1) % gamePlayers.length];
  }
});
