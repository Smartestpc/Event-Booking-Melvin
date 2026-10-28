import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CreditCard,
  Building2,
  Smartphone,
  ShieldCheck,
  Tag,
  Check,
  User,
  Mail,
  Phone,
  Ticket,
  AlertCircle
} from 'lucide-react';
import { EventItem, CustomerInfo, Booking } from '../types';
import { storageService } from '../services/storage';
import { formatNaira } from '../utils/formatters';

interface BookingPageProps {
  event: EventItem;
  initialQuantity?: number;
  availableTickets: number;
  onBack: () => void;
  onBookingComplete: (booking: Booking) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  event,
  initialQuantity = 1,
  availableTickets,
  onBack,
  onBookingComplete,
}) => {
  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState(
    Math.min(Math.max(1, initialQuantity), Math.max(1, availableTickets))
  );

  // Discount code state
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Bank Transfer' | 'USSD'>('Card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Load persisted customer info on mount
  useEffect(() => {
    const savedCustomer = storageService.getCustomerInfo();
    if (savedCustomer) {
      if (savedCustomer.fullName) setFullName(savedCustomer.fullName);
      if (savedCustomer.email) setEmail(savedCustomer.email);
      if (savedCustomer.phone) setPhone(savedCustomer.phone);
    }
  }, []);

  const handleApplyPromo = () => {
    const trimmed = promoCode.trim().toUpperCase();
    if (trimmed === 'AURA10' || trimmed === 'VIP10') {
      setDiscountPercent(10);
      setPromoMessage('10% VIP Promotional Discount Applied');
    } else if (trimmed === 'WELCOME20') {
      setDiscountPercent(20);
      setPromoMessage('20% Early Adopter Discount Applied');
    } else {
      setPromoMessage('Invalid or expired coupon code');
      setDiscountPercent(0);
    }
  };

  const unitPrice = event.basePrice;
  const subtotal = unitPrice * quantity;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalAmount = subtotal - discountAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setFormError('Please enter your full legal name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setFormError('Please enter a valid phone number');
      return;
    }
    if (quantity < 1 || quantity > availableTickets) {
      setFormError(`Please choose between 1 and ${availableTickets} tickets`);
      return;
    }

    setIsSubmitting(true);

    // Simulate fast reliable payment gateway authorization
    setTimeout(() => {
      const customer: CustomerInfo = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      };

      const ticketNumber = storageService.generateTicketNumber();

      const newBooking: Booking = {
        id: `book_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        ticketNumber,
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.displayDate,
        eventTime: event.time,
        eventLocation: event.location,
        eventImage: event.image,
        tierName: 'General Admission',
        ticketPrice: unitPrice,
        quantity,
        subtotal,
        discount: discountAmount,
        totalAmount,
        customer,
        bookingDate: new Date().toISOString(),
        status: 'Confirmed',
        paymentMethod,
      };

      // Persist to localStorage
      const success = storageService.saveBooking(newBooking);
      if (success) {
        setIsSubmitting(false);
        onBookingComplete(newBooking);
      } else {
        setIsSubmitting(false);
        setFormError('Failed to record booking. Please try again.');
      }
    }, 900);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Event Details</span>
        </button>
      </div>

      <div className="mb-8">
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Complete Your Ticket Booking
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Enter attendee details and finalize payment to receive your official ticket pass.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column (7 cols): Customer Form & Payment Method */}
        <div className="space-y-6 lg:col-span-7">
          {formError && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-800 bg-rose-950/60 p-4 text-xs font-medium text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{formError}</span>
            </div>
          )}

          {/* Customer Information Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
            <h2 className="font-display text-base font-bold text-white mb-4">
              1. Attendee Contact Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Chinelo Adeyemi"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. chinelo@example.com"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <span className="mt-1 block text-[11px] text-slate-500">
                  Your official digital ticket pass and QR entry code will be dispatched here.
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +234 803 123 4567"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Number of Tickets selector in form */}
              <div className="border-t border-slate-800/80 pt-4">
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Number of Tickets
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      disabled={num > availableTickets}
                      onClick={() => setQuantity(num)}
                      className={`flex h-10 w-12 items-center justify-center rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer ${
                        quantity === num
                          ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : num > availableTickets
                          ? 'border-slate-900 bg-slate-950 text-slate-700 cursor-not-allowed'
                          : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <span className="mt-2 block text-[11px] text-slate-400">
                  Maximum 5 tickets per individual order.
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
            <h2 className="font-display text-base font-bold text-white mb-4">
              2. Select Payment Method
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('Card')}
                className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all cursor-pointer ${
                  paymentMethod === 'Card'
                    ? 'border-amber-500 bg-amber-500/10 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <CreditCard className="h-6 w-6 mb-2 text-amber-400" />
                <span className="text-xs font-semibold">Debit / Card</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Mastercard, Visa, Verve</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Bank Transfer')}
                className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all cursor-pointer ${
                  paymentMethod === 'Bank Transfer'
                    ? 'border-amber-500 bg-amber-500/10 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Building2 className="h-6 w-6 mb-2 text-amber-400" />
                <span className="text-xs font-semibold">Bank Transfer</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Instant virtual account</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('USSD')}
                className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all cursor-pointer ${
                  paymentMethod === 'USSD'
                    ? 'border-amber-500 bg-amber-500/10 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Smartphone className="h-6 w-6 mb-2 text-amber-400" />
                <span className="text-xs font-semibold">USSD Banking</span>
                <span className="text-[10px] text-slate-500 mt-0.5">GTB, Zenith, Access</span>
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 border-t border-slate-800/60 pt-3">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>256-bit encrypted simulated checkout session</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Order Summary matching the prompt example */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-md shadow-2xl">
            <h2 className="font-display text-base font-bold text-white mb-4">
              Order Summary
            </h2>

            {/* Event Snapshot Card */}
            <div className="flex gap-3 rounded-lg border border-slate-800 bg-slate-950 p-3 mb-5">
              <img
                src={event.image}
                alt={event.title}
                referrerPolicy="no-referrer"
                className="h-16 w-16 rounded-md object-cover"
              />
              <div className="flex-1 overflow-hidden">
                <h3 className="text-xs font-bold text-white truncate">
                  {event.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {event.displayDate}
                </p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {event.location}
                </p>
              </div>
            </div>

            {/* Line items formatted strictly as requested */}
            <div className="space-y-3 border-t border-slate-800/80 pt-4 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-medium">Ticket:</span>
                <span className="font-semibold text-white truncate max-w-[180px]">
                  {event.title}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="font-medium">Price:</span>
                <span className="font-mono font-semibold text-white tabular-nums">
                  {formatNaira(unitPrice)}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="font-medium">Quantity:</span>
                <span className="font-mono font-semibold text-white tabular-nums">
                  {quantity}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-400">
                  <span className="font-medium">Promo Discount ({discountPercent}%):</span>
                  <span className="font-mono font-semibold tabular-nums">
                    -{formatNaira(discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-400">
                <span>Booking Service Fee:</span>
                <span className="font-mono font-medium text-emerald-400">₦0 (Waived)</span>
              </div>

              <div className="border-t border-slate-800 pt-3 flex items-baseline justify-between">
                <span className="text-sm font-bold text-white">Total:</span>
                <span className="font-mono text-xl font-extrabold text-amber-400 tabular-nums">
                  {formatNaira(totalAmount)}
                </span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="mt-5 border-t border-slate-800/80 pt-4">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Have a Promo Code?
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g. VIP10 or AURA10"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2 pl-9 pr-3 text-xs uppercase text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p
                  className={`mt-1.5 text-[11px] font-medium ${
                    discountPercent > 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {promoMessage}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 px-4 text-sm font-bold text-slate-950 transition-all hover:bg-amber-400 active:scale-98 disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                    <span>Authorizing Payment...</span>
                  </>
                ) : (
                  <>
                    <Ticket className="h-4 w-4" />
                    <span>Pay {formatNaira(totalAmount)} & Confirm</span>
                  </>
                )}
              </button>
            </div>

            <p className="mt-3 text-center text-[11px] text-slate-400">
              Guaranteed instant digital pass delivery to your email and saved in your browser.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
