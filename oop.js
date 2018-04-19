var index=0,arr=[]
function boom(a,b,parentEle){
    this.par=parentEle;
    this.a=a;
    this.b=b;
    this.initElem();  //初始化页面
    this.initEVen();   //初始化默认值
    
}
boom.prototype={
    constructor:boom,
    initElem:function(){
        var x=this.a,y=this.b,img=['chicken','crayon','dj','spaceship']
        window.index
        for(let i=0;i<img.length;i++){
            arr.push('./images/'+img[i]+'.jpg')
        };
        this.divEle=$('<div id="div1" />');
        this.spanEle=$('<span class="on" />');
        
        this.par.append(this.divEle);
        this.divEle.append(this.spanEle);

        let W=parseInt($('#div1').css('width'));
        let H=parseInt($('#div1').css('height'));
        let w=W/x;
        let h=H/y;
        for(let i=0;i<y;i++){
            for(let j=0;j<x;j++){
                this.iElem=$('<i />')
                this.spanEle.append(this.iElem)
                this.iElem.css({width:w+'px',height:h+'px',left:w*j+'px',top:h*i+'px',background:'url('+arr[index]+')',backgroundSize:''+W+'px '+H+'px',backgroundPositionX:w*-j+'px',backgroundPositionY:h*-i+'px'})
            }
        }   
    },
    initEVen:function(){
        var that=this
        this.divEle.on('click',function(){
            that.go()
        })
    },
    go:function(){
        var x=this.a,y=this.b
        for (var i =0; i <$('i').length; i++){
            // 改变每个i标签爆炸的效果
            $('i').eq(i).css({transform:'perspective(800px) translateX('+(Math.random()*400-200)+'px) translateY('+(Math.random()*400-200)+'px) rotateX('+(Math.random()*380-180)+'deg) rotateY('+(Math.random()*380-180)+'deg) translateZ('+(Math.random()*200+100)+'px)',opacity:'0'});
        }
       
        index=(++index>=arr.length)? 0:index++;
        setTimeout(function(){
            $('span').remove()
            let W=parseInt($('#div1').css('width'));
            let H=parseInt($('#div1').css('height'));
            let w=W/x;
            let h=H/y;
            $('#div1').append('<span class="on" />')
            for(let i=0;i<y;i++){
                for(let j=0;j<x;j++){
                    this.iElem=$('<i />')
                    $('span').append(this.iElem)
                    this.iElem.css({width:w+'px',height:h+'px',left:w*j+'px',top:h*i+'px',background:'url('+arr[index]+')',backgroundSize:''+W+'px '+H+'px',backgroundPositionX:w*-j+'px',backgroundPositionY:h*-i+'px'})
                }
            } 
        },1000)
       
        
    }

}
