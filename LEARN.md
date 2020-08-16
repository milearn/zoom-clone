## What is express?
web framework for Node JS

- All views should be inside `views` folder and ejs is set as a `view engine` in server.
- ejs is embedded JS
- uuid is used to generate a new unique room.
## Peer JS:
- wrapper around WebRTC for easier configuration and customizability
- WebRTC allows streaming audio/video with peers w/o any requirement of any 3rd party softwares.

## Basic stream

- `Access` : Ask browser `navigator` to get stream of audio and video.
- A promise will give us the stream of data
```
MediaStream {
    active: true
    id: "3RKiNIZfHof4BaoB2Nk2zEN92bWuxxvra1Ov"
    onactive: null
    onaddtrack: null
    oninactive: null
    onremovetrack: null
}
```
- `Render`: We append a `video` element in browser and give it a `src` of `stream.id`.
- `Play`: we listen for loadedmetadata event and play the video in callback

## Allowing others to stream their video

### Using sockets
- socket.io is for real time communication
- It provides two-way communication on a channel
- with socket protocol server can request for data in contrast with http.

### Workflow (WIP)
- server is listening to `join-room` event.
- client emits this action and passes roomId.
- server adds you to that roomId and broadcast other members on that roomId that a new user has added this room.


### PROD deployment
- For prod deployment on Heroku, go here: https://youtu.be/ZVznzY7EjuY?t=11475

## Things to Learn:
1. About EJS. and other Html templating engines, which are easy to use
    Ex: Handlebars, pub(prefered)
2. BEM model and other CSS models.
3. Peer JS, Socket.IO: Explore more here

