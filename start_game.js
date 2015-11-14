if (Meteor.isClient) {

console.log("hello world");

  Template.joinGame.helpers({
    isGameStarted: function () {
      console.log(Games.findOne({isStarted:true}));
      return Games.findOne({isStarted:true})
    }
  });

  Template.joinGame.events({
    'click #start-game': function () {
      Games.insert({
        isStarted:true, 
        startedAt: new Date()
      })
    },
    'subimit .join-game': function (event) {
      event.preventDefault();
      var game = Games.findOne({isStarted:true});
      var name = event.target.text.value;
      game.addPlayer(name);
      event.target.text.value = "";
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}