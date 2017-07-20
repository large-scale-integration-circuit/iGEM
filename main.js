init(50, "mylegend", 1000, 667, main); // ,LEvent.INIT
//声明变量
//进度条显示层，背景层，方块绘制层，方块预览层
var loadingLayer,backLayer,graphicsMap,nextLayer;
var imglist = {};
var imgData = new Array(
	{name:"backImage",path:"./images/backImage.png"},
	{name:"background",path:"./images/background.png"},
	{name:"r1",path:"./images/r1.png"},
	{name:"r2",path:"./images/r2.png"},
	{name:"r3",path:"./images/r3.png"},
	{name:"r4",path:"./images/r4.png"}
	);
function main(){
	//背景层初始化
	backLayer = new LSprite();
	//在背景层上绘制黑色背景
	backLayer.graphics.drawRect(1,"#0072E3",[0,0,1000,667],true,"#0072E3");
	//背景显示
	addChild(backLayer);
	//背景层清空
	//backLayer.die();
	//backLayer.removeAllChild();
	//背景图片显示
	//var bitmap = new LBitmap(new LBitmapData(imglist["background"]));
	//backLayer.addChild(bitmap);
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
	//移除进度条层
	backLayer.removeChild(loadingLayer);
	loadingLayer = null;
	//显示游戏标题
	var title = new LTextField();
	title.x = 370;
	title.y = 120;
	title.size = 60;
	title.color = "#ffffff";
	title.text = "solid game";
	backLayer.addChild(title);
	//显示说明文
	backLayer.graphics.drawRect(1,"#ffffff",[390,393,220,40]);
	var txtClick = new LTextField();
	txtClick.size = 20;
	txtClick.color = "#ffffff";
	txtClick.text = "点击页面开始游戏";
	txtClick.x = (LGlobal.width - txtClick.getWidth())/2;
	txtClick.y = 400;
	backLayer.addChild(txtClick);
	//添加点击事件，点击画面则游戏开始
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,gameToStart);
}
//游戏画面初始化
function gameToStart(){
	//背景层清空
	backLayer.die();
	backLayer.removeAllChild();
	//背景图片显示
	var bitmap = new LBitmap(new LBitmapData(imglist["background"]));
	backLayer.addChild(bitmap);
}