//var title=document.getElementsByTagName('title')[0];
// window ʧȥ���㣬ֹͣ���
window.onblur = function() {
    document.title = '(�p������)���������BUG��';
};
// window ÿ�λ�ý���
window.onfocus = function() {
    document.title = 'WangBin - personal web page';
    }
//// ��ȡ���ڿ��
//if (window.innerWidth)
//    winWidth = window.innerWidth;
//else if ((document.body) && (document.body.clientWidth))
//    winWidth = document.body.clientWidth;
////alert(winWidth)
//if(winWidth<768){
//    alert('hi')
//}