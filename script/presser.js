var file = document.getElementById('file');
var canvas = document.getElementById('canvas');
var uploadImgSrc;

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
  var img = new Image();
  img.src = uploadImgSrc;

  var WidthMax = 500;
  var HeightMax = (WidthMax/img.width)*img.height;

  canvas.width = WidthMax;
  canvas.height = HeightMax;
  
  var ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, WidthMax, HeightMax);

  img.onload = function () {
    ctx.drawImage(img, 0, 0, WidthMax, HeightMax);

    // ダウンロードリンクを生成して出力
    var dlLink = document.createElement('a');
    dlLink.href = canvas.toDataURL();
    dlLink.download = 'sample.png';
    dlLink.innerText = 'ダウンロード';
    document.getElementById('result').appendChild(dlLink);
  }
}