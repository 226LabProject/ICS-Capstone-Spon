// https://deepblue.camosun.bc.ca/~C0551029/capstone-website/




  // Source of truth (you can move this into its own .js file later)
        const volunteerPositions = [
        // --- Candy Bags ---
          { EVENT: "Candy Bags", POSITION_NAME: "SALES 1", VOLUNTEER: "maninmoon", FILLED: true, DATE: "MAR Wed 4th - 10am to 2pm"},
          { EVENT: "Candy Bags", POSITION_NAME: "SALES 2", VOLUNTEER: "Nikhil", FILLED: true, DATE: "MAR Wed 4th - 10am to 2pm" },

        // --- Hot Dogs ---
          { EVENT: "Hot Dogs", POSITION_NAME: "COOK", VOLUNTEER: "WaterYourPlants", FILLED: true, DATE: "MAR Wed 18th - 10am to 2pm" },
          { EVENT: "Hot Dogs", POSITION_NAME: "RUNNER", VOLUNTEER: "doppio", FILLED: true, DATE: "MAR Wed 18th - 10am to 2pm" },
          { EVENT: "Hot Dogs", POSITION_NAME: "SALES", VOLUNTEER: "War Crimes", FILLED: true, DATE: "MAR Wed 18th - 10am to 2pm" },

        // --- Bake Sale (if you want it on bakeSale.html too) ---
          { EVENT: "Bake Sale", POSITION_NAME: "BAKER 1", VOLUNTEER: "Dev", FILLED: true, DATE: "MAR Wed 11th - 10am to 2pm" },
          { EVENT: "Bake Sale", POSITION_NAME: "BAKER 2", VOLUNTEER: "Kale", FILLED: true, DATE: "MAR Wed 11th - 10am to 2pm" },
          { EVENT: "Bake Sale", POSITION_NAME: "BAKER 3", VOLUNTEER: "MPmaster", FILLED: true, DATE: "MAR Wed 11th - 10am to 2pm" },
          { EVENT: "Bake Sale", POSITION_NAME: "BAKER 4", VOLUNTEER: "waterYourPlants", FILLED: true, DATE: "MAR Wed 11th - 10am to 2pm" },
          { EVENT: "Bake Sale", POSITION_NAME: "BAKER 5", VOLUNTEER: "ebba", FILLED: true, DATE: "MAR Wed 11th - 10am to 2pm" },
          { EVENT: "Bake Sale", POSITION_NAME: "SALES 1", VOLUNTEER: "maninmoon", FILLED: true, DATE: "MAR Wed 11th - 10am to 2pm" },
          { EVENT: "Bake Sale", POSITION_NAME: "SALES 2", VOLUNTEER: "doppio", FILLED: true, DATE: "MAR Wed 11th - 10am to 2pm" },
        ];



const fundraisingEvents = [
  {
    key: "candy-bags",
    title: "EVENT: $2.50 Candy Bags",
    when: { day: "MAR Wed 4th", time: "10am to 2pm" },
    whereSummary: "2 locations",
    paymentTypes: ["Card"],
    locations: [
      { name: "Location One", mapUrl: "https://maps.app.goo.gl/Uisoy51KsUuFdMZx6" },
      { name: "Location Two", mapUrl: "https://maps.app.goo.gl/7HuBVKRngL2qEubs7" }
    ]
  },
  {
    key: "bake-sale",
    title: "$5 Bake Sale",
    when: { day: "MAR Wed 11th", time: "10am to 2pm" },
    whereSummary: "2 locations",
    paymentTypes: ["Card"],
    locations: [
      { name: "Location One", mapUrl: "https://maps.app.goo.gl/Uisoy51KsUuFdMZx6" },
      { name: "Location Two", mapUrl: "https://maps.app.goo.gl/7HuBVKRngL2qEubs7" }
    ]
  },
  {
    key: "hot-dogs",
    title: "Hot Dogs",
    when: { day: "MAR Wed 18th", time: "10am to 2pm" },
    whereSummary: "In front of the bookstore building",
    paymentTypes: ["Card"],
    locations: [
      { name: "In front of the bookstore building", mapUrl: "https://maps.app.goo.gl/YjZz6xZ2a9ED4PRR7" }
    ]
  },
  {
    key: "call-compaines",
    title: "Call Companies",
    when: { day: "Starts Wed 25th to March 15th", time: "Async" },
    whereSummary: "You will be assigned people to call/reach-out to",
    paymentTypes: ["E-Transfer", "Cheque", "Invoice"],
    locations: [
      { name: "This will happen when you have time for it", mapUrl: " " }
    ]
  }
];


