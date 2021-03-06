angular
.module("wdiRadio", [
  "ui.router",
  "firebase"
])
.config([
  "$stateProvider",
  RouterFunction
])

.controller("SongIndexController", [
  "$firebaseArray",
  SongIndexControllerFunction
])
.controller("SongShowController", [
  "$stateParams",
    "$firebaseObject",
    SongShowControllerFunction
  ])

function RouterFunction($stateProvider){
  $stateProvider
  .state("songIndex", {
    url: "/songs",
    templateUrl: "js/ng-views/index.html",
    controller: "SongIndexController",
    controllerAs: "vm"
  })
  .state("songShow", {
    url: "/songs/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "SongShowController",
    controllerAs: "vm"
  })
}

function SongIndexControllerFunction($firebaseArray) {
  let ref = firebase.database().ref().child("wdiRadio");
  this.songs = $firebaseArray(ref);
}
// #Show
function SongShowControllerFunction($stateParams, $firebaseObject){
  let ref = firebase.database().ref().child("wdiRadio/" + $stateParams.id);
  $firebaseObject(ref).$loaded().then(song => this.song = song)
}

// #create
this.create = function(){
  this.songs.$add(this.newSong).then( () => this.newSong = {} )
    console.log("clicked")
}
// #destroy
this.delete = function(song){
  this.songs.$remove(song)
}
