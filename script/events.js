(() => {

  const Location = {

    SeattlePublicLibrary: {
      title: 'Seattle Public Library',
      coordinates: {
        lat: 47.6066004,
        lng: -122.3351724
      }
    },

    AlmaMaterTacoma: {
      title: 'Alma Mater Tacoma',
      coordinates: {
        lat: 47.2499213,
        lng: -122.4449067
      }
    },

    FisherPavilionAtSeattleCenter: {
      title: 'Fisher Pavilion at Seattle Center',
      coordinates: {
        lat: 47.6207455,
        lng: -122.352622
      }
    },

    FeastArtsCenter: {
      title: 'Feast Arts Center',
      coordinates: {
        lat: 47.2512975,
        lng: -122.4584846
      }
    },

    VermillionGallery: {
      title: 'Vermillion Gallery',
      coordinates: {
        lat: 47.6143814,
        lng: -122.3201103
      }
    },

    KingStreetStation: {
      title: 'King Street Station',
      coordinates: {
        lat: 47.5983171,
        lng: -122.3320368
      }
    },

    OlympicSculpturePark: {
      title: 'Olympic Sculpture Park',
      coordinates: {
        lat: 47.6165958,
        lng: -122.3553101
      }
    },

    SeattleArtMuseum: {
      title: 'Seattle Art Museum',
      coordinates: {
        lat: 47.607309,
        lng: -122.3403218
      }
    }

  };

  const EventType = {

    Exhibition: { title: 'Exhibition' },
    Reading: { title: 'Reading' },
    Sale: { title: 'Sale' },
    Performance: { title: 'Performance' }

  };

  const Invited = {

    Indigenous: { title: 'Indigenous' },
    NonIndigenous: { title: 'Non-Indigenous' }

  };

  window.yehawEvents = [

    {
      title: 'Latinx / Indigenous Artists at Vermillion Gallery',
      start: '2019-01-10 17:00',
      end: '2019-04-06 18:00',
      url: 'https://yehawshow.com/events/2019/1/10/latinx-indigenous-artists-at-vermillion-gallery',
      location: Location.VermillionGallery,
      artists: ['Various'],
      eventType: EventType.Exhibition,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Lehuauakea Fernandez at Feast Arts Center',
      start: '2019-01-17 18:00',
      end: '2019-02-15 18:00',
      url: 'https://yehawshow.com/events/2018/11/15/kanani-miyamoto-at-feast-arts-center-8b2zm',
      location: Location.FeastArtsCenter,
      artists: ['Lehuauakea Fernandez'],
      eventType: EventType.Exhibition,
      invited: Invited.NonIndigenous
    },

    {
      title: 'yəhaw̓ at King Street Station!',
      start: '2019-01-19 10:00',
      end: '2019-05-12 17:00',
      url: 'https://yehawshow.com/events/2018/8/19/yhaw-exhibition-opening-at-king-street-station',
      location: Location.KingStreetStation,
      artists: ['Various'],
      eventType: EventType.Exhibition,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Art Encounter at SAM\'s Olympic Sculpture Park',
      start: '2019-01-25 19:00',
      end: '2019-01-25 21:00',
      url: 'https://yehawshow.com/events/2019/1/25/art-encounter-at-sams-olympic-sculpture-park',
      location: Location.OlympicSculpturePark,
      artists: ['Various'],
      eventType: EventType.Performance,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Catherine Cross Uehara at Feast Arts Center',
      start: '2019-02-21 18:00',
      end: '2019-03-15 18:00',
      url: 'https://yehawshow.com/events/2018/11/15/kanani-miyamoto-at-feast-arts-center-jj734',
      location: Location.FeastArtsCenter,
      artists: ['Catherine Cross'],
      eventType: EventType.Exhibition,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Art Encounter at SAM\'s Olympic Sculpture Park',
      start: '2019-02-22 19:00',
      end: '2019-02-22 21:00',
      url: 'https://yehawshow.com/events/2019/1/25/art-encounter-at-sams-olympic-sculpture-park-yn7db',
      location: Location.OlympicSculpturePark,
      artists: ['Various'],
      eventType: EventType.Performance,
      invited: Invited.NonIndigenous
    },

    {
      title: 'SAM Community Gallery Opening Reception',
      start: '2019-02-28 18:00',
      end: '2019-02-28 20:00',
      url: 'https://yehawshow.com/events/2019/2/28/sam-community-gallery-opening-reception',
      location: Location.SeattleArtMuseum,
      artists: ['Various'],
      eventType: EventType.Exhibition,
      invited: Invited.NonIndigenous
    },

    {
      title: 'yəhaw̓ at SAM Community Gallery',
      start: '2019-02-28 18:00',
      end: '2019-03-24 17:00',
      url: 'https://yehawshow.com/events/2019/2/28/sam-community-gallery-opening-reception-d4ydj',
      location: Location.SeattleArtMuseum,
      artists: ['Various'],
      eventType: EventType.Exhibition,
      invited: Invited.NonIndigenous
    }
  ];

})();
