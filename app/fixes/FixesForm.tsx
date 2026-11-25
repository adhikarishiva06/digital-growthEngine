"use client";

import { useState, type FormEvent } from "react";

const HUBSPOT_URL =
  "https://api.hsforms.com/submissions/v3/integration/submit/247838820/91de888d-4e0a-42fa-b1eb-b360fe50e349";

type Status = "idle" | "sending" | "done" | "error";

export default function FixesForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const handle = String(data.get("instagram_handle") || "").trim();
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();

    const fields = [
      { objectTypeId: "0-2", name: "instagram_handle", value: handle },
      { objectTypeId: "0-2", name: "name", value: name },
      { objectTypeId: "0-1", name: "email", value: email },
    ];

    setStatus("sending");
    try {
      const res = await fetch(HUBSPOT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields,
          context: { pageUri: window.location.href, pageName: "3 Free Fixes" },
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-[#D8BC85] bg-white/60 p-6">
        <p className="text-lg" style={{ fontFamily: "var(--font-bodoni), Georgia, serif" }}>
          Got it.
        </p>
        <p className="mt-2 text-[#4A1B33]/80">
          We&apos;ll go through your profile and email you your 3 fixes.
        </p>
      </div>
    );
  }

  const input =
    "w-full bg-white/70 border border-[#4A1B33]/20 px-4 py-3 text-base outline-none focus:border-[#B88A5E] placeholder:text-[#4A1B33]/40";
  const label = "block text-[11px] tracking-[0.18em] text-[#4A1B33]/70 font-medium mb-2";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="instagram_handle" className={label}>INSTAGRAM HANDLE</label>
        <input id="instagram_handle" name="instagram_handle" required placeholder="@yourbusiness" className={input} />
      </div>
      <div>
        <label htmlFor="name" className={label}>BUSINESS NAME</label>
        <input id="name" name="name" required className={input} />
      </div>
      <div>
        <label htmlFor="email" className={label}>EMAIL</label>
        <input id="email" name="email" type="email" required className={input} />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[#4A1B33] text-[#F7E9E4] py-3.5 tracking-[0.15em] text-sm font-medium hover:bg-[#3a1528] disabled:opacity-60 transition-colors"
      >
        {status === "sending" ? "SENDING…" : "SEND ME MY 3 FIXES"}
      </button>
      {status === "error" && (
        <p className="text-sm text-[#C8243B]">
          That didn&apos;t go through. Try again, or email hello@digigrowthengine.com.
        </p>
      )}
    </form>
  );
}
