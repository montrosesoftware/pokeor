if (Meteor.isClient) {
  playerInSession =  function(){
    return Session.get("player");
  };

  Template.registerHelper('playerInSession', function() {
    return playerInSession();
  });

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
