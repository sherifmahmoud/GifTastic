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
        $(this).removeClass("btn-primary").addClass("btn-warning");
        $(this).siblings().removeClass("btn-warning").addClass("btn-primary");
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
    $(document).on("click", "img", function () {
        console.log("image clicked!!");
        var status = $(this).attr("data-status");
        if (status === STATUS_STILL) {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-status", STATUS_ANIMATED);
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-status", STATUS_STILL);
        }
    });
});
function displayButtons() {
    topics.forEach(function (label) {
        addButton(label);

    });
}

function showImages(response) {
    console.log(response);
    $('#animals .img-with-text').remove();
    response.data.forEach(function (item) {
        var imgDiv = $("<div>").addClass("img-with-text");
        var imgTag = $("<img>");
        imgTag.attr("data-still", item.images.original_still.url);
        imgTag.attr("data-animated", item.images.original.url);
        imgTag.attr("src", item.images.original_still.url);
        imgTag.attr("data-status", STATUS_STILL);
        imgDiv.append(imgTag);
        var imageText = $("<p>").text(`Rating: ${item.rating.toUpperCase()}`);
        imgDiv.append(imageText);
        console.log(item.rating);
        $("#animals").append(imgDiv);
    });
}

function addButton(label) {
    var button = $("<button>").addClass("btn btn-primary").text(label);
    $("#animalButtons").append(button);
}

