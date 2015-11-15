Meteor.methods({
  nextDeal: function() {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    if (!Games.current()) {
      throw new Meteor.Error("no game started");
    }

    var currectRound = Games.current().currentRound();
    if (!currectRound) {
      throw new Meteor.Error("no round started");
    }

    if(currectRound){
      currectRound.nextDeal();
    }
  }
});

if (Meteor.isClient) {
  Template.cards.helpers({
    cards: function () {
    	if(Games.current().currentRound()){
      		var hands =  Games.current().currentRound().hands;
      		var player = Meteor.user().username;
      		var playerHand = [];
      		hands.forEach( function(hand){
      			  if(hand.player === player){
      			  	playerHand = hand.hand;
      			  	return;
      			  }
      		});
      		return playerHand;
  		}
    },

    tableCards: function () {
      if(Games.current().currentRound()){
          var deals =  Games.current().currentRound().deals;
          var cards = [];
          deals.forEach( function(deal){
              cards = cards.concat(deal.cards);
          });
          return cards;
      }
    },

    allPlayerHands: function() {
        if(Games.current().currentRound()){
          var hands =  Games.current().currentRound().hands;
          console.log(hands);
          var playerCards = [];
          hands.forEach( function(hand){
              console.log(hand.hand[0]);
              playerCards.push({player: hand.player, card1f: hand.hand[0].figure, card1s: hand.hand[0].suite, card2f: hand.hand[1].figure, card2s: hand.hand[1].suite});
          });
          console.log(playerCards);
          return playerCards;
      }
    }
  });

  Template.cards.events({
      "click #next-deal": function(){
        Meteor.call("nextDeal");
      },
      "click #show-cards": function(){

          var a = Games.current().currentRound().hands;
          Games.current().currentRound().allPlayerCards();
          

          /*
        console.log("show all player cards");
        if(Games.current().currentRound()){
          var hands =  Games.current().currentRound().hands;
          var playerCards = [];
          hands.forEach( function(hand){
              console.log("cards:");
              console.log(hand);
          });
          return playerCards;
      }
      */
      }
  });
}