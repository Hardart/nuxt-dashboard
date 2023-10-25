<template>
  <div class="flex flex-col text-xl space-y-2">
    <template v-for="item in items">
      <HDisclosure v-slot="{ open, close }">
        <SidebarLink :item="item" :open="open" :close="close" />
        <TransitionExpand>
          <HDisclosurePanel v-if="item.childrens" v-slot="{ close }" class="ml-3 pl-4 border-l">
            <SidebarItem :items="item.childrens" class="!text-base" />
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

const { initClose } = useSidebar()
</script>
