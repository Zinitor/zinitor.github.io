document.addEventListener("DOMContentLoaded", function () {
    ymaps.ready(init);
    function init() {
        // Контейнер для меню.
        menu = $('<ul class="menu-filters"> ');
  
      for (var i = 0, l = groups.length; i < l; i++) {
        createMenuGroup(groups[i]);
      }
  
      function createMenuGroup(group) {
        // Пункт меню.
        var menuItem = $(
            '<li><a href="#" class="on">' +
              '<i class="' + group.icon +'">' +
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
        var submenuItem = $('<li><a href="#">' + item.name + "</a></li>"),
          // Создаем метку.
          placemark = new ymaps.Placemark(item.center, {
            balloonContent: item.name,
          });
        placemark.events.add("click", function () {
          document.getElementById("info-button").href =
            "info.html?group=" +
            encodeURIComponent(group.name) +
            "&item=" +
            encodeURIComponent(item.id);
        });
  
        // Добавляем метку в коллекцию.
        collection.add(placemark);
        // Добавляем пункт в подменю.
        submenuItem
          .appendTo(submenu)
          // При клике по пункту подменю открываем/закрываем баллун у метки.
          .find("a")
          .bind("click", function () {
            if (!placemark.balloon.isOpen()) {
              placemark.balloon.open();
            } else {
              placemark.balloon.close();
            }
            return false;
          });
      }
  
      // Добавляем меню в тэг menu.
      menu.appendTo($(".dirmaincontent .dirdesc"));
      // Выставляем масштаб карты чтобы были видны все группы.
      myMap.setBounds(myMap.geoObjects.getBounds());
  
      //Нахождение юрл параметра
      var urlParams = new URLSearchParams(window.location.search);
      var groupName = urlParams.get("group");
      var itemid = urlParams.get("item");
      //Присвоение адреса снова к кнопке когда пользователь вернулся со страницы информации
      document.getElementById("info-button").href =
        "info.html?group=" +
        encodeURIComponent(groupName) +
        "&item=" +
        encodeURIComponent(itemid);
  
      // Проверка если место вписано в url
      if (groupName) {
        // Проход по всем группам
        for (var i = 0, l = groups.length; i < l; i++) {
          if (groups[i].name === groupName) {
            //Если название группы совпадает
            {
              for (var j = 0, m = groups[i].items.length; j < m; j++) {
                if (groups[i].items[j].id === itemid) {
                  //Если id памятника присутствует
                  // Отцентрировать
                  myMap.setCenter(groups[i].items[j].center, 16);
                  var placemark = groups[i].items[j];
                  break;
                }
              }
              if (placemark) {
                break;
              }
            }
          }
        }
      }
    }
  });
  