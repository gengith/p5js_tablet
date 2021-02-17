// TouchedTexts
let main;
let keyinput = {
	x: 0,
	y: 0
};

class Main {

	constructor() {
		this.sequence = 1;  //メニュー画面
		this.menu = Main.createMenu();
	}

	keyproc() {
		if (key === 'x') {
			keyinput.x += 1;
		} else {
			keyinput.x = 0;
		}
	}

	static createMenu() {
		return new Menu();
	}

	draw() {
		if (this.sequence === 1){  //メニュー画面
			this.menu.proc();
			this.menu.draw();
		} else {
		}
	}

}

class Menu {

	constructor() {
		this.x = 30;  //メニュー文字表示位置
		this.y = 30;
		this.dx = 10;  //メニュー行間
		this.dy = 50;
		this.size = 30;  //メニュー文字サイズ
		this.select = 0;  //メニュー選択位置
		this.selectmenu = [
			'Stage1',
			'Stage2',
			'Stage3',
			'testa'
		];
	}



	proc() {
		if (keyinput.x === 1 && this.select < this.selectmenu.length - 1) {
				this.select++;
		}
	}


	draw() {
		textSize(this.size);
		fill('white');
		text("Menu",this.x,this.y);
		fill('black');
		for (let i = 0; i < this.selectmenu.length; i++) {
			if (this.select === i) {
				fill('red');
			}
			text(this.selectmenu[i],this.x + this.dx,this.y + this.dy * (i + 1));
			fill('black');
		}
	}

}



function setup(){
	window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
	window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
	createCanvas(960,480);
	background('rgb(0,100,150)');
	main = new Main();
}

function draw(){
	main.keyproc();
	main.draw();

}



	
function touchStarted(){
  //text("こんにちは", touchX, touchY);
  ellipse(touchX,touchY,10,10);
  return false;
}