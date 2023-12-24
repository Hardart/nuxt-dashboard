<script setup lang="ts">
interface IRoom {
  title: string
  id: string
}
interface IMessage {
  text: string
  sender: string
}
const { $ws } = useNuxtApp()
const adminToken = 't3459v8bcHgv3vcthkj8755'
const socket = $ws(adminToken)

socket.on('user_id', text => console.log(text))
socket.on('room:list', list => (rooms.value = list))
socket.on('room:new', room => {
  if (!room) return
  const isInList = rooms.value.find(r => r.id === room.id)
  if (!isInList) rooms.value.push(room)
})
socket.on('message:list', list => (messages.value = list))
socket.on('message:recive', mesg => messages.value.push(mesg))
const rooms = ref<IRoom[]>([])
const messages = ref<IMessage[]>([])
const activeRoom = ref('')
const msg = ref('')
const isAdmin = (id: string) => id === adminToken

const onEnterRoom = (id: string) => {
  if (activeRoom.value == id) return
  socket.emit('room:change', id)
  activeRoom.value = id
}

const onSend = () => {
  socket.emit('message:send', msg.value)
  messages.value.push({ text: msg.value, sender: adminToken })
  msg.value = ''
}

const onDelete = (id: string) => {
  socket.emit('room:delete', id)
  rooms.value = rooms.value.filter(r => r.id !== id)
}
</script>

<template>
  <h1>Chat page</h1>
  <ul>
    <li
      class="mr-12 h-10 bg-indigo-300 m-3 hover:bg-indigo-400 text-white grid place-items-center cursor-pointer uppercase font-bold relative"
      :class="activeRoom == room.id && 'bg-sky-600'"
      v-for="room in rooms"
      @click="onEnterRoom(room.id)"
    >
      {{ room.id }}
      <div class="absolute -right-10 bg-fuchsia-700 px-2 pb-1 rounded-lg hover:bg-fuchsia-600" @click="onDelete(room.id)">
        <Icon name="heroicons:trash-20-solid" size="20" />
      </div>
    </li>
  </ul>
  <div class="flex items-center px-10 h-10 gap-3">
    <UiInput class="w-1/3" v-model="msg" />
    <UiSimpleButton text="Ответить" @click="onSend" />
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
