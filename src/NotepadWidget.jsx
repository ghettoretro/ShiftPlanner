/**
 * @PATH [src/NotepadWidget.jsx]
 * @REV [20260226-0914]
 * @MODULE [ShiftPlanner]
 * @STATUS [DEV]
 * @FILETYPE [WDG]
 * @DESC [Handles local storage persistence only.]
 * @COMPLIANCE [None]
 * -------------------------------------
 * @TODO_START
 * [?] Pulled in from AdaptiveEngine to stub for ShiftPlanner build. Use whatever can be used.
 * @TODO_END
 * =====================================*/

import { useState, useEffect } from 'react'

const LOCAL_STORAGE_KEY = 'planner-notepad-content';

export const NotepadWidget = () => {
    const [content, setContent] = useState('');

    // Load content from localStorage on initial render
    useEffect(() => {
        const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedContent) {
            setContent(savedContent);
        }
    }, []);

    // Save content to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, content);
    }, [content]);

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-border-primary">
                <h3 className="text-lg font-semibold text-text-primary">Notepad</h3>
            </div>
            <div className="p-4 flex-1">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Your notes are saved automatically..."
                    className="w-full h-full bg-surface-tertiary text-text-secondary border-none rounded-md resize-none p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>
        </div>
    );
};