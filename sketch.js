et objs = [];
let colors = ['#f71735', '#f7d002', '#1A53C0', '#232323'];

function setup() {
	let canvasSize = min(windowWidth, windowHeight);
	createCanvas(canvasSize, canvasSize);
	rectMode(CENTER);
	objs.push(new DynamicShape());
}

function draw() {
	background(255);
	for (let i of objs) {
		i.run();
	}

	if (frameCount % int(random([15, 30])) == 0) {
		let addNum = int(random(1, 30));
		for (let i = 0; i < addNum; i++) {
			objs.push(new DynamicShape());
		}
	}
	for (let i = 0; i < objs.length; i++) {
		if (objs[i].isDead) {
			objs.splice(i, 1);
		}
	}
}

function easeInOutExpo(x) {
	return x === 0 ? 0 :
		x === 1 ?
		1 :
		x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 :
		(2 - Math.pow(2, -20 * x + 10)) / 2;
}

class DynamicShape {
	constructor() {
		this.x = random(0.3, 0.7) * width;
		this.y = random(0.3, 0.7) * height;
		this.reductionRatio = 1;
		this.shapeType = int(random(4));
		this.animationType = 0;
		this.maxActionPoints = int(random(2, 5));
		this.actionPoints = this.maxActionPoints;
		this.elapsedT = 0;
		this.size = 0;
		this.sizeMax = width * random(0.01, 0.05);
		this.fromSize = 0;
		this.init();
		this.isDead = false;
		this.clr = random(colors);
		this.changeShape = true;
		this.ang = int(random(2)) * PI * 0.25;
		this.lineSW = 0;
	}

	show() {
		push();
		translate(this.x, this.y);
		if (this.animationType == 1) scale(1, this.reductionRatio);
		if (this.animationType == 2) scale(this.reductionRatio, 1);
		fill(this.clr);
		stroke(this.clr);
		strokeWeight(this.size * 0.05);
		if (this.shapeType == 0) {
			noStroke();
			circle(0, 0, this.size);
		} else if (this.shapeType == 1) {
			noFill();
			circle(0, 0, this.size);
		} else if (this.shapeType == 2) {
			noStroke();
			rect(0, 0, this.size, this.size);
		} else if (this.shapeType == 3) {
			noFill();
			rect(0, 0, this.size * 0.9, this.size * 0.9);
		} else if (this.shapeType == 4) {
			line(0, -this.size * 0.45, 0, this.size * 0.45);
			line(-this.size * 0.45, 0, this.size * 0.45, 0);
		}
		pop();
		strokeWeight(this.lineSW);
		stroke(this.clr);
		line(this.x, this.y, this.fromX, this.fromY);
	}

	move() {
		let n = easeInOutExpo(norm(this.elapsedT, 0, this.duration));
		if (0 < this.elapsedT && this.elapsedT < this.duration) {
			if (this.actionPoints == this.maxActionPoints) {
				this.size = lerp(0, this.sizeMax, n);
			} else if (this.actionPoints > 0) {
				if (this.animationType == 0) {
					this.size = lerp(this.fromSize, this.toSize, n);
				} else if (this.animationType == 1) {
					this.x = lerp(this.fromX, this.toX, n);
					this.lineSW = lerp(0, this.size / 5, sin(n * PI));
				} else if (this.animationType == 2) {
					this.y = lerp(this.fromY, this.toY, n);
					this.lineSW = lerp(0, this.size / 5, sin(n * PI));
				} else if (this.animationType == 3) {
					if (this.changeShape == true) {
						this.shapeType = int(random(5));
						this.changeShape = false;
					}
				}
				this.reductionRatio = lerp(1, 0.3, sin(n * PI));
			} else {
				this.size = lerp(this.fromSize, 0, n);
			}
		}

		this.elapsedT++;
		if (this.elapsedT > this.duration) {
			this.actionPoints--;
			this.init();
		}
		if (this.actionPoints < 0) {
			this.isDead = true;
		}
	}

	run() {
		this.show();
		this.move();
	}

	init() {
		this.elapsedT = 0;
		this.fromSize = this.size;
		this.toSize = this.sizeMax * random(0.5, 1.5);
		this.fromX = this.x;
		this.toX = this.fromX + (width / 10) * random([-1, 1]) * int(random(1, 4));
		this.fromY = this.y;
		this.toY = this.fromY + (height / 10) * random([-1, 1]) * int(random(1, 4));
		this.animationType = int(random(3));
		this.duration = random(20, 50);
	}
}
let currentWork = 1; // 預設顯示作品一

function setup() {
    // 創建畫布，設定為視窗大小，並將畫布放在 body 標籤中
    createCanvas(windowWidth, windowHeight); 
    
    // 獲取選單項目並添加點擊事件監聽器
    select('#work-1').mousePressed(() => switchWork(1));
    select('#work-2').mousePressed(() => switchWork(2));
    select('#work-3').mousePressed(() => switchWork(3));
}

function draw() {
    background(240); // 淺灰色背景
    
    // 根據目前的 currentWork 變數來繪製不同的作品內容
    if (currentWork === 1) {
        drawWorkOne();
    } else if (currentWork === 2) {
        drawWorkTwo();
    } else if (currentWork === 3) {
        drawWorkThree();
    }
}

// 切換作品的函式
function switchWork(workNumber) {
    currentWork = workNumber;
    console.log('已切換至作品 ' + workNumber);
    // 這裡可以添加任何切換時需要的初始化程式碼
}

// 以下是三個作品的範例繪製函式，您可以替換成您自己的程式碼
function drawWorkOne() {
    fill(255, 0, 0); // 紅色
    noStroke();
    rect(width / 2 - 50, height / 2 - 50, 100, 100);
    fill(0);
    text('作品一：方形', width / 2 - 30, height / 2 + 70);
}

function drawWorkTwo() {
    fill(0, 0, 255); // 藍色
    ellipse(width / 2, height / 2, 100, 100);
    fill(0);
    text('作品二：圓形', width / 2 - 30, height / 2 + 70);
}

function drawWorkThree() {
    fill(0, 255, 0); // 綠色
    triangle(width / 2, height / 2 - 50, width / 2 - 50, height / 2 + 50, width / 2 + 50, height / 2 + 50);
    fill(0);
    text('作品三：三角形', width / 2 - 30, height / 2 + 70);
}

// 確保畫布在視窗大小改變時跟著調整
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}