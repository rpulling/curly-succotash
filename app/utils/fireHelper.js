var firebase = require('firebase');
var fireBaseUrl = "https://sweltering-torch-543.firebaseio.com/";
var base = new firebase(fireBaseUrl);
var usersBase = new firebase(fireBaseUrl + 'users/');

var fireHelper = {
  loggedIn:function(){
    return !!base.getAuth();
  },


  login: function(email, pw, callBack){
    base.authWithPassword({
      email: email,
      password: pw
    }, callBack);
  },


  logout:function(){
    base.unauth();
  },


  getUserBase:function(){
    var uId = base.getAuth().uid;

    if(!uId){
      return;
    }

    return usersBase + '/' + base.getAuth().uid;
  }
};

module.exports = fireHelper;
