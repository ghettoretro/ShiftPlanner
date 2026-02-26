/**
 * @PATH [src/RadioCardGroup.jsx]
 * @REV [20260219-2320]
 * @MODULE [ShiftPlanner]
 * @STATUS [DEV]
 * @FILETYPE [CMP]
 * @DESC [A grid-based radio group using small cards for technical spec selection. A modern selection grid for technical parameters (e.g., RAM, Storage).]
 * @COMPLIANCE [None]
 * -------------------------------------
 * @TODO_START
 * [?] New component built for AdaptiveEngine, but can use to stub for ShiftPlanner build.
 * @TODO_END
 * =====================================*/

import { useState } from 'react'

// @COMPONENT
const RadioCardGroup = ({ 
  label = 'Shift', 
  options = ['1st', '2nd', '3rd'],
  disabledOptions = ['1st', '2nd',],
  initialSelected = '3rd',
  onChange
}) => {
  // @STATE
  const [selected, setSelected] = useState(initialSelected);

  // @HANDLERS
  const handleSelect = (option) => {
    setSelected(option);
    if (onChange) onChange(option);
  };

  return (
    <div className="w-full">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-4">
        <label className="text-xs font-bold tracking-wider text-text-secondary uppercase">
          {label}
        </label>
      </div>

      {/* Grid Area */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {options.map((option) => {
          const isSelected = selected === option;
          const isDisabled = disabledOptions.includes(option);

          return (
            <button
              key={option}
              disabled={isDisabled}
              onClick={() => handleSelect(option)}
              className={`
                flex items-center justify-center rounded-lg border px-3 py-4 text-sm font-bold transition-all
                ${isSelected 
                  ? 'bg-accent-primary border-accent-primary text-text-primary shadow-md' 
                  : 'bg-surface-secondary border-border-primary text-text-primary hover:border-accent-primary'
                }
                ${isDisabled ? 'opacity-30 cursor-not-allowed border-dashed hover:border-border-primary' : 'cursor-pointer'}
              `}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RadioCardGroup;