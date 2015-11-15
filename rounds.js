Rounds = new Mongo.Collection('rounds');

if (Meteor.isServer) {
  Meteor.publish("rounds", function() {
    return Rounds.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("rounds");
}

Rounds.helpers({
  game: function() {
    return Games.findOne(this.gameId);
  },

  currentDeal: function() {
    return _.last(this.deals);
  },

  getCards: function(numberOfCards){
  	var cards = [];
  	for(var i = 0; i < numberOfCards; i++){
  		cards.push(this.shiftCard());
  	}
  	return cards;
  },
  allPlayerCards: function(){
    var players = Games.current().getPlayers();
    console.log(players);

    var hands = Games.current().currentRound().hands;
    console.log(hands);

    
  },
  getHands: function(players){
  	var hands = [];
  	var that = this;
  	players.forEach(function(player){
  		var hand = that.getCards(2);
  		hands.push({player: player, hand: hand});
  	});
  	return hands;
  },
  shiftCard: function(){
  	var card = this.shuffledDeck.shift();
  	Rounds.update({_id:this._id}, {
  		$set:{ shuffledDeck: this.shuffledDeck }
  	});
  	return card;
  },
  fold: function(player){
    var hands = this.hands;
    hands = _.reject(hands, function(hand){
      return hand.player == player;
    });
    console.log(hands);
    var id = this._id;
    var that = this;
    Rounds.update({_id:this._id}, {
      $set:{hands: hands}
    }, function(){
      Rounds.update({_id:id}, {
        $set:{"deals.0.currentPlayer": that.nextPlayer(player)}
      });
    }); 
  },
  zeroDeal: function (players){
  	var hands = this.getHands(players);
  	Rounds.update({_id:this._id}, {
  	  $set:{hands:hands},
      $push: {
        deals: {
          cards: [],
          bets: [],
          currentPlayer: this.nextPlayer(this.dealer)
        }
      }
    });
  },

  firstDeal: function (){
  	Rounds.update({_id:this._id}, {
      $push: {
        deals: {
          cards: this.getCards(3),
          bets: [],
          currentPlayer: this.nextPlayer(this.dealer)
        }
      }
    });
  },

  secondDeal: function (){
  	Rounds.update({_id:this._id}, {
      $push: {
        deals: {
          cards: this.getCards(1),
          bets: [],
          currentPlayer: this.nextPlayer(this.dealer)
        }
      }
    });
  },

  thirdDeal: function (){
  	Rounds.update({_id:this._id}, {
      $push: {
        deals: {
          cards: this.getCards(1),
          bets: [],
          currentPlayer: this.nextPlayer(this.dealer)
        }
      }
    });
  },
  nextDeal: function() {
  	var dealNum = this.deals.length;

  	switch(dealNum) {
    case 0:
		this.zeroDeal();
        break;
    case 1:
        this.firstDeal();
        break;
    case 2:
        this.secondDeal();
        break;
    case 3:
        this.thirdDeal();
        break;
    default:
        console.log("Too many deals!");
	}
  },

  nextPlayer: function(player) {
    var gamePlayers = this.game().players;
    return gamePlayers[(gamePlayers.indexOf(player) + 1) % gamePlayers.length];
  },
  isPlaying: function(player){
    var found = _.find(this.hands, function(hand) {
      return hand.player == player;
    });
    return found? true: false;
  }
});





