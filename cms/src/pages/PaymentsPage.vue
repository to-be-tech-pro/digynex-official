<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-xl fade-in-up">
      <div>
        <h1 class="text-h4 text-weight-bolder text-emerald-gradient q-my-none">
          Financial Hub <span class="text-h4">🏦</span>
        </h1>
        <p class="text-grey-5 text-subtitle1 q-mt-sm q-mb-none font-medium text-emerald-light">
          Capital management, revenue tracking, and operational expense auditing.
        </p>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <q-card
      class="bg-dark-card border-glass border-radius-lg q-mb-lg overflow-hidden fade-in-up"
      style="animation-delay: 0.1s"
    >
      <q-tabs
        v-model="tab"
        dense
        class="text-grey-5"
        active-color="emerald"
        indicator-color="emerald"
        align="left"
        narrow-indicator
      >
        <q-tab
          name="payments"
          label="Income Ledger"
          icon="payments"
          no-caps
          class="q-px-lg q-py-md font-bold"
        />
        <q-tab
          name="due"
          label="Outstanding Capital"
          icon="pending_actions"
          no-caps
          class="q-px-lg q-py-md font-bold"
        />
        <q-tab
          name="expenses"
          label="Burn / Expenses"
          icon="account_balance_wallet"
          no-caps
          class="q-px-lg q-py-md font-bold"
        />
      </q-tabs>
    </q-card>

    <q-tab-panels v-model="tab" animated class="bg-transparent">
      <!-- TAB 1: INCOME LEDGER -->
      <q-tab-panel name="payments" class="q-pa-none">
        <div class="row items-center justify-end q-mb-md fade-in-up" style="animation-delay: 0.2s">
          <q-btn
            unelevated
            rounded
            icon="add"
            class="bg-emerald-gradient text-white q-px-lg shadow-2 hover-scale"
            label="Record Revenue"
            no-caps
            @click="openPaymentDialog"
          />
        </div>

        <!-- Stats Grid -->
        <div class="row q-col-gutter-lg q-mb-lg fade-in-up" style="animation-delay: 0.3s">
          <div class="col-12 col-md-6">
            <q-card class="bg-dark-card border-glass border-radius-lg q-pa-lg hover-scale">
              <div
                class="text-caption text-grey-5 text-uppercase tracking-widest font-bold q-mb-sm"
              >
                Total Revenue (Verified)
              </div>
              <div class="text-h3 text-weight-bolder text-emerald">
                {{ currencyStore.format(verifiedRevenue) }}
              </div>
            </q-card>
          </div>
          <div class="col-12 col-md-6">
            <q-card class="bg-dark-card border-glass border-radius-lg q-pa-lg hover-scale">
              <div
                class="text-caption text-grey-5 text-uppercase tracking-widest font-bold q-mb-sm"
              >
                Volume Projected
              </div>
              <div class="text-h3 text-weight-bolder text-white">
                {{ currencyStore.format(verifiedRevenue * 1.2) }}
              </div>
            </q-card>
          </div>
        </div>

        <!-- Payments Table -->
        <q-card
          class="bg-dark-card border-glass border-radius-lg overflow-hidden fade-in-up"
          style="animation-delay: 0.4s"
        >
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="id"
            flat
            dark
            class="bg-transparent"
            :loading="loading"
            :pagination="{ rowsPerPage: 10 }"
          >
            <template v-slot:body-cell-student="props">
              <q-td :props="props">
                <div class="text-weight-bold text-white">{{ props.row.student }}</div>
                <div class="text-caption text-grey-6">{{ props.row.date }}</div>
              </q-td>
            </template>
            <template v-slot:body-cell-status="props">
              <q-td :props="props" align="center">
                <q-badge
                  rounded
                  color="emerald"
                  label="Completed"
                  class="q-px-md q-py-xs font-bold text-dark no-shadow"
                />
              </q-td>
            </template>
          </q-table>
        </q-card>
      </q-tab-panel>

      <!-- TAB 2: OUTSTANDING CAPITAL -->
      <q-tab-panel name="due" class="q-pa-none">
        <div class="row q-col-gutter-md q-mb-lg fade-in-up" style="animation-delay: 0.2s">
          <div class="col-12 col-md-3">
            <q-select
              filled
              dark
              v-model="dueFilterMonth"
              :options="['January', 'February', 'March']"
              label="Audit Month"
              dense
              class="border-radius-md"
            />
          </div>
        </div>

        <q-card
          class="bg-dark-card border-glass border-radius-lg overflow-hidden fade-in-up"
          style="animation-delay: 0.3s"
        >
          <div class="bg-orange-opacity q-pa-lg border-bottom-light">
            <div class="row items-center">
              <q-icon name="report_problem" color="orange" size="24px" class="q-mr-md" />
              <div class="text-subtitle1 text-white text-weight-bold">
                Detected {{ dueRows.length }} Liquid Leakages (Outstanding Dues).
              </div>
            </div>
          </div>
          <q-table
            :rows="dueRows"
            :columns="dueColumns"
            row-key="id"
            flat
            dark
            class="bg-transparent"
          >
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" align="right">
                <q-btn
                  unelevated
                  rounded
                  size="sm"
                  class="bg-blue-gradient text-white q-px-md q-mr-sm"
                  icon="sms"
                  label="Remind Parent"
                  @click="sendReminder(props.row)"
                />
                <q-btn
                  outline
                  rounded
                  size="sm"
                  color="emerald"
                  icon="payments"
                  label="Process"
                  @click="payNow(props.row)"
                />
              </q-td>
            </template>
          </q-table>
        </q-card>
      </q-tab-panel>

      <!-- TAB 3: BURN / EXPENSES -->
      <q-tab-panel name="expenses" class="q-pa-none">
        <div class="row items-center justify-end q-mb-md fade-in-up" style="animation-delay: 0.2s">
          <q-btn
            unelevated
            rounded
            class="bg-orange-gradient text-white q-px-lg shadow-2 hover-scale"
            icon="add"
            label="Log Expense"
            no-caps
            @click="openExpenseDialog"
          />
        </div>

        <div class="row q-col-gutter-lg q-mb-lg fade-in-up" style="animation-delay: 0.3s">
          <div class="col-12 col-md-6">
            <q-card class="bg-dark-card border-glass border-radius-lg q-pa-lg hover-scale">
              <div
                class="text-caption text-grey-5 text-uppercase tracking-widest font-bold q-mb-sm"
              >
                Total Burn
              </div>
              <div class="text-h3 text-weight-bolder text-red">
                {{ currencyStore.format(totalExpenses) }}
              </div>
            </q-card>
          </div>
          <div class="col-12 col-md-6">
            <q-card class="bg-dark-card border-glass border-radius-lg q-pa-lg hover-scale">
              <div
                class="text-caption text-grey-5 text-uppercase tracking-widest font-bold q-mb-sm"
              >
                Net Liquidity (Profit)
              </div>
              <div
                class="text-h3 text-weight-bolder"
                :class="profit >= 0 ? 'text-emerald' : 'text-red'"
              >
                {{ currencyStore.format(profit) }}
              </div>
            </q-card>
          </div>
        </div>

        <q-card
          class="bg-dark-card border-glass border-radius-lg overflow-hidden fade-in-up"
          style="animation-delay: 0.4s"
        >
          <q-table
            :rows="expenseRows"
            :columns="expenseColumns"
            row-key="id"
            flat
            dark
            class="bg-transparent"
          >
            <template v-slot:body-cell-amount="props">
              <q-td :props="props" class="text-right text-weight-bold text-red">
                -{{ currencyStore.format(props.row.amount) }}
              </q-td>
            </template>
          </q-table>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>

    <!-- Dialogs -->
    <q-dialog v-model="paymentDialog" backdrop-filter="blur(8px)">
      <q-card
        class="bg-dark-card border-glass text-white"
        style="min-width: 450px; border-radius: 20px"
      >
        <q-card-section class="q-pa-xl">
          <div class="text-h5 text-weight-bolder q-mb-lg">Record Income Flow</div>
          <div class="q-gutter-y-lg">
            <q-input
              dark
              filled
              v-model="form.studentName"
              label="Source (Student Name)"
              class="border-radius-md"
            />
            <q-select
              dark
              filled
              v-model="form.month"
              :options="['January', 'February', 'March']"
              label="Fiscal Month"
            />
            <q-input
              dark
              filled
              v-model="form.amount"
              :label="`Amount (${currencyStore.symbol})`"
              type="number"
            />
          </div>
        </q-card-section>
        <q-card-actions align="right" class="q-px-xl q-pb-xl">
          <q-btn flat label="Cancel" v-close-popup color="grey-7" no-caps />
          <q-btn
            unelevated
            rounded
            class="bg-emerald-gradient q-px-xl"
            label="Verify & Save"
            @click="savePayment"
            v-close-popup
            no-caps
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="expenseDialog" backdrop-filter="blur(8px)">
      <q-card
        class="bg-dark-card border-glass text-white"
        style="min-width: 450px; border-radius: 20px"
      >
        <q-card-section class="q-pa-xl">
          <div class="text-h5 text-weight-bolder q-mb-lg">Log Operation Cost</div>
          <div class="q-gutter-y-lg">
            <q-input dark filled v-model="expenseForm.category" label="Category" />
            <q-input dark filled v-model="expenseForm.description" label="Audit Reference" />
            <q-input
              dark
              filled
              v-model="expenseForm.amount"
              :label="`Amount (${currencyStore.symbol})`"
              type="number"
            />
          </div>
        </q-card-section>
        <q-card-actions align="right" class="q-px-xl q-pb-xl">
          <q-btn flat label="Cancel" v-close-popup color="grey-7" no-caps />
          <q-btn
            unelevated
            rounded
            class="bg-orange-gradient q-px-xl"
            label="Confirm Burn"
            @click="saveExpense"
            v-close-popup
            no-caps
          />
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
const loading = ref(false)

