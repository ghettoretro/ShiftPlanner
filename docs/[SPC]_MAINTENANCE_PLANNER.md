# AdaptiveEngine: [SPC]_MAINTENANCE_PLANNER
/**
 * @PATH [docs/00_dev/[SPC]_MAINTENANCE_PLANNER.md]
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
