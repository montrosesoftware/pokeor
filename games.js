Games = new Mongo.Collection('games');

Games.helpers({
  currentRound: function() {
    return Rounds.findOne(this.currentRoundId);
  },
  addPlayer: function(name) {
  	Games.update({_id:this._id}, {$addToSet: {players: name}})
  }
});

