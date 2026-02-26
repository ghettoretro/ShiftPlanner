/**
 * @PATH [src/models.js]
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