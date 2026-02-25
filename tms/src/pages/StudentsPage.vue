<template>
  <q-page class="q-pa-lg">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h5 text-weight-bold q-my-none">Students</h1>
        <p class="text-grey-5 q-mt-xs q-mb-none">Manage student enrollments and details.</p>
      </div>
      <div class="q-gutter-x-sm">
        <q-btn outline icon="filter_list" label="Filter" no-caps />
        <q-btn
          unelevated
          icon="add"
          color="primary"
          label="New Student"
          no-caps
          @click="openAddDialog"
        />
        <q-btn
          unelevated
          color="secondary"
          icon="upload_file"
          label="Import CSV"
          no-caps
          @click="openImportDialog"
        />
        <q-btn
          outline
          color="primary"
          icon="download"
          label="Export"
          no-caps
          @click="exportStudents"
        />
      </div>
    </div>

    <!-- Stats Row -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-3">
        <q-card class="no-shadow border-gray q-pa-md">
          <div class="text-caption text-grey-5 text-uppercase text-weight-bold">Total Students</div>
          <div class="text-h4 text-weight-bold q-mt-xs">{{ rows.length }}</div>
        </q-card>
      </div>
    </div>

    <!-- Students Table -->
    <q-card class="no-shadow border-gray">
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :pagination="{ rowsPerPage: 10 }"
      >
        <!-- Custom Name Column with Avatar -->
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <div class="row items-center no-wrap">
              <q-avatar size="32px" class="q-mr-sm" color="blue-1" text-color="primary">
                {{ props.row.name.charAt(0) }}
              </q-avatar>
              <div>
                <div class="text-weight-bold">{{ props.row.name }}</div>
                <div class="text-caption text-grey-5">{{ props.row.email }}</div>
              </div>
            </div>
          </q-td>
        </template>

        <!-- Status Column -->
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

        <!-- Actions Column -->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" auto-width>
            <q-btn flat round dense icon="more_vert" color="grey-5">
              <q-menu class="text-dark">
                <q-list style="min-width: 140px">
                  <q-item clickable v-close-popup @click="editStudent(props.row)">
                    <q-item-section>Edit Details</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="openIdCard(props.row)">
                    <q-item-section>Generate ID Card</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item
                    clickable
                    v-close-popup
                    class="text-red"
                    @click="deleteStudent(props.row.id)"
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

    <!-- Edit/Add Dialog -->
    <q-dialog v-model="editDialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ isEditMode ? 'Edit Student Details' : 'Add New Student' }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-input outlined v-model="editingRow.name" label="Student Name" dense />
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
            v-model="editingRow.grade"
            :options="[
              'Grade 6',
              'Grade 7',
              'Grade 8',
              'Grade 9',
              'Grade 10',
              'Grade 11',
              'Grade 12',
              'Grade 13',
            ]"
            label="Grade"
            dense
          />

          <q-select
            outlined
            v-model="editingRow.status"
            :options="['Active', 'Inactive']"
            label="Status"
            dense
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-pa-md">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn
            unelevated
            :label="isEditMode ? 'Save Changes' : 'Add Student'"
            color="primary"
            @click="saveStudent"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Import Dialog -->
    <q-dialog v-model="importDialog" persistent>
      <q-card style="min-width: 600px">
        <q-card-section>
          <div class="text-h6">Import Students from CSV</div>
          <div class="text-caption text-grey-6">
            Upload a CSV file with columns: Name, Email, Phone, Grade.
            <a href="#" class="text-primary cursor-pointer" @click.prevent="downloadTemplate"
              >Download Template</a
            >
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-file
            outlined
            v-model="importFile"
            label="Select CSV File"
            accept=".csv"
            @update:model-value="handleFileUpload"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>

          <q-separator />

          <div v-if="parsedStudents.length > 0">
            <div class="text-subtitle2 q-mb-sm">
              Preview ({{ parsedStudents.length }} students found)
            </div>
            <q-scroll-area style="height: 200px; border: 1px solid #ddd; border-radius: 4px">
              <q-list separator>
                <q-item v-for="(student, index) in parsedStudents" :key="index">
                  <q-item-section>
                    <q-item-label>{{ student.name }}</q-item-label>
                    <q-item-label caption>
                      {{ student.grade }} | {{ student.email }} | {{ student.phone }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                      flat
                      round
                      dense
                      icon="close"
                      color="red"
                      @click="removeImportItem(index)"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </div>
          <div v-else-if="importFile" class="text-center text-grey q-pa-md">
            No valid data found in file. Please checks your CSV format.
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-pa-md">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn
            unelevated
            label="Import Students"
            color="primary"
            :disable="parsedStudents.length === 0"
            :loading="loading"
            @click="confirmImport"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- ID Card Generation Dialog -->
    <q-dialog v-model="idCardDialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Student ID Card</div>
        </q-card-section>

        <q-card-section class="flex flex-center q-py-lg bg-grey-2">
          <!-- ID CARD PRINT AREA -->
          <div id="print-area" class="print-area">
            <div class="id-card-container shadow-2">
              <div class="id-left">
                <img
                  src="https://cdn.quasar.dev/img/boy-avatar.png"
                  class="student-photo"
                  alt="Student"
                />
                <div class="text-weight-bold text-center" style="font-size: 12px; line-height: 1.2">
                  {{ selectedStudentForID?.name }}
                </div>
                <div class="text-center q-mt-xs" style="font-size: 10px; opacity: 0.8">
                  {{ selectedStudentForID?.grade }}
                </div>
              </div>
              <div class="id-right">
                <div>
                  <div class="text-h6 text-primary text-weight-bold" style="line-height: 1">
                    DIGYNEX
                  </div>
                  <div class="text-caption text-grey-8" style="font-size: 10px">
                    Institute of Higher Education
                  </div>
                  <q-separator class="q-my-sm" />
                  <div class="text-caption text-grey-6" style="font-size: 10px">ID Number</div>
                  <div class="text-subtitle2 text-dark">{{ selectedStudentForID?.id }}</div>
                  <div class="text-caption text-grey-6 q-mt-xs" style="font-size: 10px">
                    Contact
                  </div>
                  <div class="text-caption text-dark text-weight-medium">
                    {{ selectedStudentForID?.phone }}
                  </div>
                </div>
                <!-- QR Code -->
                <div class="flex justify-end">
                  <qrcode-vue :value="String(selectedStudentForID?.id)" :size="60" level="H" />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-pa-md">
          <q-btn flat label="Close" color="grey" v-close-popup />
          <q-btn unelevated label="Print Card" icon="print" color="primary" @click="printIDCard" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useQuasar, exportFile } from 'quasar'
