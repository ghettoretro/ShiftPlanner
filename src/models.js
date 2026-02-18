/* eslint-disable import/no-unused-modules */
/**
 * @PATH docs/00_internal/MaintenancePlanner/models.js
 * @REV 20260217-0016
 * @MODULE [MAINTENANCE-PLANNER]
 * @STATUS [DEV]
 * @FILETYPE [TYPE/SCHEMA]
 * @DESC [Schema models for Stand alone Maintenance Planner app.]
 * @COMPLIANCE [LIST OF STANDARDS COMPLIED WITH]
 * -------------------------------------
 * @TODO_START
 * @TODO_END
 * =====================================*/

// Location
export const createLocation = () => ({
  id: crypto.randomUUID(), // Auto-generate ID like Firestore
  location: '' // String
});

// Shift
export const createShift = () => ({
  id: crypto.randomUUID(), // Auto-generate ID like Firestore
  shift: '', // String (Enum) [1st | 2nd | 3rd]
  hoursAvailable: '',  // 'hoursAvailable' is essentially 'shift' but needs granularity for calendar/ day view (3rd = 20:00 to 4:30, 1st = 4:00 to 00:30, 2nd = 00:00 to 20:00)
});

// Assets
export const createAsset = (initial = {}) => ({
  id: crypto.randomUUID(), // Auto-generate ID like Firestore
  asset: '', // String
  location: '', // String (FK)
  Type: '', // String (Enum) ['CONVEYOR', 'BRIDGE', 'DIVERTER']
  ...initial // Overwrite defaults with passed data
});

// Parts
export const createPart = (initial = {}) => ({
  id: crypto.randomUUID(), // Auto-generate ID like Firestore
  part: '', // String
  partNumber: '', // String
  description: '', // String
  location: '', // String (FK)
  asset: '', // String (FK)
  notes: '', // String
  ...initial // Overwrite defaults with passed data
});

// Projects
export const createProject = () => ({
  id: crypto.randomUUID(), // Auto-generate ID like Firestore
  project: '', // String
  projectDescription: '', // String
  woCreated: '',   // Boolean
  blockers: '', // String (Enum) [PARTS | MANPOWER | AVAILABILITY]?
  location: '', // String (FK)
  asset: '', // String (FK)
  notes: '' // String
});

// Skills Matrix
export const createSkills = () => ({
  id: crypto.randomUUID(), // Auto-generate ID like Firestore
  skill: '', // String (Enum) ['BHS', 'PBB', 'QC']
  skillLevel: '', // String (Enum) ['1', '2', '3', '4', '5'] or number?
  skillDescription: '' // String
});

// Documents
export const createDocument = (initial = {}) => ({
  id: crypto.randomUUID(), // Auto-generate ID like Firestore
  document: '', // String
  documentNumber: '', // String
  description: '', // String
  body: '', // String? 
  type: '', // [GUIDE | TRAINING | INFORMATION | WORK INSTRUCTION]
  asset: '', // String (FK)
  ...initial // Overwrite defaults with passed data
});

// Calendar
export const createCalendar = () => ({
  id: new Date().toISOString().split('T')[0], // "2026-02-17"
  date: new Date(),
  allDay: '', // Boolean
  end: '', // Time selector
  start: '', // Time selector
  woNumber: '', // String (FK)
  assignment: [], // Array of strings (initials) or IDs (techName)

});

// Technician
export const createTech = (initial = {}) => ({
  id: crypto.randomUUID(), // Auto-generate ID like Firestore
  techName: 'New Tech', // String
  initials: '', // String
  phoneNumber: '', // String
  email: '', // String
  shift: '', // String (FK)
  hoursAvailable: '', // String (FK)
  daysAvailable:'', // String (Enum) ['SUNDAY','MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
  timeRequired: '', // essentially needs to be default 7 hours (out of 8 hour shift, 0.25 hours increments)
  skill: [], // String (FK) skillsMatrix?
  role: '', // String (Enum) ['TECH', 'SUPERVISOR']
  status: 'active', // String (Enum) ['ACTIVE', 'INACTIVE']
  ...initial // Overwrite defaults with passed data
});

// Work Order (also stub for `Recurring Work Orders`)
export const createWorkOrder = (initial = {}) => ({
  id: crypto.randomUUID(),
  location: '', // String (FK)
  asset: '', // String (FK)
  woNumber: '', // not sure about this. Maintenance Connection uses their own work order number, so i don't wanna assign another one...
  reason: '', // String
  task: '', // String
  time: 0, // Number, not string!
  woFrequency: 'Daily', // String (Enum) [DAILY | ALTERNATING DAYS | WEEKLY | MONTHLY]
  woType: 'PM', // String (Enum) [PM, CM, QC] <-- need logic for "if this is a PM or QC, then it checks 'recurring' boolean, and opens options for 'frequency'
  targetDate: new Date(),
  targetHours: '', // Decimal
  laborReport: '', // String
  laborHours: '', // Decimal
  woDescription: '', // String
  notes: '', // String
  recurring: '', // Boolean
  timestamp: Date.now(), // Not sure this is needed? Not tracking the actual work order
  ...initial // Overwrite defaults with passed data
});

// Daily Planner <-- needs to be able to be printed/pdf
export const createDailyPlanner = () => ({
  id: new Date().toISOString().split('T')[0], // "2026-02-17"
  date: new Date(),
  supervisor: 'Your Name', // String (FK) Filter for 'role'
  shift: '3rd', // String (FK)
  woNumber: '', // String (FK)
  reason: '', // String (FK)
  time: 0, // Number, not string!
  assignment: [], // Array of Strings (FK) (initials) or IDs (techName)
  woFrequency: '', // String (FK)
  woDescription: '', // String
  notes: ''  // String
});

// Daily Shift Summary <-- needs to be able to be printed/pdf
// Essentially needs a summary of the following, in this order:
export const createShiftSummary = () => ({
// "WO's Completed Today" `logEntries: [], // Array of WorkOrders`
// "WO's Completed Today" woNumbers
// "Equipment OOS"
// "Do you need any parts ordered?" [Boolean]
// "If yes, provide additional details about parts or supplies" 
// "Parts Received Today"
// "Worked Passed to Next Shift"
});