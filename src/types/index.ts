export type EventCategory = 
  | 'All'
  | 'Technology'
  | 'Music & Concerts'
  | 'Arts & Culture'
  | 'Business & Finance'
  | 'Food & Culinary'
  | 'Health & Sports';

export interface TicketTier {
  id: string;
  name: string;
  price: number; // in Naira (₦)
  description: string;
  perks: string[];
}

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  date: string; // ISO date 'YYYY-MM-DD'
  displayDate: string; // e.g. "Sat, Nov 14, 2026"
  time: string; // e.g. "09:00 AM - 05:00 PM"
  location: string; // e.g. "Landmark Centre, Victoria Island, Lagos"
  city: 'Lagos' | 'Abuja' | 'Port Harcourt' | 'Virtual / Online';
  venueType: 'In-person' | 'Hybrid' | 'Virtual';
  description: string;
  fullOverview: string[];
  organizer: {
    name: string;
    role: string;
    verified: boolean;
    avatarUrl?: string;
    contactEmail: string;
  };
  image: string;
  basePrice: number; // in Naira (₦)
  totalCapacity: number;
  initialAvailableTickets: number;
  featured?: boolean;
  tags: string[];
  schedule: { time: string; activity: string }[];
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: string;
  ticketNumber: string; // e.g. "TKT-839201"
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventImage: string;
  tierName: string;
  ticketPrice: number;
  quantity: number;
  subtotal: number;
  discount: number;
  totalAmount: number;
  customer: CustomerInfo;
  bookingDate: string; // ISO string
  status: 'Confirmed' | 'Attended' | 'Cancelled';
  paymentMethod: 'Card' | 'Bank Transfer' | 'USSD';
  additionalAttendees?: string[];
}

export interface FilterState {
  searchQuery: string;
  category: EventCategory;
  city: string;
  dateFilter: 'all' | 'today' | 'weekend' | 'month';
  sortBy: 'date' | 'price-asc' | 'price-desc' | 'popular';
}
