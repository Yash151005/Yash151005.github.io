"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "./primitives";

/**
 * The site is a static export on GitHub Pages, so there is no server to send mail.
 * FormSubmit (https://formsubmit.co) relays the form to this inbox. The very first
 * submission sends a one-time activation email to this address; click "Activate"
 * in it and every later message is delivered normally.
 */
const FORM_ENDPOINT = "https://formsubmit.co/ajax/yashpakale56@gmail.com";

const topics = ["Job opportunity", "Internship", "Collaboration", "Freelance", "Just saying hi"];

type Status = "idle" | "sending" | "sent" | "error";
type Fields = { name: string; email: string; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(f.email.trim())) errors.email = "Please enter a valid email.";
  if (f.message.trim().length < 10) errors.message = "A little more detail, please (10+ characters).";
  return errors;
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", message: "" });
  const [topic, setTopic] = useState(topics[0]);
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const errors = validate(fields);
  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));
  const blur = (k: keyof Fields) => () => setTouched((t) => ({ ...t, [k]: true }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) return;

    // Honeypot: bots fill hidden fields, people don't.
    const honey = (e.currentTarget.elements.namedItem("_honey") as HTMLInputElement | null)?.value;
    if (honey) return;

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          topic,
          message: fields.message.trim(),
          _subject: `Portfolio: ${topic} from ${fields.name.trim()}`,
          _replyto: fields.email.trim(),
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== "true") {
        throw new Error(data.message || "Something went wrong.");
      }
      setStatus("sent");
      setFields({ name: "", email: "", message: "" });
      setTouched({});
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const showErr = (k: keyof Fields) => touched[k] && errors[k];

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
            role="status"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-signal to-signal-2"
            >
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-ink" fill="none" aria-hidden="true">
                <motion.path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </svg>
            </motion.div>
            <h3 className="mt-6 text-xl font-semibold">Message sent</h3>
            <p className="mt-2 max-w-xs text-sm text-dim">Thanks for reaching out. I&apos;ll get back to you within a day.</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 rounded-lg border border-line px-4 py-2 text-sm text-dim transition-colors hover:border-signal/60 hover:text-paper"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate
            className="space-y-5"
          >
            <fieldset>
              <legend className="mb-2 text-xs font-medium text-dim">What&apos;s this about?</legend>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    aria-pressed={topic === t}
                    className={cn(
                      "relative rounded-full border px-3 py-1.5 text-xs transition-colors",
                      topic === t ? "border-signal/60 text-paper" : "border-line text-dim hover:text-paper"
                    )}
                  >
                    {topic === t && (
                      <motion.span
                        layoutId="topic-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-signal/15"
                        transition={{ duration: 0.35, ease: EASE }}
                      />
                    )}
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" error={showErr("name")}>
                <input
                  name="name"
                  autoComplete="name"
                  value={fields.name}
                  onChange={set("name")}
                  onBlur={blur("name")}
                  placeholder="Your name"
                  aria-invalid={!!showErr("name")}
                  className={inputCls(!!showErr("name"))}
                />
              </Field>
              <Field label="Email" error={showErr("email")}>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={set("email")}
                  onBlur={blur("email")}
                  placeholder="you@company.com"
                  aria-invalid={!!showErr("email")}
                  className={inputCls(!!showErr("email"))}
                />
              </Field>
            </div>

            <Field label="Message" error={showErr("message")} counter={`${fields.message.length}/1000`}>
              <textarea
                name="message"
                rows={5}
                maxLength={1000}
                value={fields.message}
                onChange={set("message")}
                onBlur={blur("message")}
                placeholder="Tell me about the role, project or idea…"
                aria-invalid={!!showErr("message")}
                className={cn(inputCls(!!showErr("message")), "resize-none")}
              />
            </Field>

            {/* Honeypot, hidden from people */}
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300"
                  role="alert"
                >
                  Couldn&apos;t send: {errorMsg} Please try again or email me directly.
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-paper px-5 py-3 text-sm font-medium text-ink transition-all hover:bg-white disabled:cursor-wait disabled:opacity-80 sm:w-auto"
            >
              <span className="shine pointer-events-none absolute inset-0" aria-hidden="true" />
              {status === "sending" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden="true">
                    <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (invalid: boolean) =>
  cn(
    "w-full rounded-lg border bg-ink/60 px-3.5 py-2.5 text-sm text-paper outline-none transition-all placeholder:text-mute",
    "focus:border-signal/70 focus:bg-ink focus:ring-4 focus:ring-signal/10",
    invalid ? "border-rose-500/60" : "border-line hover:border-line/100 hover:bg-ink/80"
  );

function Field({
  label,
  error,
  counter,
  children,
}: {
  label: string;
  error?: string | false;
  counter?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-xs font-medium text-dim">
        {label}
        {counter && <span className="font-mono text-[10px] text-mute">{counter}</span>}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 block text-xs text-rose-400"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}
