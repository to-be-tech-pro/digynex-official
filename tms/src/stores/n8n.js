import { defineStore } from 'pinia'
import axios from 'axios'

export const useN8nStore = defineStore('n8n', {
  state: () => ({
    webhookUrl: 'https://n8n.digynex.se/webhook/tms-automation', // Base UI Webhook
    attendanceWebhook: 'https://n8n.digynex.se/webhook/attendance-alert',
    feeActionWebhook: 'https://n8n.digynex.se/webhook/fee-action', // Fee Reminders & Receipts
    payoutInvoiceWebhook: 'https://n8n.digynex.se/webhook/payout-invoice',
    expenseScannerWebhook: 'https://n8n.digynex.se/webhook/scan-expense',
    posterWebhook: 'https://n8n.digynex.se/webhook/generate-poster',
    parentFeedbackWebhook: 'https://n8n.digynex.se/webhook/parent-feedback',
  }),

  actions: {
    async triggerAttendanceAlert(student, session) {
      if (!student.phone && !student.parent_phone) return

      try {
        await axios.post(this.attendanceWebhook, {
          student_id: student.id,
          student_name: student.name,
          phone: student.parent_phone || student.phone,
          status: student.attendance,
          class_name: session.class_name,
          date: session.date,
          time: new Date().toLocaleTimeString(),
          org_id: session.org_id
        })
        return true
      } catch (error) {
        console.error('n8n Attendance Alert Failed:', error)
        return false
      }
    },

    async triggerFeeAction(student, data) {
      if (!student.phone && !student.parent_phone) return

      try {
        await axios.post(this.feeActionWebhook, {
          type: data.type, // 'receipt' or 'reminder'
          student_name: student.name,
          phone: student.parent_phone || student.phone,
          amount: data.amount || student.balance || 0,
          month: data.month,
          date: new Date().toISOString().split('T')[0],
          org_id: student.org_id
        })
        return true
      } catch (error) {
        console.error('n8n Fee Action Failed:', error)
        return false
      }
    },

    async triggerPayoutInvoice(payout) {
      try {
        await axios.post(this.payoutInvoiceWebhook, {
          type: 'PAYOUT_INVOICE',
          tutor_name: payout.tutor_name,
          tutor_email: payout.tutor_email,
          amount: payout.amount,
          period: payout.period_month,
          org_id: payout.org_id
        })
        return true
      } catch (error) {
        console.error('n8n Payout Invoice Failed:', error)
        return false
      }
    },

    async scanExpenseReceipt(imageFile) {
      try {
        const formData = new FormData()
        formData.append('file', imageFile)
        
        const response = await axios.post(this.expenseScannerWebhook, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data // Should return { date, category, amount, description }
      } catch (error) {
        console.error('n8n Expense Scanner Failed:', error)
        return null
      }
    },

    async generateStarPoster(posterData) {
      try {
        await axios.post(this.posterWebhook, {
          student_name: posterData.student_name,
          class_name: posterData.class_name,
          photo_url: posterData.photo_url || 'DEFAULT_URL',
          achievement: posterData.achievement
        })
        return true
      } catch (error) {
        console.error('n8n Generate Poster Failed:', error)
        return false
      }
    },

    async sendParentFeedback(feedbackData) {
      try {
        await axios.post(this.parentFeedbackWebhook, {
          student_id: feedbackData.student_id,
          message: feedbackData.message,
          timestamp: new Date().toISOString()
        })
        return true
      } catch (error) {
        console.error('n8n Parent Feedback Failed:', error)
        return false
      }
    }
  }
})
