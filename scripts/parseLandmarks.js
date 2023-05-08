function goBackToMapButtonUrl() {
  // Parse the landmark name from the URL parameter
  const params = new URLSearchParams(window.location.search);
  const landmarkName = params.get("landmark");
  document.getElementById("map-button").href =
  "index.html?landmark=" + encodeURIComponent(landmarkName);
}

//wait for page to load
document.addEventListener("DOMContentLoaded", function () {
  // Get the query string parameters from the URL
  const queryString = window.location.search;

  // Create a new URLSearchParams object and pass the query string as a parameter
  const urlParams = new URLSearchParams(queryString);

  // Get the value of the 'landmark' parameter

  // Display the landmark name on the page

  var groupName = urlParams.get("group");
  var itemid = urlParams.get("item");
  var filePath = './/' +'groups/' + groupName + '/' + itemid + '.json';
  $.getJSON(filePath)
    .done(function(data) {
        var itemName = data.name;
        console.log(data.name);
        // Use the itemName variable as needed
    })
    .fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Error loading JSON data: " + err);
        // Handle the error as needed
    });

  var landmarkElement = document.getElementById("landmark-title");

  // var descriptionElement = document.getElementById("landmark-description");
  // if (landmarkElement) {
  //   landmarkElement.innerHTML = data.name;
  // } else {
  //   console.log("The element does not exist.");
  // }
 

  goBackToMapButtonUrl();
});