const sponsors = [
  {
    company: "CGI",
    phone: "400-000-0000",
    email: "cgi@email.com",
    volunteer: "name here"
  }
];




//============================================================================
// SPONSOR TABLE --------------------------------------------------------
//============================================================================

function renderSponsorTable(data, tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const tbody = table.querySelector("tbody");

  tbody.innerHTML = data.map(sponsor => `
    <tr>
      <td>${sponsor.company}</td>
      <td>${sponsor.phone}</td>
      <td>${sponsor.email}</td>
      <td>${sponsor.volunteer}</td>
    </tr>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderSponsorTable(sponsors, "sponsor-table");
});



//============================================================================
// EVENT HEADER --------------------------------------------------------
//============================================================================


function renderEvent(event, container) {
  container.innerHTML = `
    <h2>${event.title}</h2>

    <div class="row">
      <span><strong>When:</strong> ${event.when.day}, ${event.when.time}</span>
      <span><strong>Where:</strong> ${event.whereSummary}</span>
      <span><strong>Payment types:</strong> ${event.paymentTypes.join(", ")}</span>
    </div>

    <h3>${event.locations.length > 1 ? "Locations" : "Location"}</h3>
    <ul>
      ${event.locations.map(loc => `
        <li>
          ${loc.name ? `${loc.name}: ` : ""}
          <a href="${loc.mapUrl}" target="_blank" rel="noopener">${loc.mapUrl}</a>
        </li>
      `).join("")}
    </ul>
  `;
}



function renderEventsOnPage(events) {
  // Find any placeholders that want an event rendered into them
  const placeholders = document.querySelectorAll("[data-event-key]");

  placeholders.forEach(container => {
    const key = container.dataset.eventKey; // e.g. "hot-dogs"
    const event = events.find(e => e.key === key);

    if (!event) {
      container.innerHTML = `<p>Event not found for key: <strong>${key}</strong></p>`;
      return;
    }

    renderEvent(event, container);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderEventsOnPage(fundraisingEvents);
});





//============================================================================
// VOLUNTEER EVENT PAGE  --------------------------------------------------------
//============================================================================


/* 2) Map event -> page link */
const eventPageMap = {
    "Candy Bags": "candyBags.html",
    "Bake Sale": "bakeSale.html",
    "Hot Dogs": "hotDogs.html",
};
  /**
   * Populates every <ul class="volunteer-list" data-event="..."></ul>
        * with positions for that event.
        */
        function populateVolunteerLists() {
    const lists = document.querySelectorAll(".volunteer-list[data-event]");

    lists.forEach((ul) => {
      const eventName = ul.dataset.event;

        // Clear any existing content
        ul.innerHTML = "";

      // Filter positions for this event
      const positions = volunteerPositions.filter(p => p.EVENT === eventName);

        // If no positions found, show a friendly message
        if (positions.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No volunteer positions listed yet.";
        ul.appendChild(li);
        return;
      }

      // Build list items
        positions.forEach((p) => {
            const li = document.createElement("li");

            if (p.FILLED) {
                li.textContent = `${p.POSITION_NAME}: ${p.VOLUNTEER}`;
            } else {
                li.innerHTML = `${p.POSITION_NAME}: <span class="volunteer-needed">NEEDED</span>`;
            }

            ul.appendChild(li);
        });

    });
  }

        // Run after the page loads
        document.addEventListener("DOMContentLoaded", populateVolunteerLists);







//============================================================================
// VOLUNTEER LIST WELCOME --------------------------------------------------------
//============================================================================



/* 3) Helper to safely escape text if you ever switch to user input later */
function escapeHtml(s) {
    return String(s)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* Parse your DATE string into something sortable.
   Examples you have:
   "MAR Wed 4th - 10am to 2pm"
   "MAR Wed 11th - 10am to 2pm"
   "MAR Wed 18th - 10am to 2pm"
*/
function parseVolunteerDate(dateStr) {
  if (!dateStr) return Number.POSITIVE_INFINITY;

  const s = String(dateStr).toUpperCase();

  // Month map (add more if you need them later)
  const monthMap = {
    JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6,
    JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12
  };

  const monthToken = (s.match(/\b(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\b/) || [])[1];
  const month = monthToken ? monthMap[monthToken] : 99;

  // Pull day number from "4th", "11th", "18th", etc.
  const dayMatch = s.match(/\b(\d{1,2})(?:ST|ND|RD|TH)\b/);
  const day = dayMatch ? parseInt(dayMatch[1], 10) : 99;

  // We only have March right now; use a fixed year for stable sorting.
  // If you want, swap 2026 for new Date().getFullYear()
  const year = 2026;

  return new Date(year, month - 1, day).getTime();
}



/* 4) Populate the Welcome page table */
function populateAllVolunteersOnWelcome() {
  const table = document.getElementById("all-volunteers");
  if (!table) return;

  const tbody = table.querySelector("tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  // Sort by DATE first, then EVENT, then POSITION_NAME
  const sorted = [...volunteerPositions].sort((a, b) => {
    const aTime = parseVolunteerDate(a.DATE);
    const bTime = parseVolunteerDate(b.DATE);

    if (aTime !== bTime) return aTime - bTime;

    // Tie-breakers for stable readable ordering
    if (a.EVENT !== b.EVENT) return a.EVENT.localeCompare(b.EVENT);
    return a.POSITION_NAME.localeCompare(b.POSITION_NAME);
  });

  sorted.forEach((p) => {
    // FIX: your p.EVENT values must match eventPageMap keys exactly
    const page = eventPageMap[p.EVENT] || "#";

    const nameOrNeeded = p.FILLED
      ? escapeHtml(p.VOLUNTEER)
      : `<span class="volunteer-needed">NEEDED</span>`;

    const dateText = escapeHtml(p.DATE || "TBA");
    const eventText = escapeHtml(p.EVENT);
    const posText = escapeHtml(p.POSITION_NAME);

    const row = document.createElement("tr");

    row.innerHTML = `
      <td><strong>${posText}</strong></td>
      <td>${nameOrNeeded}</td>
      <td>${page === "#"
        ? `${eventText}`
        : `<a href="${page}">${eventText}</a>`
      }</td>
      <td class="mono">${dateText}</td>
    `;

    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", populateAllVolunteersOnWelcome);








//============================================================================
// NAV --------------------------------------------------------
//============================================================================



function generateNav() {
    const navContainer = document.getElementById("main-nav");
    if (!navContainer) return;

    navContainer.innerHTML = `
    <!-- NAV -->
    <nav aria-label="Page sections">
      <div class="nav-inner">

        <a href="Mission.html">Sponsorship page</a>
        <a href="index.html">Welcome</a>
        <a href="fundraising.html">Fundraising events</a>

        <a href="callCompanies.html"><strong>EVENT:</strong> Call Companies</a>
        <a href="candyBags.html"><strong>EVENT:</strong> $2.50 Candy bags</a>
        <a href="bakeSale.html"><strong>EVENT:</strong> $5 bake sale</a>
        <a href="hotDogs.html"><strong>EVENT:</strong> $6 Hot dogs</a>

        <a href="Payment.html">How To Take Payment</a>
        <a href="budget.html">Projected Event Budget</a>

      </div>
    </nav>
    <!-- NAV -->
  `;
}

document.addEventListener("DOMContentLoaded", generateNav);




//============================================================================
// EVENT HEADER --------------------------------------------------------
//============================================================================


// Renders ALL events in the fundraisingEvents array
// You just need a container in your HTML like:
// <section id="events-container"></section>

function renderEventByTitle(events, title, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const event = events.find(e => e.title === title);
  if (!event) {
    container.innerHTML = `<p>Event not found.</p>`;
    return;
  }

  container.innerHTML = `
    <h2>${event.title}</h2>

    <div class="row">
      <span><strong>When:</strong> ${event.when.day}, ${event.when.time}</span>
      <span><strong>Where:</strong> ${event.whereSummary}</span>
      <span><strong>Payment types:</strong> ${event.paymentTypes.join(", ")}</span>
    </div>

    <h3>${event.locations.length > 1 ? "Locations" : "Location"}</h3>
    <ul>
      ${event.locations.map(location => `
        <li>
          ${location.name ? `${location.name}: ` : ""}
          <a href="${location.mapUrl}" target="_blank" rel="noopener">${location.mapUrl}</a>
        </li>
      `).join("")}
    </ul>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderEventByTitle(fundraisingEvents, "Hot Dogs", "hot-dogs");
});







