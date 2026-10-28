import React from 'react';
import { Hero } from './Hero.jsx';
import { CategoryBar } from './CategoryBar.jsx';
import { EventCard } from './EventCard.jsx';
import { ArrowRight, Sparkles, Calendar, ShieldCheck, Ticket } from 'lucide-react';

export const HomePage = ({
  events,
  inventory,
  favorites,
  selectedCategory,
  onSelectCategory,
  onToggleFavorite,
  onViewDetails,
  onBookNow,
  onExploreAll,
  onSearchHero,
}) => {
  // Filter events based on selected category on home
  const categoryFiltered = selectedCategory === 'All'
    ? events
    : events.filter((e) => e.category === selectedCategory);

  const featuredEvents = events.filter((e) => e.featured);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section */}
      <Hero
        onSearch={onSearchHero}
        onExploreClick={onExploreAll}
        onFeaturedClick={onViewDetails}
      />

      {/* 2. Category Selector */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      {/* 3. Featured Events Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Curated Selection</span>
            </div>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Featured Events
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Hand-picked keynote summits and headline festival performances.
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Browse All {events.length} Events</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((ev) => (
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
      </section>

      {/* 4. Upcoming Events Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-slate-900 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>Calendar Schedule</span>
            </div>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Upcoming Experiences
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Discover verified gatherings taking place over the coming weeks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExploreAll}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            >
              <span>View Full Calendar</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryFiltered.slice(0, 6).map((ev) => (
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
      </section>

      {/* 5. Direct Value & Organizer Assurance Strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-12">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Authentic Experience Guarantee
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
              Every ticket is cryptographically verified and issued directly by official partners.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
              No ticket gouging, no secondary counterfeits. Your digital pass is immediately issued with an encrypted QR check code and securely stored in your account.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Zero Counterfeit Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-amber-400" />
                <span>Instant Digital PDF / Pass</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
