/**
 * @PATH [src/App.jsx]
 * @REV [20260226-0856]
 * @MODULE [ShiftPlanner]
 * @STATUS [DEV]
 * @FILETYPE [NCA]
 * @DESC [Description (max 80 chars)]
 * @COMPLIANCE [None]
 * -------------------------------------
 * @TODO_START
 * [?] 'setTechs' is declared but its value is never read.
 * [?] will need to check legitimacy of this file...
 * @TODO_END
 * =====================================*/

import { useState, useEffect } from 'react'
import { createWorkOrder, createTech } from './models'
import './App.css'

// Simple storage key
const STORAGE_KEY = 'shift_runner_v1'

function App() {
  // 1. Initialize State with your Models
  const [techs, setTechs] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_techs')
    if (saved) return JSON.parse(saved)
    
    // Default Techs based on your screenshot
    return [
      createTech({ initials: 'JC', hoursAvailable: 7.0 }),
      createTech({ initials: 'TG', hoursAvailable: 7.0 }),
      createTech({ initials: 'RM', hoursAvailable: 7.0 }),
      createTech({ initials: 'JS', hoursAvailable: 7.0 }),
      createTech({ initials: 'LW', hoursAvailable: 7.0 })

    ]
  })

  const [workOrders, setWorkOrders] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_wos')
    return saved ? JSON.parse(saved) : []
  })

  // 2. Persist to LocalStorage automatically
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_techs', JSON.stringify(techs))
    localStorage.setItem(STORAGE_KEY + '_wos', JSON.stringify(workOrders))
  }, [techs, workOrders])

  // 3. Actions
  const addRow = () => {
    // Uses YOUR schema factory
    const newRow = createWorkOrder({ 
      woFrequency: 'Daily', 
      woType: 'PM',
      time: 1.0 
    })
    setWorkOrders([...workOrders, newRow])
  }

  const updateRow = (id, field, value) => {
    setWorkOrders(workOrders.map(wo => 
      wo.id === id ? { ...wo, [field]: value } : wo
    ))
  }

  // 4. Calculations (The "Remain" logic)
  const totalAssignedHours = workOrders.reduce((sum, wo) => sum + (Number(wo.time) || 0), 0)
  // Simplified logic: Assuming 'RM' and 'JC' are on shift. 
  // In a real version, you'd filter by active techs.
  const totalCapacity = techs.reduce((sum, t) => sum + (Number(t.hoursAvailable) || 0), 0)
  const remainingHours = totalCapacity - totalAssignedHours

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Shift Turnover - {new Date().toLocaleDateString()}</h2>
      
      {/* THE GRID */}
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th>WO #</th>
            <th>Item / Asset</th>
            <th>Time</th>
            <th>Tech(s)</th>
            <th>Freq</th>
            <th>Type</th>
            <th>Task Description</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {workOrders.map(wo => (
            <tr key={wo.id}>
              <td>
                <input 
                  value={wo.woNumber} 
                  onChange={(e) => updateRow(wo.id, 'woNumber', e.target.value)}
                  style={{ width: '80px' }}
                />
              </td>
              <td>
                <input 
                  value={wo.asset} 
                  onChange={(e) => updateRow(wo.id, 'asset', e.target.value)}
                />
              </td>
              <td>
                <input 
                  type="number" 
                  step="0.25"
                  value={wo.time} 
                  onChange={(e) => updateRow(wo.id, 'time', parseFloat(e.target.value))}
                  style={{ width: '50px' }}
                />
              </td>
              <td>
                <input 
                  value={wo.assignment ? wo.assignment.join(', ') : ''} 
                  onChange={(e) => updateRow(wo.id, 'assignment', e.target.value.split(','))}
                  placeholder="JC, RM"
                />
              </td>
              <td>
                <select 
                  value={wo.woFrequency}
                  onChange={(e) => updateRow(wo.id, 'woFrequency', e.target.value)}
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </td>
              <td>
                <select 
                  value={wo.woType}
                  onChange={(e) => updateRow(wo.id, 'woType', e.target.value)}
                >
                  <option>PM</option>
                  <option>QC</option>
                  <option>WO</option>
                </select>
              </td>
              <td>
                <textarea 
                  value={wo.task} 
                  onChange={(e) => updateRow(wo.id, 'task', e.target.value)}
                  style={{ width: '100%', minHeight: '40px' }}
                />
              </td>
              <td>
                <input 
                  value={wo.notes} 
                  onChange={(e) => updateRow(wo.id, 'notes', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addRow} style={{ marginTop: '10px', padding: '8px' }}>+ Add Row</button>

      {/* FOOTER SUMMARY */}
      <div style={{ marginTop: '20px', borderTop: '2px solid #ccc', paddingTop: '10px' }}>
        <strong>Recurring Total:</strong> {totalAssignedHours.toFixed(1)} hrs | 
        <strong> Shift Capacity:</strong> {totalCapacity.toFixed(1)} hrs | 
        <strong style={{ color: remainingHours < 0 ? 'red' : 'green' }}>
           {' '}Remain: {remainingHours.toFixed(1)}
        </strong>
      </div>
    </div>
  )
}

export default App