//============================================================================
// CALENDAR --------------------------------------------------------
//============================================================================

// Add to scripts.js (works with your existing fundraisingEvents + eventPageMap)
// Requires: fundraisingEvents array with when.day like "MAR Wed 4th" and when.time like "10am to 2pm"

/* Parse "MAR Wed 4th" into a JS Date (year fixed to 2026 for your site) */
function parseEventDayToDate(dayStr) {
  if (!dayStr) return null;

  const s = String(dayStr).toUpperCase();
  const monthMap = {
    JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
    JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
  };

  const monthToken = (s.match(/\b(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\b/) || [])[1];
  const monthIndex = monthToken ? monthMap[monthToken] : null;

  const dayMatch = s.match(/\b(\d{1,2})(?:ST|ND|RD|TH)\b/);
  const dayNum = dayMatch ? parseInt(dayMatch[1], 10) : null;

  if (monthIndex === null || !dayNum) return null;

  return new Date(2026, monthIndex, dayNum);
}

function formatMonthYear(date) {
  return date.toLocaleString(undefined, { month: "long", year: "numeric" });
}

function buildCalendarDays(year, monthIndex) {
  const first = new Date(year, monthIndex, 1);
  const last = new Date(year, monthIndex + 1, 0);
  const daysInMonth = last.getDate();

  // We want Monday-start or Sunday-start? We'll do Sunday-start (0)
  const startOffset = first.getDay(); // 0=Sun ... 6=Sat

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, monthIndex, d));

  // Pad to full weeks (multiple of 7)
  while (cells.length % 7 !== 0) cells.push(null);

  return cells;
}

