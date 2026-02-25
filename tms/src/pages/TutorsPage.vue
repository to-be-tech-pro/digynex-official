<template>
  <q-page class="q-pa-lg">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h5 text-weight-bold q-my-none">Tutor Management</h1>
        <p class="text-grey-5 q-mt-xs q-mb-none">
          Manage tutors, track performance, and handle commission payments.
        </p>
      </div>
      <div class="q-gutter-x-sm" v-if="tab === 'tutors'">
        <q-btn
          unelevated
          icon="add"
          color="primary"
          label="New Tutor"
          no-caps
          @click="openAddDialog"
        />
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
        <q-tab name="overview" label="Dashboard & Overview" />
        <q-tab name="payments" label="Commission Payments" />
        <q-tab name="tutors" label="All Tutors" />
      </q-tabs>
    </q-card>

    <q-tab-panels v-model="tab" animated class="bg-transparent">
      <!-- DASHBOARD / OVERVIEW TAB -->
      <q-tab-panel name="overview" class="q-pa-none">
        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-12 col-md-3">
            <q-card class="no-shadow border-gray q-pa-md bg-white">
              <div class="row items-center justify-between">
                <div>
                  <div class="text-caption text-grey-6 text-uppercase text-weight-bold">
                    Active Tutors
                  </div>
                  <div class="text-h4 text-weight-bold text-dark q-mt-xs">
                    {{ activeTutorsCount }}
                  </div>
                </div>
                <q-avatar color="blue-1" text-color="blue-8" icon="school" />
              </div>
            </q-card>
          </div>
          <div class="col-12 col-md-3">
            <q-card class="no-shadow border-gray q-pa-md bg-white">
              <div class="row items-center justify-between">
                <div>
                  <div class="text-caption text-grey-6 text-uppercase text-weight-bold">
                    Pending Payouts
                  </div>
                  <div class="text-h4 text-weight-bold text-orange-9 q-mt-xs">
                    {{ currencyStore.format(totalPendingPayouts) }}
                  </div>
                </div>
                <q-avatar color="orange-1" text-color="orange-8" icon="payments" />
              </div>
            </q-card>
          </div>
          <div class="col-12 col-md-3">
            <q-card class="no-shadow border-gray q-pa-md bg-white">
              <div class="row items-center justify-between">
                <div>
                  <div class="text-caption text-grey-6 text-uppercase text-weight-bold">
                    Paid This Month
                  </div>
                  <div class="text-h4 text-weight-bold text-green-9 q-mt-xs">
                    {{ currencyStore.format(totalPaidMonth) }}
                  </div>
                </div>
                <q-avatar color="green-1" text-color="green-8" icon="check_circle" />
              </div>
            </q-card>
          </div>
          <div class="col-12 col-md-3">
            <q-card class="no-shadow border-gray q-pa-md bg-white">
              <div class="row items-center justify-between">
                <div>
                  <div class="text-caption text-grey-6 text-uppercase text-weight-bold">
                    Top Performer
                  </div>
                  <div class="text-h6 text-weight-bold text-dark q-mt-xs ellipsis">
                    {{ topPerformer.tutorName || 'N/A' }}
                  </div>
                </div>
                <q-avatar color="purple-1" text-color="purple-8" icon="star" />
              </div>
            </q-card>
          </div>
        </div>

        <!-- Recent Payouts Table -->
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-card class="no-shadow border-gray">
              <q-card-section>
                <div class="text-h6">Recent Payout History</div>
              </q-card-section>
              <q-table
                :rows="payoutHistory"
                :columns="payoutHistoryColumns"
                row-key="id"
                flat
                hide-bottom
              >
                <template v-slot:body-cell-status="props">
                  <q-td :props="props">
                    <q-chip
                      :color="props.row.status === 'Completed' ? 'green-1' : 'orange-1'"
                      :text-color="props.row.status === 'Completed' ? 'green-9' : 'orange-9'"
                      dense
                      class="text-weight-bold"
                    >
                      {{ props.row.status }}
                    </q-chip>
                  </q-td>
                </template>
              </q-table>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- PAYMENTS TAB -->
      <q-tab-panel name="payments" class="q-pa-none">
        <q-card class="no-shadow border-gray">
          <q-card-section class="q-pb-none">
            <div class="row items-center justify-between">
              <div class="text-h6">Calculate & Process Commissions</div>
              <div class="text-subtitle2 text-grey-6">Current Month: February 2026</div>
            </div>
          </q-card-section>

          <q-table
            :rows="tutorPayments"
            :columns="paymentColumns"
            row-key="id"
            flat
            :pagination="{ rowsPerPage: 10 }"
            class="q-mt-md"
          >
            <template v-slot:body-cell-tutorName="props">
              <q-td :props="props">
                <div class="row items-center">
                  <q-avatar size="32px" class="q-mr-sm" color="grey-2" text-color="primary">
                    {{ props.row.tutorName.charAt(0) }}
                  </q-avatar>
                  <div class="text-weight-medium">{{ props.row.tutorName }}</div>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-badge
                  v-if="props.row.status === 'Paid'"
                  color="green-1"
                  text-color="green-9"
                  label="Paid"
                  class="q-pa-xs text-weight-bold"
                />
                <q-badge
                  v-else
                  color="orange-1"
                  text-color="orange-9"
                  label="Pending"
                  class="q-pa-xs text-weight-bold"
                />
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td :props="props" align="right">
                <q-btn
                  v-if="props.row.status === 'Pending'"
                  unelevated
                  size="sm"
                  color="primary"
                  label="Pay Now"
                  @click="processPayment(props.row)"
                />
                <q-btn v-else flat size="sm" color="grey" label="View Receipt" dense />
              </q-td>
            </template>
          </q-table>
        </q-card>
      </q-tab-panel>

      <!-- ALL TUTORS TAB (Original View) -->
      <q-tab-panel name="tutors" class="q-pa-none">
        <q-card class="no-shadow border-gray">
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="id"
            flat
            :pagination="{ rowsPerPage: 10 }"
          >
            <template v-slot:body-cell-name="props">
              <q-td :props="props">
                <div class="row items-center no-wrap">
                  <q-avatar size="32px" class="q-mr-sm" color="purple-1" text-color="purple">
                    {{ props.row.name.charAt(0) }}
                  </q-avatar>
                  <div>
                    <div class="text-weight-bold">{{ props.row.name }}</div>
                    <div class="text-caption text-grey-5">{{ props.row.email }}</div>
                  </div>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-subjects="props">
              <q-td :props="props">
                <div class="q-gutter-xs">
                  <q-badge
                    v-for="sub in props.row.subjects"
                    :key="sub"
                    color="grey-2"
                    text-color="grey-9"
                    class="q-px-sm"
                  >
                    {{ sub }}
                  </q-badge>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-commission="props">
              <q-td :props="props">
                <q-badge color="blue-1" text-color="blue-9" class="text-weight-bold">
                  {{ props.row.commission }}%
                </q-badge>
              </q-td>
            </template>

            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-badge
                  :color="props.row.status === 'Active' ? 'green-2' : 'red-2'"
                  :text-color="props.row.status === 'Active' ? 'green-9' : 'red-9'"
                  class="q-px-sm q-py-xs text-weight-bold"
                >
                  {{ props.row.status }}
                </q-badge>
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td :props="props" auto-width>
                <q-btn flat round dense icon="more_vert" color="grey-5">
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <q-item clickable v-close-popup @click="editTutor(props.row)">
                        <q-item-section>Edit Details</q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item
                        clickable
                        v-close-popup
                        class="text-red"
                        @click="deleteTutor(props.row.id)"
                      >
                        <q-item-section>Delete</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>

    <!-- Edit/Add Tutor Dialog -->
    <q-dialog v-model="editDialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ isEditMode ? 'Edit Tutor Details' : 'Add New Tutor' }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-input outlined v-model="editingRow.name" label="Tutor Name" dense />
          <q-input outlined v-model="editingRow.email" label="Email Address" dense />
          <q-input
            outlined
            v-model="editingRow.phone"
            label="Phone Number"
            mask="###-#######"
            dense
          />

          <q-select
            outlined
            v-model="editingRow.subjects"
            :options="[
              'Mathematics',
              'Physics',
              'Chemistry',
              'Biology',
              'English',
              'History',
              'ICT',
            ]"
            label="Subjects"
            multiple
            use-chips
            dense
          />

          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-input
                outlined
                v-model.number="editingRow.commission"
                label="Commission (%)"
                type="number"
                dense
                hint="Percentage of class fees"
              />
            </div>
            <div class="col-6">
              <q-select
                outlined
                v-model="editingRow.status"
                :options="['Active', 'Inactive']"
                label="Status"
                dense
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-pa-md">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn
            unelevated
            :label="isEditMode ? 'Save Changes' : 'Add Tutor'"
            color="primary"
            @click="saveTutor"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Payment Confirmation Dialog -->
    <q-dialog v-model="paymentConfirmDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Confirm Payout</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Are you sure you want to process a payment of
          <span class="text-weight-bold text-primary">{{
            currencyStore.format(selectedPayment?.payableAmount)
          }}</span>
          to {{ selectedPayment?.tutorName }}?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn
            label="Confirm Pay"
            color="primary"
            unelevated
            @click="confirmPayment"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useCurrencyStore } from 'stores/currency'

