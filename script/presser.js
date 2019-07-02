//var

var file = document.getElementById('file');
var canvas = document.getElementById('canvas');
var Img;
var WidthMax = 500;
var ImgFlag=false;
var elem = document.getElementById('ChangeValue');
var target = document.getElementById('DefaultValue');
var downloadlink = document.createElement('a');

//function

function LoadImage(e) {
  var ImgData = e.target.files[0];
  if (!ImgData.type.match('image.*')) {
    alert('画像を選択してください');
    return;
  } else {
    ImgFlag=true;
    var buffer = new FileReader();
    buffer.onload = function () {
      Img = buffer.result;
      DrawCanvas();
    }
    buffer.readAsDataURL(ImgData);
  }
}

function RangeValue(elem, target) {
  return function(evt){
    target.innerHTML = elem.value;
    WidthMax = elem.value;
    if(ImgFlag){
      DrawCanvas();
    }else{
    }
  }
}

function DrawCanvas(imgSrc) {
  var img = new Image();
  img.src = Img;

  img.onload = function () {
    var HeightMax = (WidthMax / img.width) * img.height;
    canvas.width = WidthMax;
    canvas.height = HeightMax;
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, WidthMax, HeightMax);
    ctx.drawImage(img, 0, 0, WidthMax, HeightMax);
    downloadlink.href = canvas.toDataURL();
    downloadlink.download = 'result.png';
    downloadlink.innerText = 'Download';
    document.getElementById('result').appendChild(downloadlink);
  }
}

// EventListener
file.addEventListener('change', LoadImage, false);
elem.addEventListener('input', RangeValue(elem, target));