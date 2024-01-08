import type { Socket } from 'socket.io-client'

interface IRoom {
  token: string
  hasUnreadMessage: boolean
}
interface IMessage {
  text: string
  sender: string
  roomToken: string
}
export const useIO = (socket: Socket, token: string) => {
  const rooms = ref<IRoom[]>([])
  const messages = ref<IMessage[]>([])
  const activeRoom = ref('')
  const message = ref('')

  const findRoom = (roomToken: string) => rooms.value.find(room => room.token === roomToken)

  function onMessageList(list: IMessage[]) {
    messages.value = list
  }
  function onRoomList(list: IRoom[]) {
    rooms.value = list
  }

  function onEnterRoom(roomToken: string) {
    if (activeRoom.value == roomToken) return
    socket.emit('room:change', roomToken)
    activeRoom.value = roomToken
    const room = findRoom(roomToken)
    if (roomToken === activeRoom.value) room!.hasUnreadMessage = false
  }

  function onDelete(roomToken: string) {
    socket.emit('room:delete', roomToken)
    rooms.value = rooms.value.filter(r => r.token !== roomToken)
    activeRoom.value = ''
    messages.value = []
  }

  function onRecive(msg: IMessage) {
    const roomToken = msg.roomToken
    const room = findRoom(roomToken)
    if (roomToken !== activeRoom.value) room!.hasUnreadMessage = true
    else messages.value.push(msg)
  }

  function onSendMessage() {
    if (!message.value) return
    const msg = createMessage()
    socket.emit('message:send', msg)
    messages.value.push(msg)
    message.value = ''
  }

  function createMessage(): IMessage {
    return { text: message.value, sender: token, roomToken: activeRoom.value }
  }

  socket.on('room:list', onRoomList)
  socket.on('admin:message_list', onMessageList)
  socket.on('message:to_admin', onRecive)

  return { rooms, messages, activeRoom, message, onMessageList, onEnterRoom, onRecive, onDelete, onSendMessage, onRoomList }
}
