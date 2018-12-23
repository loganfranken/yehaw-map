(function() {

  var infoWindows = [];
  var map;
  var overlay;

  var eventWrapper = document.getElementById('map-wrapper');
  var eventMapElem = document.getElementById('map');
  var eventListElem = document.getElementById('event-list');

  var artistFilter = document.getElementById('filter-artist');
  var locationFilter = document.getElementById('filter-location');
  var eventTypeFilter = document.getElementById('filter-event-type');
  var dateFilter = document.getElementById('filter-date');
  var invitedFilter = document.getElementById('filter-invited');

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
      disableDefaultUI: true,
      styles: window.mapStyles
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

    // Build a manifest of events

    var locationManifest = [];
    var artistManifest = [];
    var eventTypeManifest = [];

    for(var i=0; i<window.yehawEvents.length; i++)
    {
      var event = window.yehawEvents[i];

      // Location
      if(!locationManifest[event.location.title])
      {
        locationManifest[event.location.title] = {
          title: event.location.title,
          coordinates: event.location.coordinates,
          events: []
        };
      }

      locationManifest[event.location.title].events.push(event);

      // Artist
      for(var artistIndex in event.artists)
      {
        var artist = event.artists[artistIndex];
        if(!artistManifest[artist])
        {
          artistManifest[artist] = {
            name: artist
          };
        }
      }

      // Event Type
      if(!eventTypeManifest[event.eventType])
      {
        eventTypeManifest[event.eventType.title] = {
          title: event.eventType.title
        };
      }
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

      locationFilter.innerHTML += '<option>' + locationName + '</option>';
    }

    for(var artist in artistManifest)
    {
      artistFilter.innerHTML += '<option>' + artist + '</option>';
    }

    for(var eventType in eventTypeManifest)
    {
      eventTypeFilter.innerHTML += '<option>' + eventType + '</option>';
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
