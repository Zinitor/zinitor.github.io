document.addEventListener("DOMContentLoaded", function () {
  ymaps.ready(init);
  $(document).on("click", "a#dir", function (e) {
    if ($(".dirmenu").css("display") == "none") {
      $(".dirmenu").css("display", "grid");
      $("#info-button").css("display", "none");
      // $('#map').css("display", 'none');
    } else {
      $(".dirmenu").css("display", "none");
      $("#info-button").css("display", "block");
      // $('#map').css("display", 'block');
    }
    // showitems();
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
            "<li>" +
            item.name +
            "</li>" +
            " </a> "
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
          $("#info-button").css("color", "var(--primary-color)");
        })
        .add("balloonclose", function () {
          $("#info-button").css("color", "var(--text-color)");
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
      myMap.setCenter(groups[groupid].items[itemid - 1].center, 16);
    }
    //   // Проход по всем группам
    //   for (var i = 0, l = groups.length; i < l; i++) {
    //     if (groups[i].name == groupName) {
    //       //Если название группы совпадает
    //       {
    //         for (var j = 0, m = groups[i].items.length; j < m; j++) {
    //           if (groups[groupid].items[j].id == itemid) {
    //             //Если id памятника присутствует
    //             // Отцентрировать
    //             myMap.setCenter(groups[i].items[j].center, 16);
    //             var placemark = groups[i].items[j];
    //             break;
    //           }
    //         }
    //         if (placemark) {
    //           break;
    //         }
    //       }
    //     }
    //   }
    // }
  }
});
