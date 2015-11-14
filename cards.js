

if (Meteor.isClient) {
  Template.cards.helpers({
    cards: function () {
    	if(Games.current().currentRound()){
      		var hands =  Games.current().currentRound().hands;
      		var player = Session.get("player");
      		console.log(hands);
      		console.log("playa: "+ player);
  		}
    }
  });
}