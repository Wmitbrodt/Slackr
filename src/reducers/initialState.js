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
    { title: 'events',
     messages: [ { user: 'will', message: 'hello world'}, { user:'Bill Murray', message: 'Dogs and Cats living together...mass hysteria'} ]
     },
    { title: 'general',
     messages: [ {user: 'Michael Jackson', message: 'Tee-hee-hee'}, {user: 'Bill Murray', message: 'Michael, you were always super talented...'}]
    }
    { title: 'january-2017-bootcamp',
     messages: [ {user: 'will', message: 'S.O.M. Smear'}, {user: 'Bill Murray', message: 'Gotta love a good Smear...!'}]
    }
  ],

  activeRoom: {
     title: 'january-2017-bootcamp',
     messages: [ {user: 'will', message: 'S.O.M. Smear'}, {user: 'Bill Murray', message: 'Gotta love a good Smear...!'}]
  }
}
