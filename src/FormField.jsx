/**
 * @PATH [src/FormField.jsx]
 * @REV [20260226-0902]
 * @MODULE [ShiftPlanner]
 * @STATUS [DEV]
 * @FILETYPE [CMP]
 * @DESC [Standardized wrapper for form inputs. Includes automated handling for currency, percentages, and numeric alignment.]
 * @COMPLIANCE [None]
 * -------------------------------------
 * @TODO_START
 * [?] Pulled in from AdaptiveEngine to stub for ShiftPlanner build. Use whatever can be used.
 * [?] "`Math.random` is an impure function." ???
 * [?] 'noSpinnerStyles' is declared but its value is never read.
 * @TODO_END
 * =====================================*/

import { Icon } from './icons'

// @COMPONENT
export const FormField = ({
  label,
  error,
  type = 'text',
  className = '',
  options = [],
  prefix = null,
  suffix = null,
  ...props
}) => {
  const generatedId = 'field-' + Math.random().toString(36).substr(2, 9); // "`Math.random` is an impure function." ???
  const inputId = props.id || props.name || generatedId;

  let config = {
    inputType: type,
    inputPrefix: prefix,
    inputSuffix: suffix,
    alignment: 'text-left',
    step: props.step || 'any',
    hideSpinners: false,
  };

  switch (type) { // Not needed
    case 'currency':
      config = {
        ...config,
        inputType: 'number',
        inputPrefix: prefix || '$',
        alignment: 'text-right',
        step: props.step || '0.01',
        hideSpinners: true, 
      };
      break;
    case 'percent':
      config = {
        ...config,
        inputType: 'number',
        inputSuffix: suffix || '%',
        alignment: 'text-right',
        step: props.step || '0.1',
        hideSpinners: true, // Percent cleaner without arrows
      };
      break;
    case 'number':
      config = {
        ...config,
        inputType: 'number',
        alignment: 'text-right',
        hideSpinners: false, // Keep arrows for raw numbers (Counters, Qty)
      };
      break;
    default:
      break;
  }

  // Dynamic Padding Logic
  // Adjust padding if there is a trailing error icon OR a suffix
  const getPaddingClass = () => {
    if (config.inputPrefix && (config.inputSuffix || error)) return 'pl-7 pr-10';
    if (config.inputPrefix) return 'pl-7 pr-3';
    if (config.inputSuffix || error) return 'pl-3 pr-10';
    return 'px-3';
  };

// CSS to hide spinners (Chrome/Safari/Edge/Firefox)
  const noSpinnerStyles = `
    [&::-webkit-outer-spin-button]:appearance-none 
    [&::-webkit-inner-spin-button]:appearance-none 
    [appearance:textfield]
  `;

  const baseInputStyles = `
    w-full bg-surface-secondary border rounded-md py-2
    ${getPaddingClass()} ${config.alignment}
    text-text-primary placeholder-text-tertiary
    focus:outline-none focus:ring-1
    transition-colors duration-100
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error 
      ? 'border-surface-alert focus:border-surface-alert focus:ring-surface-alert text-text-alert' 
      : 'border-border-primary focus:border-accent-primary focus:ring-accent-primary'}
  `;

  const renderInput = () => {
    // A. Text Area
    if (type === 'textarea') {
      return (
        <div className="relative w-full">
           <textarea id={inputId} className={`${baseInputStyles} min-h-[100px] resize-y px-3 text-left`} {...props} />
           {error && (
             <div className="pointer-events-none absolute top-3 right-3 text-surface-alert">
               <Icon name="warningTriangle" size={20} />
             </div>
           )}
        </div>
      );
    }

    // B. Select Dropdown
    if (type === 'select') {
      return (
        <div className="relative">
          <select id={inputId} className={`${baseInputStyles} appearance-none px-3 pr-10 text-left cursor-pointer`} {...props}>
            <option value="" disabled>Select an option...</option>
            {options.map((opt, i) => {
               const val = typeof opt === 'object' ? (opt.id || opt.value) : opt;
               const lbl = typeof opt === 'object' ? (opt.name || opt.label) : opt;
               return <option key={val || i} value={val}>{lbl}</option>;
            })}
          </select>
          <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 ${error ? 'text-surface-alert' : 'text-text-secondary'}`}>
            {error ? <Icon name="warningTriangle" size={20} /> : <Icon name="chevronDown" size={20} />}
          </div>
        </div>
      );
    }



    // C. Standard Input (Text, Number, Currency, Percent)
    return (
      <div className="relative w-full">
        {config.inputPrefix && (
          <span className="absolute left-2.5 top-2.5 text-xs text-text-secondary z-10 select-none font-medium">{config.inputPrefix}</span>
        )}
        
        <input id={inputId} type={config.inputType} step={config.step} className={baseInputStyles} aria-invalid={!!error} aria-describedby={error ? `${inputId}-error` : undefined} {...props} />
        
        {/* Render Suffix OR Error Icon */}
        {error ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-surface-alert">
            <Icon name="warningTriangle" size={20} />
          </div>
        ) : config.inputSuffix ? (
          <span className="absolute right-3 top-2.5 text-xs text-text-secondary z-10 select-none font-medium">{config.inputSuffix}</span>
        ) : null}
      </div>
    );
  };

return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className={`text-xs font-bold uppercase tracking-wider ${error ? 'text-text-alert' : 'text-text-secondary'}`}>
          {label} {props.required && <span className="text-surface-alert ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {/* High contrast error message below input */}
      {error && (
        <span id={`${inputId}-error`} className="text-xs text-text-alert font-bold tracking-wide mt-0.5 animate-pulse">
          {error}
        </span>
      )}
    </div>
  );
};