if (Meteor.isClient) {
  playerInSession =  function(){
    return Session.get("player");
  };

  Template.registerHelper('playerInSession', function() {
    return playerInSession();
  });

  Template.body.helpers({
    isGameStarted: function() {
      var game = Games.current();
      if (game) {
        return game.isStarted();
      } else {
        return false;
      }
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