const $q = useQuasar()
const currencyStore = useCurrencyStore()
const tab = ref('overview')

// --- LIST OF TUTORS ---
const editDialog = ref(false)
const editingRow = ref({})
const isEditMode = ref(false)

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Tutor Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  { name: 'subjects', align: 'left', label: 'Subjects', field: 'subjects' },
  { name: 'phone', align: 'left', label: 'Contact', field: 'phone' },
  {
    name: 'commission',
    align: 'center',
    label: 'Commission',
    field: 'commission',
    sortable: true,
  },
  { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
  { name: 'actions', align: 'right', label: '', field: 'actions' },
]

const rows = ref([
  {
    id: 1,
    name: 'Mr. Sarath Mel',
    email: 'sarath@examle.com',
    subjects: ['Mathematics', 'Physics'],
    phone: '077-1112223',
    status: 'Active',
    commission: 60,
  },
  {
    id: 2,
    name: 'Ms. Deepika Gunawardena',
    email: 'deepika@example.com',
    subjects: ['Chemistry'],
    phone: '071-3334445',
    status: 'Active',
    commission: 70,
  },
  {
    id: 3,
    name: 'Mr. Rohan Jayasuriya',
    email: 'rohan@example.com',
    subjects: ['Biology', 'Science'],
    phone: '070-5556667',
    status: 'Inactive',
    commission: 50,
  },
])

