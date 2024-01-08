<script setup lang="ts">
import { useIO } from '~/composables/useIO'

const { $ws } = useNuxtApp()
const adminToken = 't3459v8bcHgv3vcthkj8755'
const socket = $ws(adminToken)

const { activeRoom, rooms, messages, message, onEnterRoom, onSendMessage, onDelete } = useIO(socket, adminToken)

// socket.on('room:new', room => {
//   if (!room) return
//   const isInList = rooms.value.find(r => r.token === room.token)
//   if (!isInList) rooms.value.push(room)
// })

const isAdmin = (id: string) => id === adminToken
</script>

<template>
  <h1>Active room - {{ activeRoom }}</h1>
  <ul class="w-96">
    <li
      class="mr-12 h-10 bg-indigo-300 m-3 hover:bg-indigo-400 text-white grid place-items-center cursor-pointer uppercase font-bold relative"
      :class="activeRoom == room.token && 'bg-sky-600'"
      v-for="room in rooms"
      @click="onEnterRoom(room.token)"
    >
      {{ room.token }}
      <div class="absolute -right-12 bg-fuchsia-700 px-2 pb-1 rounded-lg hover:bg-fuchsia-600" @click.stop="onDelete(room.token)">
        <Icon name="heroicons:trash-20-solid" size="20" />
      </div>

      <div class="absolute -right-2 -top-2 w-4 h-4" v-if="room.hasUnreadMessage">
        <div class="absolute w-full h-full bg-red-400 rounded-full animate-ping"></div>
        <div class="absolute w-full h-full bg-red-600 rounded-full"></div>
      </div>
    </li>
  </ul>
  <div class="flex items-center px-10 h-10 gap-3">
    <UiInput class="w-1/3" v-model="message" />
    <UiSimpleButton text="Ответить" @click="onSendMessage" />
  </div>
  <ul class="w-[350px] mx-auto space-y-2 bg-white/60 py-2 rounded-lg" v-if="messages && messages.length">
    <li v-for="message in messages" class="mx-3 py-1" :class="isAdmin(message.sender) && 'text-right'">
      <p class="inline text-white px-3 pt-1 pb-1.5 rounded-xl text-sm" :class="isAdmin(message.sender) ? 'bg-green-600' : 'bg-sky-600'">
        {{ message.text }}
      </p>
    </li>
  </ul>
</template>

<style></style>
