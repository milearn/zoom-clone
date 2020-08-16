// io is global name exposed by including socket script in room.ejs
const socket = io('/');

const myCurrentVideo = document.createElement('video');
myCurrentVideo.muted = true;

const videosWrapper = document.getElementById('video-wrapper');

const peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030' // should be 443 on prod deployment
})

peer.on('open', userId=>{
    socket.emit('join-room', ROOM_ID, userId);
})
let myVideoStream;
const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', (res) => {
        console.log(res);
        video.play();
    })
    videosWrapper.appendChild(video);
}
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then((stream) => {
    myVideoStream = stream;

    addVideoStream(myCurrentVideo, stream);

    socket.on('user-connected', (userId) => {
        connectNewUser(userId, stream)
    })
    //if someone calls us
    //1. Answer the call and give them our stream to render on their client.
    //2. Access their stream and render on our client
    peer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
        })
    })
})
const chat_input = document.getElementById('chat_mesage');
document.addEventListener('keydown', (event) => {
    value = chat_input.value;
    if(event.keyCode === 13 && value !== '') {
        socket.emit('message', value)
        chat_input.value = '';
    }
})

socket.on("createMessage", message => {
    console.log(message)
    const li = document.createElement('li');
    li.textContent = message;
    document.getElementsByClassName('messages')[0].appendChild(li);
    scrollToBottom();
})


const connectNewUser = (userId, stream) => {
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    })
}

const scrollToBottom = () => {
    const chat_container = document.getElementsByClassName('main__chat_window')[0]
    chat_container.scrollTo(0, chat_container.scrollHeight)
}

const muteUnmute = () => {
    // tODO: need to implement this.
    const enabled = myVideoStream.getAudioTracks()[0]
}