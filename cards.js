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
    }

  });

  Template.cards.events({
      "click #next-deal": function(){
        Meteor.call("nextDeal");
      }
  });
}