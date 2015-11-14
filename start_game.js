Meteor.methods({
  createGame: function() {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    if (Games.current()) {
      throw new Meteor.Error("game already started");
    }

    Games.insert({
      isCreated:true,
      createdAt: new Date(),
      createdBy: Meteor.user().username
    });
  },

  joinGame: function() {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    if (!Games.current()) {
      throw new Meteor.Error("no game started");
    }

    Games.current().addPlayer(Meteor.user().username);
  }
});

if (Meteor.isClient) {
  Template.joinGame.helpers({
    isGameCreated: function () {
      return Games.current();
    },
    playerJoined: function(){
      return _.contains(Games.current().players, Meteor.user().username);
    }
  });

  Template.joinGame.events({
    'click #create-game': function () {
      Meteor.call("createGame");
    },
    'click #join-game': function (event) {
      Meteor.call("joinGame");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  }); 
}