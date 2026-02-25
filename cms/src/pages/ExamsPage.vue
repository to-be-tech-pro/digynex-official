<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h5 text-weight-bold q-my-none text-dark">Exam & Results</h1>
        <p class="text-grey-6 q-mt-xs q-mb-none">Schedule exams and enter marks.</p>
      </div>
      <div>
        <q-btn
          unelevated
          icon="add"
          color="primary"
          label="New Exam"
          no-caps
          @click="newExamDialog = true"
        />
      </div>
    </div>

    <!-- Exam List -->
    <q-card class="no-shadow border-gray q-mb-lg">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold">Scheduled Exams</div>
      </q-card-section>

      <q-table :rows="exams" :columns="examColumns" row-key="id" flat bordered>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" auto-width>
            <div class="row q-gutter-xs">
              <q-btn flat round dense icon="edit" color="blue" @click="enterMarks(props.row)">
                <q-tooltip>Enter Marks</q-tooltip>
              </q-btn>
              <q-btn flat round dense icon="delete" color="red" @click="deleteExam(props.row.id)" />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Marks Entry Dialog -->
    <q-dialog
      v-model="marksDialog"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-toolbar class="bg-primary text-white">
          <q-btn flat round dense icon="arrow_back" v-close-popup />
          <q-toolbar-title>Enter Marks: {{ selectedExam?.name }}</q-toolbar-title>
          <q-btn flat label="Save All" @click="saveResults" :loading="savingResults" />
        </q-toolbar>

        <q-card-section class="q-pa-md">
          <div class="row q-col-gutter-lg justify-center">
            <div class="col-12 col-md-8">
              <div v-if="loadingStudents" class="text-center q-pa-lg">
                <q-spinner size="3em" color="primary" />
              </div>

              <q-list separator bordered class="rounded-borders" v-else>
                <q-item class="bg-grey-2 text-weight-bold">
                  <q-item-section>Student Name</q-item-section>
                  <q-item-section>Marks (Out of {{ selectedExam?.total_marks }})</q-item-section>
                  <q-item-section>Grade</q-item-section>
                </q-item>

                <q-item v-for="stu in studentResults" :key="stu.student_id">
                  <q-item-section>
                    <q-item-label>{{ stu.student_name }}</q-item-label>
                    <q-item-label caption>{{ stu.student_id }}</q-item-label>
                  </q-item-section>

                  <q-item-section>
                    <q-input
                      dense
                      outlined
                      v-model.number="stu.marks"
                      type="number"
                      :max="selectedExam?.total_marks"
                      @update:model-value="(val) => calculateGrade(stu, val)"
                    />
                  </q-item-section>

                  <q-item-section>
                    <q-badge :color="getGradeColor(stu.grade)" class="text-subtitle2 q-pa-xs">
                      {{ stu.grade || '-' }}
                    </q-badge>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- New Exam Dialog -->
    <q-dialog v-model="newExamDialog">
      <q-card style="min-width: 400px">
        <q-card-section><div class="text-h6">Schedule New Exam</div></q-card-section>
        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-input outlined v-model="examForm.name" label="Exam Name (e.g. Term Test 1)" dense />
          <q-select
            outlined
            v-model="examForm.class_id"
            :options="classOptions"
            option-label="name"
            option-value="id"
            label="Class"
            dense
            emit-value
            map-options
          />
          <q-input outlined v-model="examForm.date" type="date" label="Date" dense />
          <q-input
            outlined
            v-model="examForm.total_marks"
            type="number"
            label="Total Marks"
            dense
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            unelevated
            label="Create"
            color="primary"
            @click="createExam"
            :loading="creatingExam"
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

const $q = useQuasar()
const exams = ref([])
const classOptions = ref([])

const newExamDialog = ref(false)
const marksDialog = ref(false)
const selectedExam = ref(null)

const creatingExam = ref(false)
const loadingStudents = ref(false)
const savingResults = ref(false)

const studentResults = ref([]) // Local state for marks entry

const examForm = ref({
  name: '',
  class_id: null,
  date: new Date().toISOString().slice(0, 10),
  total_marks: 100,
})

