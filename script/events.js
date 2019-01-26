(() => {

  const Location = {

    SeattlePublicLibrary: {
      title: 'Seattle Public Library',
      coordinates: {
        lat: 47.606682,
        lng: -122.332657
      }
    },

    AlmaMaterTacoma: {
      title: 'Alma Mater Tacoma',
      coordinates: {
        lat: 47.249960,
        lng: -122.442700
      }
    },

    SeattleCenter: {
      title: 'Seattle Center',
      coordinates: {
        lat: 47.621937,
        lng: -122.351746
      }
    },

    FeastArtsCenter: {
      title: 'Feast Arts Center',
      coordinates: {
        lat: 47.251320,
        lng: -122.456190
      }
    },

    VermillionGallery: {
      title: 'Vermillion Gallery',
      coordinates: {
        lat: 47.614430,
        lng: -122.317750
      }
    },

    KingStreetStation: {
      title: 'King Street Station',
      coordinates: {
        lat: 47.598419,
        lng: -122.330093
      }
    },

    OlympicSculpturePark: {
      title: 'Olympic Sculpture Park',
      coordinates: {
        lat: 47.616610,
        lng: -122.354930
      }
    },

    SeattleArtMuseum: {
      title: 'Seattle Art Museum',
      coordinates: {
        lat: 47.607288,
        lng: -122.337860
      }
    },

    HedreenGallery: {
      title: 'Hedreen Gallery',
      coordinates: {
        lat: 47.610100,
        lng: -122.316360
      }
    },

    SouthPugetSoundCommunityCollegeGallery: {
      title: 'South Puget Sound Community College Gallery',
      coordinates: {
        lat: 47.022610,
        lng: -122.931107
      }
    },

    WashingtonStateHistoryMuseum: {
      title: 'Washington State History Museum',
      coordinates: {
        lat: 47.245209,
        lng: -122.436340
      }
    },

    AmazonVanVorstPlaza: {
      title: 'Amazon Van Vorst Plaza',
      coordinates: {
        lat: 47.623210,
        lng: -122.337160
      }
    },

    UniversityOfPugetSound: {
      title: 'University of Puget Sound',
      coordinates: {
        lat: 47.263880,
        lng: -122.479050
      }
    },

    UnionClub: {
      title: 'Union Club',
      coordinates: {
        lat: 47.258760,
        lng: -122.441350
      }
    },

    ChiefSeattleClub: {
      title: 'Chief Seattle Club',
      coordinates: {
        lat: 47.601210,
        lng: -122.331140
      }
    },

    DaybreakStarCulturalCenter: {
      title: 'Daybreak Star Cultural Center',
      coordinates: {
        lat: 47.667660,
        lng: -122.413030
      }
    },

    SuquamishMuseum: {
      title: 'Suquamish Museum',
      coordinates: {
        lat: 47.729270,
        lng: -122.557170
      }
    }

  };

  const EventType = {

    Exhibition: { title: 'Exhibition' },
    Reading: { title: 'Reading' },
    Sale: { title: 'Sale' },
    Residency: { title: 'Residency' },
    Workshop: { title: 'Workshop' },
    FestivalConference: { title: 'Festival/Conference' }

  };

  const Invited = {

    Indigenous: { title: 'Indigenous Only' },
    NonIndigenous: { title: 'Indigenous and Non-Indigenous' }

  };

  window.yehawEvents = [

    {
      title: 'Submission Workshop - Washington State History Museum',
      start: '2018-04-08 13:00',
      end: '2018-04-08 15:00',
      url: 'https://yehawshow.com/events/2018/4/8/submission-workshop-washington-state-history-museum',
      location: Location.WashingtonStateHistoryMuseum,
      artists: ['Various'],
      eventType: EventType.Workshop,
      invited: Invited.Indigenous
    },

    {
      title: 'A Nation Is a Massacre at King Street Station - Demian DinéYazhi’ and R.I.S.E',
      start: '2018-08-04 11:00',
      end: '2018-08-04 19:00',
      url: 'https://yehawshow.com/events/2018/8/4/anationisamassacre',
      location: Location.KingStreetStation,
      artists: ['Demian DinéYazhi’'],
      eventType: EventType.FestivalConference,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Monthly Co-Working Sessions in Tacoma',
      start: '2018-08-16 18:00',
      end: '2018-08-16 22:00',
      url: 'https://yehawshow.com/events/2018/7/22/monthly-co-working-sessions-in-tacoma',
      location: Location.AlmaMaterTacoma,
      artists: ['Various'],
      eventType: EventType.Workshop,
      invited: Invited.Indigenous
    },

    {
      title: 'Artist Trust/Amazon Pop-Up Market',
      start: '2018-09-12 10:00',
      end: '2018-09-12 14:00',
      url: 'https://yehawshow.com/events/2018/9/12/artist-trustamazon-pop-up-market',
      location: Location.AmazonVanVorstPlaza,
      artists: ['Various'],
      eventType: EventType.Sale,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Monthly Co-Working Sessions in Tacoma',
      start: '2018-09-20 18:00',
      end: '2018-09-20 22:00',
      url: 'https://yehawshow.com/events/2018/7/22/monthly-co-working-sessions-in-tacoma-w98pj',
      location: Location.AlmaMaterTacoma,
      artists: ['Various'],
      eventType: EventType.Workshop,
      invited: Invited.Indigenous
    },

    {
      title: 'yəhaw̓ at the Race and Pedagogy Conference',
      start: '2018-09-27 00:01',
      end: '2018-09-30 00:00',
      url: 'https://yehawshow.com/events/2018/9/27/yhaw-at-the-race-and-pedagogy-conference',
      location: Location.UniversityOfPugetSound,
      artists: ['Tracy Rector'],
      eventType: EventType.FestivalConference,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Native Kut - Artist in Residence at the Seattle Public Library',
      start: '2018-10-02 11:00',
      end: '2018-10-02 17:00',
      url: 'https://yehawshow.com/events/2018/10/2/native-kut-artist-in-residence-at-the-seattle-public-library-rbsld',
      location: Location.SeattlePublicLibrary,
      artists: ['Pah-tu Pitt', 'Sean Gallagher'],
      eventType: EventType.Residency,
      invited: Invited.NonIndigenous
    },

    {
      title: 'yəhaw̓ Native Art Mart - Tacoma Studio Tour',
      start: '2018-10-03 20:00',
      end: '2018-10-03 21:00',
      url: 'https://yehawshow.com/events/2018/10/3/yhaw-native-art-mart-tacoma-studio-tour',
      location: Location.AlmaMaterTacoma,
      artists: ['Nancy Burgess', 'Priscilla Dobler', 'Lisa Fruichantie', 'Roxann Murray', 'Paige Pettibon', 'Philip Red Eagle', 'Erin Tail', 'Eli Tail'],
      eventType: EventType.Sale,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Coast Salish Exhibition at the Seattle Public Library',
      start: '2018-10-06 16:00',
      end: '2018-12-09 17:00',
      url: 'https://yehawshow.com/events/2018/10/1/coast-salish-exhibition-at-the-seattle-public-library',
      location: Location.SeattlePublicLibrary,
      artists: ['Denise Emerson', 'Caroline Edwards', 'Karen Engel', 'Kimberly Miller', 'Abbey Pierson'],
      eventType: EventType.Exhibition,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Native Kut - Artist in Residence at the Seattle Public Library',
      start: '2018-10-09 11:00',
      end: '2018-10-09 17:00',
      url: 'https://yehawshow.com/events/2018/10/2/native-kut-artist-in-residence-at-the-seattle-public-library-rbsld-fd39x',
      location: Location.SeattlePublicLibrary,
      artists: ['Pah-tu Pitt', 'Sean Gallagher'],
      eventType: EventType.Residency,
      invited: Invited.NonIndigenous
    },

    {
      title: 'yəhaw̓ Native Art Mart - Tacoma Studio Tour',
      start: '2018-10-13 11:00',
      end: '2018-10-14 16:00',
      url: 'https://yehawshow.com/events/2018/10/13/native-art-mart-tacoma-studio-tour',
      location: Location.AlmaMaterTacoma,
      artists: ['Nancy Burgess', 'Priscilla Dobler', 'Lisa Fruichantie', 'Roxann Murray', 'Paige Pettibon', 'Philip Red Eagle', 'Erin Tail', 'Eli Tail', 'Asia Tail'],
      eventType: EventType.Sale,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Native Kut - Artist in Residence at the Seattle Public Library',
      start: '2018-10-16 11:00',
      end: '2018-10-16 17:00',
      url: 'https://yehawshow.com/events/2018/10/2/native-kut-artist-in-residence-at-the-seattle-public-library-rbsld-ye3xj',
      location: Location.SeattlePublicLibrary,
      artists: ['Pah-tu Pitt', 'Sean Gallagher'],
      eventType: EventType.Residency,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Monthly Co-Working Sessions in Tacoma',
      start: '2018-10-18 18:00',
      end: '2018-10-18 22:00',
      url: 'https://yehawshow.com/events/2018/7/22/monthly-co-working-sessions-in-tacoma-l867l',
      location: Location.AlmaMaterTacoma,
      artists: ['Various'],
      eventType: EventType.Workshop,
      invited: Invited.Indigenous
    },

    {
      title: 'Roldy Aguero Ablao - Artist in Residence at the Seattle Public Library',
      start: '2018-10-20 11:00',
      end: '2018-10-20 17:00',
      url: 'https://yehawshow.com/events/2018/10/2/native-kut-artist-in-residence-at-the-seattle-public-library-ewcag',
      location: Location.SeattlePublicLibrary,
      artists: ['Roldy Aguero Ablao'],
      eventType: EventType.Residency,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Lettuce 253',
      start: '2018-10-26 19:00',
      end: '2018-10-26 22:00',
      url: 'https://yehawshow.com/events/2018/10/26/raven-juarez-at-lettuce-253',
      location: Location.UnionClub,
      artists: ['Raven Juarez', 'Ixtli White Hawk'],
      eventType: EventType.FestivalConference,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Roldy Aguero Ablao - Artist in Residence at the Seattle Public Library',
      start: '2018-10-27 11:00',
      end: '2018-10-27 17:00',
      url: 'https://yehawshow.com/events/2018/10/2/native-kut-artist-in-residence-at-the-seattle-public-library-ewcag-kfwzp',
      location: Location.SeattlePublicLibrary,
      artists: ['Roldy Aguero Ablao'],
      eventType: EventType.Residency,
      invited: Invited.NonIndigenous
    },

    {
      title: 'yəhaw̓ and Native Works at Pioneer Square Art Walk',
      start: '2018-11-01 17:00',
      end: '2018-11-01 20:00',
      url: 'https://yehawshow.com/events/2018/11/1/yhaw-and-native-works-at-pioneer-square-art-walk',
      location: Location.ChiefSeattleClub,
      artists: ['Various'],
      eventType: EventType.Exhibition,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Roldy Aguero Ablao - Artist in Residence at the Seattle Public Library',
      start: '2018-11-03 11:00',
      end: '2018-11-03 17:00',
      url: 'https://yehawshow.com/events/2018/10/2/native-kut-artist-in-residence-at-the-seattle-public-library-ewcag-rjrdk',
      location: Location.SeattlePublicLibrary,
      artists: ['Roldy Aguero Ablao'],
      eventType: EventType.Residency,
      invited: Invited.NonIndigenous
    },

    {
      title: 'yəhaw̓ at Short Run Seattle',
      start: '2018-11-03 11:00',
      end: '2018-11-03 18:00',
      url: 'https://yehawshow.com/events/2018/11/3/table-at-short-run-seattle',
      location: Location.SeattleCenter,
      artists: ['Various'],
      eventType: EventType.Sale,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Honoring the Wisdom of Our Elders',
      start: '2018-11-08 18:00',
      end: '2018-11-08 20:30',
      url: 'https://yehawshow.com/events/2018/11/8/honoring-the-wisdom-of-our-elders',
      location: Location.SeattlePublicLibrary,
      artists: ['Jackie Swanson', 'Peg Deam', 'John Mullen', 'Ellany Kayce', 'Roger Fernandes'],
      eventType: EventType.FestivalConference,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Fox Anthony Spears - Artist in Residence at the Seattle Public Library',
      start: '2018-11-10 11:00',
      end: '2018-11-10 17:00',
      url: 'https://yehawshow.com/events/2018/10/2/native-kut-artist-in-residence-at-the-seattle-public-library-y65e8',
      location: Location.SeattlePublicLibrary,
      artists: ['Fox Spears'],
      eventType: EventType.Residency,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Priscilla Dobler at Alma Mater',
      start: '2018-11-15 17:00',
      end: '2018-12-20 21:00',
      url: 'https://yehawshow.com/events/2018/11/15/priscilla-dobler-at-alma-mater',
      location: Location.AlmaMaterTacoma,
      artists: ['Priscilla Dobler'],
      eventType: EventType.Exhibition,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Monthly Co-Working Sessions in Tacoma',
      start: '2018-11-15 18:00',
      end: '2018-11-15 22:00',
      url: 'https://yehawshow.com/events/2018/7/22/monthly-co-working-sessions-in-tacoma-94kdx',
      location: Location.AlmaMaterTacoma,
      artists: ['Various'],
      eventType: EventType.Workshop,
      invited: Invited.Indigenous
    },

    {
      title: 'Kanani Miyamoto at Feast Arts Center',
      start: '2018-11-15 18:00',
      end: '2019-01-11 17:00',
      url: 'https://yehawshow.com/events/2018/11/15/kanani-miyamoto-at-feast-arts-center',
      location: Location.FeastArtsCenter,
      artists: ['Kanani Miyamoto'],
      eventType: EventType.Exhibition,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Fox Anthony Spears - Artist in Residence at the Seattle Public Library',
      start: '2018-11-17 11:00',
      end: '2018-11-10 17:00',
      url: 'https://yehawshow.com/events/2018/10/2/native-kut-artist-in-residence-at-the-seattle-public-library-y65e8-6nn55',
      location: Location.SeattlePublicLibrary,
      artists: ['Fox Spears'],
      eventType: EventType.Residency,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Blue Jay Brings Back the Moon - A Na’ah Illahee Fund Event',
      start: '2018-11-17 16:00',
      end: '2018-11-17 19:30',
      url: 'https://yehawshow.com/events/2018/11/17/blue-jay-brings-back-the-moon-a-naah-illahee-fund-event',
      location: Location.DaybreakStarCulturalCenter,
      artists: ['Various'],
      eventType: EventType.Sale,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Fox Anthony Spears - Artist in Residence at the Seattle Public Library',
      start: '2018-11-24 11:00',
      end: '2018-11-24 17:00',
      url: 'https://yehawshow.com/events/2018/10/2/native-kut-artist-in-residence-at-the-seattle-public-library-y65e8-p9c4h',
      location: Location.SeattlePublicLibrary,
      artists: ['Fox Spears'],
      eventType: EventType.Residency,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Indigenous Family Day, Artists in Residence Panel, Rumble Film Screening',
      start: '2018-12-01 11:30',
      end: '2018-12-01 18:30',
      url: 'https://yehawshow.com/events/2018/12/1/library-artists-in-residence-panel-discussion-event',
      location: Location.SeattlePublicLibrary,
      artists: ['Fern Naomi Renville', 'Margaret Morris', 'Raven Raven Julia Juarez', 'Roldy Aguero Ablao', 'Fox Spears', 'Denise Emerson'],
      eventType: EventType.FestivalConference,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Elizabeth LaPensée at Hedreen Gallery',
      start: '2018-12-01 14:00',
      end: '2019-03-03 18:00',
      url: 'https://yehawshow.com/events/2018/12/1/elizabeth-lapense-at-hedreen-gallery',
      location: Location.HedreenGallery,
      artists: ['Elizabeth LaPensée'],
      eventType: EventType.Exhibition,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Monthly Co-Working Sessions in Tacoma',
      start: '2018-12-20 18:00',
      end: '2018-12-20 22:00',
      url: 'https://yehawshow.com/events/2018/7/22/monthly-co-working-sessions-in-tacoma-bztws',
      location: Location.AlmaMaterTacoma,
      artists: ['Various'],
      eventType: EventType.Workshop,
      invited: Invited.Indigenous
    },

    {
      title: 'Monthly Co-Working Sessions in Tacoma',
      start: '2019-01-17 18:00',
      end: '2019-01-17 22:00',
      url: 'https://yehawshow.com/events/2018/7/22/monthly-co-working-sessions-in-tacoma-bztws-nfm9w',
      location: Location.AlmaMaterTacoma,
      artists: ['Various'],
      eventType: EventType.Workshop,
      invited: Invited.Indigenous
    },

    {
      title: 'Christine Babic at SAM\'s Olympic Sculpture Park',
      start: '2019-01-25 19:00',
      end: '2019-01-25 21:00',
      url: 'https://yehawshow.com/events/2019/1/25/art-encounter-at-sams-olympic-sculpture-park',
      location: Location.OlympicSculpturePark,
      artists: ['Christine Babic', 'Mary Babic', 'Alex Britt'],
      eventType: EventType.Residency,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Indigenous Teen Art Show at the Vera Project',
      start: '2019-02-03 16:00',
      end: '2019-02-28 18:00',
      url: 'https://yehawshow.com/events/2019/2/3/indigenous-teen-art-show-at-the-vera-project',
      location: Location.SeattleCenter,
      artists: ['Aiyanna Stitt', 'Moe’nayah Holland', 'Michael Anderson'],
      eventType: EventType.Exhibition,
      invited: Invited.NonIndigenous
    },

    {
      title: 'And Now We Know: Indigenous Artist Write the World at South Puget Sound Community College Gallery',
      start: '2019-02-08 18:00',
      end: '2019-03-08 20:00',
      url: 'https://yehawshow.com/events/2019/2/8/yhaw-at-south-puget-sound-community-college-gallery',
      location: Location.SouthPugetSoundCommunityCollegeGallery,
      artists: ['Various'],
      eventType: EventType.Exhibition,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Monthly Co-Working Sessions in Tacoma',
      start: '2019-02-21 18:00',
      end: '2019-02-21 22:00',
      url: 'https://yehawshow.com/events/2018/7/22/monthly-co-working-sessions-in-tacoma-bztws-ayfs6',
      location: Location.AlmaMaterTacoma,
      artists: ['Various'],
      eventType: EventType.Workshop,
      invited: Invited.Indigenous
    },

    {
      title: 'Christine Babic at SAM\'s Olympic Sculpture Park',
      start: '2019-02-22 19:00',
      end: '2019-02-22 21:00',
      url: 'https://yehawshow.com/events/2019/1/25/art-encounter-at-sams-olympic-sculpture-park-yn7db',
      location: Location.OlympicSculpturePark,
      artists: ['Christine Babic', 'Mary Babic', 'Alex Britt'],
      eventType: EventType.Residency,
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
    },

    {
      title: 'Indigenous / Latinx Creatives at Vermillion Gallery',
      start: '2019-03-14 17:00',
      end: '2019-06-08 17:00',
      url: 'https://yehawshow.com/events/2019/1/10/latinx-indigenous-artists-at-vermillion-gallery',
      location: Location.VermillionGallery,
      artists: ['Various'],
      eventType: EventType.Exhibition,
      invited: Invited.NonIndigenous
    },

    {
      title: 'yəhaw̓ at King Street Station!',
      start: '2019-03-23 00:00',
      end: '2019-08-03 06:00',
      url: 'https://yehawshow.com/events/2018/8/19/yhaw-exhibition-opening-at-king-street-station',
      location: Location.KingStreetStation,
      artists: ['Various'],
      eventType: EventType.Exhibition,
      invited: Invited.NonIndigenous
    },

    {
      title: 'Randi Purser and Erik Sanchez at the Suquamish Museum',
      start: '2019-04-20 23:30',
      end: '2019-07-07 00:30',
      url: 'https://yehawshow.com/events/2019/4/20/yhaw-at-the-suquamish-museum',
      location: Location.SuquamishMuseum,
      artists: ['Randi Purser', 'Erik Sanchez'],
      eventType: EventType.Workshop,
      invited: Invited.NonIndigenous
    }

  ];

})();
