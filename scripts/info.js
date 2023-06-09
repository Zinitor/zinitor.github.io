document.addEventListener("DOMContentLoaded", function () {
  // Создание нового поискового запроса
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  var groupid = urlParams.get("groupid");
  var itemid = urlParams.get("item");
  var landmarkElement = document.getElementById("landmark-title");
  var landmarkAuthor = document.getElementById("landmark-author");
  var landmarkDate = document.getElementById("landmark-date");
  var landmarkDescription = document.getElementById("landmark-description");
  var landmarkImage = document.getElementById("landmark-image");
  var landmarkInfoUrl = document.getElementById("infourl");

  var filePath = ".//" + "groups/" + groupid + "/" + itemid + ".json";
  $.getJSON(filePath)
    .done(function (data) {
      if (landmarkElement) {
        document.title = data.name;
        landmarkElement.innerHTML = data.name;
        landmarkAuthor.innerHTML = data.author;
        landmarkDate.innerHTML = data.date;
        landmarkDescription.innerHTML = data.description;
        if (data.infoUrl) {
          landmarkInfoUrl.href = data.infoUrl;
        }
        landmarkImage.src = data.imageUrl;
      } else {
        console.log("The element does not exist.");
      }
    })
    .fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Error loading JSON data: " + err);
      // Проверка ошибок
    });

  //Создание перечня
  for (var i = 0, l = groups.length; i < l; i++) {
    createMenuGroup(groups[i]);
  }
  function createMenuGroup(group) {
    group.items.sort(function (a, b) {
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
        "<h3>" +
        group.name +
        "</h3>" +
        "</ul>"
    );
    linksubmenu.appendTo($(".dirmenu .grid-group-wrapper"));
    for (var j = 0, m = group.items.length; j < m; j++) {
      createSubMenu(group.items[j], group);
    }
  }
  function createSubMenu(item, group) {
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
        $(".nav-links").css("background", "var(--shadow-color)");
        $(".fa-bars").toggleClass("fa-xmark");
        $(".fa-bars").css("color", "var(--primary-color)");
        $("#map-button").css("display", "block");
        goBackToMapButtonUrl(group.groupid, item.id);
      });
    });
  }
  //Реализация поиска
  $(".dirmenu ul a li").each(function () {
    $(this).attr("data-search-term", $(this).text().toLowerCase());
  });

  $(".live-search-box").on("keyup", function () {
    var searchTerm = $(this).val().toLowerCase();

    $(".dirmenu ul a li").each(function () {
      if (
        $(this).filter("[data-search-term *=" + searchTerm + "]").length > 0 ||
        searchTerm.length < 1
      ) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
  goBackToMapButtonUrl(groupid, itemid);

   //Смена темы
   const toggleThemeBtn = document.querySelector("#themechangebtn");
   toggleThemeBtn.addEventListener("click", function () {
     const currentTheme = document.documentElement.getAttribute("data-theme");
     const newTheme = currentTheme === "dark" ? "light" : "dark";
     document.documentElement.setAttribute("data-theme", newTheme);
     $(".fa-sun").toggleClass("fa-moon");
     setCookie("theme", newTheme, 1);
   });
   const themeCookie = getCookie("theme");
   if (themeCookie !== "") {
     document.documentElement.setAttribute("data-theme", themeCookie);
     if (themeCookie == "dark") {
       $(".fa-sun").toggleClass("fa-moon");
     }
   }
 
   //Открытие закрытие перечня
   $(document).on("click", "a#dir", function (e) {
     if ($(".dirmenu").css("display") == "none") {
       $(".fa-bars").toggleClass("fa-xmark");
       $(".fa-bars").css("color", "var(--shadow-color)");
       $(".dirmenu").css("display", "grid");
       $(".nav-links").css("background", "var(--primary-color)");
       $("#map-button").css("display", "none");
     } else {
       $(".fa-bars").toggleClass("fa-xmark");
       $(".fa-bars").css("color", "var(--primary-color)");
       $(".dirmenu").css("display", "none");
       $(".nav-links").css("background", "var(--shadow-color)");
       $("#map-button").css("display", "block");
     }
   });
   //Смена стиля кнопки когда достигаем конца страницы
   $(window).scroll(function () {
     if ($(window).scrollTop() + $(window).height() == $(document).height()) {
       $("#map-button").css("color", "var(--accent-color)");
     } else $("#map-button").css("color", "var(--toggle-color)");
   });
});

function goBackToMapButtonUrl(groupid, itemid) {
  document.getElementById("map-button").href =
    "index.html?groupid=" +
    encodeURIComponent(groupid) +
    "&item=" +
    encodeURIComponent(itemid);
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return "";
}

const setCookie = (name, value, exdays) => {
  const d = new Date(); // Текущая дата
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000); //Дата смерти
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/"; // Установка куки
};
