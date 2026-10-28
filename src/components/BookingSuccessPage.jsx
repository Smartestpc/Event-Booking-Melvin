import React from 'react';
import {
  CheckCircle2,
  Ticket,
  Calendar,
  MapPin,
  ArrowRight,
  User,
  ShieldCheck,
  Download
} from 'lucide-react';
import { formatNaira, generateGoogleCalendarUrl } from '../utils/formatters.js';

export const BookingSuccessPage = ({
  booking,
  onViewMyBookings,
  onExploreMore,
  onOpenPassModal,
}) => {
  const calendarUrl = generateGoogleCalendarUrl(
    booking.eventTitle,
    `Ticket Number: ${booking.ticketNumber}. Booked by ${booking.customer.fullName}.`,
    booking.eventLocation,
    booking.eventDate
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Success Badge & Headline */}
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Booking Confirmed!
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Your reservation is verified. We have dispatched your digital pass confirmation to{' '}
          <span className="font-semibold text-slate-200">{booking.customer.email}</span>.
        </p>
      </div>

      {/* Main Ticket Pass Showcase */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-md">
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-amber-500/20 via-slate-800 to-slate-900 p-6 border-b border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                Official E-Ticket Confirmation
              </span>
              <h2 className="mt-1 font-display text-xl font-bold text-white">
                {booking.eventTitle}
              </h2>
            </div>
            <div className="rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Ticket Number
              </span>
              <span className="font-mono text-base font-bold text-amber-400 tabular-nums">
                {booking.ticketNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Perforated Divider Simulation */}
        <div className="relative flex items-center justify-between px-2 bg-slate-900 py-1">
          <div className="h-4 w-4 -ml-4 rounded-full bg-slate-950 border-r border-slate-800" />
          <div className="flex-1 border-b border-dashed border-slate-800" />
          <div className="h-4 w-4 -mr-4 rounded-full bg-slate-950 border-l border-slate-800" />
        </div>

        {/* Ticket Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-400 block">Attendee Name</span>
                <p className="text-sm font-semibold text-white flex items-center gap-1.5 mt-0.5">
                  <User className="h-3.5 w-3.5 text-amber-400" />
                  <span>{booking.customer.fullName}</span>
                </p>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Event Date & Time</span>
                <p className="text-sm font-semibold text-white flex items-center gap-1.5 mt-0.5">
                  <Calendar className="h-3.5 w-3.5 text-amber-400" />
                  <span>{booking.eventDate}</span>
                </p>
                <p className="text-xs text-slate-400 ml-5">{booking.eventTime}</p>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Venue Location</span>
                <p className="text-xs font-semibold text-white flex items-start gap-1.5 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{booking.eventLocation}</span>
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:border-l sm:border-slate-800 sm:pl-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Number of Tickets</span>
                  <p className="font-mono text-sm font-bold text-white tabular-nums">
                    {booking.quantity} {booking.quantity === 1 ? 'Pass' : 'Passes'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Amount Paid</span>
                  <p className="font-mono text-base font-extrabold text-amber-400 tabular-nums">
                    {formatNaira(booking.totalAmount)}
                  </p>
                </div>
              </div>

              {/* Simulated QR Code */}
              <div className="flex flex-col items-center justify-center rounded-xl bg-white p-4 text-slate-950">
                <svg className="h-28 w-28" viewBox="0 0 100 100" fill="none">
                  <rect x="5" y="5" width="28" height="28" rx="4" stroke="#0f172a" strokeWidth="6" />
                  <rect x="13" y="13" width="12" height="12" fill="#0f172a" />
                  <rect x="67" y="5" width="28" height="28" rx="4" stroke="#0f172a" strokeWidth="6" />
                  <rect x="75" y="13" width="12" height="12" fill="#0f172a" />
                  <rect x="5" y="67" width="28" height="28" rx="4" stroke="#0f172a" strokeWidth="6" />
                  <rect x="13" y="75" width="12" height="12" fill="#0f172a" />
                  <rect x="42" y="8" width="8" height="8" fill="#0f172a" />
                  <rect x="53" y="14" width="6" height="6" fill="#0f172a" />
                  <rect x="42" y="24" width="10" height="6" fill="#0f172a" />
                  <rect x="10" y="42" width="6" height="8" fill="#0f172a" />
                  <rect x="22" y="44" width="8" height="6" fill="#0f172a" />
                  <rect x="36" y="40" width="8" height="12" fill="#0f172a" />
                  <rect x="50" y="46" width="12" height="6" fill="#0f172a" />
                  <rect x="70" y="42" width="8" height="8" fill="#0f172a" />
                  <rect x="85" y="44" width="6" height="10" fill="#0f172a" />
                  <rect x="42" y="66" width="12" height="6" fill="#0f172a" />
                  <rect x="60" y="66" width="6" height="10" fill="#0f172a" />
                  <rect x="74" y="62" width="14" height="6" fill="#0f172a" />
                  <rect x="46" y="80" width="8" height="10" fill="#0f172a" />
                  <rect x="64" y="82" width="10" height="8" fill="#0f172a" />
                  <rect x="82" y="76" width="8" height="12" fill="#0f172a" />
                </svg>
                <span className="font-mono text-[10px] font-bold text-slate-800 tracking-wider mt-1">
                  {booking.ticketNumber}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-800 bg-slate-950 p-4 sm:flex sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Persisted safely in your browser localStorage</span>
          </div>

          <div className="mt-3 sm:mt-0 flex items-center gap-2">
            <button
              onClick={() => onOpenPassModal(booking)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Digital Pass</span>
            </button>

            <a
              href={calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Calendar</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onViewMyBookings}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer shadow-lg shadow-amber-500/20"
        >
          <Ticket className="h-4 w-4" />
          <span>View My Bookings</span>
        </button>

        <button
          onClick={onExploreMore}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-6 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
        >
          <span>Explore Other Events</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
