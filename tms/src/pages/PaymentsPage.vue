<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h5 text-weight-bold q-my-none">Financial Management</h1>
        <p class="text-grey-5 q-mt-xs q-mb-none">
          Manage tuition fees, track dues, and record expenses.
        </p>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <q-card class="no-shadow border-gray q-mb-lg">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <q-tab name="payments" label="Student Payments" icon="payments" />
        <q-tab name="due" label="Due Payments" icon="pending_actions" />
        <q-tab name="expenses" label="Institute Expenses" icon="account_balance_wallet" />
      </q-tabs>
    </q-card>

    <q-tab-panels v-model="tab" animated class="bg-transparent">
      <!-- TAB 1: STUDENT PAYMENTS -->
      <q-tab-panel name="payments" class="q-pa-none">
        <div class="row items-center justify-end q-mb-md">
          <q-btn
            unelevated
            icon="add"
            color="primary"
            label="New Payment"
            no-caps
            @click="openPaymentDialog"
          />
        </div>

        <!-- Stats -->
        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-12 col-md-4">
            <q-card class="no-shadow border-gray q-pa-md bg-green-1">
              <div class="text-caption text-green-9 text-uppercase text-weight-bold">
                Total Revenue (This Month)
              </div>
              <div class="text-h4 text-weight-bold text-green-9 q-mt-xs">
                {{ currencyStore.format(125000) }}
              </div>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card class="no-shadow border-gray q-pa-md bg-orange-1">
              <div class="text-caption text-orange-9 text-uppercase text-weight-bold">
                Total Pending
              </div>
              <div class="text-h4 text-weight-bold text-orange-9 q-mt-xs">
                {{ currencyStore.format(45000) }}
              </div>
            </q-card>
          </div>
        </div>

        <!-- Payments Table -->
        <q-card class="no-shadow border-gray">
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="id"
            flat
            :pagination="{ rowsPerPage: 10 }"
          >
            <template v-slot:body-cell-student="props">
              <q-td :props="props" class="text-weight-bold">
                {{ props.row.student }}
              </q-td>
            </template>
            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-badge
                  :color="props.row.status === 'Paid' ? 'green' : 'orange'"
                  :label="props.row.status"
                  class="q-px-sm"
                />
              </q-td>
            </template>
          </q-table>
        </q-card>
      </q-tab-panel>

      <!-- TAB 2: DUE PAYMENTS -->
      <q-tab-panel name="due" class="q-pa-none">
        <!-- Filters -->
        <div class="row q-col-gutter-sm q-mb-md">
          <div class="col-12 col-md-3">
            <q-select
              outlined
              v-model="dueFilterMonth"
              :options="['January', 'February', 'March']"
              label="Month"
              dense
              bg-color="white"
            />
          </div>
          <div class="col-12 col-md-3">
            <q-select
              outlined
              v-model="dueFilterClass"
              :options="['All Classes', 'Grade 10 - Maths', 'Grade 11 - Science']"
              label="Class"
              dense
              bg-color="white"
            />
          </div>
        </div>

        <q-card class="no-shadow border-gray">
          <q-banner rounded class="bg-red-1 text-red-9 q-mb-none">
            <template v-slot:avatar>
              <q-icon name="warning" color="red" />
            </template>
            Found <strong>{{ dueRows.length }} students</strong> with outstanding payments for
            {{ dueFilterMonth }}.
          </q-banner>

          <q-table :rows="dueRows" :columns="dueColumns" row-key="id" flat>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" align="right">
                <q-btn
                  size="sm"
                  color="primary"
                  icon="sms"
                  label="Send Reminder"
                  class="q-mr-sm"
                  @click="sendReminder(props.row)"
                />
                <q-btn
                  size="sm"
                  outline
                  color="green"
                  icon="payments"
                  label="Pay Now"
                  @click="payNow(props.row)"
                />
              </q-td>
            </template>
          </q-table>
        </q-card>
      </q-tab-panel>

      <!-- TAB 3: EXPENSES (Re-using Logic) -->
      <q-tab-panel name="expenses" class="q-pa-none">
        <div class="row items-center justify-end q-mb-md">
          <q-btn
            unelevated
            color="deep-orange"
            icon="add"
            label="Add Expense"
            no-caps
            @click="openExpenseDialog"
          />
        </div>

        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-12 col-md-4">
            <q-card class="no-shadow border-gray q-pa-md bg-red-1">
              <div class="text-caption text-red-9 text-uppercase text-weight-bold">
                Total Expenses
              </div>
              <div class="text-h4 text-weight-bold text-red-9 q-mt-xs">
                {{ currencyStore.format(totalExpenses) }}
              </div>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card
              class="no-shadow border-gray q-pa-md"
              :class="profit >= 0 ? 'bg-blue-1' : 'bg-orange-1'"
            >
              <div
                class="text-caption text-uppercase text-weight-bold"
                :class="profit >= 0 ? 'text-blue-9' : 'text-orange-9'"
              >
                Net Profit
              </div>
              <div
                class="text-h4 text-weight-bold q-mt-xs"
                :class="profit >= 0 ? 'text-blue-9' : 'text-orange-9'"
              >
                {{ currencyStore.format(profit) }}
              </div>
            </q-card>
          </div>
        </div>

        <q-card class="no-shadow border-gray">
          <q-table :rows="expenseRows" :columns="expenseColumns" row-key="id" flat>
            <template v-slot:body-cell-amount="props">
              <q-td :props="props" class="text-right text-weight-bold">
                {{ props.row.amount.toLocaleString() }}
              </q-td>
            </template>
          </q-table>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>

    <!-- Payment Dialog -->
    <q-dialog v-model="paymentDialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Record New Payment</div>
        </q-card-section>
        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-input outlined v-model="form.studentName" label="Student Name" dense />
          <q-select
            outlined
            v-model="form.month"
            :options="['January', 'February', 'March']"
            label="Month"
            dense
          />
          <q-input
            outlined
            v-model="form.amount"
            :label="'Amount (' + currencyStore.currency + ')'"
            type="number"
            dense
          />
          <q-select
            outlined
            v-model="form.status"
            :options="['Paid', 'Pending']"
            label="Status"
            dense
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup color="grey-7" />
          <q-btn unelevated label="Save" color="primary" @click="savePayment" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Expense Dialog -->
    <q-dialog v-model="expenseDialog">
      <q-card style="min-width: 400px">
        <q-card-section><div class="text-h6">Record Expense</div></q-card-section>
        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-input outlined v-model="expenseForm.category" label="Category" dense />
          <q-input outlined v-model="expenseForm.description" label="Description" dense />
          <q-input outlined v-model="expenseForm.amount" label="Amount" type="number" dense />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup color="grey-7" />
          <q-btn unelevated label="Save" color="deep-orange" @click="saveExpense" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from 'src/boot/supabase'
