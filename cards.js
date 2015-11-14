

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
    }

  });

  Template.cards.events({
      "click #next-deal": function(){
        var currectRound = Games.current().currentRound();
         if(currectRound){
            currectRound.nextDeal();
         }
      }
  });
}