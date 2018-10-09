(function() {

  var infoWindows = [];
  var map;
  var overlay;

  var eventWrapper = document.getElementById('map-wrapper');
  var eventMapElem = document.getElementById('map');
  var eventListElem = document.getElementById('event-list');

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

      locationManifest[event.location.title].events.push(event);
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
    var infoWindow = new google.maps.InfoWindow();

    marker.addListener('click', function() {
      infoWindow.setContent(getLocationInfoWindowContent(location));
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
    eventTitle.className = 'event-title';
    eventTitle.innerText = event.title;
    listItem.appendChild(eventTitle);

    // Event Date
    var eventDate = document.createElement('span');
    eventDate.className = 'event-date';
    eventDate.innerText = moment(event.start).format('MMMM Do YYYY');
    listItem.appendChild(eventDate);

    // Event Location
    var eventLocation = document.createElement('span');
    eventLocation.className = 'event-location';
    eventLocation.innerText = event.location.title;
    listItem.appendChild(eventLocation);

    listItem.addEventListener('click', function() {

      var markerPosition = marker.getPosition();
      map.setCenter(markerPosition);

      infoWindow.setContent(getEventInfoWindowContent(event));
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

  function getLocationInfoWindowContent(location)
  {
    var output = '';

    output += '<div class="map-location-info-wrapper">';
    output += '<span class="explanation">Upcoming events at this location:</span>';

    for(var i=0; i<3; i++)
    {
      var event = location.events[i];

      if(!event)
      {
        break;
      }

      output += '<span class="map-location-info">';
      output += '<a href="' + event.url + '" target="_blank" class="event-title">' + event.title + '</a>';
      output += '<span class="event-date">' + moment(event.start).format('MMMM Do YYYY') + '</span>';
      output += '</span>';
    }

    output += '<span class="event-location">' + location.title + '</span>';
    output += '</div>';

    return output;
  }

  function getEventInfoWindowContent(event)
  {
    var output = '';

    output += '<div class="map-event-info-wrapper">';
    output += '<span class="map-event-info">';
    output += '<a href="' + event.url + '" target="_blank" class="event-title">' + event.title + '</a>';
    output += '<span class="event-date">' + moment(event.start).format('MMMM Do YYYY h:mm A') + ' - ' + moment(event.end).format('MMMM Do YYYY h:mm A') + '</span>';
    output += '<span class="event-location">' + event.location.title + '</span>';
    output += '</span>';
    output += '</div>';

    return output;
  }

})();
