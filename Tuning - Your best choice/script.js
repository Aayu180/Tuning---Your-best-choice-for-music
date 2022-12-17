console.log("Welcome to Tuning - Your best choice");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let timeStamp = document.getElementsByClassName('timeStampText');
let volumeBar = document.getElementById('volumeBar');
let volumeText = document.getElementById('volumePercentage');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Pasoori - Shae Gill", filePath: "songs/1.mp3", coverPath: "https://i.scdn.co/image/ab67616d00001e023f3d35703bdcd917dad51c4f"},
    {songName: "Unstoppable - Sia", filePath: "songs/2.mp3", coverPath: "https://i.scdn.co/image/ab67616d00001e0249e0134c686547c28b7c999f"},
    {songName: "Summer High - AP Dhillon", filePath: "songs/3.mp3", coverPath: "https://i.scdn.co/image/ab67616d00001e02b0543bafc8adee31880acfb9"},
    {songName: "Excuses - AP Dhillon", filePath: "songs/4.mp3", coverPath: "https://www.pagalworld.pw/GpE34Kg9Gq/113510/148549-excuses-ap-dhillon-mp3-song-300.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

volumeBar.addEventListener('change', ()=>{
    volumeText.innerHTML = volumeBar.value + '%'
    audioElement.volume = Number.parseFloat(volumeText.innerText) / 100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

        // if (element.classList.contains('fa-play-circle')) {
        //     element.classList.add('fa-pause-circle');
        //     element.classList.remove('fa-play-circle');
        // } else if (element.classList.contains('fa-pause-circle')) {
        //     element.classList.remove('fa-pause-circle');
        //     element.classList.add('fa-play-circle');
        // }
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})