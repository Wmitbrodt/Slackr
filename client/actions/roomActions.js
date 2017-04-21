import messageApi from '../api/messageApi';

export function joinRoom(roomPayload) {
  return { type: 'JOIN_ROOM', roomPayload}
}

export function newRoom(room) {
  const newRoom = { title: room, messages: [{user: 'WillrBot', content: 'Please keep the conversation friendly!'}]}
  return (dispatch) => {
    return messageApi.createRoom(newRoom)
      .then((response) => {
        dispatch(newRoomSuccess(newRoom))
      })
    return response
 }
}

export function newRoomSuccess(payload){
  return { type: 'NEW_ROOM', payload }
}

export function updateRoomList(payload){
  return { type: 'UPDATE_ROOM_LIST', payload}
}
export function fetchRoomData(room){
  return (dispatch) => {
    return messageApi.fetchRoom()
      .then((response) => {
        const payload = {room, data: response.data}
        dispatch(joinRoom(payload))
      })
    return response
  }

}

export function fetchRoomList(){
  return (dispatch) => {
    return messageApi.fetchRoomList()
      .then((response) => {
        dispatch(updateRoomList(response))
      })
    return response

  }
}
