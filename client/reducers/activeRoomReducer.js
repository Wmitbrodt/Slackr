import initialState from './initialState'

export default function activeRoomReducer(state = initialState.activeRoom, action) {
  switch(action.type) {
    case 'JOIN_ROOM':
      const {data, room} = action.roomPayload
      const roomID = room && room._id
      return Object.assign({}, state.activeRoom, {
        title: (data.room || data[0].room),
        messages: data,
        id: roomID
      })


    case 'NEW_MESSAGE':
      return Object.assign({}, action.payload.room, {
        messages: [...action.payload.room.messages, action.payload.newMessage]
      })
    default:
     return state;
  }
}
