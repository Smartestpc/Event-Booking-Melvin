import React from 'react';
import { Ticket, Search, Compass, Calendar, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, eventId?: string) => void;
  bookingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  bookingCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 text-left text-slate-100 transition-opacity hover:opacity-90 shrink-0 cursor-pointer"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20">
            <Ticket className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white whitespace-nowrap">
            AuraEvents
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white ${
              currentView === 'home' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('events')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white ${
              currentView === 'events' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Explore Events
          </button>
          <button
            onClick={() => {
              onNavigate('events');
            }}
            className="transition-colors whitespace-nowrap cursor-pointer hover:text-white"
          >
            Categories
          </button>
          <button
            onClick={() => onNavigate('bookings')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white ${
              currentView === 'bookings' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            My Bookings
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('bookings')}
            className="relative flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-700/80 px-3.5 py-2 text-xs font-semibold text-slate-100 transition-all hover:bg-slate-800 hover:border-slate-600 cursor-pointer whitespace-nowrap"
          >
            <Ticket className="h-4 w-4 text-amber-400" />
            <span>My Tickets</span>
            {bookingCount > 0 && (
              <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-[11px] font-bold text-slate-950">
                {bookingCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 py-4 space-y-2">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            <Compass className="h-4 w-4 text-amber-400" />
            Home
          </button>
          <button
            onClick={() => {
              onNavigate('events');
              setMobileMenuOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            <Search className="h-4 w-4 text-amber-400" />
            Explore All Events
          </button>
          <button
            onClick={() => {
              onNavigate('bookings');
              setMobileMenuOpen(false);
            }}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-amber-400" />
              My Bookings & Passes
            </div>
            {bookingCount > 0 && (
              <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-slate-950">
                {bookingCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};
