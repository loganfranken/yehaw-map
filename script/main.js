(() => {

  const markers = [];
  const infoWindows = [];

  const locationManifest = [];
  const artistManifest = [];
  const eventTypeManifest = [];

  let map;
  let overlay;

  const eventWrapper = document.getElementById('map-wrapper');
  const eventMapElem = document.getElementById('map');
  const eventListElem = document.getElementById('event-list');

  const artistFilter = document.getElementById('filter-artist');
  const locationFilter = document.getElementById('filter-location');
  const eventTypeFilter = document.getElementById('filter-event-type');
  const dateFilter = document.getElementById('filter-date');

  const eventsMenuControl = document.getElementById('events-menu-control');
  const filterMenuControl = document.getElementById('filter-menu-control');

  const noEventsMessage = document.getElementById('no-events-message');
  const eventsCountDisplay = document.getElementById('events-count-display');

  let isEventsMenuOpen = false;
  let isFilterMenuOpen = false;

  const eventsMenu = document.getElementById('event-wrapper');
  const filterMenu = document.getElementById('filter-wrapper');

  //var overlayControl = document.createElement('button');
  //overlayControl.id = 'yehaw-event-map-overlay-toggle';
  //overlayControl.innerText = 'Toggle Original Map';
  //overlayControl.addEventListener('click', toggleOverlay);
  //eventWrapper.appendChild(overlayControl);

  window.initYehawMap = () => {

    const center = {lat: 47.606209, lng: -122.332069};

    map = new google.maps.Map(eventMapElem, {
      center: center,
      zoom: 13,
      disableDefaultUI: true,
      styles: window.mapStyles
    });

    // Overlay
    const imageBounds = {
      north: 47.667934,
      south: 47.606209,
      east: -122.230959,
      west: -122.332069
    };

    //overlay = new google.maps.GroundOverlay('https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg', imageBounds);
    //overlay.setMap(map);

    window.yehawEvents.forEach(event => {

      // Location
      let location = locationManifest.find(location => location.title === event.location.title);

      if(!location)
      {
        location = {
          title: event.location.title,
          coordinates: event.location.coordinates,
          events: []
        };

        locationManifest.push(location);
      }

      location.events.push(event);

      // Artist
      event.artists.forEach(artist => {

        if(artist === 'Various')
        {
          return;
        }

        if(!artistManifest.includes(artist))
        {
          artistManifest.push(artist);
        }

      });

      // Event Type
      if(!eventTypeManifest.includes(event.eventType.title))
      {
        eventTypeManifest.push(event.eventType.title);
      }

    });

    refreshMap();

    locationManifest.sort((a, b) => {
      if(a.title < b.title) { return -1; }
      if(a.title > b.title) { return 1; }
      return 0;
    });
    locationManifest.forEach(location => { locationFilter.innerHTML += `<option>${location.title}</option>`; });

    artistManifest.sort();
    artistManifest.forEach(artist => { artistFilter.innerHTML += `<option>${artist}</option>`; });

    eventTypeManifest.sort();
    eventTypeManifest.forEach(eventType => { eventTypeFilter.innerHTML += `<option>${eventType}</option>`; });
  }

  const getFilters = () => {

    return {
      artist: artistFilter.value === 'All' ? null : artistFilter.value,
      location: locationFilter.value === 'All' ? null : locationFilter.value,
      eventType: eventTypeFilter.value === 'All' ? null : eventTypeFilter.value,
      date: dateFilter.value === '' ? null : dateFilter.value
    };

  };

  const refreshMap = () => {

    noEventsMessage.setAttribute('style', 'display: none');
    let filteredEventCount = 0;

    // Clear all of the current event information
    markers.forEach(marker => { marker.setMap(null); });
    eventListElem.innerHTML = '';

    // Get the current state of the filters
    const filters = getFilters();
    const filteredLocationManifest = [];

    // Filter the location manifest
    locationManifest.forEach(location => {

      // Filter: Location
      if(filters.location !== null && filters.location !== location.title)
      {
        return;
      }

      let filteredLocation = {
        title: location.title,
        coordinates: location.coordinates,
        events: []
      };

      location.events.forEach(event => {

        // Filter: Artist
        if(filters.artist !== null && !event.artists.includes(filters.artist))
        {
          return;
        }

        // Filter: Event Type
        if(filters.eventType !== null && event.eventType.title !== filters.eventType)
        {
          return;
        }

        // Filter: Event Date
        const filterDate = moment(filters.date);
        if(filters.date !== null && (filterDate.isBefore(event.start, 'day') || filterDate.isAfter(event.end, 'day')))
        {
          return;
        }

        filteredLocation.events.push(event);

        filteredEventCount++;

      });

      if(filteredLocation.events.length === 0)
      {
        return;
      }

      filteredLocationManifest.push(filteredLocation);

    });

    let exampleMarker = null;
    filteredLocationManifest.forEach(location => {

      // Marker
      const marker = setUpMapMarker(location);
      exampleMarker = marker;

      // Info Window
      const infoWindow = setUpInfoWindow(location, marker);
      infoWindows.push(infoWindow);

      // List Item
      location.events.forEach(event => {
        eventListElem.appendChild(createEventListItem(event, marker, infoWindow));
      });

    });

    // Center the map on one of the markers
    const markerPosition = exampleMarker.getPosition();
    map.setCenter(markerPosition);

    eventsCountDisplay.innerHTML = filteredEventCount;
    if(filteredEventCount === 0)
    {
      noEventsMessage.setAttribute('style', 'display: block');
    }

  };

  const setUpMapMarker = (location) => {

    // Google Maps marker
    const marker = new google.maps.Marker({
      map: map,
      position: location.coordinates,
      title: location.title
    });

    markers.push(marker);

    return marker;

  }

  const setUpInfoWindow = (location, marker) => {

    // Google Maps Info Window
    const infoWindow = new google.maps.InfoWindow();

    marker.addListener('click', () => {
      infoWindow.setContent(getLocationInfoWindowContent(location));
      openInfoWindow(infoWindow, marker);
    });

    return infoWindow;

  }

  const openInfoWindow = (infoWindow, marker) => {

    // Close any open info windows
    infoWindows.forEach((infoWindow) => { infoWindow.close(); });

    infoWindow.open(map, marker);

  }

  const createEventListItem = (event, marker, infoWindow) => {

    // List Item
    const listItem = document.createElement('li');

    // Event Title
    const eventTitle = document.createElement('span');
    eventTitle.className = 'event-title';
    eventTitle.innerText = event.title;
    listItem.appendChild(eventTitle);

    // Event Date
    const eventDate = document.createElement('span');
    eventDate.className = 'event-date';
    eventDate.innerText = moment(event.start).format('MMMM Do YYYY');
    listItem.appendChild(eventDate);

    // Event Location
    const eventLocation = document.createElement('span');
    eventLocation.className = 'event-location';
    eventLocation.innerText = event.location.title;
    listItem.appendChild(eventLocation);

    listItem.addEventListener('click', function() {

      if(window.innerWidth < 600)
      {
        closeEventsMenu();
      }

      const markerPosition = marker.getPosition();
      map.setCenter(markerPosition);

      infoWindow.setContent(getEventInfoWindowContent(event));
      openInfoWindow(infoWindow, marker);

    });

    return listItem;
  }

  const toggleOverlay = () => {

    if(overlay.map)
    {
      overlay.setMap(null);
    }
    else
    {
      overlay.setMap(map);
    }

  }

  const getLocationInfoWindowContent = (location) => {

    let output = '';

    output += '<div class="map-location-info-wrapper">';
    output += '<span class="explanation">Upcoming events at this location:</span>';

    for(let i=0; i<3; i++)
    {
      var event = location.events[i];

      if(!event)
      {
        break;
      }

      output += '<span class="map-location-info">';
      output += `<a href="${event.url}" target="_blank" class="event-title">${event.title}</a>`;
      output += `<span class="event-date">${moment(event.start).format('MMMM Do YYYY')}</span>`;
      output += '</span>';
    }

    output += `<span class="event-location">${location.title}</span>`;
    output += '</div>';

    return output;

  }

  const getEventInfoWindowContent = (event) => {

    let output = '';

    output += '<div class="map-event-info-wrapper">';
    output += '<span class="map-event-info">';
    output += `<a href="${event.url}" target="_blank" class="event-title">${event.title}</a>`;
    output += `<span class="event-date">${moment(event.start).format('MMMM Do YYYY h:mm A')} - ${moment(event.end).format('MMMM Do YYYY h:mm A')}</span>`;
    output += `<span class="event-location">${event.location.title}</span>`;
    output += '</span>';
    output += '</div>';

    return output;
  }

  const toggleEventsMenu = () => {
    if(isEventsMenuOpen)
    {
      closeEventsMenu();
    }
    else
    {
      openEventsMenu();
    }
  };

  const openEventsMenu = () => {
    closeFilterMenu();
    isEventsMenuOpen = true;
    eventsMenuControl.className = 'map-menu-control open';
    eventsMenu.className = 'map-menu open';
  };

  const closeEventsMenu = () => {
    isEventsMenuOpen = false;
    eventsMenuControl.className = 'map-menu-control';
    eventsMenu.className = 'map-menu';
  };

  const toggleFilterMenu = () => {

    if(isFilterMenuOpen)
    {
      closeFilterMenu();
    }
    else
    {
      openFilterMenu();
    }

  };

  const openFilterMenu = () => {
    closeEventsMenu();
    isFilterMenuOpen = true;
    filterMenuControl.className = 'map-menu-control open';
    filterMenu.className = 'map-menu open';
  };

  const closeFilterMenu = () => {
    isFilterMenuOpen = false;
    filterMenuControl.className = 'map-menu-control';
    filterMenu.className = 'map-menu';
  };

  // Set up events

  eventsMenuControl.addEventListener('click', toggleEventsMenu);
  filterMenuControl.addEventListener('click', toggleFilterMenu);

  locationFilter.addEventListener('change', refreshMap);
  artistFilter.addEventListener('change', refreshMap);
  eventTypeFilter.addEventListener('change', refreshMap);
  dateFilter.addEventListener('change', refreshMap);

})();