// --- PAYMENTS & DASHBOARD LOGIC ---
const paymentConfirmDialog = ref(false)
const selectedPayment = ref(null)

// Mock Data for Payments
const tutorPayments = ref([
  {
    id: 101,
    tutorId: 1,
    tutorName: 'Mr. Sarath Mel',
    totalClasses: 12,
    totalStudents: 45,
    totalCollected: 150000,
    commissionRate: 60,
    payableAmount: 90000, // 60% of 150000
    status: 'Pending',
  },
  {
    id: 102,
    tutorId: 2,
    tutorName: 'Ms. Deepika Gunawardena',
    totalClasses: 8,
    totalStudents: 30,
    totalCollected: 80000,
    commissionRate: 70,
    payableAmount: 56000,
    status: 'Paid',
  },
  {
    id: 103,
    tutorId: 3,
    tutorName: 'Mr. Rohan Jayasuriya',
    totalClasses: 0,
    totalStudents: 0,
    totalCollected: 0,
    commissionRate: 50,
    payableAmount: 0,
    status: 'Paid', // No payment needed
  },
])

const paymentColumns = [
  { name: 'tutorName', label: 'Tutor', field: 'tutorName', align: 'left', sortable: true },
  { name: 'totalClasses', label: 'Classes Taught', field: 'totalClasses', align: 'center' },
  {
    label: `Fees Collected (${currencyStore.currency})`,
    field: 'totalCollected',
    format: (val) => currencyStore.format(val),
    align: 'right',
  },
  {
    name: 'commissionRate',
    label: 'Rate',
    field: (val) => val.commissionRate + '%',
    align: 'center',
  },
  {
    name: 'payableAmount',
    label: `Net Payable (${currencyStore.currency})`,
    field: 'payableAmount',
    format: (val) => currencyStore.format(val),
    align: 'right',
    style: 'font-weight: bold; color: var(--q-primary)',
  },
  { name: 'status', label: 'Status', field: 'status', align: 'center' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' },
]

const payoutHistory = ref([
  {
    id: 1,
    date: '2026-01-28',
    tutor: 'Ms. Deepika Gunawardena',
    amount: 52000,
    status: 'Completed',
  },
  {
    id: 2,
    date: '2026-01-25',
    tutor: 'Mr. Sarath Mel',
    amount: 88500,
    status: 'Completed',
  },
])

const payoutHistoryColumns = [
  { name: 'date', label: 'Date', field: 'date', align: 'left' },
  { name: 'tutor', label: 'Tutor', field: 'tutor', align: 'left' },
  {
    name: 'amount',
    label: 'Amount',
    field: 'amount',
    align: 'right',
    format: (val) => currencyStore.format(val),
  },
  { name: 'status', label: 'Status', field: 'status', align: 'right' },
]

// Computed Metrics
const activeTutorsCount = computed(() => rows.value.filter((r) => r.status === 'Active').length)
const totalPendingPayouts = computed(() =>
  tutorPayments.value
    .filter((p) => p.status === 'Pending')
    .reduce((sum, p) => sum + p.payableAmount, 0),
)
const totalPaidMonth = computed(() =>
  tutorPayments.value
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + p.payableAmount, 0),
)
const topPerformer = computed(() => {
  // Sort by Total Collected
  const sorted = [...tutorPayments.value].sort((a, b) => b.totalCollected - a.totalCollected)
  return sorted[0] || {}
})

