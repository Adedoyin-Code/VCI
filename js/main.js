const CATS = [
  ["Platinum Sponsor", "₦10,000,000 and ₦250,000,000"],
  ["Gold Sponsor", "₦5,000,000 to ₦9,990,000"],
  ["Silver Sponsor", "₦2,000,000 to ₦4,990,000"],
  ["Bronze Sponsor", "₦1,000,000 to ₦1,990,000"],
  ["Super Supporter", "₦500,000 to ₦999,000"],
  ["Superior Friends", "₦250,000 to ₦499,000"],
  ["Friends of Victory College", "Below ₦249,000"],
];
const TABLES = [
  ["Premium Table", "₦1,000,000", "10 seats"],
  ["Gold Table", "₦500,000", "6 seats"],
  ["Standard Table", "₦250,000", "4 seats"],
];
const ASPECTS = [
  "Venue",
  "Catering",
  "Event branding and decoration",
  "Photography and videography",
  "Printing and programme materials",
  "Souvenirs and gift items",
  "Publicity and media",
  "Transportation and logistics",
  "Audio visual and technical support",
];
const $ = (s, r = document) => r.querySelector(s),
  $$ = (s, r = document) => [...r.querySelectorAll(s)];
const set = (s, v) => {
  const e = document.querySelector(s);
  if (e) e.innerHTML = v;
};
const opt = (v, t, s) =>
  `<label class="opt"><span>${t}${s ? `<small>${s}</small>` : ""}</span><input type="radio" name="category" value="${v}"><i></i></label>`;
$$("[data-cats]").forEach(
  (e) =>
    (e.innerHTML = CATS.map(
      (c) => `<div><b>${c[0]}</b><span>${c[1]}</span></div>`,
    ).join("")),
);
set(
  "[data-table]",
  CATS.map(
    (c) =>
      `<div><b>${c[0]}</b><span>${c[1].replace("Below", "Below")}</span></div>`,
  ).join(""),
);
set(
  "[data-tables]",
  TABLES.map(
    (t) =>
      `<div class="card"><h3 style="font-size:22px">${t[0]}</h3>${t[1]} · ${t[2]}</div>`,
  ).join(""),
);
set("[data-pills]", ASPECTS.map((a) => `<span>${a}</span>`).join(""));
set(
  "[data-opts=cats]",
  CATS.map((c) => opt(c[0] + " (" + c[1] + ")", c[0], c[1])).join(""),
);
set(
  "[data-opts=tables]",
  TABLES.map((t) =>
    opt(t[0] + " (" + t[1] + ", " + t[2] + ")", t[0], t[1] + " · " + t[2]),
  ).join(""),
);
set(
  "[data-opts=aspects]",
  ASPECTS.map((a) => opt("Underwrite: " + a, a)).join(""),
);

// calendar
const pad = (n) => String(n).padStart(2, "0");
// 2:00 pm Lagos (WAT, UTC+1) = 13:00 UTC
const S = "20261108T130000Z",
  E = "20261108T150000Z",
  LOC = "White Stone Event Centre, Oregun, Ikeja, Lagos",
  T = "Victory College, Ikare Akoko 80th Anniversary Luncheon";
$$("[data-gcal]").forEach(
  (a) =>
    (a.href =
      "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" +
      encodeURIComponent(T) +
      "&dates=" +
      S +
      "/" +
      E +
      "&location=" +
      encodeURIComponent(LOC) +
      "&details=" +
      encodeURIComponent("80 Years of Legacy. One Future.")),
);
$$("[data-ics]").forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:VC80",
      "BEGIN:VEVENT",
      "UID:vc80luncheon@victorycollege",
      "DTSTAMP:20260930T000000Z",
      "DTSTART:" + S,
      "DTEND:" + E,
      "SUMMARY:" + T,
      "LOCATION:" + LOC,
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      "DESCRIPTION:Luncheon tomorrow",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const l = document.createElement("a");
    l.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    l.download = "VC80 Luncheon.ics";
    l.click();
  }),
);

