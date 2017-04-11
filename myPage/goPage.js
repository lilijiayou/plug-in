var myPage = function (obj) {
    this.v = obj;
    var that = this.v;
    var $this = this;
    // var num = that.index*that.limit;
    //总页数
    var pages = Math.ceil(that.childs.length/that.limit);
    //总数据长度
    var number = $child.length;

    //执行分页操作
   this.goPage = function (page){
       that.index = page;
        for(var i = 0; i < number; i++){
            if(i < that.index*that.limit && i >= (that.index-1)*that.limit){
                if($child[i]){
                    $child[i].style.display = 'block';
                }
            }else{
                $child[i].style.display = 'none';
            }
        }

       //生成信息
       var tempStr = "共"+number+"条记录 <span id='page'>"+page+"</span>/"+pages+"页 ";
       //判断是否为首页
       if(that.index>1){
           tempStr += "<a href=\"#\" id='index'>首页</a>";
           tempStr += "<a href=\"#\" id='prev'><上一页</a>"
       }else{
           tempStr += "首页";
           tempStr += "<上一页 ";
       }
        //是否添加页码
       if(that.pages){
           var $page = parseInt(page);

           if($page <= 3){
               $page = 3;
           }else if($page+2 >= pages){
               $page = pages-2;
           }

           for(var j = $page-2; j <= $page+2; j++ ){
               tempStr += "<span ";
               if(j == page){
                   tempStr += "style='background-color:pink'";
               }
               tempStr +=  " class='"+that.pageclass+"'>"+j+"</span>";
           }
       }

       //判断是否为末页
       if(that.index<pages){
           tempStr += "<a href=\"#\" id='next'>下一页></a>";
           tempStr += "<a href=\"#\" id='end'>尾页</a>";
       }else{
           tempStr += " 下一页>";
           tempStr += "尾页";
       }
       tempStr += "<input type='text' style='width: 32px' id='myPage'><button class='pageGo'>GO</button>";
       $Page.innerHTML = tempStr;
    };

    //调用分页
    that.idPage.addEventListener('click',function (e) {
        if(e.target.id == 'next'){
            $this.goPage(++that.index);
        }else if(e.target.id == 'index'){
            $this.goPage(1);
        }else if(e.target.id == 'prev'){
            $this.goPage(--that.index);
        }else if(e.target.id == 'end'){
            $this.goPage(pages);
        }else if(e.target.className == that.pageclass){
            $this.goPage(e.target.innerText);
        }else if(e.target.className == 'pageGo'){
            $this.goPage(document.getElementById('myPage').value);
        }
    });

    //初始化
    this.init = function () {
        this.goPage(that.index);
    };

};




