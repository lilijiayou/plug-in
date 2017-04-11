//轮播图
var myplay = function (box,fl,fr,page){
    this.myBox = box;//大盒子的类名
    this.myPage = page;
    this.myBox.style.overflow = "hidden";
    this.myUl = this.myBox.getElementsByTagName("ul")[0];
    this.myLi = this.myUl.getElementsByTagName("li");
    var str = "";
    var num = 0;
    var my = this;
    var myWidth = this.myBox.offsetWidth;
    this.imgLeth = this.myLi.length;

    //循环添加分页按钮
    if(this.myPage){
        for(var i = 0; i < this.myLi.length; i++){
            str += "<span></span>";
        }
        this.myPage.innerHTML = str;
        this.mySpan = this.myPage.getElementsByTagName("span");
        this.mySpan[0].className = "index";//按钮的颜色
        this.myPage.style.marginLeft = -this.myPage.offsetWidth/2+"px";
        for(var n = 0; n < my.imgLeth ; n++){
            this.mySpan[n].index = n;
            this.mySpan[n].onclick = function () {
                for(var j = 0; j < my.imgLeth;j++){
                    my.mySpan[j].className = "";
                }
                num = this.index;
                my.mySpan[num].className = "index";
                my.myUl.style.marginLeft = -num*myWidth+"px";
            }
        }
    }

    var oLi = this.myLi[0].cloneNode(true);
    this.myUl.appendChild(oLi);
    this.myUl.style.width = this.myLi.length*myWidth+"px";
    for(var li = 0; li < oLi.length; li++){
        this.myLi[li].style.float = "left";
    }


    //执行动画
    function doTime(n){
        if(my.mySpan){
            for(var j = 0; j < my.imgLeth;j++){
                my.mySpan[j].className = "";
            }
        }

        if(num > my.imgLeth){
            num = 1;
            my.myUl.style.marginLeft = 0;
        }
        if(num < 0){
            num = my.imgLeth-1;
            my.myUl.style.marginLeft = -my.imgLeth*myWidth+"px";
        }
        starts(n);
        console.log(num);
        if(my.mySpan){
            if(num == my.imgLeth){
                my.mySpan[0].className = "index";
            }else{
                my.mySpan[num].className = "index";
            }
        }

    }

    function flBtn(){
        clearInterval(timer1);
        my.myUl.style.marginLeft = -num*myWidth+"px";
        num++;
        doTime(10);
    }
    if(fl){
        this.flBton = fl;
        this.flBton.onclick = function () {
            flBtn();
        };
    }
    if(fr){
        this.frBtn = fr;
        this.frBtn.onclick = function () {
            clearInterval(timer1);
            my.myUl.style.marginLeft = -num*myWidth+"px";
            num--;
            doTime(-10);
        };
    }
    //创建定时器
    var timer1 = null;
    function starts(n){
        timer1 = setInterval(function () {
            my.myUl.style.marginLeft = (my.myUl.offsetLeft-n)+"px";
            if(my.myUl.offsetLeft == -num*myWidth){
                clearInterval(timer1);
            }
        },10);
    }
    var timer = setInterval(flBtn,2000);
    this.myBox.onmouseover = function () {
        clearInterval(timer);
    };
    this.myBox.onmouseout = function () {
        timer = setInterval(flBtn,2000);
    }
}