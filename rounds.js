Rounds = new Mongo.Collection('rounds');

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
  		cards.push(this.shuffledDeck.shift());
  	}
  	return cards;
  },
  getHands: function(players){
  	var hands = [];
  	var that = this;
  	players.forEach(function(player){
  		var hand = that.getCards(2);
  		hands.push({player: player, hand: hand});
  	})
  	return hands;
  },
  shiftCard: function(){
  	var card = this.shuffledDeck.shift();
  	Rounds.update({_id:this._id}, {
  		$set:{ shuffledDeck: this.shuffledDeck }
  	})
  },

  zeroDeal: function (players){
  	var hands = this.getHands(players);
  	Rounds.update({_id:this._id}, {
  	  $set:{hands:hands},
      $addToSet: {
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
      $addToSet: {
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
      $addToSet: {
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
      $addToSet: {
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
        console.log("To many deals!");
	}
  },

  nextPlayer: function(player) {
    var gamePlayers = this.game().players;
    return gamePlayers[(gamePlayers.indexOf(player) + 1) % gamePlayers.length];
  }
});
