if (Meteor.isClient) {

console.log("hello world");


  Template.joinGame.helpers({
    isGameStarted: function () {
      return false;
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Games.helpers({
  isStarted: function() {
    
    return Games.findOne({isStarted:true});

  }
});