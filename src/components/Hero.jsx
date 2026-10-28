import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, ShieldCheck, Calendar, Users, Sparkles } from 'lucide-react';
import { CITIES } from '../data/eventsData.js';

export const Hero = ({ onSearch, onExploreClick, onFeaturedClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Locations');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCity);
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 pt-8 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main 2-column Hero Split */}
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Headline and Quick Search */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>West Africa & Global Premier Experiences</span>
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
              Discover and book world-class events.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Secure authentic passes to headline technology conferences, electrifying concerts, and private cultural exhibitions with instant digital tickets.
            </p>

            {/* Functional Search Bar */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 rounded-xl border border-slate-800 bg-slate-900/90 p-2 shadow-2xl backdrop-blur-sm sm:flex sm:items-center sm:gap-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by event name, artist, topic..."
                  className="w-full rounded-lg bg-transparent py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="mt-2 sm:mt-0 sm:w-48 border-t border-slate-800 sm:border-t-0 sm:border-l sm:pl-2">
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-3 h-4 w-4 text-slate-400" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full appearance-none rounded-lg bg-transparent py-2.5 pl-8 pr-6 text-sm text-slate-200 focus:outline-none cursor-pointer"
                  >
                    {CITIES.map((city) => (
                      <option key={city} value={city} className="bg-slate-900 text-white">
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 sm:mt-0 flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:bg-amber-400 active:scale-98 cursor-pointer shrink-0 shadow-lg shadow-amber-500/20"
              >
                <span>Find Events</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Quick tags */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-400">Trending:</span>
              <button
                type="button"
                onClick={() => onSearch('Tech Summit', 'All Locations')}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Tech Summit 2026
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => onSearch('Concert', 'All Locations')}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Live Concerts
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => onSearch('Art', 'All Locations')}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Contemporary Art
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => onSearch('Wine', 'All Locations')}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Gastronomy Gala
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset Banner */}
          <div className="relative lg:col-span-5 flex flex-col justify-center">
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
              <img
                src="/src/assets/images/hero_event_experience_1793226083720.jpg"
                alt="Astra Festival Mainstage Atmosphere"
                referrerPolicy="no-referrer"
                className="h-[380px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Spotlight Event · Nov 14, 2026</span>
                </div>
                <h3 className="mt-1 font-display text-xl font-bold tracking-tight">
                  Astra West Africa Tech Summit 2026
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-slate-300">
                  Landmark Centre, Victoria Island, Lagos. Over 2,500 industry innovators.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
                  <span className="font-mono text-sm font-semibold text-amber-400 tabular-nums">
                    Tickets from ₦10,000
                  </span>
                  <button
                    onClick={() => onFeaturedClick('12')}
                    className="flex items-center gap-1.5 rounded-lg bg-white/10 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <span>View Event</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column KPI strip below the hero split */}
        <div className="mt-14 grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-8 sm:grid-cols-4 lg:gap-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Users className="h-4 w-4 text-amber-400" />
              <span className="text-xs uppercase tracking-wider text-slate-400">Audience</span>
            </div>
            <p className="font-display text-2xl font-bold text-white tabular-nums">50,000+</p>
            <p className="text-xs text-slate-400">Tickets booked safely</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="h-4 w-4 text-amber-400" />
              <span className="text-xs uppercase tracking-wider text-slate-400">Experiences</span>
            </div>
            <p className="font-display text-2xl font-bold text-white tabular-nums">120+ Curated</p>
            <p className="text-xs text-slate-400">Conferences and concerts</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span className="text-xs uppercase tracking-wider text-slate-400">Security</span>
            </div>
            <p className="font-display text-2xl font-bold text-white tabular-nums">100% Verified</p>
            <p className="text-xs text-slate-400">Direct organizer partner access</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-xs uppercase tracking-wider text-slate-400">Transparency</span>
            </div>
            <p className="font-display text-2xl font-bold text-white tabular-nums">₦0 Hidden Fees</p>
            <p className="text-xs text-slate-400">Direct price checkout guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
};
