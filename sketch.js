// TouchedTexts
let main;
let touchinput = {
	x: -1,
	y: -1
};

class Main {

	constructor() {
		this.sequence = 1;  //メニュー画面
		this.menu = Main.createMenu();
	}


	static createMenu() {
		return new Menu();
	}

	static setSequence(p_seq) {
		this.sequence = p_seq;
	}

	touchproc() {
		touchinput.x = -1;
		touchinput.y = -1;
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
		this.select = 1;  //メニュー選択位置
		this.selectmenu = [  // メニュー文字、メニュー位置ｘ、メニュー位置y、メニュー色、メニュー文字サイズ、判定bool、判定ｘ、判定y
			['Menu',100,100,'white',50,false,0,0],
			['Stage1',100,200,'black',50,true,200,150],
			['Stage2',100,300,'black',50,true,200,250],
			['Stage3',100,400,'black',50,true,200,350],
			['testa',100,500,'black',50,true,200,450]
		];
	}



	proc() {
	
		for (let i = 0; i < this.selectmenu.length; i++) {
			if ( this.selectmenu[i][5] && touchinput.x > this.selectmenu[i][1] && touchinput.x < this.selectmenu[i][6] && touchinput.y < this.selectmenu[i][2] && touchinput.y > this.selectmenu[i][7] ) {
				this.select = i;
			}
		}


		
	}


	draw() {
	
		for (let i = 0; i < this.selectmenu.length; i++) {
			textSize(this.selectmenu[i][4]);
			fill(this.selectmenu[i][3]);
			if (this.select === i) {
				fill('red');
			}
			text(this.selectmenu[i][0],this.selectmenu[i][1],this.selectmenu[i][2]);
		}

	}

}



function setup(){
	window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
	window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
	createCanvas(960,1200);
	background('rgb(0,100,150)');
	main = new Main();
}

function draw(){
	main.draw();
	main.touchproc();
}



	
function touchStarted(){
  touchinput.x = touchX
  touchinput.y = touchY
  ellipse(touchX,touchY,10,10);
  return false;
}