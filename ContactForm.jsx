import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    type: '',
    text: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || 'Failed to send message.');
      }

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setStatusMessage({
        type: 'success',
        text: result?.message || 'Message sent successfully.',
      });
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    'w-full rounded-2xl border border-cyan-400/20 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition duration-300 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30 shadow-[0_0_0_1px_rgba(34,211,238,0.08)]';

  const labelClassName = 'mb-2 block text-sm font-medium text-slate-200';

  return (
    <section className="relative overflow-hidden bg-[#050816] px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_28%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
            Get In Touch
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let&apos;s build something memorable together.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
            I&apos;m available for collaborations, freelance opportunities, and portfolio inquiries.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white">Contact Information</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Reach out directly using the form or connect through the details below.
              </p>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-cyan-400/10 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Email</p>
                <a
                  href="mailto:yogeshkakar02@gmail.com"
                  className="mt-2 block text-base font-medium text-white transition hover:text-cyan-300"
                >
                  yogeshkakar02@gmail.com
                </a>
              </div>

              <div className="rounded-2xl border border-cyan-400/10 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Phone</p>
                <a
                  href="tel:+916367245596"
                  className="mt-2 block text-base font-medium text-white transition hover:text-cyan-300"
                >
                  +91 6367245596
                </a>
              </div>

              <div className="rounded-2xl border border-cyan-400/10 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Location</p>
                <p className="mt-2 text-base font-medium text-white">
                  Noida, Uttar Pradesh, India
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-fuchsia-400/10 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 p-5">
              <p className="text-sm leading-6 text-slate-200">
                I usually reply within 24 to 48 hours. For urgent opportunities, include a clear subject line and a brief summary of your request.
              </p>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-purple-950/20 backdrop-blur-xl sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClassName}>
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClassName}>
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={inputClassName}
                  required
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="subject" className={labelClassName}>
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                className={inputClassName}
                required
              />
            </div>

            <div className="mt-5">
              <label htmlFor="message" className={labelClassName}>
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project, idea, or opportunity..."
                className={`${inputClassName} resize-none`}
                required
              />
            </div>

            {statusMessage.text ? (
              <div
                className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
                  statusMessage.type === 'success'
                    ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-300'
                    : 'border-rose-400/20 bg-rose-500/10 text-rose-300'
                }`}
              >
                {statusMessage.text}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:scale-[1.01] hover:shadow-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#050816] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}