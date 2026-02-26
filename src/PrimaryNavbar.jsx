/**
 * @PATH [src/PrimaryNavbar.jsx]
 * @REV [20260225-0916]
 * @MODULE [ShiftPlanner]
 * @STATUS [DEV]
 * @FILETYPE [CMP]
 * @DESC [A high-fidelity top navigation bar with active state tracking and global action button.]
 * @COMPLIANCE [Functional React; Custom Icon Library (No Heroicons)]
 * -------------------------------------
 * @TODO_START
 * [?] Inject NotepadWidget.jsx as a persistent fixture, swap out notification bell. Use local state to save notes.
 * @TODO_END
 * =====================================*/

import { Icon } from './icons'
import { Button } from './Button'

// @COMPONENT
const PrimaryNavbar = ({ 
  activeTab = 'Planner', 
  navItems = ['Planner', 'Locations', 'Assets', 'Team', 'Projects', 'Parts', 'Skills'],
  onActionClick 
}) => {
  return (
    <nav className="w-full bg-surface-secondary border-b border-border-primary px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-10">
        
        {/* Logo Placeholder */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-black text-xs">ShiftPlanner</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <Button
                key={item}
                className={`relative text-sm font-bold transition-colors py-2 ${
                  isActive ? 'text-text-primary' : 'text-text-tertiary hover:text-text-primary'
                }`}
              >
                {item}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary rounded-full" />
                )}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-5">
        
        {/* Download/Export */}
        <Button
          onClick={onActionClick}
          className="flex items-center gap-2 bg-accent-primary text-text-primary hover:brightness-125 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md"
        >
          <Icon name="download" size={20} />
        </Button>

        {/* NotepadWidget replaces Notification Bell */}
        <Button className="text-text-secondary hover:text-text-primary transition-colors relative">
          <Icon name="reader" size={24} />
        </Button>
        
        {/* Print */}
        <Button className="text-text-secondary hover:text-text-primary transition-colors relative">
          <Icon name="externalLink" size={24} />
        </Button>
      </div>
    </nav>
  );
};

export default PrimaryNavbar;