var imgFG = null;
var imgBG = null;

function uploadFG()
{
  var fileInput = document.getElementById("fgFile");
  var canvas = document.getElementById("canvas1");
  imgFG = new SimpleImage(fileInput);
  imgFG.drawTo(canvas);
}

function uploadBG()
{
  var fileInput = document.getElementById("bgFile");
  var canvas = document.getElementById("canvas2");
  imgBG = new SimpleImage(fileInput);
  imgBG.drawTo(canvas);
}

function composite()
{
  clearCanvases();
  var canvas1 = document.getElementById("canvas1");
  var outputImage = new SimpleImage(imgFG.width, imgFG.height);
  for (var pixel of imgFG.values())
    {
      if (pixel.getGreen() > pixel.getRed() + pixel.getBlue())
        {
          var x = pixel.getX();
          var y = pixel.getY();
          var newPixel = imgBG.getPixel(x, y);
          outputImage.setPixel(x, y, newPixel);
        }
      else
        {
          outputImage.setPixel(pixel.getX(), pixel.getY(), pixel);
        }
    }
  outputImage.drawTo(canvas1);
  
}

function clearCanvases()
{
  var canvas1 = document.getElementById("canvas1");
  var canvas2 = document.getElementById("canvas2");
  var context = canvas1.getContext("2d");
  context.clearRect(0, 0, canvas1.width, canvas1.height);
  context = canvas2.getContext("2d");
  context.clearRect(0, 0, canvas2.width, canvas2.height);
}