//wait for page to load
document.addEventListener("DOMContentLoaded", function () {
  //Открытие закрытие меню
  $(document).on("click", "a#dir", function (e) {
    if ($(".dirmenu").css("display") == "none") {
      $(".dirmenu").css("display", "grid");
      $("#map-button").css("display", "none");
    } else {
      $(".dirmenu").css("display", "none");
      $("#map-button").css("display", "block");
    }
  });

  const toggleThemeBtn = document.querySelector("#themechangebtn");
  toggleThemeBtn.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
  });
  //Смена темы
  const queryString = window.location.search;

  // Create a new URLSearchParams object and pass the query string as a parameter
  const urlParams = new URLSearchParams(queryString);

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
        document.title = data.name;
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

  //Создание перечня
  for (var i = 0, l = groups.length; i < l; i++) {
    createMenuGroup(groups[i]);
  }
  function createMenuGroup(group) {
    group.items.sort(function(a,b){
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    //Добавление предметов к меню
    linksubmenu = $(
      '<ul class="' +
        group.name +
        '">' +
        "<h2>" +
        group.name +
        "</h2>" +
        "</ul>"
    );
    linksubmenu.appendTo($(".dirmenu"));
    for (var j = 0, m = group.items.length; j < m; j++) {
      createSubMenu(group.items[j], group);
    }
  }
  function createSubMenu(item, group) {
    // "<a href=info.html?groupid="+group.groupid +"&item="+item.id+">" +
    var submenuItem = $("<a href=#>" + "<li>" + item.name + "</li>" + " </a> ");
    submenuItem.appendTo(linksubmenu);
    submenuItem.bind("click", function () {
      filePath = ".//" + "groups/" + group.groupid + "/" + item.id + ".json";
      $.getJSON(filePath).done(function (data) {
        landmarkElement.innerHTML = data.name;
        landmarkAuthor.innerHTML = data.author;
        landmarkDate.innerHTML = data.date;
        landmarkDescription.innerHTML = data.description;
        landmarkImage.src = data.imageUrl;
        document.title = data.name;
        $(".dirmenu").css("display", "none");
        $("#map-button").css("display", "block");
        goBackToMapButtonUrl(group.groupid, item.id);
      });
    });
  }

  goBackToMapButtonUrl(groupid,itemid);
});

function goBackToMapButtonUrl(groupid,itemid) {
  document.getElementById("map-button").href =
    "index.html?groupid=" +
    encodeURIComponent(groupid) +
    "&item=" +
    encodeURIComponent(itemid);
}
//Смена стиля кнопки когда достигаем конца страницы
$(window).scroll(function () {
  if ($(window).scrollTop() + $(window).height() == $(document).height()) {
    $("#map-button").css("color", "var(--accent-color)");
  } else $("#map-button").css("color", "var(--toggle-color)");
});