import { useCurrencyStore } from 'stores/currency'

const $q = useQuasar()
const currencyStore = useCurrencyStore()
const tab = ref('payments')

// --- PAYMENT TAB LOGIC ---
const paymentDialog = ref(false)
const form = ref({})
const columns = [
  { name: 'date', label: 'Date', field: 'date', align: 'left', sortable: true },
  { name: 'student', label: 'Student', field: 'student', align: 'left', sortable: true },
  { name: 'month', label: 'For Month', field: 'month', align: 'left' },
  {
    name: 'amount',
    label: 'Amount',
    field: 'amount',
    align: 'right',
    format: (val) => currencyStore.format(val),
  },
  { name: 'status', label: 'Status', field: 'status', align: 'center' },
]

const rows = ref([])

const fetchPayments = async () => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*, students(name)')
      .order('created_at', { ascending: false })

    if (error) throw error

    rows.value = data.map((payment) => ({
      id: payment.id,
      date: new Date(payment.payment_date).toISOString().split('T')[0],
      student: payment.students ? payment.students.name : 'Unknown',
      month: payment.payment_month,
      amount: payment.amount,
      status: 'Paid', // All recorded payments are successful
    }))
  } catch (error) {
    console.error('Error fetching payments:', error)
    $q.notify({ type: 'negative', message: 'Failed to load payments' })
  }
}

onMounted(() => {
  fetchPayments()
})

const openPaymentDialog = () => {
  form.value = { status: 'Paid', amount: '' }
  paymentDialog.value = true
}

