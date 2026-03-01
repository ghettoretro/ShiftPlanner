# AdaptiveEngine: [SPC]_SHIFTPLANNER
/**
 * @PATH [docs/00_dev/[SPC]_SHIFTPLANNER.md]
 * @REV [20260219-2302]
 * @MODULE [DOC]
 * @CLASS [NCA|INT|PUB|CTL]
 * @STATUS [WIP|VLD|CNL|OBS]
 * @FILETYPE [ADR|CHG|DEV|SYS|PIR|PRD|GDE|REF|TPL|REG|SPC|TST|TDO|STD]
 * @DESC [Description (max 80 chars)]
 * -------------------------------------
 * @TODO_START
 * [!|?|*|+|-|&|$|:] 
 * @TODO_END
 * =====================================*/

I want to stub out an idea, and no need to jump into coding or anything, but more or less brainstorming for a new feature in the condition module, but for scheduling/planning.
Right now, im thinking something like a calendar, dnd, additional filter for shifts, but im kinda thinking of possibly doing a variation on the master detail page archetype, where the calendar is in the left, and on the right is the day detail for that shift, with a running tab for techs, assignments, time totals, etc.
The calendar would probably need to display and allow dnd of existing work orders, pm, projects, but also expose a modal to be able to change some of the visual characteristics (tab/card highlight color)...
So, maybe this is more like a hybrid dashboard, but i dunno yet. Im still sketching stuff out, but it would essentially need to be able to do a few high level activities, more of which ill detail later... and if it takes creating a whole new page archetype or ui design implementation, id be willing to break the mold, if needed

---

1. The Layout: Macro vs. Micro
Instead of a standard "Master List / Detail View," think of this as Navigator (Left) / Orchestrator (Right).
Left Pane: The Contextual Calendar (The Macro)
If this just looks like a date picker, it fails. It needs to be a "Heatmap" or "Load View" of the month/week.
Visuals: Instead of reading text on tiny calendar cards, use density indicators (e.g., "Red" day = Over capacity, "Green" day = Open slots).
Interaction: Clicking a day injects that day's data into the Right Pane.
DnD Role: This is your "Time Shifter."
Action: Drag a work order from the Right Pane (Today) onto a date in the Left Pane (Next Tuesday).
Result: Rescheduled.

Right Pane: The Shift Orchestrator (The Micro)
This is the "Day Detail" you mentioned. To accommodate "Techs, Assignments, Time Totals," a simple list won't work. You likely need a Swimlane or Bucket view.
Header: Shift stats (e.g., "3 Techs Available," "14/24 Hours Booked").
Structure:
Unassigned Bucket: Work orders scheduled for this day but not given to a human yet.
Tech Lanes: Horizontal or vertical lists per technician.
DnD Role: This is your "Resource Allocator."
Action: Drag from "Unassigned" to "Tech A."
Result: Assigned.

2. The "Third Rail": The Backlog
You mentioned DnD of "existing work orders." The missing piece in a 2-pane setup is usually: Where do unscheduled items live? If a Work Order (WO) is triggered by a Condition (e.g., "Vibration Alert"), it has no date yet.

Proposal: A collapsible "Drawer" or "Dock" (perhaps on the far left or bottom) for Unscheduled/Backlog.

Workflow: Drag from Backlog -> Left Pane (Assign Date) OR Drag from Backlog -> Right Pane (Assign Date & Tech instantly).

3. Visual Characteristics & The Modal
You mentioned a modal to change visual characteristics (highlight color).
Contextual Styling: Instead of just user-picked colors, consider "Status-Driven CSS" or "Priority Injection."
Example: High Priority = Red Border. PM = Blue Background.
The Modal: If you allow users to override these, you are essentially creating "Tags" or "Labels."
Implementation: Right-click context menu on a card -> "Set Visual Tag." This saves a metadata: { visualTag: '#FF0000' } to the Firestore document, which the card component reads to override the default border.

4. Technical Feasibility (React + Firebase)
Since you prefer async/await and no Redux:
State Management: This is a heavy read operation.
Left Pane: Needs a lightweight collection query (e.g., collection('dailyStats').where('month', '==', currentMonth)). Don't load all WOs for the month; just load the counts or status metadata if possible.
Right Pane: Real-time listener (onSnapshot) for the specific selected day.
Optimistic UI: DnD requires instant feedback. When dragging from Right to Left (Reschedule), you must update the local state immediately while the async Firestore write happens in the background. If the write fails, snap it back.

5. Breaking the Mold
If you are willing to break the UI archetype, consider the "Infinite Horizontal Scroll" (Kanban style but by Day).
Column 1: Backlog
Column 2: Yesterday
Column 3: Today (Expanded, wider, showing Techs)
Column 4: Tomorrow
Column 5: Next Day...
Pros: Seamless dragging across days.
Cons: harder to jump to "Next Month" quickly compared to your Calendar/Detail idea.
Recommendation: Stick to your proposed Calendar (Left) + Detail (Right) split. It handles the "High IQ" requirement of seeing the big picture (Month) while managing the specific complexity (Shift) without context switching.

