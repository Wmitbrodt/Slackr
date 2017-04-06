export default {
  messages: [
    { user: 'Will',
      message: 'Hello World!'
    },
    { user: 'Bill Murray',
      message: 'Dogs and Cats, living together...mass hysteria!'
    },
    { user: 'Michael Jackson',
      message: 'Tee-heee-heee!'
    }
  ],

  rooms: [
    { title: 'welcome',
     messages: [ { user: 'will', message: 'hello world'}, { user:'Bill Murray', mesage: 'Dogs and Cats living together...mass hysteria'} ]
     }
  ],

  activeRoom: {
    title: '',
    messages: [],
    id: null
  }
}
