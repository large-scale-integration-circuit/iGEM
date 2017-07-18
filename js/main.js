init(50, "mylegend", 320, 480, main); // ,LEvent.INIT

var backLayer, loadingLayer;
var imglist = {};
var imgData = new Array(
	{name:"backImage", path:"./img/backImage.png"},
	{name:"btnFluid", path:"./img/btnFluid.png"},
	{name:"btnSolid", path:"./img/btnSolid.png"},
	{name:"lSoldier", path:"./img/lSoldier.png"},
	{name:"lFarmer", path:"./img/lFarmer.png"},
	{name:"lBeggar", path:"./img/lBeggar.png"}
	);
//细菌图片数组
var bitmapdataList;

function main(){
	//背景层初始化
	backLayer = new LSprite();
	//在背景层上绘制黑色背景
	backLayer.graphics.drawRect(1,"#000000",[0,0,320,480],true,"#000000");
	//背景显示
	addChild(backLayer);
	//进度条读取层初始化
	loadingLayer = new LoadingSample1();
	//进度条读取层显示
	backLayer.addChild(loadingLayer);
	//利用LLoadManage类，读取所有图片，并显示进度条进程	
	LLoadManage.load(
		imgData,
		function(progress){
			loadingLayer.setProgress(progress);
		},
		gameInit
	);
}

//读取完所有图片，进行游戏标题画面的初始化工作
function gameInit(result){
	//取得图片读取结果
	imglist = result;

	//将细菌的图片数据保存到数组内
	bitmapdataList = [
		new LBitmapData(imglist["lSoldier"]),
		new LBitmapData(imglist["lFarmer"]),
		new LBitmapData(imglist["lBeggar"])
	];

	//移除进度条层
	backLayer.removeChild(loadingLayer);
	loadingLayer = null;

	//显示游戏标题
	var title = new LTextField();
	title.x = 50;
	title.y = 100;
	title.size = 30;
	title.color = "#ffffff";
	title.text = "iGEM Games";
	backLayer.addChild(title); // 引用类型

	//显示说明文
	var fluidButton, solidButton;
	var btnUp, btnOver;

	btnUp = new LBitmap(new LBitmapData(imglist["btnFluid"]));
	btnUp.scaleX = 0.5;
	btnUp.scaleY = 0.5;
	btnOver = new LBitmap(new LBitmapData(imglist["btnFluid"]));
	btnOver.scaleX = 0.5;
	btnOver.scaleY = 0.5;
	fluidButton = new LButton(btnUp,btnOver);
	fluidButton.x = 100;
	fluidButton.y = 170;
	backLayer.addChild(fluidButton);
	fluidButton.addEventListener(LMouseEvent.MOUSE_UP,startFluid)

	btnUp = new LBitmap(new LBitmapData(imglist["btnSolid"]));
	btnUp.scaleX = 0.5;
	btnUp.scaleY = 0.5;
	btnOver = new LBitmap(new LBitmapData(imglist["btnSolid"]));
	btnOver.scaleX = 0.5;
	btnOver.scaleY = 0.5;
	fluidButton = new LButton(btnUp,btnOver);
	fluidButton.x = 100;
	fluidButton.y = 230;
	backLayer.addChild(fluidButton);
	fluidButton.addEventListener(LMouseEvent.MOUSE_UP,startSolid);
}

//游戏画面初始化
function startFluid(){
	//背景层清空
	backLayer.die();
	backLayer.removeAllChild();

	//背景图片显示，再次初始化
	var bitmap = new LBitmap(new LBitmapData(imglist["backImage"]));
	backLayer.addChild(bitmap);

	//方块绘制层初始化
	graphicsMap = new LSprite();
	backLayer.addChild(graphicsMap);
	//方块预览层初始化
	nextLayer = new LSprite();
	backLayer.addChild(nextLayer);
}

function startSolid(){
	//背景层清空
	backLayer.die();
	backLayer.removeAllChild();

	//背景图片显示，再次初始化
	var bitmap = new LBitmap(new LBitmapData(imglist["backImage"]));
	backLayer.addChild(bitmap);

	//方块绘制层初始化
	graphicsMap = new LSprite();
	backLayer.addChild(graphicsMap);
	//方块预览层初始化
	nextLayer = new LSprite();
	backLayer.addChild(nextLayer);
}