if (Meteor.isClient) {
  Template.joinGame.helpers({
    isGameCreated: function () {
      return Games.findOne({isCreated:true});
    },
    playerInSession: function(){
      return Session.get("player");
    }
  });

  Template.joinGame.events({
    'click #create-game': function () {
      Games.insert({
        isCreated:true,
        createdAt: new Date()
      });
    },
    'submit #join-game': function (event) {
      event.preventDefault();
      var game = Games.findOne({isCreated:true});
      var name = event.target.name.value;
      game.addPlayer(name);
      Session.set("player", name);
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });
}