// Verified Income logic
const verifiedRevenue = computed(() => rows.value.reduce((acc, r) => acc + Number(r.amount), 0))

// TAB 1: INCOME LEDGER
const paymentDialog = ref(false)
const form = ref({})
const columns = [
  {
    name: 'student',
    label: 'Beneficiary / Target',
    field: 'student',
    align: 'left',
    sortable: true,
  },
  { name: 'month', label: 'Audit Period', field: 'month', align: 'left' },
  {
    name: 'amount',
    label: 'Flow Volume',
    field: 'amount',
    align: 'right',
    format: (val) => currencyStore.format(val),
  },
  { name: 'status', label: 'Audit Status', field: 'status', align: 'center' },
]

const rows = ref([])

const fetchPayments = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('payments')
      .select('*, students(name)')
      .order('created_at', { ascending: false })

    if (error) throw error

    rows.value = data.map((payment) => ({
      id: payment.id,
      date: new Date(payment.payment_date).toLocaleDateString(),
      student: payment.students ? payment.students.name : 'System Transfer',
      month: payment.payment_month,
      amount: payment.amount,
      status: 'Paid',
    }))
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Liquidity audit failed' })
  } finally {
    loading.value = false
  }
}

const savePayment = async () => {
  if (!form.value.studentName || !form.value.amount || !form.value.month) {
    $q.notify({ type: 'warning', message: 'Full trace required - Fill all fields' })
    return
  }

  try {
    let studentId = null
    const { data: students } = await supabase
      .from('students')
      .select('id')
      .ilike('name', `%${form.value.studentName}%`)
      .limit(1)
    if (students && students.length > 0) studentId = students[0].id

    const { error } = await supabase.from('payments').insert({
      student_id: studentId,
      amount: Number(form.value.amount),
      payment_date: new Date().toISOString(),
      payment_month: form.value.month,
      status: 'Paid',
    })

    if (error) throw error
    $q.notify({ type: 'positive', message: 'Flow recorded successfully' })
    fetchPayments()
  } catch (err) {
    console.error('Payment Error:', err)
    $q.notify({ type: 'negative', message: 'Transmission interrupted' })
  }
}

