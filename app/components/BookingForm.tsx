'use client';

import { useState, type SubmitEvent } from 'react';

const barberWhatsAppNumber = '963959990030';

export default function BookingForm() {
  const [name, setName] = useState('');
  const [service, setService] = useState('Haircut');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "Hello! I'd like to request an appointment.",
      '',
      `Name: ${name}`,
      `Service: ${service}`,
      `Preferred date: ${date}`,
      `Preferred time: ${time}`,
      note.trim() ? `Note: ${note.trim()}` : '',
      '',
      'Please confirm whether this time is available. Thank you!',
    ]
      .filter(Boolean)
      .join('\n');

    const url =
      `https://wa.me/${barberWhatsAppNumber}` +
      `?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-xl space-y-5 rounded-xl border p-6 sm:p-8"
    >
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Your name
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-lg border px-4 py-3"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label htmlFor="service" className="mb-2 block text-sm font-medium">
          Service
        </label>
        <select
          id="service"
          value={service}
          onChange={(event) => setService(event.target.value)}
          className="w-full rounded-lg border px-4 py-3"
        >
          <option>Haircut</option>
          <option>Beard Trim</option>
          <option>Haircut + Beard</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Preferred date
          </label>
          <input
            id="date"
            type="date"
            required
            min={new Date().toLocaleDateString('en-CA')}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label htmlFor="time" className="mb-2 block text-sm font-medium">
            Preferred time
          </label>
          <input
            id="time"
            type="time"
            required
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>
      </div>

      <div>
        <label htmlFor="note" className="mb-2 block text-sm font-medium">
          Additional notes (optional)
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          className="w-full rounded-lg border px-4 py-3"
          rows={3}
          placeholder="Anything the barber should know?"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
      >
        Request appointment on WhatsApp
      </button>

      <p className="text-sm text-gray-500">
        Appointments are not confirmed until the barber replies.
      </p>
    </form>
  );
}