Next Step
To flesh this out: Where does a "Work Order" originate in your system currently? Is it created manually by a user, or does the Condition Module auto-generate them into a "Pending" state that we need to visualize here?

Training-skills matrix
Turnovers
Planning

click on date to bring up day planner

calendar week number

reports by:
* shift
* asset
* tech
* wo type
* time range

may need 4 columns:
(dnd will need priority field for sorting)
* work orders
* projects
* detail
* history

statuses:
* waiting on parts
* parts requested
* down

---

## [2026-02-28 07:57 PM EST]

Here is a summary of the structural decisions, fixes, and current state for your records.

Architecture & Layout Decisions
State & Storage: Confirmed the application is strictly client-side, relying exclusively on localStorage for state persistence (no Firebase integration).

CSS Consolidation: Removed default Vite boilerplate bloat (App.css). index.css established as the single source of truth for base layer styling and CSS variable declarations.

Root Layout: Enforced a standard flex-column structure on html, body, and #root with min-height: 100vh. This prevents Vite defaults from centering the app and allows PrimaryNavbar to pin to the top while the main content area handles its own overflow.

Theme Integration: Extracted semantic theme variables (--color-surface-*, --color-text-*, --color-accent-*) and scoped them to :root, .dark in index.css to ensure universal application without strict nesting dependencies.

Component Updates
PrimaryNavbar: Rebuilt to a standard Tailwind UI specification. Replaced the default avatar and notification bell with a toggleable NotepadWidget popover.

MainLayout: Hoisted active tab state to the layout level to allow for navigation control before a dedicated router is implemented.

Current Blocker & Next Step
Tailwind Configuration: The UI is currently unstyled because tailwind.config.js is not mapping the semantic utility classes (e.g., bg-surface-secondary, text-text-primary) to the CSS variables defined in index.css.

Would you like me to fetch tailwind.config.js from the repository and generate the exact mapping block needed to resolve the styling issue?

---

Making notes for the shift planner

Home page

1-Remove tech selection from schedule slot and just have it populate based on tech schedule from the team page. Will need to have day and hour type fields for this on team page).

2-On the home page, we need backward and forward arrows to jump days, to be able to know who is on for the next day, and potentially pre-plan as available.

3-projects page would only be for special work orders, or recurring ones. It would not need to house all the work orders... essentially only need this page to be remove redundancy for daily recurring work orders, or to save upcoming work orders that havent been created yet, or have been done but are being saved for future time banking.

4- however, this will be on a corporate locked down computer... so im not sure this is something i could even attempt to deploy if built with electron. It may need to only exist as web, client side based, which may create an issue regarding state/backend memory, saving... unless done as json exports per day, maybe, but would need to investigate ability to load in from json...

[response from gemini]

2026-02-28 10:24 AM EST
1. Shift Automation LogicSince you're moving away from manual selection, the "Home" view becomes a derived state.Team Page Schema: You’ll need a mapping object or a sub-collection for each technician that defines their availability. A bit-mask or a simple array of hour-integers ($0-23$) per day of the week works best for high-level "Tech Schedule" definitions.Conflict Resolution: The UI should automatically pull the tech assigned to that specific dayOfWeek and hour. If a tech's schedule changes on the Team page, the Home page slots should update reactively.
2. Temporal NavigationTo handle jumping days while keeping the app lightweight:Date State: Use a central selectedDate state (likely Date object or ISO string).Navigation: Your arrows will simply increment/decrement this state.Pre-planning: Since you're looking to pre-plan, the "Slot" component needs to distinguish between "Scheduled per Team Page" and "Manually Overridden/Assigned."
3. Project Scoping & Time BankingRefining the Projects page to handle "Templates" or "Future Orders":Recurring Orders: Treat these as "Work Order Blueprints."Time Banking: This implies a status like PENDING_BANKED. You can "withdraw" these from the Projects page and inject them into a specific day's schedule on the Home page.
4. Deployment & Persistence StrategySince Electron is likely a "No-Go" on a corporate-locked machine, a Client-Side Web App is the path of least resistance.The Persistence Problem:Without a backend/Firebase (if the corporate network blocks it), you have three tiers of "memory":IndexedDB / LocalStorage: Good for "auto-save" during a session, but fragile if IT clears browser caches.JSON Import/Export (The "Manual" Backend): * Workflow: User hits "Save Day," it triggers a browser download of shift-2026-02-28.json.Loading: Use a simple file input or Drag-and-Drop zone. You can use FileReader API to parse the JSON and hydrate your React state.The Middle Ground (PWA): If you can host it (even via a simple internal URL or GitHub Pages), a Progressive Web App can work offline and feels like a native app without the installation hurdles of an .exe.Proposed Technical Header for this Module:JavaScript/**

 * @PATH [src/hooks/useShiftData.js]
 * @REV 20260228-1024
 * @MODULE [SHF|SCH]
 * @STATUS [PLAN]
 * @FILETYPE [HOK]
 * @DESC [Hook for managing JSON-based persistence and temporal navigation]
 * @COMPLIANCE [None]
 * -------------------------------------
 * @TODO_START
 * [!] Implement JSON FileSystem Access API or fallback to FileReader
 * [?] Define Team Page availability schema (Day/Hour bitmask)
 * [*] Create Date navigation utility (prev/next day)
 * @TODO_END
 * =====================================*/

