/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {/*
	   * CommonJS module that exports EventSource polyfill version 0.9.6
	   * This module is intended for browser side use
	   * =====================================================================
	   * THIS IS A POLYFILL MODULE, SO IT HAS SIDE EFFECTS
	   * IT AUTOMATICALLY CHECKS IF window OBJECT DEFINES EventSource
	   * AND ADD THE EXPORTED ONE IN CASE IT IS UNDEFINED
	   * =====================================================================
	   * Supported by sc AmvTek srl
	   * :email: devel@amvtek.com
	 */


	var PolyfillEventSource = __webpack_require__(3).EventSource;
	module.exports = PolyfillEventSource;

	// Add EventSource to window if it is missing...
	if (window && !window.EventSource){
	    window.EventSource = PolyfillEventSource;
	    if (console){
		console.log("polyfill-eventsource added missing EventSource to window");
	    }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {/*
	   * EventSource polyfill version 0.9.6
	   * Supported by sc AmvTek srl
	   * :email: devel@amvtek.com
	 */
	;(function (global) {

	    if (global.EventSource && !global._eventSourceImportPrefix){
	        return;
	    }

	    var evsImportName = (global._eventSourceImportPrefix||'')+"EventSource";

	    var EventSource = function (url, options) {

	        if (!url || typeof url != 'string') {
	            throw new SyntaxError('Not enough arguments');
	        }

	        this.URL = url;
	        this.setOptions(options);
	        var evs = this;
	        setTimeout(function(){evs.poll()}, 0);
	    };

	    EventSource.prototype = {

	        CONNECTING: 0,

	        OPEN: 1,

	        CLOSED: 2,

	        defaultOptions: {

	            loggingEnabled: false,

	            loggingPrefix: "eventsource",

	            interval: 500, // milliseconds

	            bufferSizeLimit: 256*1024, // bytes

	            silentTimeout: 300000, // milliseconds

	            getArgs:{
	                'evs_buffer_size_limit': 256*1024
	            },

	            xhrHeaders:{
	                'Accept': 'text/event-stream',
	                'Cache-Control': 'no-cache',
	                'X-Requested-With': 'XMLHttpRequest'
	            }
	        },

	        setOptions: function(options){

	            var defaults = this.defaultOptions;
	            var option;

	            // set all default options...
	            for (option in defaults){

	                if ( defaults.hasOwnProperty(option) ){
	                    this[option] = defaults[option];
	                }
	            }

	            // override with what is in options
	            for (option in options){

	                if (option in defaults && options.hasOwnProperty(option)){
	                    this[option] = options[option];
	                }
	            }

	            // if getArgs option is enabled
	            // ensure evs_buffer_size_limit corresponds to bufferSizeLimit
	            if (this.getArgs && this.bufferSizeLimit) {

	                this.getArgs['evs_buffer_size_limit'] = this.bufferSizeLimit;
	            }

	            // if console is not available, force loggingEnabled to false
	            if (typeof console === "undefined" || typeof console.log === "undefined") {

	                this.loggingEnabled = false;
	            }
	        },

	        log: function(message) {

	            if (this.loggingEnabled) {

	                console.log("[" + this.loggingPrefix +"]:" + message)
	            }
	        },

	        poll: function() {

	            try {

	                if (this.readyState == this.CLOSED) {
	                    return;
	                }

	                this.cleanup();
	                this.readyState = this.CONNECTING;
	                this.cursor = 0;
	                this.cache = '';
	                this._xhr = new this.XHR(this);
	                this.resetNoActivityTimer();

	            }
	            catch (e) {

	                // in an attempt to silence the errors
	                this.log('There were errors inside the pool try-catch');
	                this.dispatchEvent('error', { type: 'error', data: e.message });
	            }
	        },

	        pollAgain: function (interval) {

	            // schedule poll to be called after interval milliseconds
	            var evs = this;
	            evs.readyState = evs.CONNECTING;
	            evs.dispatchEvent('error', {
	                type: 'error',
	                data: "Reconnecting "
	            });
	            this._pollTimer = setTimeout(function(){evs.poll()}, interval||0);
	        },


	        cleanup: function() {

	            this.log('evs cleaning up')

	            if (this._pollTimer){
	                clearInterval(this._pollTimer);
	                this._pollTimer = null;
	            }

	            if (this._noActivityTimer){
	                clearInterval(this._noActivityTimer);
	                this._noActivityTimer = null;
	            }

	            if (this._xhr){
	                this._xhr.abort();
	                this._xhr = null;
	            }
	        },

	        resetNoActivityTimer: function(){

	            if (this.silentTimeout){

	                if (this._noActivityTimer){
	                    clearInterval(this._noActivityTimer);
	                }
	                var evs = this;
	                this._noActivityTimer = setTimeout(
	                        function(){ evs.log('Timeout! silentTImeout:'+evs.silentTimeout); evs.pollAgain(); },
	                        this.silentTimeout
	                        );
	            }
	        },

	        close: function () {

	            this.readyState = this.CLOSED;
	            this.log('Closing connection. readyState: '+this.readyState);
	            this.cleanup();
	        },

	        ondata: function() {

	            var request = this._xhr;

	            if (request.isReady() && !request.hasError() ) {
	                // reset the timer, as we have activity
	                this.resetNoActivityTimer();

	                // move this EventSource to OPEN state...
	                if (this.readyState == this.CONNECTING) {
	                    this.readyState = this.OPEN;
	                    this.dispatchEvent('open', { type: 'open' });
	                }

	                var buffer = request.getBuffer();

	                if (buffer.length > this.bufferSizeLimit) {
	                    this.log('buffer.length > this.bufferSizeLimit');
	                    this.pollAgain();
	                }

	                if (this.cursor == 0 && buffer.length > 0){

	                    // skip byte order mark \uFEFF character if it starts the stream
	                    if (buffer.substring(0,1) == '\uFEFF'){
	                        this.cursor = 1;
	                    }
	                }

	                var lastMessageIndex = this.lastMessageIndex(buffer);
	                if (lastMessageIndex[0] >= this.cursor){

	                    var newcursor = lastMessageIndex[1];
	                    var toparse = buffer.substring(this.cursor, newcursor);
	                    this.parseStream(toparse);
	                    this.cursor = newcursor;
	                }

	                // if request is finished, reopen the connection
	                if (request.isDone()) {
	                    this.log('request.isDone(). reopening the connection');
	                    this.pollAgain(this.interval);
	                }
	            }
	            else if (this.readyState !== this.CLOSED) {

	                this.log('this.readyState !== this.CLOSED');
	                this.pollAgain(this.interval);

	                //MV: Unsure why an error was previously dispatched
	            }
	        },

	        parseStream: function(chunk) {

	            // normalize line separators (\r\n,\r,\n) to \n
	            // remove white spaces that may precede \n
	            chunk = this.cache + this.normalizeToLF(chunk);

	            var events = chunk.split('\n\n');

	            var i, j, eventType, datas, line, retry;

	            for (i=0; i < (events.length - 1); i++) {

	                eventType = 'message';
	                datas = [];
	                parts = events[i].split('\n');

	                for (j=0; j < parts.length; j++) {

	                    line = this.trimWhiteSpace(parts[j]);

	                    if (line.indexOf('event') == 0) {

	                        eventType = line.replace(/event:?\s*/, '');
	                    }
	                    else if (line.indexOf('retry') == 0) {

	                        retry = parseInt(line.replace(/retry:?\s*/, ''));
	                        if(!isNaN(retry)) {
	                            this.interval = retry;
	                        }
	                    }
	                    else if (line.indexOf('data') == 0) {

	                        datas.push(line.replace(/data:?\s*/, ''));
	                    }
	                    else if (line.indexOf('id:') == 0) {

	                        this.lastEventId = line.replace(/id:?\s*/, '');
	                    }
	                    else if (line.indexOf('id') == 0) { // this resets the id

	                        this.lastEventId = null;
	                    }
	                }

	                if (datas.length) {
	                    // dispatch a new event
	                    var event = new MessageEvent(eventType, datas.join('\n'), window.location.origin, this.lastEventId);
	                    this.dispatchEvent(eventType, event);
	                }
	            }

	            this.cache = events[events.length - 1];
	        },

	        dispatchEvent: function (type, event) {
	            var handlers = this['_' + type + 'Handlers'];

	            if (handlers) {

	                for (var i = 0; i < handlers.length; i++) {
	                    handlers[i].call(this, event);
	                }
	            }

	            if (this['on' + type]) {
	                this['on' + type].call(this, event);
	            }

	        },

	        addEventListener: function (type, handler) {
	            if (!this['_' + type + 'Handlers']) {
	                this['_' + type + 'Handlers'] = [];
	            }

	            this['_' + type + 'Handlers'].push(handler);
	        },

	        removeEventListener: function (type, handler) {
	            var handlers = this['_' + type + 'Handlers'];
	            if (!handlers) {
	                return;
	            }
	            for (var i = handlers.length - 1; i >= 0; --i) {
	                if (handlers[i] === handler) {
	                    handlers.splice(i, 1);
	                    break;
	                }
	            }
	        },

	        _pollTimer: null,

	        _noactivityTimer: null,

	        _xhr: null,

	        lastEventId: null,

	        cache: '',

	        cursor: 0,

	        onerror: null,

	        onmessage: null,

	        onopen: null,

	        readyState: 0,

	        // ===================================================================
	        // helpers functions
	        // those are attached to prototype to ease reuse and testing...

	        urlWithParams: function (baseURL, params) {

	            var encodedArgs = [];

	            if (params){

	                var key, urlarg;
	                var urlize = encodeURIComponent;

	                for (key in params){
	                    if (params.hasOwnProperty(key)) {
	                        urlarg = urlize(key)+'='+urlize(params[key]);
	                        encodedArgs.push(urlarg);
	                    }
	                }
	            }

	            if (encodedArgs.length > 0){

	                if (baseURL.indexOf('?') == -1)
	                    return baseURL + '?' + encodedArgs.join('&');
	                return baseURL + '&' + encodedArgs.join('&');
	            }
	            return baseURL;
	        },

	        lastMessageIndex: function(text) {

	            var ln2 =text.lastIndexOf('\n\n');
	            var lr2 = text.lastIndexOf('\r\r');
	            var lrln2 = text.lastIndexOf('\r\n\r\n');

	            if (lrln2 > Math.max(ln2, lr2)) {
	                return [lrln2, lrln2+4];
	            }
	            return [Math.max(ln2, lr2), Math.max(ln2, lr2) + 2]
	        },

	        trimWhiteSpace: function(str) {
	            // to remove whitespaces left and right of string

	            var reTrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
	            return str.replace(reTrim, '');
	        },

	        normalizeToLF: function(str) {

	            // replace \r and \r\n with \n
	            return str.replace(/\r\n|\r/g, '\n');
	        }

	    };

	    if (!isOldIE()){

	        EventSource.isPolyfill = "XHR";

	        // EventSource will send request using XMLHttpRequest
	        EventSource.prototype.XHR = function(evs) {

	            request = new XMLHttpRequest();
	            this._request = request;
	            evs._xhr = this;

	            // set handlers
	            request.onreadystatechange = function(){
	                if (request.readyState > 1 && evs.readyState != evs.CLOSED) {
	                    if (request.status == 200 || (request.status>=300 && request.status<400)){
	                        evs.ondata();
	                    }
	                    else {
	                        request._failed = true;
	                        evs.readyState = evs.CLOSED;
	                        evs.dispatchEvent('error', {
	                            type: 'error',
	                            data: "The server responded with "+request.status
	                        });
	                        evs.close();
	                    }
	                }
	            };

	            request.onprogress = function () {
	            };

	            request.open('GET', evs.urlWithParams(evs.URL, evs.getArgs), true);

	            var headers = evs.xhrHeaders; // maybe null
	            for (var header in headers) {
	                if (headers.hasOwnProperty(header)){
	                    request.setRequestHeader(header, headers[header]);
	                }
	            }
	            if (evs.lastEventId) {
	                request.setRequestHeader('Last-Event-Id', evs.lastEventId);
	            }

	            request.send();
	        };

	        EventSource.prototype.XHR.prototype = {

	            useXDomainRequest: false,

	            _request: null,

	            _failed: false, // true if we have had errors...

	            isReady: function() {


	                return this._request.readyState >= 2;
	            },

	            isDone: function() {

	                return (this._request.readyState == 4);
	            },

	            hasError: function() {

	                return (this._failed || (this._request.status >= 400));
	            },

	            getBuffer: function() {

	                var rv = '';
	                try {
	                    rv = this._request.responseText || '';
	                }
	                catch (e){}
	                return rv;
	            },

	            abort: function() {

	                if ( this._request ) {
	                    this._request.abort();
	                }
	            }
	        };
	    }
	    else {

		EventSource.isPolyfill = "IE_8-9";

	        // patch EventSource defaultOptions
	        var defaults = EventSource.prototype.defaultOptions;
	        defaults.xhrHeaders = null; // no headers will be sent
	        defaults.getArgs['evs_preamble'] = 2048 + 8;

	        // EventSource will send request using Internet Explorer XDomainRequest
	        EventSource.prototype.XHR = function(evs) {

	            request = new XDomainRequest();
	            this._request = request;

	            // set handlers
	            request.onprogress = function(){
	                request._ready = true;
	                evs.ondata();
	            };

	            request.onload = function(){
	                this._loaded = true;
	                evs.ondata();
	            };

	            request.onerror = function(){
	                this._failed = true;
	                evs.readyState = evs.CLOSED;
	                evs.dispatchEvent('error', {
	                    type: 'error',
	                    data: "XDomainRequest error"
	                });
	            };

	            request.ontimeout = function(){
	                this._failed = true;
	                evs.readyState = evs.CLOSED;
	                evs.dispatchEvent('error', {
	                    type: 'error',
	                    data: "XDomainRequest timed out"
	                });
	            };

	            // XDomainRequest does not allow setting custom headers
	            // If EventSource has enabled the use of GET arguments
	            // we add parameters to URL so that server can adapt the stream...
	            var reqGetArgs = {};
	            if (evs.getArgs) {

	                // copy evs.getArgs in reqGetArgs
	                var defaultArgs = evs.getArgs;
	                    for (var key in defaultArgs) {
	                        if (defaultArgs.hasOwnProperty(key)){
	                            reqGetArgs[key] = defaultArgs[key];
	                        }
	                    }
	                if (evs.lastEventId){
	                    reqGetArgs['evs_last_event_id'] = evs.lastEventId;
	                }
	            }
	            // send the request

	            request.open('GET', evs.urlWithParams(evs.URL,reqGetArgs));
	            request.send();
	        };

	        EventSource.prototype.XHR.prototype = {

	            useXDomainRequest: true,

	            _request: null,

	            _ready: false, // true when progress events are dispatched

	            _loaded: false, // true when request has been loaded

	            _failed: false, // true if when request is in error

	            isReady: function() {

	                return this._request._ready;
	            },

	            isDone: function() {

	                return this._request._loaded;
	            },

	            hasError: function() {

	                return this._request._failed;
	            },

	            getBuffer: function() {

	                var rv = '';
	                try {
	                    rv = this._request.responseText || '';
	                }
	                catch (e){}
	                return rv;
	            },

	            abort: function() {

	                if ( this._request){
	                    this._request.abort();
	                }
	            }
	        };
	    }

	    function MessageEvent(type, data, origin, lastEventId) {

	        this.bubbles = false;
	        this.cancelBubble = false;
	        this.cancelable = false;
	        this.data = data || null;
	        this.origin = origin || '';
	        this.lastEventId = lastEventId || '';
	        this.type = type || 'message';
	    }

	    function isOldIE () {

	        //return true if we are in IE8 or IE9
	        return (window.XDomainRequest && (window.XMLHttpRequest && new XMLHttpRequest().responseType === undefined)) ? true : false;
	    }

	    global[evsImportName] = EventSource;
	})(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname, console, process) {import express from 'express';
	import webpack from 'webpack';
	import path from 'path';
	import open from 'open';
	import favicon from 'serve-favicon';
	import socket from 'socket.io'
	import { Server } from 'http'
	import bodyParser from 'body-parser'
	import fs from 'fs'
	import mongoose from 'mongoose'
	import Message from './db/messageSchema'
	import Room from './db/roomSchema'
	import { Binary } from 'mongodb'
	import serveStatic from 'serve-static'
	import imageDecoder from './imageDecoder'
	__webpack_require__(6).config()


	const port = 5000;
	const app = express();
	const server = Server(app)
	const compiler = webpack(config);
	// Here we are defining a variable io, setting it equal to a new instance of
	// socket.io by passing it the server to listen on.

	const io = socket(server)
	const staticPath = path.join(__dirname, '..', '/public')

	var room;

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	app.use(serveStatic(staticPath))

	app.get('/messages', (req, res) => {
	  Message.find({room: room}, (err, docs) => {
	    res.json(docs)
	  })

	})

	app.get('/rooms', (req, res) => {
	  console.log('in fetch rooms')
	  Room.find({}, (err, docs) => {
	    console.log('docs', docs)
	    res.json(docs)
	  })
	})

	app.post('/rooms', (req, res) => {
	  let message = new Message({
	    user: req.body.messages[0].user,
	    content: req.body.messages[0].content,
	    room: req.body.title
	  })

	  console.log('message', message)

	  let room = new Room({
	    title: req.body.title
	  })

	  message.save((err) => {
	    if (err) return err
	  })

	  room.save((err) => {
	    if (err) return err
	  })

	  res.json(message)
	})

	app.get('/', function(req, res) {
	  console.log('get route caught this')
	  res.sendFile(path.join( __dirname, '../dist/index.html'));
	});

	// and here we are telling our socket to listen for any connections to the
	// server and log a statement whenever a user connects.

	io.on('connection', function(socket) {
	  console.log('a user connected')
	  socket.on('subscribe', (data) => {
	    room = data.room
	    socket.join(room)
	    console.log('joined room', room)
	   }
	  )

	  socket.on('unsubscribe', () => { socket.leave(room)
	    console.log('leaving room', room)
	  })

	  socket.on('disconnect', () => {
	    console.log('a user disconnected')
	  })

	  socket.on('chat message', function(msg) {
	    console.log('sending message to', msg.room)
	    console.log('this message', msg)

	    let message = new Message({
	      user: msg.user,
	      content: msg.message,
	      room: msg.room
	    })

	    message.save((err) => {
	        if (err) return err
	      })

	    io.to(msg.room).emit('chat message', JSON.stringify(msg))
	  })

	  socket.on('new room', (roomData) => {
	    let message = new Message({
	      user: roomData.user,
	      content: roomData.message,
	      room: roomData.room
	    })

	    message.save((err) => {
	      if (err) return err
	    })

	  })

	  socket.on('file_upload', (data, buffer) => {
	    console.log(data)
	    const user = data.user
	    const fileName = path.join(__dirname, '../public/images', data.file)
	    const tmpFileName = path.join('/images', data.file)
	    const imageBuffer = imageDecoder(buffer)

	    fs.open(fileName, 'a+', (err, fd) => {
	      if (err) throw err;

	      fs.writeFile(fileName, imageBuffer.data, {encoding: 'base64'}, (err) => {
	        fs.close(fd, () => {
	          let message = Message({user: user, room: room, image: tmpFileName})

	          message.save((err) => {
	            if (err) return err
	          })
	          console.log('file saved successfully!')
	        });
	      })
	    })

	    console.log('reached room, sending', fileName)
	    io.to(room).emit('file_upload_success', {file: tmpFileName, user: user})
	  })
	});


	mongoose.connect(process.env['DB_HOST'])
	const db = mongoose.connection;

	db.once('open', () => {
	 server.listen(port, function(err) {
	   if (err) {
	     console.log(err);
	   } else {
	     open(`http://localhost:${port}`);
	  }
	});


	})

	/* WEBPACK VAR INJECTION */}.call(exports, "/", __webpack_require__(2), __webpack_require__(5)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict'

	var fs = __webpack_require__(2)

	/*
	 * Parses a string or buffer into an object
	 * @param {String|Buffer} src - source to be parsed
	 * @returns {Object}
	*/
	function parse (src) {
	  var obj = {}

	  // convert Buffers before splitting into lines and processing
	  src.toString().split('\n').forEach(function (line) {
	    // matching "KEY' and 'VAL' in 'KEY=VAL'
	    var keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
	    // matched?
	    if (keyValueArr != null) {
	      var key = keyValueArr[1]

	      // default undefined or missing values to empty string
	      var value = keyValueArr[2] ? keyValueArr[2] : ''

	      // expand newlines in quoted values
	      var len = value ? value.length : 0
	      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
	        value = value.replace(/\\n/gm, '\n')
	      }

	      // remove any surrounding quotes and extra spaces
	      value = value.replace(/(^['"]|['"]$)/g, '').trim()

	      obj[key] = value
	    }
	  })

	  return obj
	}

	/*
	 * Main entry point into dotenv. Allows configuration before loading .env
	 * @param {Object} options - valid options: path ('.env'), encoding ('utf8')
	 * @returns {Boolean}
	*/
	function config (options) {
	  var path = '.env'
	  var encoding = 'utf8'

	  if (options) {
	    if (options.path) {
	      path = options.path
	    }
	    if (options.encoding) {
	      encoding = options.encoding
	    }
	  }

	  try {
	    // specifying an encoding returns a string instead of a buffer
	    var parsedObj = parse(fs.readFileSync(path, { encoding: encoding }))

	    Object.keys(parsedObj).forEach(function (key) {
	      process.env[key] = process.env[key] || parsedObj[key]
	    })

	    return { parsed: parsedObj }
	  } catch (e) {
	    return { error: e }
	  }
	}

	module.exports.config = config
	module.exports.load = config
	module.exports.parse = parse

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }
/******/ ]);