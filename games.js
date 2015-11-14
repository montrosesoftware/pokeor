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
  	var players = this.getPlayers();
  	var shuffledDeck = _.shuffle(DECK);
  	var handSize = 2;
  	var hands = this.getHands(players, shuffledDeck, handSize);

    var roundId = Rounds.insert({
      gameId: this._id,
      dealer: this.players[0],
      shuffledDeck: shuffledDeck,
      hands: hands,
      deals: []
    });

    var id = this._id;
    Games.update(this._id, {
      $set: {currentRoundId: roundId}
    }, function(){
      var game = Games.findOne({_id:id});
      game.currentRound().nextDeal();
    });
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
  getCards: function(shuffled_deck, numberOfCards){
  	var cards = [];
  	for(var i = 0; i < numberOfCards; i++){
  		cards.push(shuffled_deck.shift());
  	}
  	return cards;
  },
  getHands: function(players, shuffledDeck, handSize){
  	var hands = [];
  	var that = this;
  	players.forEach(function(player){
  		var hand = that.getCards(shuffledDeck, 2);
  		hands.push({player: player, hand: hand});
  	})
  	return hands;
  },
  currentPlayer: function() {
    if (this.currentRound() && this.currentRound().currentDeal()) {
      return this.currentRound().currentDeal().currentPlayer;
    } else {
      return null;
    }
  }
});

_.extend(Games, {
  current: function() {
    return Games.findOne({isCreated:true});
  }
});

