// 函数说明：
// 1、轮播幻灯片函数：scrollFunc()
// 2、cookie函数：CookieUtil()
window.onload = function() {
		scrollFunc();
		killRemind.remove();
		killRemind.never();
		md5();
		tabCourse();
	}
	//登录框Md5加密
function md5() {
	var userName = document.getElementsByName('userName')[0];
	var password = document.getElementsByName('password')[0];
	var logoin = document.getElementsByClassName('logoin')[0];
	logoin.onclick = function() {
		userName.value = hex_md5(userName.value);
		password.value = hex_md5(password.value);
		if (1) {
			// alert("hiiii");
		}
	}
}

// 封装Ajax
function ajax(url, options) {
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest;
	}else{
		xhr=new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	xhr.open('GET', url);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				options.onsuccess(xhr);
			}
		}
	}
}
//获取课程列表函数
function getCourse(pageNo, psize, type) {
	var ajaxOnsuccess = function() {
		listA = document.getElementById('listA');
		page = document.getElementById('page');
		listA.innerHTML = null;
		for (var i = 0; i < options.data.psize; i++) {
			var oli = document.createElement('li');
			var json = JSON.parse(xhr.responseText);
			oli.innerHTML = '<li><img src="' + json.list[i]['middlePhotoUrl'] + '"/>' + '<p>' + '&nbsp;' + json.list[i]['name'] + '&nbsp;' + '</p>' + '<p>' + '&nbsp;' + json.list[i]['provider'] + '&nbsp;' + '</p>' + '<p>' + '&nbsp;' + '&nbsp;' + '&nbsp;' + json.list[i]['learnerCount'] + '&nbsp;' + '</p>' + '<p>' + '&nbsp;' + '￥' + json.list[i]['price'] + '</p></li>';
			listA.appendChild(oli);
		};
	}
	var url = 'http://study.163.com/webDev/couresByCategory.htm';
	var options = {
		data: {
			pageNo: pageNo,
			psize: psize,
			type: type
		},
		onsuccess: ajaxOnsuccess
	};
	var URL = url + '?pageNo=' + pageNo + '&psize=' + psize + '&type=' + type;
	ajax(URL, options);
};
//tab改变课程类型
function tabCourse() {
		pageNo = 1;
		psize = 20;
		type = 20;
		var tabA = document.getElementsByClassName('tabA')[0];
		var tabB = document.getElementsByClassName('tabB')[0];
		// page.innerHTML = null;	
		for (var j = 1; j < 9; j++) {
			var pli = document.createElement('li');
			pli.innerHTML = j;
			pli.style.cursor = 'pointer';
			page.appendChild(pli);
		};
		var ali = page.getElementsByTagName('li');
		for (var i = 0; i < ali.length; i++) {
			ali[i].index = i;
			ali[i].onclick = function() {
				getCourse(this.index + 1, psize, type);
			}
		};
		tabA.onclick = function() {
			type = 10;
			getCourse(pageNo, psize, type);
		}
		tabB.onclick = function() {
			type = 20;
			getCourse(pageNo, psize, type);
		}
		getCourse(pageNo, psize, type);
	}
	//最热排行获取
var getCharts = (function() {
	var url = 'http://study.163.com/webDev/hotcouresByCategory.htm';
	if (window.XMLHttpRequest) {
		xhr1 = new XMLHttpRequest;
	}else{
		xhr1=new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	xhr1.open('GET', url);
	xhr1.send();
	xhr1.onreadystatechange = function() {
		if (xhr1.readyState == 4) {
			if (xhr1.status == 200) {
				for (var i = 0; i < 10; i++) {
					var charts = document.getElementById('charts');
					var cli = document.createElement('li');
					var rank = JSON.parse(xhr1.responseText);
					cli.innerHTML = '<img src="' + rank[i]['smallPhotoUrl'] + '"/>' + '<p>' + rank[i]['name'] + '</p>' + '<div><p>' + '&nbsp;'+rank[i]['learnerCount'] + '</p></div>';
					charts.appendChild(cli);
				}

			}
		}
	}
})();
// cookie函数
var CookieUtil = {
		set: function(name, value, expires) {
			var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
			var oDate = new Date;
			oDate.setDate(oDate.getDate() + expires);
			if (expires) {
				cookie += '; expires' + '=' + oDate;
			}
			document.cookie = cookie;
		},
		get: function() {
			var cookie = {};
			var all = document.cookie;
			if (all == '') {
				return cookie;
			};
			var list = all.split('; ')
			for (var i = 0; i < list.length; i++) {
				var item = list[i].split('=');
				if (decodeURIComponent(item[0]) == arguments[0]) {
					return decodeURIComponent(item[1]);
				};
			};
		},
		remove: function(name, value, expires) {
			this.set(name, '', new Date(0));
		}
	}
	//消灭顶部小黄条
var killRemind = {
	remove: function() {
		var close = document.getElementsByClassName('close')[0];
		if (close.addEventListener) {
			close.addEventListener('click', this.handler, false)
		} else {
			close.attachEvent('onclick', this.handler);
		}
	},
	handler: function() {
		var remind = document.getElementById('remind');
		CookieUtil.set('name', 'killRemind', 10);
		remind.setAttribute('id', 'killremind');
	},
	never: function() {
			if (CookieUtil.get('name') == 'killRemind') {
				remind.setAttribute('id', 'killremind');
			};
		}
		// var view=document.getElementsByClassName('view')[0];
}


// **********轮播幻灯片函数***********
function scrollFunc() {
	var scroll = document.getElementsByClassName("scroll")[0];
	var oList = document.getElementsByClassName("list");
	var oCount = document.getElementsByClassName("count");
	var oImg = oList[0].getElementsByTagName("a");
	var oNum = oCount[0].getElementsByTagName("li");
	var timer = play = null;
	var i = index = 0;
	//切换按钮
	for (i = 0; i < oNum.length; i++) {
		oNum[i].index = i;
		oNum[i].onmouseover = function() {
			show(this.index)
		}
	}
	//鼠标划过关闭定时器
	scroll.onmouseover = function() {
		clearInterval(play)
	};

	//鼠标离开启动自动播放
	scroll.onmouseout = function() {
		autoPlay()
	};

	//自动播放函数
	function autoPlay() {
		play = setInterval(function() {
			index++;
			index >= oImg.length && (index = 0);
			show(index);
		}, 5000);
	}
	autoPlay(); //应用
	//图片切换, 淡入淡出效果
	function show(a) {
		index = a;
		var alpha = 0;
		for (i = 0; i < oNum.length; i++) oNum[i].className = "";
		oNum[index].className = "current";
		clearInterval(timer);

		for (i = 0; i < oImg.length; i++) {
			oImg[i].style.opacity = 0;
			oImg[i].style.filter = "alpha(opacity=0)";
		}

		timer = setInterval(function() {
			alpha += 1;
			alpha > 100 && (alpha = 100);
			oImg[index].style.opacity = alpha / 100;
			oImg[index].style.filter = "alpha(opacity = " + alpha + ")";
			alpha == 100 && clearInterval(timer)
		}, 20);
	}
};
//遮罩效果
function showdiv() {            
            document.getElementById("bg").style.display ="block";
            document.getElementById("show").style.display ="block";
        }
function hidediv() {
            document.getElementById("bg").style.display ='none';
            document.getElementById("show").style.display ='none';
        }