(function() {

  var infoWindows = [];
  var map;
  var overlay;

  var eventWrapper = document.getElementById('yehaw-event-map-wrapper');
  var eventMapElem = document.getElementById('yehaw-event-map');
  var eventListElem = document.getElementById('yehaw-event-list');

  //var overlayControl = document.createElement('button');
  //overlayControl.id = 'yehaw-event-map-overlay-toggle';
  //overlayControl.innerText = 'Toggle Original Map';
  //overlayControl.addEventListener('click', toggleOverlay);
  //eventWrapper.appendChild(overlayControl);

  window.initYehawMap = function()
  {
    var center = {lat: 47.606209, lng: -122.332069};

    map = new google.maps.Map(eventMapElem, {
      center: center,
      zoom: 13,
      disableDefaultUI: true
    });

    // Overlay
    var imageBounds = {
      north: 47.667934,
      south: 47.606209,
      east: -122.230959,
      west: -122.332069
    };

    //overlay = new google.maps.GroundOverlay('https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg', imageBounds);
    //overlay.setMap(map);

    // Since multiple events will take place at a given location, we create a
    // dictionary of the events keyed by their location

    var locationManifest = [];
    for(var i=0; i<window.yehawEvents.length; i++)
    {
      var event = window.yehawEvents[i];

      if(!locationManifest[event.location.title])
      {
        locationManifest[event.location.title] = {
          title: event.location.title,
          coordinates: event.location.coordinates,
          events: []
        };
      }

      locationManifest[event.location.title].events.push({
        title: event.title,
        date: event.date,
        url: event.url
      });
    }

    for(var locationName in locationManifest)
    {
      var location = locationManifest[locationName];

      // Marker
      var marker = setUpMapMarker(location);

      // Info Window
      var infoWindow = setUpInfoWindow(location, marker);
      infoWindows.push(infoWindow);

      // List Item
      for(var i=0; i<location.events.length; i++)
      {
        var event = location.events[i];
        eventListElem.appendChild(createEventListItem(event, marker, infoWindow));
      }
    }
  }

  function setUpMapMarker(location)
  {
    // Google Maps marker
    var marker = new google.maps.Marker({
      map: map,
      position: location.coordinates,
      title: location.title
    });

    return marker;
  }

  function setUpInfoWindow(location, marker)
  {
    // Google Maps Info Window
    var infoWindow = new google.maps.InfoWindow({
      content: getInfoWindowDescription(location)
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

  function getInfoWindowDescription(location)
  {
    var output = '';

    for(var i=0; i<location.events.length; i++)
    {
      var event = location.events[i];
      output += '<span class="yehaw-event-map-info">';
      output += '<a href="' + event.url + '" target="_blank" class="yehaw-event-title">' + event.title + '</a>';
      output += '<span class="yehaw-event-date">' + event.date + '</span>';
      output += '</span>';
    }

    output += '<span class="yehaw-event-location">' + location.title + '</span>';
    return output;
  }

})();
