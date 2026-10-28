import React, { useState } from 'react';
import { Ticket, Mail, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { EventCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: EventCategory) => void;
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-slate-950">
                <Ticket className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold text-white tracking-tight">
                AuraEvents
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              The premier destination for discovering curated tech conferences, live music festivals, and arts experiences.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Verified organizers and authentic tickets</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  All Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bookings')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  My Tickets & Bookings
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Technology');
                    onNavigate('events');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Tech Summits
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Music & Concerts');
                    onNavigate('events');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Live Concerts
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Arts & Culture');
                    onNavigate('events');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Arts & Culture
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Business & Finance');
                    onNavigate('events');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Business & Finance
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Food & Culinary');
                    onNavigate('events');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Food & Culinary
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Health & Sports');
                    onNavigate('events');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Health & Sports
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Notifications */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Event Radar
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive weekly curations of top upcoming events and exclusive early-bird ticket access.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-950/60 border border-emerald-800/80 p-3 text-xs text-emerald-300">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Subscribed! We will alert you on new releases.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 py-2 px-3 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <span>Subscribe to Radar</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-8 text-xs text-slate-400 sm:flex-row">
          <p>© 2026 AuraEvents Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Organizer Helpdesk</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
