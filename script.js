const homeScreen = document.getElementById('homeScreen');
const realTimeScreen = document.getElementById('realTimeScreen');
const videoScreen = document.getElementById('videoScreen');

const realTimeSubtitlesBtn = document.getElementById('realTimeSubtitlesBtn');
const videoSubtitlesBtn = document.getElementById('videoSubtitlesBtn');
const goBackToHomeBtn = document.getElementById('goBackToHomeBtn');
const goBackToHomeBtn2 = document.getElementById('goBackToHomeBtn2');

const fontSizeSlider = document.getElementById('fontSizeSlider');
const fontSizeValue = document.getElementById('fontSizeValue');
const fontSizeSlider2 = document.getElementById('fontSizeSlider2');
const fontSizeValue2 = document.getElementById('fontSizeValue2');

const startMicBtn = document.getElementById('startMicBtn');
const subtitlesBox = document.getElementById('subtitlesBox');
let recognition;

const videoFileInput = document.getElementById('videoFile2');
const videoPlayer = document.getElementById('videoPlayer2');
const subtitlesDiv2 = document.getElementById('subtitles2');

let currentFontSize = fontSizeSlider.value;

document.addEventListener('DOMContentLoaded', () => {
    fontSizeSlider.addEventListener('input', () => {
        currentFontSize = fontSizeSlider.value;
        fontSizeValue.textContent = `${currentFontSize}px`;
        subtitlesBox.style.fontSize = `${currentFontSize}px`;
    });

    fontSizeSlider2.addEventListener('input', () => {
        currentFontSize = fontSizeSlider2.value;
        fontSizeValue2.textContent = `${currentFontSize}px`;
        subtitlesDiv2.style.fontSize = `${currentFontSize}px`;
    });

    realTimeSubtitlesBtn.addEventListener('click', () => {
        homeScreen.style.display = 'none';
        realTimeScreen.style.display = 'block';
    });

    videoSubtitlesBtn.addEventListener('click', () => {
        homeScreen.style.display = 'none';
        videoScreen.style.display = 'block';
    });

    goBackToHomeBtn.addEventListener('click', () => {
        realTimeScreen.style.display = 'none';
        homeScreen.style.display = 'block';
    });

    goBackToHomeBtn2.addEventListener('click', () => {
        videoScreen.style.display = 'none';
        homeScreen.style.display = 'block';
    });

    videoFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            videoPlayer.src = videoURL;
            videoPlayer.style.display = 'block';
            subtitlesDiv2.style.display = 'none';
        }
    });

    startMicBtn.addEventListener('click', () => {
        if ('webkitSpeechRecognition' in window) {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'ko-KR';

            recognition.onresult = (event) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                subtitlesBox.textContent = transcript;
            };

            recognition.start();
        } else {
            alert('이 브라우저는 음성 인식 기능을 지원하지 않습니다.');
        }
    });

    videoPlayer.addEventListener('play', () => {
        if ('webkitSpeechRecognition' in window) {
            if (recognition) {
                recognition.stop();
            }

            recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'ko-KR';

            recognition.onresult = (event) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                subtitlesDiv2.textContent = transcript;
                subtitlesDiv2.style.display = 'block';
            };

            recognition.start();
        } else {
            alert('이 브라우저는 음성 인식 기능을 지원하지 않습니다.');
        }
    });
});
