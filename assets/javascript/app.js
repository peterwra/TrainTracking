// Retrieve values from user
$(document).on("click", "#newTrain", function (event) {
    event.preventDefault();
    console.log("Train Name: " + $("#trainName").val());
    console.log("Train Destination: " + $("#trainDestination").val());
    console.log("Train Time: " + $("#trainTime").val());
    console.log("Train Frequency: " + $("#trainFrequency").val());

    // Clear user input fields
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#trainTime").val("");
    $("#trainFrequency").val("")
})