$("#copyBank") &&
  ($("#copyBank").onclick = (e) => {
    navigator.clipboard &&
      navigator.clipboard.writeText(
        "Bank: First Bank Nigeria PLC\nAccount name: VCI 80th Anniversary Fund\nAccount number: 2049026702",
      );
    e.target.textContent = "Copied";
    setTimeout(() => (e.target.textContent = "Copy account details"), 2500);
  });

// programme calendar: 21 to 27 February 2027 (all day, end date is the day after)
const PG = "20270221",
  PE = "20270228",
  PT = "Victory College, Ikare Akoko 80th Anniversary Programme";
$$("[data-prog-gcal]").forEach(
  (a) =>
    (a.href =
      "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" +
      encodeURIComponent(PT) +
      "&dates=" +
      PG +
      "/" +
      PE +
      "&details=" +
      encodeURIComponent("21 to 27 February 2027. Further details to follow.")),
);
$$("[data-prog-ics]").forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:VC80",
      "BEGIN:VEVENT",
      "UID:vc80programme@victorycollege",
      "DTSTAMP:20260930T000000Z",
      "DTSTART;VALUE=DATE:" + PG,
      "DTEND;VALUE=DATE:" + PE,
      "SUMMARY:" + PT,
      "DESCRIPTION:21 to 27 February 2027. Further details to follow.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const l = document.createElement("a");
    l.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    l.download = "VC80 Programme.ics";
    l.click();
  }),
);

// countdowns (Lagos time, UTC+1)
// 1) Fundraising luncheon: Sunday 8 November 2026, 2:00 pm
// 2) Programme: 21 to 27 February 2027. Shows the dates first; from 21 February a countdown to the end of the programme starts
const LUNCH = new Date("2026-11-08T14:00:00+01:00"),
  P_START = new Date("2027-02-21T00:00:00+01:00"),
  P_END = new Date("2027-02-28T00:00:00+01:00");
function boxes(ms) {
  const s = Math.max(0, Math.floor(ms / 1000)),
    p = [
      Math.floor(s / 86400),
      Math.floor((s % 86400) / 3600),
      Math.floor((s % 3600) / 60),
      s % 60,
    ],
    L = ["Days", "Hours", "Minutes", "Seconds"];
  return p
    .map(
      (v, i) =>
        `<div class="cdb"><b>${String(v).padStart(2, "0")}</b><span>${L[i]}</span></div>`,
    )
    .join("");
}
function tick() {
  const now = Date.now();
  const l = $("[data-cd=lunch]");
  if (l) {
    l.innerHTML =
      now < LUNCH
        ? boxes(LUNCH - now)
        : '<p class="cdover">The luncheon has taken place. Thank you for your support.</p>';
  }
  const p = $("[data-cd=prog]");
  if (p) {
    const h = $("[data-prog-title]"),
      t = $("[data-prog-note]");
    if (now < P_START) {
      p.hidden = true;
    } else if (now < P_END) {
      p.hidden = false;
      p.innerHTML = boxes(P_END - now);
      h.textContent = "The programme is on. It ends in:";
      t.textContent = "21 to 27 February 2027";
    } else {
      p.hidden = true;
      h.textContent = "Thank you for celebrating 80 years";
      t.textContent = "The 80th Anniversary programme has ended.";
    }
  }
}
if ($("[data-cd]")) {
  tick();
  setInterval(tick, 1000);
}

// hamburger menu for small screens
const mb = $("#menuBtn"),
  nv = $("#nav");
if (mb && nv) {
  const close = () => {
    nv.classList.remove("open");
    mb.classList.remove("open");
    mb.setAttribute("aria-expanded", "false");
    mb.setAttribute("aria-label", "Open menu");
  };
  mb.addEventListener("click", () => {
    const o = nv.classList.toggle("open");
    mb.classList.toggle("open", o);
    mb.setAttribute("aria-expanded", String(o));
    mb.setAttribute("aria-label", o ? "Close menu" : "Open menu");
  });
  nv.addEventListener("click", (e) => {
    if (e.target.closest("a")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest("header")) close();
  });
  addEventListener("resize", () => {
    if (innerWidth > 760) close();
  });
}
