<template>
  <q-page class="q-pa-lg">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h5 text-weight-bold q-my-none text-dark">Classes & Schedule</h1>
        <p class="text-grey-6 q-mt-xs q-mb-none">Manage class schedules, fees, and allocations.</p>
      </div>
      <div class="q-gutter-x-sm">
        <q-btn
          unelevated
          icon="add"
          color="primary"
          label="New Class"
          no-caps
          @click="openAddDialog"
        />
      </div>
    </div>

    <!-- Classes Table -->
    <q-card class="no-shadow border-gray">
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :pagination="{ rowsPerPage: 10 }"
        :loading="loading"
      >
        <!-- Status Column -->
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge
              :color="props.row.status === 'Active' ? 'green-1' : 'red-1'"
              :text-color="props.row.status === 'Active' ? 'green-8' : 'red-8'"
              class="q-px-sm q-py-xs text-weight-bold"
            >
              {{ props.row.status }}
            </q-badge>
          </q-td>
        </template>

        <!-- Actions Column -->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" auto-width>
            <q-btn flat round dense icon="more_vert" color="grey-7">
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="editClass(props.row)">
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item
                    clickable
                    v-close-popup
                    class="text-red"
                    @click="deleteClass(props.row.id)"
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
    <q-dialog v-model="editDialog" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">{{ isEditMode ? 'Edit Class Details' : 'Add New Class' }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-y-md">
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-input
                outlined
                v-model="editingRow.name"
                label="Class Name (e.g. Grade 10 Maths Revision)"
                dense
              />
            </div>

            <div class="col-6">
              <q-select outlined v-model="editingRow.grade" :options="grades" label="Grade" dense />
            </div>

            <div class="col-6">
              <q-input outlined v-model="editingRow.subject" label="Subject" dense />
            </div>

            <div class="col-12">
              <q-select
                outlined
                v-model="editingRow.tutor_id"
                :options="tutorOptions"
                option-value="id"
                option-label="name"
                label="Tutor"
                dense
                emit-value
                map-options
              />
            </div>

            <div class="col-6">
              <q-select outlined v-model="editingRow.day" :options="days" label="Day" dense />
            </div>

            <div class="col-6">
              <q-input outlined v-model="editingRow.hall" label="Hall / Room" dense />
            </div>

            <div class="col-6">
              <q-input
                outlined
                v-model="editingRow.start_time"
                label="Start Time"
                type="time"
                dense
              />
            </div>

            <div class="col-6">
              <q-input outlined v-model="editingRow.end_time" label="End Time" type="time" dense />
            </div>

            <div class="col-6">
              <q-input
                outlined
                v-model.number="editingRow.fee"
                :label="`Monthly Fee (${currencyStore.currency})`"
                type="number"
                dense
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
            :label="isEditMode ? 'Save Changes' : 'Create Class'"
            color="primary"
            @click="saveClass"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'
import { useCurrencyStore } from 'stores/currency'

const $q = useQuasar()
const currencyStore = useCurrencyStore()
const editDialog = ref(false)
const editingRow = ref({})
const isEditMode = ref(false)
const loading = ref(false)

const rows = ref([])
const tutorOptions = ref([])

const grades = [
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12',
  'Grade 13',
  'Other',
]
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Class Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  { name: 'subject', align: 'left', label: 'Subject', field: 'subject', sortable: true },
  { name: 'grade', align: 'left', label: 'Grade', field: 'grade', sortable: true },
  { name: 'day', align: 'left', label: 'Day', field: 'day', sortable: true },
  {
    name: 'time',
    align: 'left',
    label: 'Time',
    field: (row) => `${row.start_time || ''} - ${row.end_time || ''}`,
  },
  { name: 'hall', align: 'left', label: 'Hall', field: 'hall' },
  {
    name: 'fee',
    align: 'right',
    label: 'Fee (' + currencyStore.currency + ')',
    field: 'fee',
    sortable: true,
    format: (val) => currencyStore.format(val),
  },
  { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
  { name: 'actions', align: 'right', label: '', field: 'actions' },
]

onMounted(() => {
  fetchClasses()
  fetchTutors()
})

const fetchClasses = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('classes')
    .select(
      `
        *,
        tutors (name)
    `,
    )
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching classes:', error)
    $q.notify({ type: 'negative', message: 'Failed to load classes' })
  } else {
    rows.value = data
  }
  loading.value = false
}

const fetchTutors = async () => {
  const { data, error } = await supabase.from('tutors').select('id, name').eq('status', 'Active')
  if (!error) {
    tutorOptions.value = data
  }
}

const openAddDialog = () => {
  editingRow.value = { status: 'Active' }
  isEditMode.value = false
  editDialog.value = true
}

const editClass = (row) => {
  editingRow.value = { ...row }
  isEditMode.value = true
  editDialog.value = true
}

const saveClass = async () => {
  loading.value = true

  if (!editingRow.value.name) {
    $q.notify({ type: 'warning', message: 'Class Name is required' })
    loading.value = false
    return
  }

  const classData = {
    name: editingRow.value.name,
    subject: editingRow.value.subject,
    grade: editingRow.value.grade,
    tutor_id: editingRow.value.tutor_id,
    day: editingRow.value.day,
    hall: editingRow.value.hall,
    start_time: editingRow.value.start_time,
    end_time: editingRow.value.end_time,
    fee: editingRow.value.fee,
    status: editingRow.value.status,
  }

  if (isEditMode.value) {
    const { error } = await supabase.from('classes').update(classData).eq('id', editingRow.value.id)

    if (error) {
      $q.notify({ type: 'negative', message: error.message })
    } else {
      $q.notify({ type: 'positive', message: 'Class updated successfully' })
      fetchClasses()
      editDialog.value = false
    }
  } else {
    const { error } = await supabase.from('classes').insert([classData])

    if (error) {
      $q.notify({ type: 'negative', message: error.message })
    } else {
      $q.notify({ type: 'positive', message: 'New class created successfully' })
      fetchClasses()
      editDialog.value = false
    }
  }
  loading.value = false
}

const deleteClass = (id) => {
  $q.dialog({
    title: 'Confirm Deletion',
    message: 'Are you sure you want to remove this class?',
    cancel: true,
    persistent: true,
    ok: {
      label: 'Delete',
      color: 'negative',
      flat: true,
    },
  }).onOk(async () => {
    loading.value = true
    const { error } = await supabase.from('classes').delete().eq('id', id)

    if (error) {
      $q.notify({ type: 'negative', message: error.message })
    } else {
      rows.value = rows.value.filter((row) => row.id !== id)
      $q.notify({
        type: 'positive',
        message: 'Class removed successfully',
        icon: 'delete',
      })
    }
    loading.value = false
  })
}
</script>

<style lang="scss" scoped>
.border-gray {
  border: 1px solid #eaecf0;
}
</style>
