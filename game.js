if (Meteor.isClient) {
  Template.game.helpers({
    allPlayers: function () {
      return _.reduce(Games.current().players, function(memo, player) {
        return memo + ", " + player;
      });
    },
    currentPlayer: function() {
      return Games.current().currentPlayer();
    }
  });

  Template.bet.helpers({
    isMyTurn: function() {
      return Games.current().currentPlayer() === playerInSession();
    }
  });
}