function renderEventsCalendar(events, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Only include fundraising events that have a parsable month/day
  const parsed = events
    .map(e => {
      const date = parseEventDayToDate(e.when?.day);
      return date ? { ...e, __date: date } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.__date - b.__date);

  if (parsed.length === 0) {
    container.innerHTML = `<p class="muted">No upcoming events found.</p>`;
    return;
  }

  // Use the earliest month that appears (your events are all March)
  const calYear = parsed[0].__date.getFullYear();
  const calMonth = parsed[0].__date.getMonth();

  // Group events by day number (within the calendar month)
  const byDay = new Map();
  parsed.forEach(e => {
    if (e.__date.getFullYear() !== calYear || e.__date.getMonth() !== calMonth) return;
    const key = e.__date.getDate();
    if (!byDay.has(key)) byDay.set(key, []);
    byDay.get(key).push(e);
  });

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const cells = buildCalendarDays(calYear, calMonth);

  // Calendar header row (optional: month title + day labels)
  let html = `
    <div class="callout" style="margin-bottom: 10px;">
      <strong>${formatMonthYear(new Date(calYear, calMonth, 1))}</strong>
    </div>
  `;

  // Day-of-week labels
  html += dayNames.map(d => `<div class="calendar-day"><div class="dow muted">${d}</div></div>`).join("");

  // Actual calendar cells
  html += cells.map(date => {
    if (!date) return `<div class="calendar-day"></div>`;

    const dayNum = date.getDate();
    const eventsToday = byDay.get(dayNum) || [];

    const eventsHtml = eventsToday.map(e => {
      // Link rules:
      // - if you have a matching page in eventPageMap via volunteer event names, use that
      // - otherwise, fall back to a safe link or omit
      let href = "#";
      // best guess mapping: use event.key => page filenames you already have
      const keyToPage = {
        "candy-bags": "candyBags.html",
        "bake-sale": "bakeSale.html",
        "hot-dogs": "hotDogs.html",
        "call-compaines": "callCompanies.html"
      };
      href = keyToPage[e.key] || "#";

      return `
        <a class="calendar-event" href="${href}">
          <div class="event-title">${e.title}</div>
          <div class="event-time">${e.when.time}</div>
        </a>
      `;
    }).join("");

    return `
      <div class="calendar-day">
        <div class="day-num">${dayNum}</div>
        ${eventsHtml}
      </div>
    `;
  }).join("");

  container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  renderEventsCalendar(fundraisingEvents, "events-calendar");
});