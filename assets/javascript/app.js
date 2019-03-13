// Initialize Firebase
var config = {
    apiKey: "AIzaSyDyjDO8yczUQWWjm-JgbD12CZYk334nx_o",
    authDomain: "train-tracker-69749.firebaseapp.com",
    databaseURL: "https://train-tracker-69749.firebaseio.com",
    projectId: "train-tracker-69749",
    storageBucket: "train-tracker-69749.appspot.com",
    messagingSenderId: "256637851334"
};
firebase.initializeApp(config);

// Database reference
var database = firebase.database();

// Train added to the database
database.ref().on("child_added", function (childSnap){
    var tName = childSnap.val().trainName;
    var tDestination = childSnap.val().trainDestination;
    var tTime = childSnap.val().trainTime;
    var tFrequency = childSnap.val().trainFrequeny;

    // Console log the current time and train time for ease of data review
    console.log("***** CURRENT TIME: " + moment().format("MM/DD/YYYY hh:mm A"));

    // Subtract 1 year to make sure date is in past
    var tTimePast = moment.unix(tTime).format("HH:mm");
    var mySubtract = moment(tTimePast, "HH:mm").subtract(1, "years");

    // Get current time and difference between current time and train time
    var diffTime = moment().diff(moment(mySubtract), "minutes");
    console.log("Time difference in minutes: " + diffTime);

    // Get remainder to calculate when next train due
    var trainTimeRemainder = diffTime % tFrequency;
    console.log("Train time remainder: " + trainTimeRemainder);

    // Minutes until next train
    var trainWaitTime = tFrequency - trainTimeRemainder;
    console.log("Train wait time is: " + trainWaitTime);

    // When is the next train?
    var nextTrainTime = moment().add(trainWaitTime, "minutes");
    nextTrainTime = moment(nextTrainTime).format("MM/DD/YYYY hh:mm A");
    console.log("NEXT TRAIN ARRIVAL: " + nextTrainTime);

    // Create variables for the data row and elements
    var tableRow = $("<tr>");
    var tdTrainName = $("<td>");
    tdTrainName.text(tName);
    var tdTrainDestination = $("<td>");
    tdTrainDestination.text(tDestination);
    var tdTrainFrequency = $("<td>");
    tdTrainFrequency.text(tFrequency);
    var tdTrainArrival = $("<td>");
    tdTrainArrival.text(nextTrainTime)
    var tdTrainMinutes = $("<td>");
    tdTrainMinutes.text(trainWaitTime);

    // Add the elements to the row and append the row to the div displaying the schedule
    tableRow.append(tdTrainName);
    tableRow.append(tdTrainDestination);
    tableRow.append(tdTrainFrequency);
    tableRow.append(tdTrainArrival);
    tableRow.append(tdTrainMinutes);
    $("#trainlist").append(tableRow);

})

// Retrieve values from user
$(document).on("click", "#newTrain", function (event) {
    event.preventDefault();

    // Store the time as seconds
    var timeMoment = moment($("#trainTime").val(), "HH:mm").format("X");
    console.log("Time Moment: " + timeMoment);

    console.log("Train Name: " + $("#trainName").val());
    console.log("Train Destination: " + $("#trainDestination").val());
    console.log("Train Time: " + $("#trainTime").val());
    console.log("Train Frequency: " + $("#trainFrequency").val());

    database.ref().push({
        trainName: $("#trainName").val().trim(),
        trainDestination: $("#trainDestination").val().trim(),
        trainTime: timeMoment.toString(),
        trainFrequeny: $("#trainFrequency").val().toString()
    });

    // Clear user input fields
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#trainTime").val("");
    $("#trainFrequency").val("")
})