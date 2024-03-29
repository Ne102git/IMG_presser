//var

var file = document.getElementById('file');
var canvas = document.getElementById('canvas');
var Img;
var ImgData;
var WidthMax = 500;
var ImgFlag=false;
var elem = document.getElementById('ChangeValue');
var target = document.getElementById('DefaultValue');
var DownloadLink = document.createElement('a');

//function

function LoadImage(e) {
  ImgData = e.target.files[0];
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
    var HeightMax = (WidthMax / this.width) * this.height;
    canvas.width = WidthMax;
    canvas.height = HeightMax;
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, WidthMax, HeightMax);
    ctx.drawImage(img, 0, 0, WidthMax, HeightMax);
    DownloadLink.href = canvas.toDataURL();
    DownloadLink.download = 'result.png';
    DownloadLink.innerText = 'Download';
    document.getElementById('result').appendChild(DownloadLink);
    document.getElementById('filesizetxt').innerHTML = "アップロード時のファイルサイズ: " + ImgData.size;
  }
}

// EventListener
file.addEventListener('change', LoadImage, false);
elem.addEventListener('input', RangeValue(elem, target));