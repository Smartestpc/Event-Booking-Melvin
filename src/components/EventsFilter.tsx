import React from 'react';
import { Search, MapPin, Calendar, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { EventCategory, FilterState } from '../types';
import { CATEGORIES, CITIES } from '../data/eventsData';

interface EventsFilterProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const EventsFilter: React.FC<EventsFilterProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}) => {
  const isFiltered =
    filters.searchQuery !== '' ||
    filters.category !== 'All' ||
    filters.city !== 'All Locations' ||
    filters.dateFilter !== 'all' ||
    filters.sortBy !== 'date';

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-md">
      {/* Top Row: Search and Sort */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search events by title, keyword, or venue..."
            className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* City and Sort Selectors */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* City Filter */}
          <div className="relative flex-1 sm:flex-none">
            <MapPin className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
            <select
              value={filters.city}
              onChange={(e) => onFilterChange({ city: e.target.value })}
              className="w-full sm:w-auto appearance-none rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-9 pr-8 text-xs font-medium text-slate-200 focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative flex-1 sm:flex-none">
            <Calendar className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
            <select
              value={filters.dateFilter}
              onChange={(e) =>
                onFilterChange({
                  dateFilter: e.target.value as FilterState['dateFilter'],
                })
              }
              className="w-full sm:w-auto appearance-none rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-9 pr-8 text-xs font-medium text-slate-200 focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-white">All Dates</option>
              <option value="weekend" className="bg-slate-900 text-white">This Weekend</option>
              <option value="month" className="bg-slate-900 text-white">This Month (Nov 2026)</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="relative flex-1 sm:flex-none">
            <SlidersHorizontal className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
            <select
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  sortBy: e.target.value as FilterState['sortBy'],
                })
              }
              className="w-full sm:w-auto appearance-none rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-9 pr-8 text-xs font-medium text-slate-200 focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="date" className="bg-slate-900 text-white">Sort: Date (Soonest)</option>
              <option value="price-asc" className="bg-slate-900 text-white">Sort: Price (Low to High)</option>
              <option value="price-desc" className="bg-slate-900 text-white">Sort: Price (High to Low)</option>
              <option value="popular" className="bg-slate-900 text-white">Sort: Most Popular</option>
            </select>
          </div>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              title="Reset all filters"
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-800/80 px-3 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mt-4 flex items-center gap-1.5 overflow-x-auto border-t border-slate-800/80 pt-3.5 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = filters.category === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => onFilterChange({ category: cat.name })}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Result Count and Active Filters Bar */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>Showing</span>
          <span className="font-mono font-semibold text-white tabular-nums">
            {totalResults}
          </span>
          <span>{totalResults === 1 ? 'event' : 'events'}</span>
        </div>
        {isFiltered && (
          <span className="text-[11px] text-amber-400/90 font-medium">
            Active filters applied
          </span>
        )}
      </div>
    </div>
  );
};
