/**
 * canvas绘制动画浮动验证码
 * code by lonelydawn 2017-04-10
 */

var createVeritification = function(){
    var GLOBAL_CHAR_NUM = 4;
    var GLOBAL_CHAR_STRING = "";
    var GLOBAL_COLOR_SET = [
        "#FFFFFF", "#DDDDDD", "#AAAAAA", "#888888", "#666666", "#444444", "#000000",
        "#FFB7DD", "#FF88C2", "#FF44AA", "#FF0088", "#C10066", "#A20055", "#8C0044",
        "#FFCCCC", "#FF8888", "#FF3333", "#FF0000", "#CC0000", "#AA0000", "#880000",
        "#FFC8B4", "#FFA488", "#FF7744", "#FF5511", "#E63F00", "#C63300", "#A42D00",
        "#FFDDAA", "#FFBB66", "#FFAA33", "#FF8800", "#EE7700", "#CC6600", "#BB5500",
        "#FFEE99", "#FFDD55", "#FFCC22", "#FFBB00", "#DDAA00", "#AA7700", "#886600",
        "#FFFFBB", "#FFFF77", "#FFFF33", "#FFFF00", "#EEEE00", "#BBBB00", "#888800",
        "#EEFFBB", "#DDFF77", "#CCFF33", "#BBFF00", "#99DD00", "#88AA00", "#668800",
        "#CCFF99", "#BBFF66", "#99FF33", "#77FF00", "#66DD00", "#55AA00", "#227700",
        "#99FF99", "#66FF66", "#33FF33", "#00FF00", "#00DD00", "#00AA00", "#008800",
        "#BBFFEE", "#77FFCC", "#33FFAA", "#00FF99", "#00DD77", "#00AA55", "#008844",
        "#AAFFEE", "#77FFEE", "#33FFDD", "#00FFCC", "#00DDAA", "#00AA88", "#008866",
        "#99FFFF", "#66FFFF", "#33FFFF", "#00FFFF", "#00DDDD", "#00AAAA", "#008888",
        "#CCEEFF", "#77DDFF", "#33CCFF", "#00BBFF", "#009FCC", "#0088A8", "#007799",
        "#CCDDFF", "#99BBFF", "#5599FF", "#0066FF", "#0044BB", "#003C9D", "#003377",
        "#CCCCFF", "#9999FF", "#5555FF", "#0000FF", "#0000CC", "#0000AA", "#000088",
        "#CCBBFF", "#9F88FF", "#7744FF", "#5500FF", "#4400CC", "#2200AA", "#220088",
        "#D1BBFF", "#B088FF", "#9955FF", "#7700FF", "#5500DD", "#4400B3", "#3A0088",
        "#E8CCFF", "#D28EFF", "#B94FFF", "#9900FF", "#7700BB", "#66009D", "#550088",
        "#F0BBFF", "#E38EFF", "#E93EFF", "#CC00FF", "#A500CC", "#7A0099", "#660077",
        "#FFB3FF", "#FF77FF", "#FF3EFF", "#FF00FF", "#CC00CC", "#990099", "#770077"
    ];

    var chars = [];
    var ctx = undefined;
    var timer = undefined;
    var canvasWidth = 1000;
    var canvasHeight = 500;

    // 获取canvas 上下文环境
    var getContext = function(){
        var canvas = document.getElementById("canvas");
        ctx =canvas.getContext("2d");
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        return ctx;
    };

    // 获取单个字符, 字符范围 0-9 A-Z a-z
    var getChar = function(){
        var char = '';
        // 返回 0- 61之间的整数
        var seed = Math.floor(Math.random()*62);

        if(seed < 10)			// seed 在 0- 9之间,字符为数字
            char = Math.floor(Math.random()*10);
        else if(seed < 36)	// seed 在10-35之间,字符为大写字母
            char = String.fromCharCode(Math.floor(Math.random()*25.99)+65);
        else if(seed < 62)	// seed 在36-62之间,字符为小写字母
            char = String.fromCharCode(Math.floor(Math.random()*25.99)+97);
        return char;
    };

    // 将单个字符封装为对象
    var getPackageChars = function(){
        for(var i=0; i<GLOBAL_CHAR_NUM; i++){
            chars[i] = {
                "x": canvasWidth/GLOBAL_CHAR_NUM*i,
                "y": canvasHeight/10*7,
                "size": Math.floor(((canvasWidth/GLOBAL_CHAR_NUM > canvasHeight)?
                        canvasHeight:canvasWidth)*8/10),
                "char": getChar(),
                "color": GLOBAL_COLOR_SET[Math.floor(Math.random()*(GLOBAL_COLOR_SET.length-0.01))]
            };
            // 字符位置移动控制 bar
            chars[i].posCtrl = (i%2 == 0)? -1: 1;
        }
        return chars;
    };

    // 检测验证码是否正确
    var veritificate = function(code){
        var txt = "";
        for(var i=0;i<GLOBAL_CHAR_NUM;i++)
            txt += chars[i].char;
        return txt.toUpperCase() == code.toUpperCase();
    };

    // 绘制字符
    var draw = function(){
        // 清空 画布
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        // 绘制 浅灰色背景
        ctx.fillStyle = "#eee";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight );
        // 绘制 字符
        // ctx.font="72px Microsoft YaHei";
        ctx.font="84px Georgia";
        for(var i=0;i<GLOBAL_CHAR_NUM;i++){
            ctx.strokeStyle = chars[i].color;
            ctx.strokeText(chars[i].char,chars[i].x,chars[i].y);
        }
    };

    // 字体动画效果
    var animation = function(){
        // 初始化 timer
        clearInterval(timer);

        timer = setInterval(function(){
            // 动态改变字符位置
            for(var i=0;i<GLOBAL_CHAR_NUM;i++){
                chars[i].y += chars[i].posCtrl;
                if(chars[i].y < canvasHeight * 5/10 || chars[i].y > canvasHeight * 9/10)
                    chars[i].posCtrl = -chars[i].posCtrl;
            }
            // 重绘字符
            draw();
        },50);
    };

    // 创建静态字体 canvas
    var createStatic = function(){
        getContext();
        getPackageChars();
        draw();
    };

    // 创建动画字体 canvas
    var createAnimation = function(){
        getContext();
        getPackageChars();
        animation();
    };

    return{
        "createStatic": createStatic,
        "createAnimation": createAnimation,
        "veritificate": veritificate
    }
};
