import React from 'react';
import { X, Printer, Ticket, CheckCircle2 } from 'lucide-react';
import { formatNaira } from '../utils/formatters.js';

export const TicketPassModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-5 py-4">
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4 text-amber-400" />
            <span className="font-display text-sm font-bold text-white">
              Digital Event Pass
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Printable Pass Container */}
        <div className="p-6 space-y-6">
          {/* Top Banner */}
          <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-slate-900 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Admit One / Official Pass
              </span>
              <span className="font-mono text-xs font-bold text-white tabular-nums">
                {booking.ticketNumber}
              </span>
            </div>
            <h3 className="mt-2 font-display text-base font-bold text-white leading-tight">
              {booking.eventTitle}
            </h3>
            <p className="mt-1 text-xs text-slate-300">
              {booking.tierName}
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase">Attendee</span>
              <p className="font-semibold text-white truncate mt-0.5">
                {booking.customer.fullName}
              </p>
            </div>

            <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase">Tickets</span>
              <p className="font-semibold text-white mt-0.5 font-mono tabular-nums">
                {booking.quantity} Pass ({formatNaira(booking.totalAmount)})
              </p>
            </div>

            <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase">Date</span>
              <p className="font-semibold text-white mt-0.5">
                {booking.eventDate}
              </p>
            </div>

            <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase">Time</span>
              <p className="font-semibold text-white mt-0.5">
                {booking.eventTime}
              </p>
            </div>

            <div className="col-span-2 rounded-lg bg-slate-950 p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase">Location</span>
              <p className="font-semibold text-white mt-0.5 line-clamp-1">
                {booking.eventLocation}
              </p>
            </div>
          </div>

          {/* QR Code and Barcode */}
          <div className="flex flex-col items-center justify-center rounded-xl bg-white p-4 text-slate-950">
            <svg className="h-24 w-24" viewBox="0 0 100 100" fill="none">
              <rect x="5" y="5" width="28" height="28" rx="4" stroke="#0f172a" strokeWidth="6" />
              <rect x="13" y="13" width="12" height="12" fill="#0f172a" />
              <rect x="67" y="5" width="28" height="28" rx="4" stroke="#0f172a" strokeWidth="6" />
              <rect x="75" y="13" width="12" height="12" fill="#0f172a" />
              <rect x="5" y="67" width="28" height="28" rx="4" stroke="#0f172a" strokeWidth="6" />
              <rect x="13" y="75" width="12" height="12" fill="#0f172a" />
              <rect x="42" y="8" width="8" height="8" fill="#0f172a" />
              <rect x="53" y="14" width="6" height="6" fill="#0f172a" />
              <rect x="42" y="40" width="8" height="12" fill="#0f172a" />
              <rect x="70" y="42" width="8" height="8" fill="#0f172a" />
              <rect x="42" y="66" width="12" height="6" fill="#0f172a" />
              <rect x="74" y="62" width="14" height="6" fill="#0f172a" />
            </svg>
            <div className="mt-2 flex h-7 items-center gap-1">
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 1, 4, 2].map((w, i) => (
                <div
                  key={i}
                  className="h-full bg-slate-900 rounded-sm"
                  style={{ width: `${w * 2}px` }}
                />
              ))}
            </div>
            <span className="mt-1 font-mono text-[10px] font-bold tracking-widest text-slate-700">
              {booking.ticketNumber}
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950 px-5 py-3">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Valid for Admission</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Pass</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
