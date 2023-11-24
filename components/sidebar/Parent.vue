<script lang="ts" setup>
defineProps<{
  item: ISidebarItem
  open: boolean
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <Icon v-if="item.icon" :name="item.icon" />
    <p>{{ item.title }}</p>
  </div>
  <Icon v-if="item.childrens" name="heroicons:chevron-down" :class="open && 'rotate-180 transform'" class="text-lg max-lg:text-base" />
</template>

<style scoped></style>
