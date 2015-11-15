Meteor.methods({
  fold: function() {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    if (!Games.current()) {
      throw new Meteor.Error("no game started");
    }

    var currentRound = Games.current().currentRound();
    if (!currentRound) {
      throw new Meteor.Error("no round started");
    }
    currentRound.fold(Meteor.user().username);
  },
  check: function() {
     if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    if (!Games.current()) {
      throw new Meteor.Error("no game started");
    }

    var currentRound = Games.current().currentRound();
    if (!currentRound) {
      throw new Meteor.Error("no round started");
    }
    currentRound().check(Meteor.user.username);
  }
});

if (Meteor.isClient) {
  Template.bet.helpers({
    isMyTurn: function() {
      return Games.current().currentPlayer() === Meteor.user().username;
    },
    playing: function() {
      if(Games.current().currentRound()){
        return Games.current().currentRound().isPlaying(Meteor.user().username);
      }
    }
  });

  Template.bet.events({
    "submit .place-bet": function(event){
      event.preventDefault();
      var amount = event.target.betAmount.value;
      event.target.betAmount = "";
    },
    "click .fold" : function(event){
      event.preventDefault()
      Meteor.call("fold");
    },
    "click .check" : function(event) {
      event.preventDefault()
      Meteor.call("check")
    }
  })
}