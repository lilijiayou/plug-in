var scrollImg = function(parent,img){
    //添加绑定事件
    function addEvent(obj,type,func){
        if(obj.addEventListener){
            obj.addEventListener(type,func,false);
        }else if(obj.attachEvent){
            obj.attachEvent('on'+type,func);
        }
    }

    //建立某些参数
    this.v={
        eleGroup:null,
        screenHeight:null,
        scrolloverHeight:null,
        limitHeight:null
    };
    var that = this.v;
    //对数据进行初始化
    this.init = function(element){
        that.eleGroup=document.getElementsByTagName(element);
        that.screenHeight=document.documentElement.clientHeight;
        that.scrolloverHeight=document.body.scrollTop;
        for(var i=0,j=that.eleGroup.length;i<j;i++){
            if(that.eleGroup[i].offsetTop<=that.screenHeight && that.eleGroup[i].getAttribute(img)){
                that.eleGroup[i].setAttribute('src',that.eleGroup[i].getAttribute(img));
                that.eleGroup[i].removeAttribute(img)
            }
        }

    };
    //判断滚动高度
    function lazyLoad(){
        if(document.body.scrollTop == 0){
            that.limitHeight=document.documentElement.scrollTop+document.documentElement.clientHeight;
        }else{
            that.limitHeight=document.body.scrollTop+document.documentElement.clientHeight;
        }
        for(var i=0,j=that.eleGroup.length;i<j;i++){
            if(that.eleGroup[i].offsetTop<=that.limitHeight && that.eleGroup[i].getAttribute(img)){
                that.eleGroup[i].src=that.eleGroup[i].getAttribute(img);
                that.eleGroup[i].removeAttribute(img)
            }
        }
    }
    addEvent(parent,'scroll',lazyLoad);
};