//var

var file = document.getElementById('file');
var canvas = document.getElementById('canvas');
var uploadImgSrc;
var WidthMax = 500;
var elem = document.getElementById('ChangeValue');
var target = document.getElementById('DefaultValue');
var dlLink = document.createElement('a');
var downloadtxt = document.getElementById('Download');
var IMGflag=false;

//function

function loadLocalImage(e) {
  var fileData = e.target.files[0];

  if (!fileData.type.match('image.*')) {
    alert('画像を選択してください');
    return;
  } else {
    IMGflag=true;
    var reader = new FileReader();
    reader.onload = function () {
      uploadImgSrc = reader.result;
      canvasDraw();
    }
    reader.readAsDataURL(fileData);
  }
}

rangeValue = function (elem, target) {
  return function(evt){
    target.innerHTML = elem.value;
    WidthMax = elem.value;
    if(IMGflag){
      canvasDraw();
    }else{
    }
  }
}

function canvasDraw(imgSrc) {
  var img = new Image();
  img.src = uploadImgSrc;

  img.onload = function () {
    var HeightMax = (WidthMax / img.width) * img.height;
    canvas.width = WidthMax;
    canvas.height = HeightMax;
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, WidthMax, HeightMax);
    ctx.drawImage(img, 0, 0, WidthMax, HeightMax);
    // ダウンロードリンクを生成して出力
    dlLink.href = canvas.toDataURL();
    dlLink.download = 'sample.png';
    dlLink.innerText = 'ダウンロード';
    document.getElementById('result').appendChild(dlLink);
  }
}

// EventListener
file.addEventListener('change', loadLocalImage, false);
elem.addEventListener('input', rangeValue(elem, target));