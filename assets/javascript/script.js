var apiKey = "l6dZ501cZibreJGFnj1KNONFMFepxr16";
var LIMIT = 10;
var topics = ["dog",
    "cat",
    "rabbit",
    "hamster",
    "skunk",
    "goldfish",
    "bird",
    "ferret",
    "turtle",
    "sugarglider"];
var STATUS_STILL = "still";
var STATUS_ANIMATED = "animated";
$(document).ready(function () {
    displayButtons();
    $("#animalButtons").on("click", "button", function () {
        console.log(`Button "${$(this).text()}" Clicked!!`);
        var queryURL = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${$(this).text()}&limit=${LIMIT}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(showImages);

    });
    $("#addAnimal").click(function (event) {
        event.preventDefault();
        var topic = $("#animalInput").val();
        topics.push(topic);
        addButton(topic);
        $("#animalInput").val("");
    });
});
function displayButtons() {
    topics.forEach(function (label) {
        addButton(label);

    });
}
function showImages(response) {
    console.log(response);
    $('#animals img').remove();
    response.data.forEach(function (item) {
        var imgTag = $("<img>");
        imgTag.attr("data-still", item.images.original_still.url);
        imgTag.attr("data-animated", item.images.original.url);
        imgTag.attr("src", item.images.original_still.url);
        imgTag.attr("data-status", STATUS_STILL);
        $("#animals").append(imgTag);
    });
}
function addButton(label) {
    var button = $("<button>").addClass("btn btn-primary").text(label);
    $("#animalButtons").append(button);
}
/*function removeAllButtons() {
    $("#animalButtons button").append(button);
}*/