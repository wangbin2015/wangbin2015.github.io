//var title=document.getElementsByTagName('title')[0];
// window 失去焦点，停止输出
window.onblur = function() {
    document.title = '(╬▔▽▔)快回来，出BUG啦';
};
// window 每次获得焦点
window.onfocus = function() {
    document.title = 'WangBin - personal web page';
    }
//// 获取窗口宽度
//if (window.innerWidth)
//    winWidth = window.innerWidth;
//else if ((document.body) && (document.body.clientWidth))
//    winWidth = document.body.clientWidth;
////alert(winWidth)
//if(winWidth<768){
//    alert('hi')
//}