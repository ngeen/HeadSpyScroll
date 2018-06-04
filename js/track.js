
var videoInput = document.getElementById('vid');
var canvasInput = document.getElementById('compare');
var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
var htracker = new headtrackr.Tracker({ calcAngles: true, ui: false, headPosition: false });
var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
var firstRatio = null;
var firstInit = true;

document.addEventListener('facetrackingEvent', function (event) {
    if (firstInit && event !== undefined) {
        var faceWidth = event.width,
            videoWidth = videoInput.width;
        if(firstRatio == videoWidth / faceWidth){
            firstInit = false;
        }
        firstRatio = videoWidth / faceWidth;

    }
    faceSpy(event);
});

var init = () => {
    htracker.init(videoInput, canvasInput);
    htracker.start();
};


var faceSpy = (ev) => {

    var faceWidth = ev.width,
        videoWidth = videoInput.width,
        face2canvasRatio = videoWidth / faceWidth;


    if (face2canvasRatio < (firstRatio - 0.1)) {
        scrollTop += 10;
        if(scrollTop>height){
            scrollTop = height;
        }
    }

    if (face2canvasRatio > (firstRatio + 0.1)) {
        scrollTop -= 10;
        if(scrollTop < 0){
            screenTop = 0;
        }
    }

    document.documentElement.scrollTop = scrollTop;

    //console.log(face2canvasRatio+" "+firstRatio);

    //document.getElementById('calc-messages').innerHTML = 'ratio: ' + face2canvasRatio;

};