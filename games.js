function generateDeck() {
    var figures = 13;
    var suites = 4;

    var cards = [];
    for (var i = 0; i < figures; i++) {
      for(var j = 0; j < suites; j++){
        var n = suites*i + j;
        cards[n] = {figure: i, suite: j};
      }
    }
    return cards;
  }
DECK = generateDeck();

Games = new Mongo.Collection('games');

if (Meteor.isServer) {
  Meteor.publish("games", function() {
    return Games.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("games");
}

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
  	var shuffledDeck = _.shuffle(DECK);
    var roundId = Rounds.insert({
      gameId: this._id,
      dealer: this.players[0],
      shuffledDeck: shuffledDeck,
      hands: [],
      deals: [],
      pot: 0
    });

    var id = this._id;
    Games.update(this._id, {
      $set: {currentRoundId: roundId}
    });

    var game = Games.findOne({_id:id});
    game.currentRound().zeroDeal(game.getPlayers());
  },
  tryStartGame: function(){
    if(this.players.length >= 3){
      this.init();
    }
  },
  isStarted: function() {
    return this.currentRoundId !== undefined && this.currentRoundId !== null;
  },
  getPlayers: function(){
  	return Games.findOne({_id:this._id}).players;
  },
  currentPlayer: function() {
    if (this.currentRound() && this.currentRound().currentDeal()) {
      return this.currentRound().currentDeal().currentPlayer;
    } else {
      return null;
    }
  },
  endRound: function() {
    console.log("endRound");
  }
});

_.extend(Games, {
  current: function() {
    return Games.findOne({isCreated:true});
  },
  currentRound : function() {
    var round = Games.current().currentRound();
    return round;
  }
});

