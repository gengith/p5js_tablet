// TouchedTexts
let version = "2.91";
let main;
let myimages = [];
let touchinput = {
	x: -1,
	y: -1
};

class Main {

	constructor() {
		this.sequence = 1;  //メニュー画面
		this.menu = new Menu();
		this.game = new Game();
	}

	touchproc() {
		touchinput.x = -1;
		touchinput.y = -1;
	}

	draw() {
		//background('rgb(0,100,150)');
		if (this.sequence === 1){  //メニュー画面
			this.menu.proc();
			this.menu.draw();
			this.sequence = this.menu.setMainSequence(1);
		} else if (this.sequence === 2){  // ゲームメニュー1
			this.game.proc();
			this.game.draw();
		} else if (this.sequence === 3){
			ellipse(200,200,100,100);
		} else if (this.sequence === 4){
			ellipse(200,200,50,50);
		} else {
		}
		
		
	}

}

class Menu {

	constructor() {
		this.select = 2;  //メニュー選択位置
		this.selectmenu = [  // メニュー文字、メニュー位置ｘ、メニュー位置y、メニュー色、メニュー文字サイズ、選択判定bool、選択判定ｘ1、選択判定y1、選択判定ｘ2、選択判定y2、セレクト先
			['Menu',100,100,'white',50,false,0,0,0,0,0],
			['version ' + version,250,100,'black',10,false,0,0,0,0,0],
			['はじめる',100,200,'black',50,true,70,230,350,130,2],
			['TEST',100,500,'black',50,true,70,530,350,430,5]
		];
		this.setMainSequenceFlag = false;
	}




	setMainSequence(pdefault) {
		if (this.setMainSequenceFlag) {
			let tmp_select = this.select;
			this.select = 1;
			this.setMainSequenceFlag = false;
			return this.selectmenu[tmp_select][10];
		}
		return pdefault;
	}

	proc() {
	
		for (let i = 0; i < this.selectmenu.length; i++) {
			if ( this.selectmenu[i][5] && touchinput.x > this.selectmenu[i][6] && touchinput.x < this.selectmenu[i][8] && touchinput.y < this.selectmenu[i][7] && touchinput.y > this.selectmenu[i][9] ) {
				this.select = i;
				this.setMainSequenceFlag = true;
				break;
			}
			
			noFill();
			rect(this.selectmenu[i][6],this.selectmenu[i][7],this.selectmenu[i][8] - this.selectmenu[i][6],this.selectmenu[i][9] - this.selectmenu[i][7]);
			
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


class Game {

	constructor() {
		this.tranp = [];  // 0:id, 1:画像, 2:表示位置x, 3:表示位置y, 4:表裏flag
		this.nx = 6;
		this.ny = 5;
		this.ty = height / this.ny;
		this.tx = this.ty / 2;
		this.touchnum = 0;
		this.opentranp1 = 0;
		this.opentranp2 = 0;
		
		for (let i = 0; i < this.ny; i++) {
			for (let j = 0; j < this.nx; j++) {
				if( j + i * this.nx < 27) {
					this.tranp.push([j + i * this.nx, myimages[j + i * this.nx], this.tx * j, this.ty * i, false]);
				}
			}
		}
		
		this.shuffle(0,26); // 0番(トランプ背面用)の箇所に最後の一枚を移動させる。(左上から表示するため)
		
		//トランプを混ぜる操作
		for (let i = 0;  i < 100; i++) {
			this.shuffle(floor(random(1,27)), floor(random(1,27)));
		}
		
	}

	shuffle(p1,p2) {
		
		let tmp_x = this.tranp[p1][2];
		let tmp_y = this.tranp[p1][3];
		
		this.tranp[p1][2] = this.tranp[p2][2];
		this.tranp[p1][3] = this.tranp[p2][3];
		this.tranp[p2][2] = tmp_x;
		this.tranp[p2][3] = tmp_y;
		
	}

	proc() {
		
		for (let i = 1; i < 27; i++) {
			if ( !this.tranp[i][4] && touchinput.x > this.tranp[i][2] && touchinput.x < this.tranp[i][2] + this.tx && touchinput.y > this.tranp[i][3] && touchinput.y < this.tranp[i][3] + this.ty ) {
				
				if ( this.touchnum === 0 ) { //1枚目オープン
					this.tranp[i][4] = true;
					this.touchnum++;
					this.opentranp1 = i;
					break;
				}
				
				if ( this.touchnum === 1) { //2枚目オープン
					this.tranp[i][4] = true;
					this.touchnum++;
					this.opentranp2 = i;
					break;
				}
				
			}
		}
		
		if ( this.touchnum >= 2 ) {  //2枚目オープン時処理
			
			this.touchnum++;
			if ( this.touchnum >= 100 ) { //しばらく待ち
				if( this.tranp[this.opentranp1][0] % 13 === this.tranp[this.opentranp2][0] % 13 ) {
					
				} else {
					this.tranp[this.opentranp1][4] = false;
					this.tranp[this.opentranp2][4] = false;
				}
				
				this.touchnum = 0;
				
			}
			
		}
		
	}

	draw() {
				
		for (let i = 1; i < 27; i++) {  //tranp[0]はトランプ裏面画像のための特殊id
			if ( this.tranp[i][4] ) {
				image(this.tranp[i][1],this.tranp[i][2],this.tranp[i][3],this.tx,this.ty);  // トランプ表面表示
			} else {
				image(this.tranp[0][1],this.tranp[i][2],this.tranp[i][3],this.tx,this.ty); // トランプ裏面表示
			}
		}
	}

}


function preload() {
  //変数を使って画像をロード
	for (let i = 0; i < 27; i++) {
		myimages.push(loadImage('images/torannpu-illust' + i + '.png'));
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
  return false;
}