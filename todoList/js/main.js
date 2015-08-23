var lists = [];
var j = 0;
var num = document.getElementsByTagName('span');
window.onload = function() {
    console.log('程序已经运行');
    // var n = getCookie('lists.length') + 1;
    // for (var i = 1; i < n; i++) {
    //     if (getCookie(i)) {
    //         addList(getCookie(i));
    //     };
    // };
    var button = document.getElementsByTagName('button')[0];
    button.onclick = function() {
            var new_value = getInputValue();
            addList(new_value);
            // setCookie(lists.length, new_value);
            // setCookie('lists.length', lists.length);
        }
        // alert('现在共有多少项' + lists.length)
}

function getInputValue() {
    var input = document.getElementsByTagName('input');
    var input_value = input[0].value;
    return input_value;
    console.log('获取输入值');
}

function addList(new_value) {
    console.log('添加输入值');
    if (new_value != '') {
        var list_group = document.getElementsByTagName('ul')[0];
        var li = document.createElement('li');
        var alist = document.createTextNode(new_value);
        var button = document.createElement('button');
        var deletetext = document.createTextNode('删除');
        li.setAttribute('class', 'list-group-item text-center');
        list_group.appendChild(li);
        li.appendChild(alist);
        button.setAttribute('class', 'btn btn-danger');
        button.setAttribute('name', j++);
        button.appendChild(deletetext);
        li.appendChild(button);
        lists.push(li);
        // addDeleteButton(lists.length);
    }
    button.onclick = function() {
        var index = button.getAttribute('name');

        deletelist(index);
    }
}

function deletelist(n) {
    // var li= document.getElementsByTagName('li');
    var button = document.getElementsByTagName('button');
    for (var i = 0; i < button.length; i++) {
        if (button[i].name == n) {
            button[i].parentNode.remove();
        }
    }

}

// function setCookie(name, value, expires) {
//     // cookie由键值对组成，每个键值对由; 隔开
//     var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
//     // 新建时间对象
//     var oDate = new Date;
//     //获取本地时间，再设置到过期时间
//     oDate.setDate(oDate.getDate() + expires);
//     //如果存在过期时间则设置过期时间，否则默认关闭浏览器删除cookie
//     if (expires) {
//         cookie += '; expires' + '=' + oDate;
//     };
//     //调用cookie属性，设置cookie
//     document.cookie = cookie;
// }

// function getCookie(name) {
//     //获取所有cookie值，由一个个键值对组成
//     var all = document.cookie;
//     //如果无查询的cookie，返回false
//     if (all == '') {
//         return false;
//     };
//     //调用split方法以; 分割字符串
//     var arr1 = all.split('; ');
//     for (var i = 0; i < arr1.length; i++) {
//         //分割出来的每一个字串再以=分割
//         var arr2 = arr1[i].split('=');
//         //如果name值与参数相同，则返回value值
//         if (decodeURIComponent(arr2[0]) == name) {
//             return decodeURIComponent(arr2[1]);
//         };
//     };
// }

// function removeCookie(name) {
//     //时间负数代表过期，浏览器自动删除
//     setCookie(name, 1, -1);
// }
