(function() {

  var infoWindows = [];
  var map;
  var overlay;

  var eventWrapper = document.getElementById('yehaw-event-map-wrapper');

  var eventMapElem = document.createElement('div');
  eventMapElem.id = 'yehaw-event-map';
  eventWrapper.appendChild(eventMapElem);

  var eventListElem = document.createElement('ul');
  eventListElem.id = 'yehaw-event-list';
  eventWrapper.appendChild(eventListElem);

  var overlayControl = document.createElement('button');
  overlayControl.innerText = 'Toggle Overlay';
  overlayControl.addEventListener('click', toggleOverlay);
  eventWrapper.appendChild(overlayControl);

  window.initYehawMap = function()
  {
    var center = {lat: 47.606209, lng: -122.332069};

    map = new google.maps.Map(eventMapElem, {
      center: center,
      zoom: 13
    });

    // Overlay
    var imageBounds = {
      north: 47.667934,
      south: 47.606209,
      east: -122.230959,
      west: -122.332069
    };

    overlay = new google.maps.GroundOverlay('https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg', imageBounds);
    overlay.setMap(map);

    for(var i=0; i<window.yehawEvents.length; i++)
    {
      var event = window.yehawEvents[i];

      // Marker
      var marker = setUpMapMarker(event);

      // Info Window
      var infoWindow = setUpInfoWindow(event, marker);
      infoWindows.push(infoWindow);

      // List Item
      eventListElem.appendChild(createEventListItem(event, marker, infoWindow));
    }

  }

  function setUpMapMarker(event)
  {
    // Google Maps marker
    var marker = new google.maps.Marker({
      map: map,
      position: event.location,
      title: event.title
    });

    return marker;
  }

  function setUpInfoWindow(event, marker)
  {
    // Google Maps Info Window
    var infoWindow = new google.maps.InfoWindow({
      content: event.description
    });

    marker.addListener('click', function() {
      openInfoWindow(infoWindow, marker);
    });

    return infoWindow;
  }

  function openInfoWindow(infoWindow, marker)
  {
    // Close any open info windows
    for(var i=0; i<infoWindows.length; i++)
    {
      infoWindows[i].close();
    }

    infoWindow.open(map, marker);
  }

  function createEventListItem(event, marker, infoWindow)
  {
    // List Item
    var listItem = document.createElement('li');

    // Event Title
    var eventTitle = document.createElement('span');
    eventTitle.innerText = event.title;
    listItem.appendChild(eventTitle);

    eventTitle.addEventListener('click', function() {
      var markerPosition = marker.getPosition();
      map.setCenter(markerPosition);
      openInfoWindow(infoWindow, marker);
    });

    return listItem;
  }

  function toggleOverlay()
  {
    if(overlay.map)
    {
      overlay.setMap(null);
    }
    else
    {
      overlay.setMap(map);
    }
  }

})();
