<script setup lang="ts">
interface IRoom {
  token: string
  hasUnreadMessage: boolean
}
interface IMessage {
  text: string
  sender: string
  roomToken: string
}
const { $ws } = useNuxtApp()
const adminToken = 't3459v8bcHgv3vcthkj8755'
const socket = $ws(adminToken)

// socket.on('user_id', text => console.log(text))
socket.on('room:list', list => {
  rooms.value = list
})
socket.on('room:new', room => {
  if (!room) return
  const isInList = rooms.value.find(r => r.token === room.token)
  if (!isInList) rooms.value.push(room)
})

const rooms = ref<IRoom[]>([])
const messages = ref<IMessage[]>([])
const activeRoom = ref('')
const msg = ref('')
const isAdmin = (id: string) => id === adminToken

const onEnterRoom = (roomToken: string) => {
  if (activeRoom.value == roomToken) return
  socket.emit('room:change', roomToken)
  activeRoom.value = roomToken
  const room = findRoom(roomToken)
  if (roomToken === activeRoom.value) room!.hasUnreadMessage = false
}

socket.on('admin:message_list', list => {
  console.log('message list')
  messages.value = list
})

const onSend = () => {
  if (!msg.value) return
  const message: IMessage = {
    text: msg.value,
    sender: adminToken,
    roomToken: activeRoom.value,
  }
  socket.emit('message:send', message)
  messages.value.push(message)
  msg.value = ''
}

const onDelete = (roomToken: string) => {
  console.log('delete') /// NEED STOP BUBBLING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  socket.emit('room:delete', roomToken)
  rooms.value = rooms.value.filter(r => r.token !== roomToken)
  activeRoom.value = ''
  messages.value = []
}

const onRecive = (msg: IMessage) => {
  console.log('recive')
  const roomToken = msg.roomToken
  const room = findRoom(roomToken)
  if (roomToken !== activeRoom.value) room!.hasUnreadMessage = true
  else messages.value.push(msg)
}

socket.on('message:to_admin', onRecive)

const findRoom = (roomToken: string) => rooms.value.find(room => room.token === roomToken)
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

      <div class="absolute -right-2 -top-2 w-4 h-4 bg-red-500 rounded-full" v-if="room.hasUnreadMessage"></div>
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
