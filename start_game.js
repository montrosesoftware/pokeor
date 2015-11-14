if (Meteor.isClient) {

console.log("hello world");

  Template.joinGame.helpers({
    isGameStarted: function () {
      console.log(Games.findOne({isCreated:true}));
      return Games.findOne({isCreated:true})
    }
  });

  Template.joinGame.events({
    'click #start-game': function () {
      Games.insert({
        isCreated:true, 
        createdAt: new Date()
      })
    },
    'submit #join-game': function (event) {
      event.preventDefault();
      var game = Games.findOne({isCreated:true});
      var name = event.target.name.value;
      game.addPlayer(name);
      event.target.name.value = "";
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });
}