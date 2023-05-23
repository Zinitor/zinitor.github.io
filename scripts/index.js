document.addEventListener("DOMContentLoaded", function () {
  ymaps.ready(init);
  $(document).on("click", "a#dir", function (e) {
    if ($(".dirmenu").css("display") == "none") {
      $(".dirmenu").css("display", "grid");
      $("#info-button").css("display", "none");
    } else {
      $(".dirmenu").css("display", "none");
      $("#info-button").css("display", "block");
    }
  });
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
        // Контейнер для подменю.
        submenu = $('<ul class="nav-links"></ul>');
      submenu.hide();
      linksubmenu = $("<ul>" + "<h3>" + group.name + "</h3>" + "</ul>");
      linksubmenu.appendTo($(".dirmenu .grid-group-wrapper"));
      // Добавляем коллекцию на карту.
      myMap.geoObjects.add(collection);
      // Добавляем подменю.
      menuItem
        .append(submenu)
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
        createSubMenu(group.items[j], collection, submenu, group);
      }
    }

    function createSubMenu(item, collection, submenu, group) {
      // Пункт подменю.
      // var submenuItem = $('<li><a href="#">' + item.name + "</a></li>"),
      var submenuItem = $(
          "<a href=#>" +
            // '"index.html?group=' +
            // group.name +
            // "&item=" +
            // item.id +
            // '">' +
            '<li data-search-term="' +
            item.name.toLowerCase() +
            '">' +
            item.name +
            "</li>" +
            "</a>"
        ), //ссылка на объект
        // var submenuItem = $('<li>' + item.name +'</li>').attr("href", "index.html?group=" + group.name + "&item=" + item.id);
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
          $("#info-button").css("color", "var(--accent-color)");
        })
        .add("balloonclose", function () {
          $("#info-button").css("color", "var(--toggle-color)");
        });

      // Добавляем метку в коллекцию.
      collection.add(placemark);
      // Добавляем пункт в подменю.
      submenuItem
        .appendTo(linksubmenu, submenu)
        // При клике по пункту подменю закрываем справочник и центрируемся на объекте
        .find("a")
        .bind("click", function () {
          if (!placemark.balloon.isOpen()) {
            // $('#map').css("display", 'block');
            // placemark.balloon.open();
          } else {
            // placemark.balloon.close();
          }
          return false;
        });
      //При клике на объекте в перечени
      submenuItem.bind("click", function () {
        $(".dirmenu").css("display", "none"); //закрыть перечень
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

    // Добавляем меню в тэг menu.
    menu.appendTo($(".sidebar .menu-bar .menu"));
    // Выставляем масштаб карты чтобы были видны все группы.
    myMap.setBounds(myMap.geoObjects.getBounds());

    //Нахождение юрл параметра
    var urlParams = new URLSearchParams(window.location.search);
    var groupid = urlParams.get("groupid");
    var itemid = urlParams.get("item");
    //Присвоение адреса снова к кнопке когда пользователь вернулся со страницы информации
    document.getElementById("info-button").href =
      "info.html?groupid=" +
      encodeURIComponent(groupid) +
      "&item=" +
      encodeURIComponent(itemid);

    // Проверка если место вписано в url
    if (groupid) {
      itemid = itemid.slice(4);
      myMap.setCenter(groups[groupid].items[itemid].center, 16);
    }
  }
  const toggleThemeBtn = document.querySelector("#themechangebtn");
  toggleThemeBtn.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
  });
  jQuery(document).ready(function ($) {
    console.log($(".dirmenu").children("ul"));
    $(".dirmenu ul a li").each(function () {
      $(this).attr("data-search-term", $(this).text().toLowerCase());
    });

    $(".live-search-box").on("keyup", function () {
      var searchTerm = $(this).val().toLowerCase();

      $(".dirmenu ul a li").each(function () {
        if (
          $(this).filter("[data-search-term *=" + searchTerm + "]").length >
            0 ||
          searchTerm.length < 1
        ) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });
  });
});
