import Koa from 'koa';
import jsonp from 'koa-jsonp'
import bodyparser from 'koa-bodyparser'
import config from './configs/config'
import convert from 'koa-convert'
import logger from 'koa-logger'
import WebSocket from 'ws'
import url from 'url'
import db from './component/mongo'
import client from './component/redis'
import Thread from './model/Thread'

import api from './api'

let app = new Koa();


app.use(bodyparser())

app.use(logger())

app.use(api())

let server = app.listen(config.app.port)

const WebSocketServer = WebSocket.Server

function createWebSocketServer(server, onConnection, onMessage, onClose, onError) {
  let wss = new WebSocketServer({
    server: server
  });
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      client.send(data);
    });
  };
  onConnection = onConnection || function () {
      console.log('[WebSocket] connected.');
    };
  onMessage = onMessage || function (msg) {
      console.log('[WebSocket] message received: ' + msg);
    };
  onClose = onClose || function (code, message) {
      console.log(`[WebSocket] closed: ${code} - ${message}`);
    };
  onError = onError || function (err) {
      console.log('[WebSocket] error: ' + err);
    };
  wss.on('connection', function (ws) {
    ws.on('message', onMessage);
    ws.on('close', onClose);
    ws.on('error', onError);
    /*if (location.pathname !== '/ws/chat') {
      // close ws:
      ws.close(4000, 'Invalid URL');
    }*/
    // check user:
    //ws.user = user;
    ws.wss = wss;
    onConnection.apply(ws);
  });
  console.log('WebSocketServer was attached.');
  return wss;
}

var messageIndex = 0;

function createMessage(type,  data) {
  messageIndex ++;
  return JSON.stringify({
    id: messageIndex,
    type: type,
    data: data
  });
}

function onConnect() {
 /* let user = this.user;
  //let msg = createMessage('join', user, `${user.name} joined.`);
  let msg = 'xin ren lai le..'
  this.wss.broadcast(msg);
  // build user list:
 /!* let users = this.wss.clients.map(function (client) {
    return client.user;
  });*!/
  this.send(createMessage('list',  users));*/
}

function onMessage(messageStr) {
  let message = JSON.parse(messageStr);
 /* const newThread =  new Thread({
    unRead:message.sentTo,
    messages:[message]
  });*/
  console.log(message)

  Thread.findByIdAndUpdate(
    message.threadId,
    {unRead:message.sentTo, $push: {messages:message }},
    {upsert:true},
    (err) => {
      console.log(err);
    });
  this.wss.broadcast(JSON.stringify(message));
  /*if(message.threadId == null || message.threadId == undefined){
    console.log('catch undefined.......');
     /!* try {
        newThread.save(err => {
          Object.assign(message,{threadId:newThread._id});
          this.wss.broadcast(JSON.stringify(message));
        });
      } catch (err) {
        console.log('error')
      }*!/
    }else{
    Thread.findOneAndUpdate(
      {'_id':message.threadId},
      { $push: {messages:message }},
      {upsert:true},
      (err) => {
        console.log(err);
      });
      this.wss.broadcast(JSON.stringify(message));
  }*/
}

function onClose() {
  /*let user = this.user;
  let msg = createMessage('left', 'is left.');
  this.wss.broadcast(msg);*/
}

app.wss = createWebSocketServer(server, onConnect, onMessage, onClose);

console.log('app started at port 3000...');
