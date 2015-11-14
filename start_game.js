var DECK;

if (Meteor.isClient) {
  Template.joinGame.helpers({
    isGameCreated: function () {
      return Games.current();
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
      var game = Games.current();
      var name = event.target.name.value;
      game.addPlayer(name);
      Session.set("player", name);
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    DECK = generateDeck();
  });

  var generateDeck = function () {
    var figures = 13;
    var suites = 4;  
    
    var cards = [];      
    for (var i = 0; i < figures; i++) {
        for(var j = 0; j < suites; j++){
          var n = suites*i + j;
          cards[n] = {figure: i, suite: j, inUse: false};
        }
    }
  return cards;
  }

  var deal = function (){

  }
}