const processPayment = (payment) => {
  selectedPayment.value = payment
  paymentConfirmDialog.value = true
}

const confirmPayment = () => {
  if (selectedPayment.value) {
    // Find in logic and update
    const idx = tutorPayments.value.findIndex((p) => p.id === selectedPayment.value.id)
    if (idx !== -1) {
      tutorPayments.value[idx].status = 'Paid'

      // Add to history
      payoutHistory.value.unshift({
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        tutor: selectedPayment.value.tutorName,
        amount: selectedPayment.value.payableAmount,
        status: 'Completed',
      })

      $q.notify({
        type: 'positive',
        message: `Payment of ${currencyStore.format(selectedPayment.value.payableAmount)} recorded!`,
      })
    }
  }
}

// --- TUTOR CRUD ACTIONS ---
const openAddDialog = () => {
  editingRow.value = { status: 'Active', subjects: [], commission: 60 } // Default values
  isEditMode.value = false
  editDialog.value = true
}

const editTutor = (row) => {
  editingRow.value = JSON.parse(JSON.stringify(row)) // Deep copy
  isEditMode.value = true
  editDialog.value = true
}

const saveTutor = () => {
  if (isEditMode.value) {
    // Edit existing logic
    const index = rows.value.findIndex((r) => r.id === editingRow.value.id)
    if (index !== -1) {
      rows.value[index] = { ...editingRow.value }
      $q.notify({
        type: 'positive',
        message: 'Tutor details updated successfully',
      })
    }
  } else {
    // Add new logic
    const newId = Math.max(0, ...rows.value.map((r) => r.id)) + 1
    rows.value.push({
      id: newId,
      ...editingRow.value,
    })
    $q.notify({
      type: 'positive',
      message: 'New tutor added successfully',
    })
  }
}

const deleteTutor = (id) => {
  $q.dialog({
    title: 'Confirm Deletion',
    message: 'Are you sure you want to remove this tutor?',
    cancel: true,
    persistent: true,
    ok: {
      label: 'Delete',
      color: 'negative',
      flat: true,
    },
  }).onOk(() => {
    rows.value = rows.value.filter((row) => row.id !== id)
    $q.notify({
      type: 'positive',
      message: 'Tutor removed successfully',
      icon: 'delete',
    })
  })
}
</script>

<style lang="scss" scoped>
.border-gray {
  border: 1px solid rgba(0, 0, 0, 0.08);
}
body.body--light .border-gray {
  border: 1px solid #eaecf0;
}
</style>
