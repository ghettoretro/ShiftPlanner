/**
 * @PATH [src/components/Button.jsx]
 * @REV [20260226-0857]
 * @MODULE [ShiftPlanner]
 * @STATUS [DEV]
 * @FILETYPE [CMP]
 * @DESC [Creates stylized button with icon and text, colors and styles based on a specified action (e.g., 'save', 'delete', 'edit').]
 * @COMPLIANCE [None]
 * -------------------------------------
 * @TODO_START
 * [?] Pulled in from AdaptiveEngine to stub for ShiftPlanner build. Use whatever can be used.
 * @TODO_END
 * =====================================*/

import { Icon } from './icons'

/**
 * How to use
 * import { Button } from './Button'
 * 
*<Button
*    action="action" 
*    text="text" (Leave blank if only icon is desired)
*    onClick={handleSomething} 
*    title="title" 
* />
*/

// Map of action names to icon names
const ACTION_ICON_MAP = {
    addLine: 'addLine',
    approval: 'approval',
    archive: 'archive',
    cancel: 'cancel',
    close: 'close',
    confirm: 'confirm',
    copy: 'link',
    default: 'undefined',
    delete: 'delete',
    edit: 'edit',
    export: 'export',
    filter: 'filter',
    feedback: 'feedback',
    generate: 'generate',
    help: 'aboutHelp',
    import: 'import',
    insert: 'insert',
    new: 'new',
    print: 'print',
    reject: 'close',
    restore: 'restore',
    refresh: 'refresh',
    save: 'save',
    submit: 'submit',
    sort: 'sort',
    share: 'share',
};

// Returns the appropriate styles based on the action type
const getButtonStyles = (action) => {
    switch (action) {
        // Positive (additive)
        case 'addLine': return 'bg-surface-positive hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'approval': return 'bg-surface-positive hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'save': return 'bg-surface-positive hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'submit': return 'bg-surface-positive hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'share': return 'bg-surface-positive hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'help': return 'bg-surface-positive hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'feedback': return 'bg-surface-positive hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'new': return 'bg-surface-positive hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';

        // Informational
        case 'archive': return 'bg-surface-informational hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'confirm': return 'bg-surface-informational hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'print': return 'bg-surface-informational hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'cancel': return 'bg-surface-informational hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'export': return 'bg-surface-informational hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'import': return 'bg-surface-informational hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
                case 'insert': return 'bg-surface-informational hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'copy': return 'bg-surface-informational hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'filter': return 'bg-surface-informational hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'sort': return 'bg-surface-informational hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';

        // Destructive (subtractive)
        case 'delete': return 'bg-surface-destructive hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'reject': return 'bg-surface-destructive hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';

        // Warning
        case 'edit': return 'bg-surface-warning hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'generate': return 'bg-surface-warning hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';

        // Navigational
        case 'close': return 'bg-surface-navigational hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-primary';
        case 'restore': return 'bg-surface-navigational hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
        case 'refresh': return 'bg-surface-navigational hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm'        
        default: return 'bg-surface-neutral hover:brightness-125 text-text-primary active:scale-95 transition-{brightness} duration-300 border-color:border-secondary box-shadow:shadow-sm';
    }
};

// special syntax takes the prop named "Icon" and renames it to "IconProp"
export const Button = ({ text, action, onClick, Icon: IconProp, id, title, ...props }) => {
    const iconName = IconProp || ACTION_ICON_MAP[action];
        return (
        <button
            id={id}
            onClick={onClick}
            className={`inline-flex items-center justify-center w-auto h-9 px-2 border border-transparent text-xs font-medium rounded-md shadow-lg text-text-primary ${getButtonStyles(action)}`}
            title={title || text || action}
            {...props}
            >
                {/* ">" is delimiter between opening tag, and what actually goes in the button design */}
                {iconName && <Icon name={iconName} className={text ? 'mr-2' : ''} />}
                {text}
        </button>
    );
};
