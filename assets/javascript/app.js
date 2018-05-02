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


function grabTrains() {
  database.ref().on("child_added", function(snapshot, prevChildKey) {
    var newTrain = snapshot.val();
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.firstTrainTime);
  });
}
grabTrains();


  // Add a new train
  $("#submit-new-train").on("click", function (e) {
    e.preventDefault();

    trainNameInput = $("#train-name").val().trim();
    destinationInput = $("#destination-name").val().trim();
    firstTrainTimeInput = $("#first-train-time").val().trim();
    frequencyInput = $("#frequency-name").val().trim();

    console.log(trainNameInput);
    console.log(destinationInput);
    console.log(firstTrainTimeInput);
    console.log(frequencyInput);

    database.ref().push({
      trainName: trainNameInput,
      destination: destinationInput,
      firstTrainTime: firstTrainTimeInput,
      frequency: frequencyInput
    });

    trainNameInput = $("#train-name").val("");
    destinationInput = $("#destination-name").val("");
    firstTrainTimeInput = $("#first-train-time").val("");
    frequencyInput = $("#frequency-name").val("");
  });
});