import { supabase } from 'src/boot/supabase'
import { useRouter, useRoute } from 'vue-router'
import QrcodeVue from 'qrcode.vue'

const $q = useQuasar()
const router = useRouter()
const route = useRoute()
const editDialog = ref(false)
const importDialog = ref(false)
const idCardDialog = ref(false)
const editingRow = ref({})
const isEditMode = ref(false)
const loading = ref(false)

const importFile = ref(null)
const parsedStudents = ref([])
const selectedStudentForID = ref(null)
const planType = ref('free') // Default to free

const openIdCard = (student) => {
  selectedStudentForID.value = student
  idCardDialog.value = true
}

const printIDCard = () => {
  window.print()
}

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Student Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  { name: 'grade', align: 'left', label: 'Grade', field: 'grade', sortable: true },
  { name: 'phone', align: 'left', label: 'Contact', field: 'phone' },
  { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
  { name: 'actions', align: 'right', label: '', field: 'actions' },
]

const rows = ref([])

const fetchStudents = async () => {
  loading.value = true
  try {
    let query = supabase.from('students').select('*').order('created_at', { ascending: false })

    // Search Filter
    const searchQuery = route.query.q
    if (searchQuery) {
      query = query.ilike('name', `%${searchQuery}%`)
    }

    const { data, error } = await query

    if (error) throw error
    rows.value = data
  } catch (error) {
    $q.notify({ type: 'negative', message: 'Error fetching students: ' + error.message })
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchStudents()
  // Fetch Plan Type
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    const { data } = await supabase.from('profiles').select('plan_type').eq('id', user.id).single()
    if (data) planType.value = data.plan_type || 'free'
  }
})

watch(
  () => route.query.q,
  async () => {
    await fetchStudents()
  },
)

const openAddDialog = () => {
  // Check Limit
  if (planType.value === 'free' && rows.value.length >= 10) {
    $q.dialog({
      title: 'Plan Limit Reached',
      message:
        'You have reached the maximum of 10 students allowed on the Free plan. Upgrade to Growth or Pro.',
      ok: { label: 'Upgrade Now', color: 'secondary', push: true },
      cancel: true,
    }).onOk(() => {
      router.push('/subscription')
    })
    return
  }

  if (planType.value === 'growth' && rows.value.length >= 100) {
    $q.dialog({
      title: 'Growth Limit Reached',
      message:
        'You have reached the maximum of 100 students allowed on the Growth plan. Upgrade to Pro for unlimited access.',
      ok: { label: 'Upgrade to Pro', color: 'emerald', push: true },
      cancel: true,
    }).onOk(() => {
      router.push('/subscription')
    })
    return
  }

  editingRow.value = { status: 'Active' }
  isEditMode.value = false
  editDialog.value = true
}

const editStudent = (row) => {
  editingRow.value = { ...row }
  isEditMode.value = true
  editDialog.value = true
}

