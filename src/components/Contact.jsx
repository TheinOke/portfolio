import React from "react";
import Reveal from "./Reveal";
import SplitWords from "./SplitWords";
import { CONTACT, EASE, D_FAST } from "../data";

export default function Contact({ C, contactRef, mContact, form, setForm, sendMail, sendState, sendRef }) {
  const input = { background: C.bg, border: `1px solid ${C.s300}`, color: C.s800 };
  return (
    <section id="contact" ref={contactRef} className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-8 md:px-10 md:pb-20 md:pt-28">
      <div className="grid gap-10 rounded-2xl p-6 sm:p-10 md:grid-cols-2 md:gap-16 md:p-14"
        style={{ background: C.card, border: `1px solid ${C.s200}` }}>
        <div>
          <Reveal><p className="os-eyebrow mb-3 font-semibold" style={{ color: C.s500 }}>Contact me</p></Reveal>
          <h2 className="text-2xl font-extrabold sm:text-4xl">
            <SplitWords text="Let's talk" delay={100} stagger={110} />
          </h2>
          <Reveal delay={240}>
            <p className="mt-5 max-w-md text-sm leading-loose sm:text-base" style={{ color: C.s600 }}>
              Open to backend and full-stack work, freelance builds and anything involving Go, queues or stubborn data.
              Replies usually land within a day.
            </p>
          </Reveal>
          <span ref={mContact} className="block h-0 w-0" />
          <dl className="mt-10 space-y-5">
            {CONTACT.map((c, i) => (
              <Reveal key={c.label} delay={120 * i} y={20}>
                <dt className="os-eyebrow font-semibold" style={{ color: C.s400 }}>{c.label}</dt>
                <dd className="mt-1 break-words text-sm font-semibold" style={{ color: C.s700 }}>
                  {c.href ? <a href={c.href} target="_blank" rel="noreferrer" className="underline underline-offset-4">{c.value}</a> : c.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal className="flex flex-col justify-center gap-4" delay={150}>
          <input className="os-in w-full rounded-md px-4 py-3 text-sm" style={input} placeholder="Your name"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="os-in w-full rounded-md px-4 py-3 text-sm" style={input} placeholder="Your email" inputMode="email"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <textarea rows={5} className="os-in w-full resize-none rounded-md px-4 py-3 text-sm" style={input} placeholder="What are you working on?"
            value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <button ref={sendRef} onClick={sendMail} disabled={sendState === "sending"}
            className="os-btn w-full rounded-md px-8 py-3 text-sm font-semibold disabled:opacity-60 sm:w-auto sm:self-end"
            style={{ background: C.s800, color: C.bg, transition: `background ${D_FAST}ms ${EASE}` }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.s700)}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.s800)}>
            {sendState === "sending" ? "Sending…" : "Send message"}
          </button>
          {sendState === "sent" && (
            <p className="text-sm font-semibold" style={{ color: C.s600 }}>Thanks — your message is on its way.</p>
          )}
          {sendState === "error" && (
            <p className="text-sm font-semibold" style={{ color: "#C0392B" }}>
              Something went wrong — try again, or email me directly at{" "}
              <a href="mailto:theinokepaingsoe@gmail.com" className="underline underline-offset-4">theinokepaingsoe@gmail.com</a>.
            </p>
          )}
        </Reveal>
      </div>
      <p className="mt-12 text-center text-xs" style={{ color: C.s400 }}>© {new Date().getFullYear()} Thein Oke Paing Soe</p>
    </section>
  );
}
