import EventType from './EventType';
import Invited from './Invited';
import Location from './Location';
import mapStyles from './map-style';
import yehawEvents from './events';

(() => {

  const markers = [];
  const infoWindows = [];

  const locationManifest = [];
  const artistManifest = [];
  const eventTypeManifest = [];
  const invitedManifest = [];

  let map;
  let overlay;

  const eventWrapper = document.getElementById('map-wrapper');
  const eventMapElem = document.getElementById('map');
  const eventListElem = document.getElementById('event-list');

  const toggleWaterlinesControl = document.getElementById('toggle-waterlines-control');

  const artistFilter = document.getElementById('filter-artist');
  const locationFilter = document.getElementById('filter-location');
  const eventTypeFilter = document.getElementById('filter-event-type');
  const dateFilter = document.getElementById('filter-date');
  const invitedFilter = document.getElementById('filter-invited');
  const pastEventsFilter = document.getElementById('filter-past-events');

  const eventsMenuControl = document.getElementById('events-menu-control');
  const filterMenuControl = document.getElementById('filter-menu-control');

  const noEventsMessage = document.getElementById('no-events-message');
  const eventsCountDisplay = document.getElementById('events-count-display');

  let isEventsMenuOpen = false;
  let isFilterMenuOpen = false;

  const eventsMenu = document.getElementById('event-wrapper');
  const filterMenu = document.getElementById('filter-wrapper');

  let waterlinesOverlay;
  let isWaterlinesOverlayDisplayed = false;

  const defaultCenter = {lat: 47.606209, lng: -122.332069};

  const waterlinesOverlayBounds = {
    9: [[81, 82], [178, 179]],
    10: [[163, 164], [356, 358]],
    11: [[327, 328], [713, 716]],
    12: [[654, 657], [1426, 1433]],
    13: [[1309, 1315], [2853, 2867]],
    14: [[2619, 2631], [5707, 5734]],
    15: [[5238, 5262], [11414, 11468]],
    16: [[10477, 10525], [22829, 22937]]
  };

  window.initYehawMap = () => {

    map = new google.maps.Map(eventMapElem, {
      center: defaultCenter,
      zoom: 13,
      disableDefaultUI: true,
      styles: mapStyles
    });

    // Create the Waterlines map tile overlay
    waterlinesOverlay = new google.maps.ImageMapType({
      name: 'waterlines',
      getTileUrl: (coord, zoom) => {

        if (zoom < 9 || zoom > 16 ||
          waterlinesOverlayBounds[zoom][0][0] > coord.x || coord.x > waterlinesOverlayBounds[zoom][0][1] ||
          waterlinesOverlayBounds[zoom][1][0] > coord.y || coord.y > waterlinesOverlayBounds[zoom][1][1])
        {
            return null;
        }

        var url = (window.location.href + 'waterlines_tiles/{z}/{x}/{y}.png')
          .replace('{x}', coord.x)
          .replace('{y}', coord.y)
          .replace('{z}', zoom);
          return url;
        },
        tileSize: new google.maps.Size(256, 256)
    });

    yehawEvents.forEach(event => {

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

      // Invited
      if(!invitedManifest.includes(event.invited.title))
      {
        invitedManifest.push(event.invited.title);
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

    invitedManifest.sort();
    invitedManifest.forEach(invited => { invitedFilter.innerHTML += `<option>${invited}</option>`; });
  }

  const getFilters = () => {

    return {
      artist: artistFilter.value === 'All' ? null : artistFilter.value,
      location: locationFilter.value === 'All' ? null : locationFilter.value,
      eventType: eventTypeFilter.value === 'All' ? null : eventTypeFilter.value,
      date: dateFilter.value === '' ? null : dateFilter.value,
      invited: invitedFilter.value === 'All' ? null : invitedFilter.value,
      showPastEvents: pastEventsFilter.checked
    };

  };

  const refreshMap = () => {

    noEventsMessage.setAttribute('style', 'display: none');

    // Clear all of the current event information
    markers.forEach(marker => { marker.setMap(null); });
    eventListElem.innerHTML = '';

    // Get the current state of the filters
    let filters = getFilters();

    // If we have a date filter, we need to force the "Show Past Events"
    // filter to be enabled
    toggleForcedPastEvents(filters.date !== null);
    filters = getFilters();

    let filterResults = filterLocations(filters);

    // If we don't have any filtered events, but we filtered past events,
    // let's force on the "Show Past Events" filter
    if((filterResults.filteredEventCount === 0 && filterResults.hasHiddenPastEvents) || (filterResults.filteredEventCount === filterResults.filteredPastEventCount))
    {
      toggleForcedPastEvents(true);
      filters = getFilters();
      filterResults = filterLocations(filters);
    }

    const filteredLocationManifest = filterResults.filteredLocationManifest;
    const filteredEventCount = filterResults.filteredEventCount;

    let exampleMarker = null;
    const eventMarkerPairs = [];
    filteredLocationManifest.forEach(location => {

      // Marker
      const marker = setUpMapMarker(location);

      if(exampleMarker == null)
      {
        exampleMarker = marker;
      }

      // Info Window
      const infoWindow = setUpInfoWindow(location, marker);
      infoWindows.push(infoWindow);

      // List Item
      location.events.forEach(event => {
        eventMarkerPairs.push({ event, marker, infoWindow });
      });

    });

    eventMarkerPairs.sort((a, b) => {
      if(a.event.start < b.event.start) { return -1; }
      if(a.event.start > b.event.start) { return 1; }
      return 0;
    });

    eventMarkerPairs.forEach(pair => {
      eventListElem.appendChild(createEventListItem(pair.event, pair.marker, pair.infoWindow));
    });

    // Center the map on one of the markers
    centerMap(exampleMarker);

    eventsCountDisplay.innerHTML = filteredEventCount;
    if(filteredEventCount === 0)
    {
      noEventsMessage.setAttribute('style', 'display: block');
    }

  };

  const filterLocations = (filters) => {

    const filteredLocationManifest = [];

    let filteredPastEventCount = 0;
    let filteredEventCount = 0;

    let hasHiddenPastEvents = false;

    // Filter the location manifest
    locationManifest.forEach(location => {

      // Filter: Location
      if(filters.location !== null && filters.location !== location.title)
      {
        hasHiddenPastEvents = true;
        return;
      }

      let filteredLocation = {
        title: location.title,
        coordinates: location.coordinates,
        events: []
      };

      location.events.forEach(event => {

        const isPastEvent = moment().isAfter(event.end, 'day');

        // Filter: Show Past Events
        if(!filters.showPastEvents && isPastEvent)
        {
          return;
        }

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

        // Filter: Invited
        if(filters.invited !== null && event.invited.title !== filters.invited)
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

        if(isPastEvent)
        {
          filteredPastEventCount++;
        }

      });

      if(filteredLocation.events.length === 0)
      {
        return;
      }

      filteredLocationManifest.push(filteredLocation);

    });

    return {
      filteredLocationManifest,
      filteredEventCount,
      filteredPastEventCount,
      hasHiddenPastEvents,
    };

  }

  const centerMap = (marker) => {

    if(!marker)
    {
      return;
    }

    const position = marker.getPosition();

    // Is a menu displayed?
    const openMenu = document.querySelector('.map-menu.open');

    if(openMenu == null)
    {
      // If not, we don't need to adjust for the menu offset
      map.setCenter(position);
    }
    else
    {
      // Source: https://stackoverflow.com/questions/3473367/how-to-offset-the-center-of-a-google-maps-api-v3-in-pixels
      var centerProjection = map.getProjection().fromLatLngToPoint(marker.getPosition());
      var offsetProjection = new google.maps.Point(openMenu.offsetWidth / Math.pow(2, map.getZoom()), 0);

      map.setCenter(map.getProjection().fromPointToLatLng(new google.maps.Point(
        centerProjection.x - (offsetProjection.x/2),
        centerProjection.y
      )));
    }

  };

  const toggleForcedPastEvents = (forceOn) => {

    if(forceOn)
    {
      pastEventsFilter.checked = true;
      pastEventsFilter.disabled = true;
      pastEventsFilter.parentElement.className = 'disabled';
    }
    else
    {
      pastEventsFilter.disabled = false;
      pastEventsFilter.parentElement.className = '';
    }

  }

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

      centerMap(marker);

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

    output += (pastEventsFilter.checked)
      ? '<span class="explanation">Events at this location:</span>'
      : '<span class="explanation">Upcoming events at this location:</span>';

    output += '<div class="map-location-info-list">'
    location.events.forEach(event => {
      output += '<span class="map-location-info">';
      output += `<a href="${event.url}" target="_blank" class="event-title">${event.title}</a>`;
      output += `<span class="event-date">${moment(event.start).format('MMMM Do YYYY')}</span>`;
      output += '</span>';
    });
    output += '</div>';

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

  const toggleWaterlinesOverlay = () => {

    const currentZoomLevel = map.getZoom();

    if(isWaterlinesOverlayDisplayed)
    {
      // Hide the overlay
      map.overlayMapTypes.pop();
      toggleWaterlinesControl.childNodes[0].innerText = 'Show Waterlines Map';
    }
    else
    {
      // Force the map into a zoom level where the map will actually display
      if(currentZoomLevel < 9)
      {
        map.setZoom(9);
        map.setCenter(defaultCenter);
      }
      else if(currentZoomLevel > 16)
      {
        map.setZoom(16);
      }

      // Show the overlay
      map.overlayMapTypes.push(waterlinesOverlay);
      toggleWaterlinesControl.childNodes[0].innerText = 'Hide Waterlines Map';
    }

    isWaterlinesOverlayDisplayed = !isWaterlinesOverlayDisplayed;

  };

  // Set up events

  eventsMenuControl.addEventListener('click', toggleEventsMenu);
  filterMenuControl.addEventListener('click', toggleFilterMenu);

  locationFilter.addEventListener('change', refreshMap);
  artistFilter.addEventListener('change', refreshMap);
  eventTypeFilter.addEventListener('change', refreshMap);
  invitedFilter.addEventListener('change', refreshMap);
  dateFilter.addEventListener('change', refreshMap);
  pastEventsFilter.addEventListener('change', refreshMap);

  toggleWaterlinesControl.addEventListener('click', toggleWaterlinesOverlay)

})();
