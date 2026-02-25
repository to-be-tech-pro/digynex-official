<template>
  <q-page class="q-pa-lg">
    <!-- Page Header -->
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <div class="row items-center q-gutter-x-sm text-grey-6 q-mb-xs">
          <q-icon name="dashboard" size="16px" />
          <span>/</span>
          <span class="text-primary text-weight-medium capitalize">{{ routeName }}</span>
        </div>
        <h1 class="text-h5 text-weight-bold q-my-none text-dark capitalize">
          {{ routeName }} Management
        </h1>
        <p class="text-grey-6 q-mt-xs q-mb-none">
          View and manage all your {{ routeName }} records.
        </p>
      </div>
      <div class="q-gutter-x-sm">
        <q-btn outline color="grey-7" icon="filter_list" label="Filter" no-caps class="q-px-md" />
        <q-btn
          unelevated
          color="primary"
          icon="add"
          :label="'Add New ' + singularName"
          no-caps
          class="q-px-md"
        />
      </div>
    </div>

    <!-- Empty State Content -->
    <q-card
      class="no-shadow border-gray text-center flex flex-center column q-pa-xl"
      bordered
      style="min-height: 400px"
    >
      <div class="bg-blue-50 q-pa-xl rounded-circle q-mb-lg">
        <q-icon :name="pageIcon" size="80px" color="primary" />
      </div>

      <div class="text-h5 text-weight-bold text-grey-9">No {{ routeName }} Found</div>
      <p class="text-grey-6 q-mt-sm text-body1" style="max-width: 500px">
        It looks like you haven't added any {{ routeName }} yet. Use the "Add New" button to create
        your first record and get started.
      </p>

      <q-btn outline color="primary" label="Refresh Data" icon="refresh" no-caps class="q-mt-md" />
    </q-card>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const routeName = computed(() => {
  const path = route.path.replace('/', '')
  return path.charAt(0).toUpperCase() + path.slice(1)
})

const singularName = computed(() => {
  const name = routeName.value
  return name.endsWith('s') ? name.slice(0, -1) : name
})

const pageIcon = computed(() => {
  const name = routeName.value.toLowerCase()
  switch (name) {
    case 'students':
      return 'school'
    case 'teachers':
      return 'person_outline'
    case 'classes':
      return 'class'
    case 'payments':
      return 'payments'
    case 'reports':
      return 'analytics'
    case 'schedule':
      return 'calendar_month'
    default:
      return 'folder_open'
  }
})
</script>

<style lang="scss" scoped>
.border-gray {
  border: 1px solid #eaecf0;
}
.bg-blue-50 {
  background-color: #e3f2fd;
}
.rounded-circle {
  border-radius: 50%;
}
.capitalize {
  text-transform: capitalize;
}
</style>