const openPaymentDialog = () => {
  form.value = { month: 'February', amount: '' }
  paymentDialog.value = true
}

// TAB 2: DUE
const dueFilterMonth = ref('February')
const dueColumns = [
  { name: 'student', label: 'Target Name', field: 'student', align: 'left' },
  { name: 'grade', label: 'Classification', field: 'grade', align: 'left' },
  {
    name: 'amount',
    label: 'Leakage Volume',
    field: 'amount',
    align: 'right',
    format: (val) => currencyStore.format(val),
  },
  { name: 'actions', label: 'Intervention', field: 'actions', align: 'right' },
]
const dueRows = ref([
  { id: 101, student: 'Shehan Perera', grade: 'Grade 10', amount: 2500 },
  { id: 102, student: 'Kavindi Silva', grade: 'Grade 11', amount: 3000 },
])

const sendReminder = (row) => {
  $q.notify({ type: 'info', icon: 'sms', message: `Recall signal sent to ${row.student}.` })
}

const payNow = (row) => {
  form.value = { studentName: row.student, amount: row.amount, month: dueFilterMonth.value }
  paymentDialog.value = true
}

// TAB 3: EXPENSES
const expenseDialog = ref(false)
const expenseForm = ref({})
const expenseColumns = [
  { name: 'category', label: 'Resource Category', field: 'category', align: 'left' },
  { name: 'description', label: 'Audit Reference', field: 'description', align: 'left' },
  { name: 'amount', label: 'Burn Volume', field: 'amount', align: 'right' },
]
const expenseRows = ref([
  { id: 1, category: 'Infrastructure', description: 'Monthly Hall Utility', amount: 50000 },
  { id: 2, category: 'Power', description: 'Jan Grid Bill', amount: 12500 },
])

const totalExpenses = computed(() =>
  expenseRows.value.reduce((acc, row) => acc + Number(row.amount), 0),
)
const profit = computed(() => verifiedRevenue.value - totalExpenses.value)

const openExpenseDialog = () => {
  expenseDialog.value = true
}

const saveExpense = () => {
  expenseRows.value.unshift({
    id: Date.now(),
    category: expenseForm.value.category,
    description: expenseForm.value.description,
    amount: Number(expenseForm.value.amount),
  })
}

onMounted(() => {
  fetchPayments()
})
</script>

<style scoped>
.bg-dark-card {
  background: #0f172a !important;
}
.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
}
.border-radius-lg {
  border-radius: 16px;
}
.text-emerald-gradient {
  background: linear-gradient(to right, #10b981, #34d399);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.text-emerald {
  color: #10b981;
}
.text-emerald-light {
  color: rgba(16, 185, 129, 0.7);
}
.bg-emerald-gradient {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}
.bg-blue-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}
.bg-orange-gradient {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}
.bg-orange-opacity {
  background: rgba(245, 158, 11, 0.05);
}
.hover-scale:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}
.border-bottom-light {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

/* Animations */
.fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
