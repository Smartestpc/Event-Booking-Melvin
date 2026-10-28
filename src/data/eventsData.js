export const INITIAL_EVENTS = [
  {
    id: '12',
    title: 'Astra West Africa Tech Summit 2026',
    category: 'Technology',
    date: '2026-11-14',
    displayDate: 'Sat, Nov 14, 2026',
    time: '09:00 AM - 05:30 PM WAT',
    location: 'Landmark Centre, Plot 2&3 Water Corporation Drive, Victoria Island, Lagos',
    city: 'Lagos',
    venueType: 'In-person',
    description: 'The premier technology conference uniting software architects, startup founders, AI researchers, and venture capitalists across the continent.',
    fullOverview: [
      'Join over 2,500 industry leaders for an immersive full-day symposium focused on scalable cloud infrastructure, decentralized financial systems, frontier artificial intelligence, and developer ecosystems.',
      'Includes access to 4 keynote sessions, breakout masterclasses, developer hack pavilions, and direct recruitment and investor matchmaking lounges.',
      'Complimentary executive lunch, artisanal coffee stations, and exclusive summit swag kit included with every ticket registration.'
    ],
    organizer: {
      name: 'Astra Tech Foundation',
      role: 'Pan-African Innovation Network',
      verified: true,
      contactEmail: 'summit@astratech.org'
    },
    image: '/src/assets/images/event_tech_summit_1793226084260.jpg',
    basePrice: 10000,
    totalCapacity: 500,
    initialAvailableTickets: 142,
    featured: true,
    tags: ['Artificial Intelligence', 'Cloud Engineering', 'Venture Capital', 'Fintech'],
    schedule: [
      { time: '08:30 AM', activity: 'Registration & Welcome Coffee Lounge' },
      { time: '09:30 AM', activity: 'Opening Keynote: Scaling Software Infrastructure in Emerging Markets' },
      { time: '11:15 AM', activity: 'Panel Discussion: Frontier AI in African Industry' },
      { time: '01:00 PM', activity: 'Executive Networking Lunch & Startup Pitch Arena' },
      { time: '02:30 PM', activity: 'Technical Deep Dives & Workshop Tracks' },
      { time: '04:45 PM', activity: 'Closing Keynote & Venture Awards Ceremony' }
    ]
  },
  {
    id: '15',
    title: 'Echoes Live: Neo-Soul & Afro-Fusion Concert',
    category: 'Music & Concerts',
    date: '2026-11-21',
    displayDate: 'Sat, Nov 21, 2026',
    time: '07:00 PM - 11:30 PM WAT',
    location: 'Eko Convention Centre, Victoria Island, Lagos',
    city: 'Lagos',
    venueType: 'In-person',
    description: 'An acoustic and electric evening featuring top vocalists, live brass sections, and experimental African rhythms under world-class stage lighting.',
    fullOverview: [
      'Experience an unforgettable sonic journey with headline performances by critically acclaimed recording artists, backed by a 14-piece live band orchestra.',
      'State-of-the-art concert acoustics, multi-tiered visual lighting production, and intimate lounge zones curated for genuine music connoisseurs.',
      'VIP table reservations include chilled artisan beverages, hors d\'oeuvres, and fast-track priority venue entrance.'
    ],
    organizer: {
      name: 'Vanguard Music Collective',
      role: 'Concert & Festival Production',
      verified: true,
      contactEmail: 'tickets@vanguardmusic.co'
    },
    image: '/src/assets/images/event_music_festival_1793226084813.jpg',
    basePrice: 15000,
    totalCapacity: 800,
    initialAvailableTickets: 88,
    featured: true,
    tags: ['Live Band', 'Neo-Soul', 'Afrobeats', 'Nightlife'],
    schedule: [
      { time: '06:30 PM', activity: 'Doors Open & Acoustic Cocktail Hour' },
      { time: '07:30 PM', activity: 'Opening Set: Emerging Indie Soul Soloists' },
      { time: '08:45 PM', activity: 'Symphonic Brass & Afro-Fusion Ensemble' },
      { time: '10:00 PM', activity: 'Headline Concert Performance' },
      { time: '11:15 PM', activity: 'Encore & Artist Meet-and-Greet' }
    ]
  },
  {
    id: '18',
    title: 'Lumina Contemporary Art & Design Biennial',
    category: 'Arts & Culture',
    date: '2026-12-05',
    displayDate: 'Sat, Dec 05, 2026',
    time: '11:00 AM - 07:00 PM WAT',
    location: 'International Conference Centre Art Pavilion, Central Business District, Abuja',
    city: 'Abuja',
    venueType: 'In-person',
    description: 'A prestigious exhibition spotlighting contemporary visual art, kinetic sculptures, modern canvas collections, and curator-guided gallery walks.',
    fullOverview: [
      'Walk through curated gallery spaces presenting over 120 original artworks from 35 international and regional contemporary visual artists.',
      'Engage directly in gallery discussions led by leading art historians, museum curators, and prominent private collectors.',
      'Includes entry to the private viewing salon, art catalog publication, and evening wine reception.'
    ],
    organizer: {
      name: 'Abuja Modern Art Foundation',
      role: 'Cultural Institution',
      verified: true,
      contactEmail: 'biennial@abujamodernart.org'
    },
    image: '/src/assets/images/event_art_exhibit_1793226084836.jpg',
    basePrice: 8000,
    totalCapacity: 350,
    initialAvailableTickets: 195,
    featured: true,
    tags: ['Visual Arts', 'Exhibition', 'Design', 'Sculpture'],
    schedule: [
      { time: '11:00 AM', activity: 'Curator Welcome & Gallery Opening' },
      { time: '01:30 PM', activity: 'Artist Panel: Materiality and Modern Identity' },
      { time: '03:30 PM', activity: 'Guided Architecture & Sculpture Walk' },
      { time: '05:30 PM', activity: 'Evening Collector Reception & Networking' }
    ]
  },
  {
    id: '22',
    title: 'Savory Haven: Artisanal Gastronomy & Wine Gala',
    category: 'Food & Culinary',
    date: '2026-11-28',
    displayDate: 'Sat, Nov 28, 2026',
    time: '04:00 PM - 10:00 PM WAT',
    location: 'The Garden Terraces, Port Harcourt Waterfront, Port Harcourt',
    city: 'Port Harcourt',
    venueType: 'In-person',
    description: 'A culinary festival pairing celebrated master chefs with premier vineyards, live tasting stations, and interactive cooking masterclasses.',
    fullOverview: [
      'Sample handcrafted tasting menus across 12 bespoke culinary pavilions celebrating fresh seafood, fusion grilling, pastry artistry, and sommelier-curated wine flights.',
      'Attend live cooking demonstrations and masterclasses on indigenous flavors and contemporary gastronomy techniques.',
      'Full tasting passport included with ticket, permitting tastings across all featured culinary stations.'
    ],
    organizer: {
      name: 'Culinary Heritage Society',
      role: 'Hospitality Guild',
      verified: true,
      contactEmail: 'gala@culinaryheritage.com'
    },
    image: '/src/assets/images/event_culinary_gala_1793226084846.jpg',
    basePrice: 20000,
    totalCapacity: 300,
    initialAvailableTickets: 45,
    featured: false,
    tags: ['Fine Dining', 'Wine Tasting', 'Masterclass', 'Outdoor Gala'],
    schedule: [
      { time: '04:00 PM', activity: 'Gates Open & Welcome Tasting Flute' },
      { time: '05:00 PM', activity: 'Chef Masterclass: The Art of Wood-Fire Grilling' },
      { time: '06:30 PM', activity: 'Sommelier Wine Flight Exploration' },
      { time: '08:00 PM', activity: 'Dessert Grand Showcase & Live Jazz Accompaniment' }
    ]
  },
  {
    id: '27',
    title: 'Future Capital: Africa Angel & Venture Forum',
    category: 'Business & Finance',
    date: '2026-12-10',
    displayDate: 'Thu, Dec 10, 2026',
    time: '09:00 AM - 04:00 PM WAT',
    location: 'Civic Centre, Ozumba Mbadiwe Avenue, Victoria Island, Lagos',
    city: 'Lagos',
    venueType: 'Hybrid',
    description: 'Private symposium for accredited investors, corporate ventures, and growth-stage startup founders analyzing macroeconomic trends and capital allocation.',
    fullOverview: [
      'Gain unmatched strategic intelligence on cross-border payments, currency hedging, syndication structures, and private equity exits in Africa.',
      'Features closed-door roundtables with sovereign wealth managers, DFIs, and institutional LP/GP partners.',
      'Catered executive dining and private meeting rooms available for confidential deal negotiations.'
    ],
    organizer: {
      name: 'Global Ventures Syndicate',
      role: 'Investment Advisory Group',
      verified: true,
      contactEmail: 'forum@gvsyndicate.com'
    },
    image: '/src/assets/images/hero_event_experience_1793226083720.jpg',
    basePrice: 50000,
    totalCapacity: 200,
    initialAvailableTickets: 32,
    featured: false,
    tags: ['Private Equity', 'Venture Capital', 'Angel Investing', 'Fintech'],
    schedule: [
      { time: '09:00 AM', activity: 'Investor Breakfast & Macroeconomic Briefing' },
      { time: '10:30 AM', activity: 'LP-GP Roundtable: Liquidity & Exits' },
      { time: '01:00 PM', activity: 'Private Deal Room Pitch Sessions' },
      { time: '03:00 PM', activity: 'Venture Capital Mixer & Closing Remarks' }
    ]
  },
  {
    id: '31',
    title: 'Distributed Systems & Cloud Scale Virtual Workshop',
    category: 'Technology',
    date: '2026-12-18',
    displayDate: 'Fri, Dec 18, 2026',
    time: '02:00 PM - 06:00 PM WAT',
    location: 'Interactive Cloud Stream & Discord Stage',
    city: 'Virtual / Online',
    venueType: 'Virtual',
    description: 'Hands-on intensive masterclass on Kubernetes orchestration, event-driven microservices, Kafka streaming, and fault-tolerant architecture.',
    fullOverview: [
      'A practical, four-hour deep dive into high-throughput systems design led by principal infrastructure engineers.',
      'Live sandbox environments provided for every attendee to test real-world chaos engineering experiments.',
      'Includes lifetime access to recordings, slide decks, GitHub repositories, and private community discord.'
    ],
    organizer: {
      name: 'Cloud Engineers Alliance',
      role: 'Open Source Community',
      verified: true,
      contactEmail: 'workshops@cloudengineers.dev'
    },
    image: '/src/assets/images/event_tech_summit_1793226084260.jpg',
    basePrice: 5000,
    totalCapacity: 1000,
    initialAvailableTickets: 420,
    featured: false,
    tags: ['Kubernetes', 'Microservices', 'Distributed Systems', 'DevOps'],
    schedule: [
      { time: '02:00 PM', activity: 'Architecture Principles for 99.999% Availability' },
      { time: '03:15 PM', activity: 'Hands-On Lab: Resilient Event Pipelines with Kafka' },
      { time: '04:30 PM', activity: 'Chaos Engineering & Live Failover Drill' },
      { time: '05:30 PM', activity: 'Architecture Q&A & Code Reviews' }
    ]
  }
];

export const CATEGORIES = [
  { name: 'All', description: 'Browse all events and experiences' },
  { name: 'Technology', description: 'Developer summits, AI panels, and tech masterclasses' },
  { name: 'Music & Concerts', description: 'Live bands, music festivals, and acoustic nights' },
  { name: 'Arts & Culture', description: 'Gallery walks, theatre plays, and cultural festivals' },
  { name: 'Business & Finance', description: 'Conferences, venture forums, and executive summits' },
  { name: 'Food & Culinary', description: 'Tasting festivals, wine galas, and chef showcases' },
  { name: 'Health & Sports', description: 'Marathons, fitness camps, and wellness retreats' }
];

export const CITIES = ['All Locations', 'Lagos', 'Abuja', 'Port Harcourt', 'Virtual / Online'];
