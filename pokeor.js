if (Meteor.isClient) {
  Template.body.helpers({
    isGameStarted: function() {
      var game = Games.findOne({isCreated:true});
      if (game) {
        return game.isStarted();
      } else {
        return false;
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
