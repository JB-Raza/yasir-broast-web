import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiSend, FiLoader } from 'react-icons/fi';

/* ─── Validation helpers ─────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Pakistani mobile: 03xx-xxxxxxx  or  042-xxxxxxxx  (both are acceptable)
const PHONE_RE = /^(0[0-9]{2,3}-?[0-9]{6,8})?$/;

function validate(fields) {
  const errors = {};
  if (!fields.name.trim() || fields.name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters.';
  if (!EMAIL_RE.test(fields.email))
    errors.email = 'Please enter a valid email address.';
  if (fields.phone && !PHONE_RE.test(fields.phone.trim()))
    errors.phone = 'Enter a valid Pakistani phone number (e.g. 0300-1234567).';
  if (!fields.message.trim() || fields.message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.';
  return errors;
}

const SUBJECTS = [
  'General Inquiry',
  'Feedback',
  'Complaint',
  'Partnership',
];

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  subject: 'General Inquiry',
  message: '',
};

/**
 * ContactForm
 * Controlled form with client-side validation.
 * On success logs to console (placeholder for real API submission).
 */
export default function ContactForm() {
  const [fields, setFields]     = useState(INITIAL);
  const [errors, setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear error on edit
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate(fields);
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      // Placeholder — replace with real API call
      await new Promise((res) => setTimeout(res, 900));
      /* TODO: replace with real POST /api/contact */
      toast.success("Message sent! We'll respond within 24 hours. 🙏");
      setFields(INITIAL);
      setErrors({});
    } catch {
      toast.error('Failed to send. Please call us directly at 042-35312350.');
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Shared input class builders ─────────────────────────────── */
  const baseInput =
    'w-full border rounded-xl px-4 py-3 font-opensans text-sm text-charcoal placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2';
  const inputClass = (field) =>
    `${baseInput} ${
      errors[field]
        ? 'border-red-400 focus:ring-red-300 bg-red-50'
        : 'border-gray-300 focus:ring-primary/30 focus:border-primary bg-white'
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="bg-white rounded-2xl shadow-md p-6 sm:p-8 space-y-5"
    >
      <h2 className="font-montserrat font-extrabold text-charcoal text-2xl mb-1">
        Send Us a Message
      </h2>
      <p className="font-opensans text-gray-500 text-sm !mt-1">
        Fill in the form below and we'll get back to you within 24 hours.
      </p>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className="block font-montserrat font-semibold text-charcoal text-sm mb-1.5">
            Name <span className="text-primary" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            value={fields.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
            aria-describedby={errors.name ? 'cf-name-err' : undefined}
            className={inputClass('name')}
          />
          {errors.name && (
            <p id="cf-name-err" role="alert" className="mt-1 text-xs text-red-500 font-opensans">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-email" className="block font-montserrat font-semibold text-charcoal text-sm mb-1.5">
            Email <span className="text-primary" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            value={fields.email}
            onChange={handleChange}
            placeholder="you@email.com"
            required
            aria-describedby={errors.email ? 'cf-email-err' : undefined}
            className={inputClass('email')}
          />
          {errors.email && (
            <p id="cf-email-err" role="alert" className="mt-1 text-xs text-red-500 font-opensans">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone + Subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-phone" className="block font-montserrat font-semibold text-charcoal text-sm mb-1.5">
            Phone <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            value={fields.phone}
            onChange={handleChange}
            placeholder="0300-1234567"
            aria-describedby={errors.phone ? 'cf-phone-err' : undefined}
            className={inputClass('phone')}
          />
          {errors.phone && (
            <p id="cf-phone-err" role="alert" className="mt-1 text-xs text-red-500 font-opensans">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-subject" className="block font-montserrat font-semibold text-charcoal text-sm mb-1.5">
            Subject
          </label>
          <select
            id="cf-subject"
            name="subject"
            value={fields.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 font-opensans text-sm text-charcoal bg-white outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className="block font-montserrat font-semibold text-charcoal text-sm mb-1.5">
          Message <span className="text-primary" aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          value={fields.message}
          onChange={handleChange}
          placeholder="Tell us how we can help you..."
          required
          aria-describedby={errors.message ? 'cf-message-err' : undefined}
          className={`${inputClass('message')} resize-none`}
        />
        <div className="flex justify-between mt-1">
          {errors.message ? (
            <p id="cf-message-err" role="alert" className="text-xs text-red-500 font-opensans">
              {errors.message}
            </p>
          ) : (
            <span />
          )}
          <span className="text-xs text-gray-400 font-opensans">
            {fields.message.length}/500
          </span>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="flex items-center justify-center gap-2 w-full sm:w-auto bg-primary text-white font-montserrat font-extrabold text-sm px-8 py-3 rounded-xl hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02] active:scale-95"
      >
        {submitting ? (
          <>
            <FiLoader size={16} className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <FiSend size={16} aria-hidden="true" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
