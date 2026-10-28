import React, { useState } from 'react';
import { Calendar, MapPin, Ticket, Heart, ArrowRight, User } from 'lucide-react';
import { EventItem } from '../types';
import { formatNaira } from '../utils/formatters';

interface EventCardProps {
  event: EventItem;
  availableTickets: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onViewDetails: (id: string) => void;
  onBookNow: (id: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  availableTickets,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  onBookNow,
}) => {
  const [imageError, setImageError] = useState(false);
  const isSoldOut = availableTickets <= 0;
  const isLowStock = availableTickets > 0 && availableTickets < 50;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800/90 bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl hover:shadow-black/40">
      {/* Top Media Zone */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        {!imageError ? (
          <img
            src={event.image}
            alt={event.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 p-4 text-center">
            <Ticket className="h-10 w-10 text-slate-600 mb-2" />
            <p className="text-xs font-semibold text-slate-400">{event.title}</p>
          </div>
        )}

        {/* Overlay Scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

        {/* Top Floating Controls: Favorite Button */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(event.id);
            }}
            aria-label={isFavorite ? 'Remove from saved' : 'Save event'}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950/70 backdrop-blur-md text-slate-300 transition-colors hover:text-rose-400 cursor-pointer border border-white/10"
          >
            <Heart
              className={`h-4 w-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
            />
          </button>
        </div>

        {/* Quiet Unboxed Metadata on Scrim */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-1.5 font-medium">
            <span>{event.category}</span>
            <span aria-hidden="true">·</span>
            <span>{event.city}</span>
          </div>
          <span className="text-[11px] text-slate-400">{event.venueType}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>{event.displayDate}</span>
          </div>

          {/* Event Title */}
          <h3 
            onClick={() => onViewDetails(event.id)}
            className="font-display text-lg font-bold text-white line-clamp-1 hover:text-amber-400 transition-colors cursor-pointer"
          >
            {event.title}
          </h3>

          {/* Short Description */}
          <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">
            {event.description}
          </p>

          {/* Venue & Organizer */}
          <div className="mt-3.5 space-y-1.5 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
            <div className="flex items-center gap-2 truncate">
              <MapPin className="h-3.5 w-3.5 text-slate-500 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-2 truncate">
              <User className="h-3.5 w-3.5 text-slate-500 shrink-0" />
              <span className="truncate">By {event.organizer.name}</span>
            </div>
          </div>
        </div>

        {/* Footer of Card: Pricing and Action */}
        <div className="mt-5 border-t border-slate-800/80 pt-3.5">
          <div className="flex items-end justify-between mb-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block">
                Tickets From
              </span>
              <span className="font-mono text-base font-bold text-white tabular-nums">
                {formatNaira(event.basePrice)}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Availability</span>
              {isSoldOut ? (
                <span className="font-medium text-rose-400 text-xs">Sold Out</span>
              ) : isLowStock ? (
                <span className="font-mono text-xs font-semibold text-amber-400 tabular-nums">
                  Only {availableTickets} left
                </span>
              ) : (
                <span className="font-mono text-xs font-medium text-slate-300 tabular-nums">
                  {availableTickets} available
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onViewDetails(event.id)}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 py-2 px-3 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-700 hover:text-white cursor-pointer"
            >
              <span>Details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              disabled={isSoldOut}
              onClick={() => onBookNow(event.id)}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-semibold transition-all cursor-pointer ${
                isSoldOut
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold active:scale-98 shadow-sm shadow-amber-500/10'
              }`}
            >
              <Ticket className="h-3.5 w-3.5" />
              <span>{isSoldOut ? 'Sold Out' : 'Book Ticket'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
