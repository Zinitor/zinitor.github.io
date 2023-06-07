document.addEventListener("DOMContentLoaded", function () {
  ymaps.ready(init);
  function init() {
    // Создание экземпляра карты.
    var myMap = new ymaps.Map(
        "map",
        {
          center: [56.319962, 43.966574],
          zoom: 12,
        },
        {
          searchControlProvider: "yandex#search",
        }
      ),
      // Контейнер для меню.
      menu = $('<ul class="menu-filters"> ');

    for (var i = 0, l = groups.length; i < l; i++) {
      createMenuGroup(groups[i]);
    }

    function createMenuGroup(group) {
      group.items.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      // Пункт меню.
      var menuItem = $(
          '<li><a href="#" class="on">' +
            '<i class="' +
            group.icon +
            '">' +
            "</a></li>"
        ),
        // Коллекция для геообъектов группы.
        collection = new ymaps.GeoObjectCollection(null, {
          preset: group.style,
          iconGlyph: group.iconGlyph,
          iconGlyphColor: group.iconGlyphColor,
        }),
        // Контейнер для меню списка
      linksubmenu = $("<ul>" + "<h3>" + group.name + "</h3>" + "</ul>");
      linksubmenu.appendTo($(".dirmenu .grid-group-wrapper"));
      // Добавляем коллекцию на карту.
      myMap.geoObjects.add(collection);
      // Добавляем подменю.
      menuItem
        // Добавляем пункт в меню.
        .appendTo(menu)
        // По клику удаляем/добавляем коллекцию на карту и скрываем/отображаем подменю.
        .find("a")
        .bind("click", function () {
          $(this).toggleClass("on off");
          if (collection.getParent()) {
            myMap.geoObjects.remove(collection);
          } else {
            myMap.geoObjects.add(collection);
          }
        });
      for (var j = 0, m = group.items.length; j < m; j++) {
        createSubMenu(group.items[j], collection, linksubmenu, group);
      }
    }

    function createSubMenu(item, collection,linksubmenu, group) {
      var submenuItem = $(
          "<a href=#>" +
            '<li data-search-term="' +
            item.name.toLowerCase() +
            '">' +
            item.name +
            "</li>" +
            "</a>"
        ), //ссылка на объект
        // Создаем метку.
        placemark = new ymaps.Placemark(item.center, {
          balloonContent: item.name,
        });
      placemark.events
        .add("click", function () {
          document.getElementById("info-button").href =
            "info.html?groupid=" +
            encodeURIComponent(group.groupid) +
            "&item=" +
            encodeURIComponent(item.id);
        })
        .add("balloonopen", function () {
          $("#info-button").css("color", "var(--accent-color)"); //смена css
        })
        .add("balloonclose", function () {
          $("#info-button").css("color", "var(--toggle-color)");
        });

      // Добавляем метку в коллекцию.
      collection.add(placemark);
      // Добавляем пункт в подменю.
      submenuItem
        .appendTo(linksubmenu)
        // При клике по пункту подменю закрываем справочник и центрируемся на объекте
        .find("a");
      //При клике на объекте в перечени
      submenuItem.bind("click", function () {
        $(".dirmenu").css("display", "none"); //закрыть перечень
        $(".nav-links").css("background", "var(--shadow-color)");
        $(".fa-bars").toggleClass("fa-xmark");
        $(".fa-bars").css("color", "var(--primary-color)");
        $("#info-button").css("display", "block");
        myMap.setCenter(placemark.geometry.getCoordinates(), 16); //отцентрировать карту на объекте
        document.getElementById("info-button").href =
          "info.html?groupid=" +
          encodeURIComponent(group.groupid) +
          "&item=" +
          encodeURIComponent(item.id); //Добавить ссылку на объект к кнопке справки
        placemark.balloon.open(); //Открыть баллун
      });
    }
    //Происходит после создания меню
    //Прикрепляем фильтры к классу menu.
    menu.appendTo($(".sidebar .menu-bar .menu"));
    // Выставляем масштаб карты чтобы были видны все группы.
    myMap.setBounds(myMap.geoObjects.getBounds());

    //Нахождение юрл параметра
    var urlParams = new URLSearchParams(window.location.search);
    // Проверка если место вписано в url
    if (urlParams.has("groupid") && urlParams.has("item")) {
      var groupid = urlParams.get("groupid");
      var itemid = urlParams.get("item");
      //Присвоение адреса снова к кнопке когда пользователь вернулся со страницы информации
      document.getElementById("info-button").href =
        "info.html?groupid=" +
        encodeURIComponent(groupid) +
        "&item=" +
        encodeURIComponent(itemid);
      if (groupid) {
        //т.к. индекс меняется при сортировке то необходимо заново находить нужный индекс по id
        itemid = groups[groupid].items.map((e) => e.id).indexOf(itemid);
        myMap.setCenter(groups[groupid].items[itemid].center, 16);
      }
    }
  }

  // Находим элемент
  const closeAlertBtn = document.getElementById("closeAlertBtn");
  // Подписываемся на нажатие
  closeAlertBtn.addEventListener("click", hideAlertDialog);
  const isOldUser = getCookie("visited");
  // Если старый пользователь скрываем виджет
  if (isOldUser === "true") {
    $("#alertWidget").css("display", "none");
  }

  const themeCookie = getCookie("theme");
  if (themeCookie !== "") {
    document.documentElement.setAttribute("data-theme", themeCookie);
    if (themeCookie == "dark") {
      $(".fa-sun").toggleClass("fa-moon");
    }
  }
  //смена темы
  const toggleThemeBtn = document.querySelector("#themechangebtn");
  toggleThemeBtn.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    $(".fa-sun").toggleClass("fa-moon");
    setCookie("theme", newTheme, 1);
  });

  $(document).on("click", "a#dir", function (e) {
    if ($(".dirmenu").css("display") == "none") {
      $(".fa-bars").toggleClass("fa-xmark");
      $(".fa-bars").css("color", "var(--shadow-color)");
      $(".dirmenu").css("display", "grid");
      $(".nav-links").css("background", "var(--accent-color)");
      $("#info-button").css("display", "none");
    } else {
      $(".fa-bars").toggleClass("fa-xmark");
      $(".fa-bars").css("color", "var(--primary-color)");
      $(".dirmenu").css("display", "none");
      $(".nav-links").css("background", "var(--shadow-color)");
      $("#info-button").css("display", "block");
    }
  });
  //Реализация поиска
  $(".dirmenu ul a li").each(function () {
    //добавление к каждому элементу перечня аттрибута имени
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
});

// Function to hide the alert widget
function hideAlertDialog() {
  setCookie("visited", true, 1);
  alertWidget.style.display = "none";
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
