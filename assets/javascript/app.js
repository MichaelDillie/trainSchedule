$(document).ready(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC0oMCTKlY6-4R7B3k486rLpSx0pUzZU88",
    authDomain: "trainschedule-2f508.firebaseapp.com",
    databaseURL: "https://trainschedule-2f508.firebaseio.com",
    projectId: "trainschedule-2f508",
    storageBucket: "",
    messagingSenderId: "726624783713"
  }
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainNameInput;
  var destinationInput;
  var firstTrainTimeInput;
  var frequencyInput;

  var nextTrainArrival;
  var minutesAwayDisplay;
  
  var tableBody = $("#table-body");


function grabTrains() {
  database.ref().on("child_added", function(snapshot, prevChildKey) {
    var newTrain = snapshot.val();
    // calcNextArrival(newTrain.firstTrainTime, newTrain.frequency);
    tableBody.append("<tr><td>" + newTrain.trainName + "</td><td>" + newTrain.destination + "</td><td>" + newTrain.frequency + "</td><td>" + nextTrainArrival + "</td><td>" + newTrain.minutesAway + "</td></tr>")
  });
}
grabTrains();

// function calcNextArrival(firstArrival, trainFrequency) {
//   nextTrainArrival = moment(firstArrival).add(trainFrequency, "m").format("hh:mm")
// }
// function calcMinutesAway(timeNow, timeOfNextTrain) {
//   minutesAwayDisplay = timeNow - timeOfNextTrain;
// }

  // Add a new train
  $("#submit-new-train").on("click", function (e) {
    e.preventDefault();

    trainNameInput = $("#train-name").val().trim();
    destinationInput = $("#destination-name").val().trim();
    firstTrainTimeInput = $("#first-train-time").val().trim();
    frequencyInput = $("#frequency-name").val().trim();

    database.ref().push({
      trainName: trainNameInput,
      destination: destinationInput,
      firstTrainTime: firstTrainTimeInput,
      frequency: frequencyInput,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    trainNameInput = $("#train-name").val("");
    destinationInput = $("#destination-name").val("");
    firstTrainTimeInput = $("#first-train-time").val("");
    frequencyInput = $("#frequency-name").val("");
  });
});