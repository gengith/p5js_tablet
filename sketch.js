// TouchedTexts
function setup() {
  createCanvas(250, 150);
  background(200); // 描画領域を灰色に
}
	
function draw() {
	
}
	
function touchStarted(){
  text("こんにちは", touchX, touchY);
  return false;
}