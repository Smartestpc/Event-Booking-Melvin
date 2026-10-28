import React, { useMemo } from 'react';
import { EventsFilter } from './EventsFilter.jsx';
import { EventCard } from './EventCard.jsx';
import { SearchX, Sparkles } from 'lucide-react';

export const EventsPage = ({
  events,
  inventory,
  favorites,
  filters,
  onFilterChange,
  onResetFilters,
  onToggleFavorite,
  onViewDetails,
  onBookNow,
}) => {
  // Apply filtering and sorting
  const filteredEvents = useMemo(() => {
    return events
      .filter((ev) => {
        // Search query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchesTitle = ev.title.toLowerCase().includes(q);
          const matchesDesc = ev.description.toLowerCase().includes(q);
          const matchesLoc = ev.location.toLowerCase().includes(q);
          const matchesOrg = ev.organizer.name.toLowerCase().includes(q);
          const matchesTags = ev.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesOrg && !matchesTags) {
            return false;
          }
        }

        // Category filter
        if (filters.category !== 'All' && ev.category !== filters.category) {
          return false;
        }

        // City filter
        if (filters.city !== 'All Locations' && ev.city !== filters.city) {
          return false;
        }

        // Date filter
        if (filters.dateFilter === 'weekend') {
          const d = new Date(ev.date);
          const day = d.getDay();
          if (day !== 0 && day !== 6) return false;
        } else if (filters.dateFilter === 'month') {
          if (!ev.date.startsWith('2026-11')) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') {
          return a.basePrice - b.basePrice;
        }
        if (filters.sortBy === 'price-desc') {
          return b.basePrice - a.basePrice;
        }
        if (filters.sortBy === 'popular') {
          const aRatio = a.totalCapacity - (inventory[a.id] !== undefined ? inventory[a.id] : a.initialAvailableTickets);
          const bRatio = b.totalCapacity - (inventory[b.id] !== undefined ? inventory[b.id] : b.initialAvailableTickets);
          return bRatio - aRatio;
        }
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }, [events, filters, inventory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Curated Catalogue</span>
        </div>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Explore All Events
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Find and reserve verified tickets for upcoming summits, live concerts, and exclusive masterclasses.
        </p>
      </div>

      {/* Filter component */}
      <EventsFilter
        filters={filters}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        totalResults={filteredEvents.length}
      />

      {/* Grid or Empty State */}
      {filteredEvents.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((ev) => (
            <EventCard
              key={ev.id}
              event={ev}
              availableTickets={inventory[ev.id] !== undefined ? inventory[ev.id] : ev.initialAvailableTickets}
              isFavorite={favorites.includes(ev.id)}
              onToggleFavorite={onToggleFavorite}
              onViewDetails={onViewDetails}
              onBookNow={onBookNow}
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 py-16 px-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 text-slate-400 mb-4">
            <SearchX className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-white">
            No events match your criteria
          </h3>
          <p className="mt-1.5 max-w-md text-xs text-slate-400">
            We couldn't find any events matching your selected filters. Try broadening your search or resetting all filters.
          </p>
          <button
            onClick={onResetFilters}
            className="mt-6 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
