<script lang="ts" setup>
defineProps<{
  item: ISidebarItem
  open: boolean
  close: (elem?: Ref) => boolean
}>()
const { parent, initClose } = useSidebar()
</script>

<template>
  <NuxtLink
    v-if="item.to"
    :to="item.to"
    active-class="text-sky-500"
    class="flex justify-between items-center hover:bg-slate-400 rounded-md p-2 pl-3 max-lg:pl-1"
    :class="$route.path.includes(item.to) && item.to !== '/' && 'text-sky-500'"
  >
    <SidebarParent :item="item" :open="open" />
  </NuxtLink>

  <HDisclosureButton
    v-else
    @click="initClose(close)"
    class="flex justify-between items-center hover:bg-slate-400 rounded-md p-2 pl-3 max-lg:pl-1"
  >
    <SidebarParent :open="open" :item="item" />
  </HDisclosureButton>
</template>

<style scoped></style>