const examColumns = [
  { name: 'name', label: 'Exam Name', field: 'name', align: 'left', sortable: true },
  { name: 'class', label: 'Class', field: (row) => row.classes?.name, align: 'left' },
  { name: 'date', label: 'Date', field: 'date', align: 'left', sortable: true },
  { name: 'actions', label: '', field: 'actions', align: 'right' },
]

onMounted(async () => {
  fetchExams()
  fetchClasses()
})

const fetchExams = async () => {
  const { data } = await supabase
    .from('exams')
    .select('*, classes(name)')
    .order('date', { ascending: false })
  if (data) exams.value = data
}

const fetchClasses = async () => {
  const { data } = await supabase.from('classes').select('id, name, grade').eq('status', 'Active')
  if (data) classOptions.value = data
}

const createExam = async () => {
  creatingExam.value = true
  const { error } = await supabase.from('exams').insert([examForm.value])
  if (error) {
    $q.notify({ type: 'negative', message: error.message })
  } else {
    $q.notify({ type: 'positive', message: 'Exam scheduled' })
    fetchExams()
    newExamDialog.value = false
    // Reset
    examForm.value = {
      name: '',
      class_id: null,
      date: new Date().toISOString().slice(0, 10),
      total_marks: 100,
    }
  }
  creatingExam.value = false
}

const enterMarks = async (exam) => {
  selectedExam.value = exam
  marksDialog.value = true
  loadingStudents.value = true

  // 1. Get Students for Class
  const classInfo = classOptions.value.find((c) => c.id === exam.class_id)
  if (!classInfo) {
    loadingStudents.value = false
    return
  }

  const { data: students } = await supabase
    .from('students')
    .select('id, name')
    .eq('grade', classInfo.grade)
    .eq('status', 'Active')

  // 2. Get Existing Marks
  const { data: results } = await supabase.from('exam_results').select('*').eq('exam_id', exam.id)

  // 3. Merge
  studentResults.value = students.map((s) => {
    const res = results ? results.find((r) => r.student_id === s.id) : null
    return {
      student_id: s.id,
      student_name: s.name,
      marks: res ? res.marks : null,
      grade: res ? res.grade : null,
      result_id: res ? res.id : null, // If exists, helpful for logs (upsert works without too)
    }
  })

  loadingStudents.value = false
}

const calculateGrade = (student, marks) => {
  if (marks === null || marks === '') {
    student.grade = null
    return
  }
  const m = Number(marks)
  const total = selectedExam.value.total_marks || 100
  const percentage = (m / total) * 100

  if (percentage >= 75) student.grade = 'A'
  else if (percentage >= 65) student.grade = 'B'
  else if (percentage >= 50) student.grade = 'C'
  else if (percentage >= 35) student.grade = 'S'
  else student.grade = 'W'
}

const getGradeColor = (grade) => {
  switch (grade) {
    case 'A':
      return 'green'
    case 'B':
      return 'blue'
    case 'C':
      return 'orange'
    case 'S':
      return 'grey-7'
    case 'W':
      return 'red'
    default:
      return 'grey-4'
  }
}

const saveResults = async () => {
  savingResults.value = true

  const upsertData = studentResults.value
    .filter((s) => s.marks !== null && s.marks !== '')
    .map((s) => ({
      exam_id: selectedExam.value.id,
      student_id: s.student_id,
      marks: s.marks,
      grade: s.grade,
    }))

  if (upsertData.length === 0) {
    savingResults.value = false
    return
  }

  const { error } = await supabase
    .from('exam_results')
    .upsert(upsertData, { onConflict: 'exam_id, student_id' })

  if (error) {
    $q.notify({ type: 'negative', message: error.message })
  } else {
    $q.notify({ type: 'positive', message: 'Results saved successfully' })
    marksDialog.value = false
  }
  savingResults.value = false
}

const deleteExam = (id) => {
  if (!confirm('Delete this exam and all its results?')) return
  supabase
    .from('exams')
    .delete()
    .eq('id', id)
    .then(({ error }) => {
      if (!error) {
        fetchExams()
        $q.notify('Deleted')
      }
    })
}
</script>

<style lang="scss" scoped>
.border-gray {
  border: 1px solid #eaecf0;
}
</style>
