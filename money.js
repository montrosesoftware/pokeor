if (Meteor.isClient) {
  Template.roundPot.helpers({
    roundPot: function () {
      if(Games.current().currentRound()){
              console.log("here");
        return Games.current().currentRound().pot;
      }else {
        return null;
      }
    }
  });
}