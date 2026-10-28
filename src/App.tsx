import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { EventsPage } from './components/EventsPage';
import { EventDetailPage } from './components/EventDetailPage';
import { BookingPage } from './components/BookingPage';
import { BookingSuccessPage } from './components/BookingSuccessPage';
import { MyBookingsPage } from './components/MyBookingsPage';
import { TicketPassModal } from './components/TicketPassModal';
import { INITIAL_EVENTS } from './data/eventsData';
import { storageService } from './services/storage';
import { EventItem, EventCategory, Booking, FilterState } from './types';

export default function App() {
  // Current view: 'home' | 'events' | 'event-detail' | 'booking' | 'booking-success' | 'bookings'
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedEventId, setSelectedEventId] = useState<string>('12');
  const [bookingQuantity, setBookingQuantity] = useState<number>(1);

  // Data states from localStorage
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);
  const [passModalBooking, setPassModalBooking] = useState<Booking | null>(null);

  // Filter state for explore page
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'All',
    city: 'All Locations',
    dateFilter: 'all',
    sortBy: 'date',
  });

  // Load from localStorage on mount
  useEffect(() => {
    const loadedBookings = storageService.getBookings();
    setBookings(loadedBookings);

    const loadedInventory = storageService.getInventory();
    setInventory(loadedInventory);

    const loadedFavorites = storageService.getFavorites();
    setFavorites(loadedFavorites);

    // Sync with initial URL hash if present
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('events/')) {
        const id = hash.replace('events/', '');
        setSelectedEventId(id);
        setCurrentView('event-detail');
      } else if (hash === 'events') {
        setCurrentView('events');
      } else if (hash === 'bookings') {
        setCurrentView('bookings');
      } else if (hash.startsWith('book/')) {
        const id = hash.replace('book/', '');
        setSelectedEventId(id);
        setCurrentView('booking');
      } else {
        setCurrentView('home');
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  // Update URL hash when view changes
  const navigateTo = (view: string, eventId?: string, quantity: number = 1) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (eventId) {
      setSelectedEventId(eventId);
    }
    setBookingQuantity(quantity);
    setCurrentView(view);

    if (view === 'event-detail' && eventId) {
      window.location.hash = `events/${eventId}`;
    } else if (view === 'booking' && eventId) {
      window.location.hash = `book/${eventId}`;
    } else if (view === 'events') {
      window.location.hash = 'events';
    } else if (view === 'bookings') {
      window.location.hash = 'bookings';
    } else if (view === 'home') {
      window.location.hash = '';
    }
  };

  // Inventory & booking actions
  const handleBookingComplete = (newBooking: Booking) => {
    setLastBooking(newBooking);
    const updatedBookings = storageService.getBookings();
    setBookings(updatedBookings);
    const updatedInventory = storageService.getInventory();
    setInventory(updatedInventory);
    setCurrentView('booking-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelBooking = (ticketNumber: string) => {
    const success = storageService.cancelBooking(ticketNumber);
    if (success) {
      const updatedBookings = storageService.getBookings();
      setBookings(updatedBookings);
      const updatedInventory = storageService.getInventory();
      setInventory(updatedInventory);
    }
  };

  const handleToggleFavorite = (id: string) => {
    const updated = storageService.toggleFavorite(id);
    setFavorites(updated);
  };

  const handleFilterChange = (partial: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
    if (partial.category) {
      setSelectedCategory(partial.category);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'All',
      city: 'All Locations',
      dateFilter: 'all',
      sortBy: 'date',
    });
    setSelectedCategory('All');
  };

  const handleSearchHero = (query: string, city: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: query,
      city: city,
    }));
    navigateTo('events');
  };

  const handleSelectCategory = (cat: EventCategory) => {
    setSelectedCategory(cat);
    setFilters((prev) => ({ ...prev, category: cat }));
  };

  // Find currently selected event
  const currentEvent =
    events.find((e) => e.id === selectedEventId) || events[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {/* 3-Zone Contract Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={navigateTo}
        bookingCount={bookings.filter((b) => b.status === 'Confirmed').length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            events={events}
            inventory={inventory}
            favorites={favorites}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            onToggleFavorite={handleToggleFavorite}
            onViewDetails={(id) => navigateTo('event-detail', id)}
            onBookNow={(id) => navigateTo('booking', id)}
            onExploreAll={() => navigateTo('events')}
            onSearchHero={handleSearchHero}
          />
        )}

        {currentView === 'events' && (
          <EventsPage
            events={events}
            inventory={inventory}
            favorites={favorites}
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            onToggleFavorite={handleToggleFavorite}
            onViewDetails={(id) => navigateTo('event-detail', id)}
            onBookNow={(id) => navigateTo('booking', id)}
          />
        )}

        {currentView === 'event-detail' && currentEvent && (
          <EventDetailPage
            event={currentEvent}
            availableTickets={
              inventory[currentEvent.id] ?? currentEvent.initialAvailableTickets
            }
            isFavorite={favorites.includes(currentEvent.id)}
            onToggleFavorite={handleToggleFavorite}
            onBack={() => navigateTo('events')}
            onProceedToBooking={(eventId, quantity) =>
              navigateTo('booking', eventId, quantity)
            }
          />
        )}

        {currentView === 'booking' && currentEvent && (
          <BookingPage
            event={currentEvent}
            initialQuantity={bookingQuantity}
            availableTickets={
              inventory[currentEvent.id] ?? currentEvent.initialAvailableTickets
            }
            onBack={() => navigateTo('event-detail', currentEvent.id)}
            onBookingComplete={handleBookingComplete}
          />
        )}

        {currentView === 'booking-success' && lastBooking && (
          <BookingSuccessPage
            booking={lastBooking}
            onViewMyBookings={() => navigateTo('bookings')}
            onExploreMore={() => navigateTo('events')}
            onOpenPassModal={(b) => setPassModalBooking(b)}
          />
        )}

        {currentView === 'bookings' && (
          <MyBookingsPage
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onExploreEvents={() => navigateTo('events')}
            onOpenPassModal={(b) => setPassModalBooking(b)}
          />
        )}
      </main>

      {/* Digital Pass Modal */}
      <TicketPassModal
        booking={passModalBooking}
        onClose={() => setPassModalBooking(null)}
      />

      {/* Quiet Anti-Slop Professional Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onNavigate={navigateTo}
      />
    </div>
  );
}
