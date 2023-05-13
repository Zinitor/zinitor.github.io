//wait for page to load
document.addEventListener("DOMContentLoaded", function () {
  // Get the query string parameters from the URL
  const queryString = window.location.search;

  // Create a new URLSearchParams object and pass the query string as a parameter
  const urlParams = new URLSearchParams(queryString);

  // Get the value of the 'landmark' parameter

  // Display the landmark name on the page

  var groupid = urlParams.get("groupid");
  var itemid = urlParams.get("item");
  var landmarkElement = document.getElementById("landmark-title");
  var landmarkAuthor = document.getElementById("landmark-author");
  var landmarkDate = document.getElementById("landmark-date");
  var landmarkDescription = document.getElementById("landmark-description");
  var landmarkImage = document.getElementById("landmark-image");

  var filePath = ".//" + "groups/" + groupid + "/" + itemid + ".json";
  $.getJSON(filePath)
    .done(function (data) {
      if (landmarkElement) {
        landmarkElement.innerHTML = data.name;
        landmarkAuthor.innerHTML = data.author;
        landmarkDate.innerHTML = data.date;
        landmarkDescription.innerHTML = data.description;
        // landmarkDescription.innerHTML = JSON.stringify(data.description);

        landmarkImage.src = data.imageUrl;
      } else {
        console.log("The element does not exist.");
      }
      // Use the itemName variable as needed
    })
    .fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Error loading JSON data: " + err);
      // Handle the error as needed
    });

  // var descriptionElement = document.getElementById("landmark-description");
  //

  goBackToMapButtonUrl();
});

function goBackToMapButtonUrl() {
  // Parse the landmark name from the URL parameter
  const params = new URLSearchParams(window.location.search);
  const groupid = params.get("groupid");
  const itemid = params.get("item");
  document.getElementById("map-button").href =
    "index.html?groupid=" +
    encodeURIComponent(groupid) +
    "&item=" +
    encodeURIComponent(itemid);
}

$(window).scroll(function () {
  if ($(window).scrollTop() + $(window).height() == $(document).height()) {
    $("#map-button").css("color", "var(--primary-color)");
  } else $("#map-button").css("color", "var(--text-color)");
});
