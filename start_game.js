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
      Games.insert({
        isCreated:true,
        createdAt: new Date()
      });
    },
    'click #join-game': function (event) {
      var game = Games.current();
      game.addPlayer(Meteor.user().username);
    }
  });

  function generateDeck() {
    var figures = 13;
    var suites = 4;  
    
    var cards = [];      
    for (var i = 0; i < figures; i++) {
        for(var j = 0; j < suites; j++){
          var n = suites*i + j;
          cards[n] = {figure: i, suite: j};
        }
    }
    return cards;
  }
  DECK = generateDeck();
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  }); 
}