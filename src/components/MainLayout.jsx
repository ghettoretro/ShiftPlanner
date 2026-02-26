/**
 * @PATH [src/components/MainLayout.jsx]
 * @REV [20260226-0908]
 * @MODULE [ShiftPlanner]
 * @STATUS [DEV]
 * @FILETYPE [LYT]
 * @DESC [Main Layout Component]
 * @COMPLIANCE [None]
 * -------------------------------------
 * @TODO_START
 * [?] Pulled in from AdaptiveEngine to stub for ShiftPlanner build. Use whatever can be used.
 * [?] Remove Sidebar
 * [?] Determine if useApp is necessary?
 * [?] Determine if PrintHeader is necessary?
 * [?] Stub to absorb "MasterDetailLayout.jsx" as the base model page type?
 * @TODO_END
 * =====================================*/

import { useEffect } from 'react'

import { useApp } from '../../stores/AppProvider' // Not sure if this works with how we are planning?
import { PrimaryNavbar } from './PrimaryNavbar'
import { Sidebar } from '../layouts/Sidebar' // Remove

export const MainLayout = ({ headerConfig, headerActions }) => { 
    const { isSidebarPinned } = useApp(); // Remove

    // Change to Reflect Date only
    useEffect(() => {
        const baseTitle = 'ShiftPlanner';
        if (headerConfig?.title) {
            document.title = `${baseTitle} | ${headerConfig.title}`;
        } else {
            document.title = baseTitle;
        }

        return () => {
            document.title = baseTitle;
        };
    }, [headerConfig?.title]); 

    return (
        <>          
            <div className="flex flex-col h-screen bg-surface-primary text-text-primary">
                <PrimaryNavbar {...headerConfig} actions={headerActions} />
                
                <div className="flex flex-1 overflow-hidden"> 
                    <main 
                        className="flex-1 overflow-y-auto main-content-scrollable p-0 transition-all duration-300"
                        style={{ marginLeft: isSidebarPinned ? '64px' : '20px' }}
                    >
                    </main>

                </div>
            </div>
        </>
    );
};