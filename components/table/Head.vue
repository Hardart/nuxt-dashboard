<script setup lang="ts">
withDefaults(
  defineProps<{
    heads?: string[]
    isShowNumber?: boolean
  }>(),
  {
    isShowNumber: true,
  }
)
</script>
<template>
  <thead>
    <tr>
      <th class="border border-slate-600 px-3 max-lg:hidden" v-if="isShowNumber">N</th>
      <th class="border border-slate-600 py-2 px-4 max-lg:text-sm max-lg:px-3" :class="!i && 'w-full'" v-for="(head, i) in heads">
        {{ head }}
      </th>
    </tr>
  </thead>
</template>
