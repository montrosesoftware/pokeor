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
    }
  });
}