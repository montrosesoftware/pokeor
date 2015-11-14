Games = new Mongo.Collection('games');

Games.helpers({
  currentRound: function() {
    return Rounds.findOne(this.currentRoundId);
  },
  addPlayer: function(name) {
  	var id = this._id;
    Games.update({_id:this._id}, {$addToSet: {players: name}}, function(){
      var game = Games.findOne({_id:id});
      game.tryStartGame();
    });
  },
  init: function() {
    var roundId = Rounds.insert({
      gameId: this._id,
      dealer: this.players[0],
      // Ace - 14, K - 13 etc.
      // Clubs - 1, Diamonds - 2, Hears - 3, Spades - 4
      hands: [
        [{figure: 14, color: 1}, {figure: 2, color: 1}],
        [{figure: 14, color: 2}, {figure: 2, color: 2}],
        [{figure: 14, color: 3}, {figure: 2, color: 3}],
        [{figure: 14, color: 4}, {figure: 2, color: 4}]
      ],
      deals: []
    });
    var id = this._id;
    Games.update(this._id, {
      $set: {currentRoundId: roundId}
    },
    function(){
      var game = Games.findOne({_id:id});
      game.currentRound().nextDeal();
    });
  },
  tryStartGame: function(){
    if(this.players.length >= 3){
      this.init();
      console.log(this);
    }
  },
  isStarted: function() {
    return this.currentRoundId !== undefined && this.currentRoundId !== null;
  }
});

_.extend(Games, {
  current: function() {
    return Games.findOne({isCreated:true});
  }
});
