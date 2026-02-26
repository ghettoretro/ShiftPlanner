/**
 * @PATH [src/components/MasterDetailLayout.jsx]
 * @REV [20260226-0910]
 * @MODULE [ShiftPlanner]
 * @STATUS [DEV
 * @FILETYPE [LYT]
 * @DESC [A reusable layout component for two-panel master-detail views.]
 * @COMPLIANCE [None]
 * -------------------------------------
 * @TODO_START
 * [?] Pulled in from AdaptiveEngine to stub for ShiftPlanner build. Use whatever can be used.
 * [INFO] MasterDetailLayout.jsx: Header (64px) + Footer (~36px) = 100px, switch to Flexbox (h-full) to let the browser calculate the remaining space automatically.
 * [!|?|*|+|-|&|$|:]
 * @TODO_END
 * =====================================*/

export const MasterDetailLayout = ({ listPanel, detailPanel }) => {
  return (
    <div className="flex" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Left Panel */}
      <div className="w-1/3 bg-surface-primary border-r border-border-primary overflow-y-auto">
        <div className="p-4">
          {listPanel}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-2/3 bg-surface-primary overflow-y-auto p-6">
        {detailPanel}
      </div>
    </div>
  );
};