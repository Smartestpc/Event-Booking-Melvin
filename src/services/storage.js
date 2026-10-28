import { INITIAL_EVENTS } from '../data/eventsData.js';

const BOOKINGS_KEY = 'aura_event_bookings_v1';
const CUSTOMER_KEY = 'aura_event_customer_profile_v1';
const INVENTORY_KEY = 'aura_event_inventory_v1';
const FAVORITES_KEY = 'aura_event_saved_v1';

export const storageService = {
  // Get all bookings
  getBookings() {
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
  saveBooking(booking) {
    try {
      const current = this.getBookings();
      const updated = [booking, ...current];
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));

      // Persist customer profile
      this.saveCustomerInfo(booking.customer);

      // Decrement inventory
      this.decrementTicketInventory(booking.eventId, booking.quantity);

      return true;
    } catch (err) {
      console.error('Error saving booking to localStorage', err);
      return false;
    }
  },

  // Cancel an existing booking
  cancelBooking(ticketNumber) {
    try {
      const bookings = this.getBookings();
      const target = bookings.find((b) => b.ticketNumber === ticketNumber);
      if (!target) return false;

      const updated = bookings.map((b) =>
        b.ticketNumber === ticketNumber ? { ...b, status: 'Cancelled' } : b
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

  // Customer info
  getCustomerInfo() {
    try {
      const data = localStorage.getItem(CUSTOMER_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch (err) {
      console.error('Error loading customer info', err);
      return null;
    }
  },

  saveCustomerInfo(info) {
    try {
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify(info));
    } catch (err) {
      console.error('Error saving customer info', err);
    }
  },

  // Inventory management
  getInventory() {
    try {
      const data = localStorage.getItem(INVENTORY_KEY);
      if (data) {
        return JSON.parse(data);
      }
      const initial = {};
      INITIAL_EVENTS.forEach((ev) => {
        initial[ev.id] = ev.initialAvailableTickets;
      });
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(initial));
      return initial;
    } catch (err) {
      console.error('Error getting inventory', err);
      const fallback = {};
      INITIAL_EVENTS.forEach((ev) => {
        fallback[ev.id] = ev.initialAvailableTickets;
      });
      return fallback;
    }
  },

  getAvailableTickets(eventId) {
    const inventory = this.getInventory();
    if (typeof inventory[eventId] === 'number') {
      return inventory[eventId];
    }
    const ev = INITIAL_EVENTS.find((e) => e.id === eventId);
    return ev ? ev.initialAvailableTickets : 0;
  },

  decrementTicketInventory(eventId, count) {
    try {
      const inventory = this.getInventory();
      const current = inventory[eventId] !== undefined ? inventory[eventId] : 50;
      inventory[eventId] = Math.max(0, current - count);
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
    } catch (err) {
      console.error('Error decrementing inventory', err);
    }
  },

  incrementTicketInventory(eventId, count) {
    try {
      const inventory = this.getInventory();
      const current = inventory[eventId] || 0;
      inventory[eventId] = current + count;
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
    } catch (err) {
      console.error('Error incrementing inventory', err);
    }
  },

  // Saved / Favorite events
  getFavorites() {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleFavorite(eventId) {
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

  // Generate fake ticket number: TKT-839201
  generateTicketNumber() {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `TKT-${randomDigits}`;
  }
};
