import axios from 'axios'

const N8N_STRATEGIC_WEBHOOK = 'https://n8n.digynex.se/webhook/strategic-sync'
const N8N_WHATSAPP_WEBHOOK = 'https://n8n.digynex.se/webhook/whats-app-dispatch'

/**
 * Trigger external n8n automation for strategic events.
 */
export const triggerStrategicAutomation = async (event, data) => {
    try {
        await axios.post(N8N_STRATEGIC_WEBHOOK, {
            event,
            timestamp: new Date().toISOString(),
            ...data
        })
        return true
    } catch (error) {
        console.error('Strategic Automation Failure:', error)
        return false
    }
}

/**
 * Dispatch WhatsApp notification to Subcontractors via n8n.
 */
export const dispatchSubcontractorAlert = async (workOrder) => {
    try {
        await axios.post(N8N_WHATSAPP_WEBHOOK, {
            type: 'WO_ASSIGNED',
            wo_id: workOrder.id,
            wo_name: workOrder.name,
            subcontractor: workOrder.assigned_subcontractor,
            phone: workOrder.subcontractor_phone || 'N/A', // Assuming phone exists in WO data
            budget: workOrder.budget_allocation,
            deadline: workOrder.deadline
        })
        return true
    } catch (error) {
        console.error('WhatsApp Dispatch Failure:', error)
        return false
    }
}
