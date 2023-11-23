<template>
  <div class="flex flex-col text-lg">
    <template v-for="item in items">
      <HDisclosure v-slot="{ open, close }">
        <SidebarLink :item="item" :open="open" :close="close" />
        <TransitionExpand>
          <HDisclosurePanel v-if="item.childrens" class="ml-4 pl-5 border-l">
            <SidebarItem :items="item.childrens" class="!text-sm" />
          </HDisclosurePanel>
        </TransitionExpand>
      </HDisclosure>
    </template>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  items: ISidebarItem[]
}>()
</script>
