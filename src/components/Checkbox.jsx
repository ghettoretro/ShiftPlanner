/**
 * @PATH [src/components/Checkbox.jsx]
 * @REV [20260226-0901]
 * @MODULE [ShiftPlanner]
 * @STATUS [DEV]
 * @FILETYPE [CMP]
 * @DESC [Styled binary input for lists and forms. Enforces AE visual tokens.]
 * @COMPLIANCE [None]
 * -------------------------------------
 * @TODO_START
 * [?] New component built for AdaptiveEngine, but can use to stub for ShiftPlanner build.
 * @TODO_END
 * =====================================*/

import { Icon } from './icons'

export const Checkbox = ({ id, checked, onChange, label, isDisabled = false }) => {
  return (
    <label 
      htmlFor={id} 
      className={`flex items-center gap-3 cursor-pointer select-none ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={isDisabled}
          className="peer sr-only"
        />
        <div className={`
          w-5 h-5 border-2 rounded transition-all flex items-center justify-center
          ${checked 
            ? 'bg-indigo-600 border-indigo-600' 
            : 'bg-white border-slate-300 dark:bg-slate-900 dark:border-slate-700 group-hover:border-indigo-400'}
        `}>
          {checked && <Icon name="check" size={14} color="white" />}
        </div>
      </div>
      {label && <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
    </label>
  );
};

export default Checkbox;