import React, { useState } from 'react';
import {
  Ticket,
  Calendar,
  MapPin,
  Search,
  CheckCircle2,
  XCircle,
  ArrowRight,
  User,
} from 'lucide-react';
import { formatNaira } from '../utils/formatters.js';

export const MyBookingsPage = ({
  bookings,
  onCancelBooking,
  onExploreEvents,
  onOpenPassModal,
}) => {
  const [filterTab, setFilterTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmCancelTicket, setConfirmCancelTicket] = useState(null);

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    if (filterTab === 'active' && b.status === 'Cancelled') return false;
    if (filterTab === 'cancelled' && b.status !== 'Cancelled') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = b.eventTitle.toLowerCase().includes(q);
      const matchTicket = b.ticketNumber.toLowerCase().includes(q);
      const matchLoc = b.eventLocation.toLowerCase().includes(q);
      if (!matchTitle && !matchTicket && !matchLoc) return false;
    }
    return true;
  });

  const activeCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const cancelledCount = bookings.filter((b) => b.status === 'Cancelled').length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Ticket className="h-3.5 w-3.5" />
            <span>Passes & Reservations</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            My Tickets & Bookings
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Access your verified digital tickets, download barcode passes, or manage attendee reservations.
          </p>
        </div>

        <button
          onClick={onExploreEvents}
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer self-start sm:self-auto shadow-md shadow-amber-500/20"
        >
          <span>Find More Events</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Tabs and Search Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3 sm:p-4">
        {/* Segmented Filter Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setFilterTab('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              filterTab === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setFilterTab('active')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              filterTab === 'active'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Active Passes ({activeCount})
          </button>
          <button
            onClick={() => setFilterTab('cancelled')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              filterTab === 'cancelled'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Cancelled ({cancelledCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ticket # or event..."
            className="w-full rounded-lg border border-slate-800 bg-slate-950 py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((b) => {
            const isCancelled = b.status === 'Cancelled';
            return (
              <div
                key={b.ticketNumber}
                className={`overflow-hidden rounded-xl border bg-slate-900/80 transition-all ${
                  isCancelled
                    ? 'border-slate-800/60 opacity-60'
                    : 'border-slate-800 hover:border-slate-700 shadow-lg'
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left Thumbnail with status */}
                  <div className="relative h-44 md:h-auto md:w-56 shrink-0 bg-slate-950">
                    <img
                      src={b.eventImage}
                      alt={b.eventTitle}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      {isCancelled ? (
                        <span className="flex items-center gap-1 rounded-md bg-rose-950/90 border border-rose-800 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
                          <XCircle className="h-3 w-3" />
                          <span>Cancelled</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 rounded-md bg-emerald-950/90 border border-emerald-800 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Confirmed</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Main Ticket Information */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      {/* Top Bar: Ticket Number & Date */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400">Order Number:</span>
                          <span className="font-mono text-xs font-bold text-amber-400 tabular-nums">
                            {b.ticketNumber}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          Booked on {new Date(b.bookingDate).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Event Title */}
                      <h3 className="mt-3 font-display text-lg font-bold text-white">
                        {b.eventTitle}
                      </h3>

                      {/* Required details grid */}
                      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3 text-xs text-slate-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                          <span>{b.eventDate}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <User className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{b.customer.fullName}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Ticket className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                          <span className="font-mono tabular-nums">
                            {b.quantity} {b.quantity === 1 ? 'ticket' : 'tickets'}
                          </span>
                        </div>

                        <div className="sm:col-span-3 flex items-start gap-2 text-slate-400">
                          <MapPin className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" />
                          <span className="truncate">{b.eventLocation}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom strip: Amount Paid and Action Buttons */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-4">
                      <div>
                        <span className="text-[11px] text-slate-400 block uppercase tracking-wider">
                          Amount Paid
                        </span>
                        <span className="font-mono text-base font-extrabold text-white tabular-nums">
                          {formatNaira(b.totalAmount)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {!isCancelled && (
                          <>
                            <button
                              onClick={() => onOpenPassModal(b)}
                              className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
                            >
                              <Ticket className="h-3.5 w-3.5" />
                              <span>View Pass</span>
                            </button>

                            {confirmCancelTicket === b.ticketNumber ? (
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => {
                                    onCancelBooking(b.ticketNumber);
                                    setConfirmCancelTicket(null);
                                  }}
                                  className="rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-rose-500 transition-colors cursor-pointer"
                                >
                                  Confirm Cancel
                                </button>
                                <button
                                  onClick={() => setConfirmCancelTicket(null)}
                                  className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-1.5 text-xs text-slate-400 hover:text-white"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmCancelTicket(b.ticketNumber)}
                                className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-rose-400 hover:border-rose-900 transition-colors cursor-pointer"
                              >
                                Cancel Booking
                              </button>
                            )}
                          </>
                        )}
                        {isCancelled && (
                          <span className="text-xs text-rose-400/80 italic">
                            Cancelled · Refund logged to customer
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 py-16 px-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 text-amber-400 mb-4">
            <Ticket className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-white">
            {searchQuery
              ? 'No bookings match your search query'
              : filterTab === 'cancelled'
              ? 'No cancelled bookings'
              : 'You have no booked tickets yet'}
          </h3>
          <p className="mt-1.5 max-w-md text-xs text-slate-400">
            Discover upcoming tech conferences, live music concerts, and art exhibitions to book your passes.
          </p>
          <button
            onClick={onExploreEvents}
            className="mt-6 flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
          >
            <Calendar className="h-4 w-4" />
            <span>Discover Events Now</span>
          </button>
        </div>
      )}
    </div>
  );
};
