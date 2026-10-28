import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  Ticket,
  ShieldCheck,
  Share2,
  Check,
  Plus,
  Minus,
  ExternalLink,
  Heart
} from 'lucide-react';
import { formatNaira, generateGoogleCalendarUrl } from '../utils/formatters.js';

export const EventDetailPage = ({
  event,
  availableTickets,
  isFavorite,
  onToggleFavorite,
  onBack,
  onProceedToBooking,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isSoldOut = availableTickets <= 0;
  const maxPurchase = Math.min(10, Math.max(1, availableTickets));

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const calendarUrl = generateGoogleCalendarUrl(
    event.title,
    event.description,
    event.location,
    event.date
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Navigation Row */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Events</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            onClick={() => onToggleFavorite(event.id)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <Heart
              className={`h-3.5 w-3.5 ${
                isFavorite ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
            <span>{isFavorite ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Gallery & Details on Left, Sticky Purchase Module on Right */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column (8 cols): Media, Metadata, Overview, Schedule */}
        <div className="space-y-8 lg:col-span-8">
          {/* Main Event Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
            {!imageError ? (
              <img
                src={event.image}
                alt={event.title}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-900">
                <Ticket className="h-16 w-16 text-slate-700" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <span>{event.category}</span>
                <span aria-hidden="true">·</span>
                <span>{event.city}</span>
                <span aria-hidden="true">·</span>
                <span>{event.venueType}</span>
              </div>
              <span className="font-mono tabular-nums text-amber-400">
                Ref ID: #{event.id}
              </span>
            </div>
          </div>

          {/* Title and Key Details */}
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl text-balance">
              {event.title}
            </h1>

            {/* Quick Metadata Grid */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-xl border border-slate-800/80 bg-slate-900/60 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-amber-400 shrink-0">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Date</span>
                  <p className="text-sm font-semibold text-white">{event.displayDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-amber-400 shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Time</span>
                  <p className="text-sm font-semibold text-white">{event.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2 border-t border-slate-800/60 pt-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-amber-400 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Location</span>
                  <p className="text-sm font-semibold text-white leading-snug">
                    {event.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-4">
            <h2 className="font-display text-lg font-bold text-white">
              Event Description & Overview
            </h2>
            <p className="text-sm leading-relaxed text-slate-300 font-normal">
              {event.description}
            </p>
            <div className="space-y-3 pt-2">
              {event.fullOverview.map((paragraph, idx) => (
                <p key={idx} className="text-sm leading-relaxed text-slate-400">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-4">
              <span className="text-xs text-slate-500 font-medium">Topics:</span>
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-300 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Schedule / Agenda */}
          <div className="space-y-4 border-t border-slate-800/80 pt-6">
            <h2 className="font-display text-lg font-bold text-white">
              Schedule & Programme
            </h2>
            <div className="space-y-3">
              {event.schedule.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-lg border border-slate-900 bg-slate-900/40 p-3.5 transition-colors hover:bg-slate-900/70"
                >
                  <span className="font-mono text-xs font-semibold text-amber-400 tabular-nums shrink-0 pt-0.5">
                    {item.time}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    {item.activity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Organizer Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-sm font-bold text-white">
                      {event.organizer.name}
                    </h3>
                    {event.organizer.verified && (
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{event.organizer.role}</p>
                </div>
              </div>

              <a
                href={`mailto:${event.organizer.contactEmail}`}
                className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <span>Contact</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Contiguous Sticky Purchase Module */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-md">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Standard Admission Ticket
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-mono text-3xl font-extrabold text-white tabular-nums">
                  {formatNaira(event.basePrice)}
                </span>
                <span className="text-xs text-slate-400">/ per ticket</span>
              </div>
            </div>

            {/* Inventory Status Indicator */}
            <div className="mt-4 rounded-lg bg-slate-950 p-3 border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Available Tickets</span>
                <span className="font-mono font-bold text-white tabular-nums">
                  {availableTickets} / {event.totalCapacity}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(5, (availableTickets / event.totalCapacity) * 100)
                    )}%`,
                  }}
                />
              </div>
              {availableTickets < 50 && availableTickets > 0 && (
                <p className="mt-2 text-[11px] font-medium text-amber-400">
                  Fast selling: only {availableTickets} tickets remaining for this event!
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            {!isSoldOut && (
              <div className="mt-5 space-y-2">
                <label className="text-xs font-medium text-slate-300 block">
                  Select Ticket Quantity
                </label>
                <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-1.5">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="font-mono text-base font-bold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(maxPurchase, q + 1))}
                    disabled={quantity >= maxPurchase}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Subtotal Calculation */}
            {!isSoldOut && (
              <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
                <span className="text-slate-400">Total Calculation</span>
                <span className="font-mono text-sm font-bold text-amber-400 tabular-nums">
                  {formatNaira(event.basePrice * quantity)}
                </span>
              </div>
            )}

            {/* Book Ticket Button */}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                disabled={isSoldOut}
                onClick={() => onProceedToBooking(event.id, quantity)}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-bold transition-all cursor-pointer ${
                  isSoldOut
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-98 shadow-lg shadow-amber-500/20'
                }`}
              >
                <Ticket className="h-4 w-4" />
                <span>{isSoldOut ? 'Sold Out' : 'Book Ticket'}</span>
              </button>

              <a
                href={calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 px-4 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <Calendar className="h-3.5 w-3.5 text-amber-400" />
                <span>Add to Google Calendar</span>
              </a>
            </div>

            {/* Trust markers */}
            <div className="mt-6 space-y-2 border-t border-slate-800/80 pt-4 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Official digital pass stored in your account</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Free cancellation up to 48 hours before event</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
