const mkio = io(':3500')

const myvideo = document.getElementById('videoload')

// new peer

// const mkpeer = new Peer(undefined, {
//     host: '/',
//     port: '3501'
// })

const createVideo = document.createElement('video')
createVideo.muted = false
navigator.mediaDevices.getUserMedia({
    video:false,
    audio:true
}).then(stream => {
    console.log(stream)
    mkvideostream(createVideo, stream)
})


// mkpeer.on('open', id => {
    mkio.emit('mk-chat-room',myroomid,userid)
// })


mkio.on('user-connected', userid => {
    console.log(userid)
})

function mkvideostream(video, strem){
    video.srcObject = strem
    video.addEventListener('playmkvideo', () => {
        video.play()
    })
    console.log(video)
    myvideo.append(video)
}