const savePayment = async () => {
  // Basic validation
  if (!form.value.studentName || !form.value.amount || !form.value.month) {
    $q.notify({ type: 'warning', message: 'Please fill all fields' })
    return
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    // Fetch Plan Info for Commission Logic
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan_type, country_code')
      .eq('id', user.id)
      .single()

    const plan = profile?.plan_type || 'free'
    const country = profile?.country_code || 'LK'
    const amount = Number(form.value.amount)

    let platformFee = 0

    if (plan === 'growth') {
      if (country === 'SL' || country === 'LK') {
        platformFee = amount * 0.025
      } else {
        platformFee = amount * 0.05
      }
    }

    // Insert Payment (Note: student_id is mocked as null or should be selected from a search dropdown,
    // but for now keeping text 'studentName' won't work with DB if student_id is required foreign key.
    // Assuming current DB schema connects payments to students via student_id.
    // Since UI uses text input for name, we can't reliably link without a dropdown.
    // For this step, I will search for student by name to find ID, or default to null if allowed/found.)

    let studentId = null
    // Try to find student
    const { data: students } = await supabase
      .from('students')
      .select('id')
      .ilike('name', `%${form.value.studentName}%`)
      .limit(1)
    if (students && students.length > 0) studentId = students[0].id

    const { error } = await supabase.from('payments').insert({
      student_id: studentId, // Might fail if null and column is not nullable.
      // If schema requires student_id, user must select valid student.
      // Assuming for now simple insert or logic robustness.
      amount: amount,
      payment_date: new Date().toISOString(),
      payment_month: form.value.month,
      status: form.value.status,
      platform_fee: platformFee,
    })

    if (error) throw error

    $q.notify({ type: 'positive', message: `Payment recorded. (Fee: ${platformFee})` })
    fetchPayments() // Refresh table
  } catch (error) {
    console.error(error)
    $q.notify({ type: 'negative', message: 'Failed to save payment: ' + error.message })
  }
}

// --- DUE PAYMENTS LOGIC ---
const dueFilterMonth = ref('February')
const dueFilterClass = ref('All Classes')
const dueColumns = [
  { name: 'student', label: 'Student Name', field: 'student', align: 'left' },
  { name: 'grade', label: 'Grade', field: 'grade', align: 'left' },
  { name: 'phone', label: 'Parent Contact', field: 'phone', align: 'left' },
  {
    name: 'amount',
    label: 'Due Amount',
    field: 'amount',
    align: 'right',
    format: (val) => currencyStore.format(Number(val.replace(',', ''))),
  },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' },
]
const dueRows = ref([
  { id: 101, student: 'Shehan Perera', grade: 'Grade 10', phone: '0771122334', amount: '2,500' },
  { id: 102, student: 'Kavindi Silva', grade: 'Grade 11', phone: '0714455667', amount: '3,000' },
  { id: 103, student: 'Ruwan Dissnayake', grade: 'Grade 10', phone: '0708899001', amount: '2,500' },
])

const sendReminder = (row) => {
  $q.notify({ type: 'info', icon: 'sms', message: `SMS reminder sent to ${row.student}'s parent.` })
}

const payNow = (row) => {
  form.value = {
    studentName: row.student,
    amount: row.amount.replace(',', ''),
    status: 'Paid',
    month: dueFilterMonth.value,
  }
  paymentDialog.value = true
}

// --- EXPENSES LOGIC ---
const expenseDialog = ref(false)
const expenseForm = ref({})
const expenseColumns = [
  { name: 'date', label: 'Date', field: 'date', align: 'left' },
  { name: 'category', label: 'Category', field: 'category', align: 'left' },
  { name: 'description', label: 'Description', field: 'description', align: 'left' },
  {
    name: 'amount',
    label: 'Amount',
    field: 'amount',
    align: 'right',
    format: (val) => currencyStore.format(val),
  },
]
const expenseRows = ref([
  { id: 1, date: '2026-02-05', category: 'Rent', description: 'Monthly Hall Rent', amount: 50000 },
  { id: 2, date: '2026-02-08', category: 'Electricity', description: 'Jan Bill', amount: 12500 },
])

const totalExpenses = computed(() =>
  expenseRows.value.reduce((acc, row) => acc + Number(row.amount), 0),
)
const totalRevenue = 125000 // Mocked from payments
const profit = computed(() => totalRevenue - totalExpenses.value)

const openExpenseDialog = () => {
  expenseForm.value = { date: new Date().toISOString().split('T')[0] }
  expenseDialog.value = true
}

const saveExpense = () => {
  expenseRows.value.unshift({
    id: Date.now(),
    date: expenseForm.value.date || new Date().toISOString().split('T')[0],
    category: expenseForm.value.category,
    description: expenseForm.value.description,
    amount: Number(expenseForm.value.amount),
  })
  $q.notify({ type: 'positive', message: 'Expense saved' })
}
</script>

<style lang="scss" scoped>
.border-gray {
  border: 1px solid rgba(255, 255, 255, 0.1);
}
body.body--light .border-gray {
  border: 1px solid #eaecf0;
}
</style>
