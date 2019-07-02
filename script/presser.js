var file = document.getElementById('file');
var canvas = document.getElementById('canvas');
var canvasWidth = 500;
var canvasHeight = 500;
var uploadImgSrc;

canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext('2d');

file.addEventListener('change', loadLocalImage, false);

//function

function loadLocalImage(e) {
  var fileData = e.target.files[0];

  if (!fileData.type.match('image.*')) {
    alert('画像を選択してください');
    return;
  } else {

    var reader = new FileReader();
    reader.onload = function () {
      uploadImgSrc = reader.result;
      canvasDraw();
    }
    reader.readAsDataURL(fileData);
  }
}

function canvasDraw(imgSrc) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  var img = new Image();
  img.src = uploadImgSrc;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvasWidth, this.height * (canvasWidth / this.width));
    var data = canvas.toDataURL();

      
    // ダウンロードリンクを生成して出力
    var dlLink = document.createElement('a');
    dlLink.href = data;
    dlLink.download = 'sample.png';
    dlLink.innerText = 'ダウンロード';
    document.getElementById('result').appendChild(dlLink);
  }
}