Would you like me to draft the JSON schema for the daily exports to ensure the Team schedules and Work Orders stay synced?

## schema considerations

Projects

taskType select
location select
asset select
taskDescription text field
taskList text area
laborReport text field
targetTime decimal
recurrence select
frequence select
weekly (sun-sat) select non-once required
monthly (jan-dec) select non-once required

/**
 * @PATH [src/schema/models.js]
 * @REV [20260226-0911]
 * @MODULE [ShiftPlanner]
 * @STATUS [DEV]
 * @FILETYPE [SCH]
 * @DESC [Schema models for Client-side App.]
 * @COMPLIANCE [None]
 * -------------------------------------
 * @TODO_START
 * [?] Probably needs to be audited...
 * @TODO_END
 * =====================================*/

// ==========================================
// 1. ASSETS & INFRASTRUCTURE
// ==========================================

export const createLocation = (initial = {}) => ({
  id: crypto.randomUUID(),
  name: '', // e.g. "Tug Tunnel"
  ...initial
});

export const createAsset = (initial = {}) => ({
  id: crypto.randomUUID(),
  name: '', // e.g. "Carousel 3"
  locationId: '', // FK to Location
  type: 'CONVEYOR', // [CONVEYOR, BRIDGE, DIVERTER, PBB]
  status: 'OPERATIONAL', // [OPERATIONAL, OOS, DEGRADED]
  ...initial
});

// ==========================================
// 2. RESOURCES (Techs & Skills)
// ==========================================

export const createSkill = (initial = {}) => ({
  id: crypto.randomUUID(),
  name: '', // [BHS, PBB, QC]
  description: '',
  ...initial
});

export const createTech = (initial = {}) => ({
  id: crypto.randomUUID(),
  name: 'New Tech',
  initials: '', 
  shift: '3rd', 
  // Availability Logic
  daysAvailable: ['MON', 'TUE', 'WED', 'THU', 'FRI'], 
  hoursAvailable: 8.0, 
  
  // Skill Matrix (Array of Skill IDs or Objects with Level)
  skills: [], // e.g. [{ skillId: "123", level: 5 }]
  
  role: 'TECH', // [TECH, SUPERVISOR]
  status: 'ACTIVE', 
  ...initial
});

// ==========================================
// 3. WORK MANAGEMENT (The Core)
// ==========================================

export const createProject = (initial = {}) => ({
  id: crypto.randomUUID(),
  name: '', 
  description: '',
  woCreated: false,
  blockers: [], // [PARTS, MANPOWER, AVAILABILITY]
  locationId: '', // FK
  assetId: '', // FK
  notes: '',
  ...initial
});

export const createPart = (initial = {}) => ({
  id: crypto.randomUUID(),
  partNumber: '', 
  description: '',
  locationId: '', // FK (Where is it stored?)
  assetId: '', // FK (What is it for?)
  quantity: 0,
  ...initial
});

export const createWorkOrder = (initial = {}) => ({
  id: crypto.randomUUID(),
  woNumber: '', // External MC Number
  
  // What are we working on?
  locationId: '', // FK
  assetId: '', // FK
  projectId: '', // FK (Optional link to Project)
  
  // The Task
  task: '', 
  description: '',
  type: 'PM', // [PM, CM, QC, PROJECT]
  frequency: 'DAILY', // [DAILY, WEEKLY, MONTHLY]
  
  // Assignment
  assignedTechIds: [], // Array of Tech IDs
  estHours: 0, // Number (for calculation)
  
  // Execution
  status: 'PENDING', // [PENDING, IN_PROGRESS, COMPLETE]
  notes: '',
  timestamp: Date.now(),
  recurring: false,
  ...initial
});

// ==========================================
// 4. REPORTING (The Output)
// ==========================================

export const createShiftSummary = (initial = {}) => ({
  id: new Date().toISOString().split('T')[0],
  date: new Date(),
  supervisorId: '', // FK to Tech (You)
  shift: '3rd',
  
  // The Collections for this specific shift
  completedWOs: [], // Array of WO IDs
  
  // The "Questions" from your process
  equipmentOOS: [], // Array of Asset IDs
  partsNeeded: false,
  partsNotes: "",
  partsReceived: [], // Array of strings or Part IDs
  turnoverNotes: "",
  ...initial
});