const saveStudent = async () => {
  loading.value = true
  try {
    const studentData = { ...editingRow.value }
    // Remove ID if it's new (let DB generate it) or keep it for update
    if (!isEditMode.value) delete studentData.id

    // Assign User ID for Multi-tenancy
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) studentData.user_id = user.id

    const { error } = await supabase.from('students').upsert(studentData).select()

    if (error) throw error

    $q.notify({ type: 'positive', message: isEditMode.value ? 'Student updated' : 'Student added' })
    await fetchStudents() // Refresh list
    editDialog.value = false
  } catch (error) {
    $q.notify({ type: 'negative', message: 'Error saving student: ' + error.message })
  } finally {
    loading.value = false
  }
}

const deleteStudent = (id) => {
  $q.dialog({
    title: 'Confirm Deletion',
    message: 'Are you sure you want to remove this student? This action cannot be undone.',
    cancel: true,
    persistent: true,
    ok: { label: 'Delete', color: 'negative', flat: true },
  }).onOk(async () => {
    try {
      const { error } = await supabase.from('students').delete().eq('id', id)
      if (error) throw error

      $q.notify({ type: 'positive', message: 'Student removed successfully', icon: 'delete' })
      await fetchStudents() // Refresh list
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Error deleting student: ' + error.message })
    }
  })
}

// --- BULK IMPORT LOGIC ---
const openImportDialog = () => {
  importFile.value = null
  parsedStudents.value = []
  importDialog.value = true
}

const downloadTemplate = () => {
  const content =
    'Name,Email,Phone,Grade\nJohn Doe,john@example.com,0771234567,Grade 10\nJane Smith,jane@example.com,0717654321,Grade 11'
  const status = exportFile('student_import_template.csv', content, 'text/csv')
  if (status === true) {
    $q.notify({ type: 'positive', message: 'Template downloaded. Please fill and upload.' })
  } else {
    $q.notify({ type: 'negative', message: 'Browser denied file download...' })
  }
}

const handleFileUpload = (file) => {
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const text = e.target.result
    parseCSV(text)
  }
  reader.readAsText(file)
}

const parseCSV = (text) => {
  // Simple CSV Parser (Handles comma sep, assumes no commas in values for simplicity first, or standard quotes)
  const lines = text.split(/\r\n|\n/).filter((line) => line.trim() !== '')
  if (lines.length < 2) return

  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/^"|"$/g, ''))

  const students = []

  for (let i = 1; i < lines.length; i++) {
    // Simple split by comma (NOTE: Doesn't handle commas inside quotes well without regex, but sufficient for simple data)
    const values = lines[i].split(',').map((v) => v.trim().replace(/^"|"$/g, ''))

    if (values.length < headers.length) continue

    const student = {}
    headers.forEach((header, index) => {
      if (header.includes('name')) student.name = values[index]
      if (header.includes('email')) student.email = values[index]
      if (header.includes('phone')) student.phone = values[index]
      if (header.includes('grade')) student.grade = values[index]
    })
    student.status = 'Active' // Default status
    if (student.name) students.push(student)
  }

  parsedStudents.value = students
}

const confirmImport = async () => {
  if (parsedStudents.value.length === 0) return

  loading.value = true

  // Simulating API Call / Supabase Insert
  // In real scenario: const { error } = await supabase.from('students').insert(parsedStudents.value)

  // For now, push to local state
  let newIdStart = Math.max(0, ...rows.value.map((r) => r.id)) + 1

  const newRows = parsedStudents.value.map((s, index) => ({
    id: newIdStart + index,
    ...s,
  }))

  rows.value.push(...newRows)

  loading.value = false
  importDialog.value = false
  $q.notify({
    type: 'positive',
    message: `Successfully imported ${newRows.length} students`,
  })
  parsedStudents.value = []
  importFile.value = null
}

const removeImportItem = (index) => {
  parsedStudents.value.splice(index, 1)
}

const exportStudents = () => {
  const content = [
    'Name,Email,Phone,Grade,Status',
    ...rows.value.map(
      (r) => `"${r.name}","${r.email || ''}","${r.phone || ''}","${r.grade || ''}","${r.status}"`,
    ),
  ].join('\n')

  const status = exportFile('students_export.csv', content, 'text/csv')
  if (!status) {
    $q.notify({ type: 'negative', message: 'Browser denied file download...' })
  }
}
</script>

<style lang="scss" scoped>
.border-gray {
  border: 1px solid rgba(255, 255, 255, 0.1); // Light border for dark mode
}
body.body--light .border-gray {
  border: 1px solid #eaecf0; // Dark border for light mode
}

/* ID Card Styles */
.id-card-container {
  width: 350px;
  height: 220px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: row;
}

.id-left {
  width: 35%;
  background-color: var(--q-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 10px;
}

.id-right {
  width: 65%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.student-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid white;
  background: #eee;
  margin-bottom: 10px;
  object-fit: cover;
}

@media print {
  body * {
    visibility: hidden;
  }
  .print-area,
  .print-area * {
    visibility: visible;
  }
  .print-area {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
  }

  /* Ensure background colors print */
  .id-left {
    background-color: #1976d2 !important; /* Force Primary Color */
    -webkit-print-color-adjust: exact;
  }
}
</style>
