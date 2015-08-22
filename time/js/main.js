/* 
绘制接口
context.moveTo
context.lineTo
context.beginPath
context.closePath

context.lineWidth
context.strokeStyle
context.fillStyle

context.fill
context.stroke
context.arc(圆心x位置，圆心y位置，半径，开始弧度值，结束弧度值，逆时针true or 顺时针false(默认))
context.arc(500,400,300,0.5*Math.PI,1.5*Math.PI,true);
ontext.clearRect()对一个矩形空间内画布进行刷新操作
0 0.5*Math.PI 1*Math.PI 1.5*Math.PI位置不会改变
closePath()自动连接不封闭路径的首尾，声明开始路径即可重新规划路径
调用fill()方法的时候，canvas自动封闭没有封闭的路径
*/

/*
点阵数字规格：10*7 冒号规格：10*4
*/
/*
实现动画的基本函数，setInterva因为匿名函数中函数执行效率不同，或许在规定时间执行不完（更高级话题）
setInterval(
		function(){
			render();
			update();
		},
		50
		)
*/
/*
函数定义：
getCurentShowTimeSeconds():获取显示时间的毫秒数
render():计算小时分钟秒钟的各位置数值
renderDigit():绘制时间
*/
/*定义全局变量*/
// var WINDOW_WIDTH=1024;
// var WINDOW_HEIGHT=768;
var RADIUS = 8;
/*数字距离画布上边缘距离*/
var MARGIN_TOP = 60;
/*第一个数字距离画布左边缘距离*/
// var MARGIN_LEFT = 30;
var endTime = new Date();
endTime.setTime(endTime.getTime()+3600*1000);
var curShowTimeSeconds = 0;
var balls = [];
var colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]
window.onload = function() {
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
    /*第一个数字距离画布左边缘距离*/
    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
    RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;
    var canvas = document.getElementById('canvas');
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    // 建立上下文的绘图环境,canvas基于状态绘制
    var context = canvas.getContext('2d');
    curShowTimeSeconds = getCurentShowTimeSeconds();
    setInterval(
        function() {
            render(context);
            update();
        },
        50
    )
}

function getCurentShowTimeSeconds() {
    var curTime = new Date();
    // var ret = endTime.getTime() - curTime.getTime();
    var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
    // ret = Math.round(ret / 1000);
    return ret >= 0 ? ret : 0;
}

function update() {
    var nextShowTimeSeconds = getCurentShowTimeSeconds();
    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - 3600 * nextHours) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - 3600 * curHours) / 60);
    var curSeconds = curShowTimeSeconds % 60;

    if (nextSeconds != curSeconds) {
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
        };
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10));
        };
        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        };
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        };
        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10));
        };
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10));
        };
        curShowTimeSeconds = nextShowTimeSeconds;
    };
    updateBalls();
    // console.log(balls.length);
}

function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        };
    };
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            balls[cnt++] = balls[i];
        };
    };
    while (balls.length > Math.min(300, cnt)) {
        balls.pop();
    }
}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push(aBall);
            };
        };
    }
}

function render(context) {
    context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - 3600 * hours) / 60);
    var seconds = curShowTimeSeconds % 60;
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), context);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), context);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, context);
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), context);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), context);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, context);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), context);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), context);

    for (var i = 0; i < balls.length; i++) {
        context.fillStyle = balls[i].color;
        context.beginPath();
        context.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI)
        context.closePath();
        context.fill();
    }
}

function renderDigit(x, y, num, context) {
    /*使用二维循环遍历相应的二维点阵，在值为1的位置绘制半径为1的小球*/
    context.fillStyle = 'blue';
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                context.beginPath();
                context.arc(x + j * 2 * (RADIUS + 1), y + i * 2 * (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                context.closePath();
                context.fill();
            };
        };
    }
}
