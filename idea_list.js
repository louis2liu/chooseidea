Ideas = new Mongo.Collection("ideas");
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    allIdeas:function(){
      return Ideas.find({},{sort:{score:-1}});
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
     //console.log("hello world!");
     Session.set('counter', Session.get('counter') + 1);
     //Ideas.insert({
            
     //});
    },
    'click li': function(){
         Ideas.update(this._id,{$inc:{score:1}});
    }
  });
//console.log("hello client");

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    //Ideas.remove({});
    if (Ideas.find().count() > 0 ){return;}
    var ns = ["The first one","the second one","the third one"];
    _.each(ns,function(na){
        Ideas.insert({
           name:na,
           score:0
        });
    });
  });
}

