import { Booking, CustomerInfo, EventItem } from '../types';
import { INITIAL_EVENTS } from '../data/eventsData';

const BOOKINGS_KEY = 'aura_event_bookings_v1';
const CUSTOMER_KEY = 'aura_event_customer_profile_v1';
const INVENTORY_KEY = 'aura_event_inventory_v1';
const FAVORITES_KEY = 'aura_event_saved_v1';

export const storageService = {
  // Get all bookings
  getBookings(): Booking[] {
    try {
      const data = localStorage.getItem(BOOKINGS_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error('Error loading bookings from localStorage', err);
      return [];
    }
  },

  // Save a new booking
  saveBooking(booking: Booking): boolean {
    try {
      const current = this.getBookings();
      const updated = [booking, ...current];
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));

      // Also persist customer profile for ease of next booking
      this.saveCustomerInfo(booking.customer);

      // Decrement available tickets in inventory
      this.decrementTicketInventory(booking.eventId, booking.quantity);

      return true;
    } catch (err) {
      console.error('Error saving booking to localStorage', err);
      return false;
    }
  },

  // Cancel an existing booking
  cancelBooking(ticketNumber: string): boolean {
    try {
      const bookings = this.getBookings();
      const target = bookings.find((b) => b.ticketNumber === ticketNumber);
      if (!target) return false;

      const updated = bookings.map((b) =>
        b.ticketNumber === ticketNumber ? { ...b, status: 'Cancelled' as const } : b
      );
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));

      // Restore inventory
      this.incrementTicketInventory(target.eventId, target.quantity);
      return true;
    } catch (err) {
      console.error('Error cancelling booking', err);
      return false;
    }
  },

  // Customer info management
  getCustomerInfo(): CustomerInfo | null {
    try {
      const data = localStorage.getItem(CUSTOMER_KEY);
      if (!data) return null;
      return JSON.parse(data) as CustomerInfo;
    } catch (err) {
      console.error('Error loading customer info', err);
      return null;
    }
  },

  saveCustomerInfo(info: CustomerInfo): void {
    try {
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify(info));
    } catch (err) {
      console.error('Error saving customer info', err);
    }
  },

  // Inventory management
  getInventory(): Record<string, number> {
    try {
      const data = localStorage.getItem(INVENTORY_KEY);
      if (data) {
        return JSON.parse(data);
      }
      // Initialize from INITIAL_EVENTS
      const initial: Record<string, number> = {};
      INITIAL_EVENTS.forEach((ev) => {
        initial[ev.id] = ev.initialAvailableTickets;
      });
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(initial));
      return initial;
    } catch (err) {
      console.error('Error getting inventory', err);
      const fallback: Record<string, number> = {};
      INITIAL_EVENTS.forEach((ev) => {
        fallback[ev.id] = ev.initialAvailableTickets;
      });
      return fallback;
    }
  },

  getAvailableTickets(eventId: string): number {
    const inventory = this.getInventory();
    if (typeof inventory[eventId] === 'number') {
      return inventory[eventId];
    }
    const ev = INITIAL_EVENTS.find((e) => e.id === eventId);
    return ev ? ev.initialAvailableTickets : 0;
  },

  decrementTicketInventory(eventId: string, count: number): void {
    try {
      const inventory = this.getInventory();
      const current = inventory[eventId] ?? 50;
      inventory[eventId] = Math.max(0, current - count);
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
    } catch (err) {
      console.error('Error decrementing inventory', err);
    }
  },

  incrementTicketInventory(eventId: string, count: number): void {
    try {
      const inventory = this.getInventory();
      const current = inventory[eventId] ?? 0;
      inventory[eventId] = current + count;
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
    } catch (err) {
      console.error('Error incrementing inventory', err);
    }
  },

  // Saved events / favorites
  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleFavorite(eventId: string): string[] {
    try {
      const current = this.getFavorites();
      const updated = current.includes(eventId)
        ? current.filter((id) => id !== eventId)
        : [...current, eventId];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  // Helper to get all events merged with dynamic inventory
  getEventsWithInventory(): EventItem[] {
    const inventory = this.getInventory();
    return INITIAL_EVENTS.map((item) => ({
      ...item,
      initialAvailableTickets: inventory[item.id] !== undefined ? inventory[item.id] : item.initialAvailableTickets
    }));
  },

  // Ticket number generator formatted like TKT-839201
  generateTicketNumber(): string {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `TKT-${randomDigits}`;
  }
};
