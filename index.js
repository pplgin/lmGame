var cur = "p1",
	canvasDom = document.getElementById("demoCanvas");
canvasDom.setAttribute('width', 295);
canvasDom.setAttribute('height', 660);
canvasDom.style.background = "url(images/per1.png)"
var con = canvasDom.getContext('2d');
var points = {
	p1: {
		x: 0,
		y: 0
	},
	p2: {
		x: 54,
		y: 148
	},
	p3: {
		x: 0,
		y: 178
	},
	p4: {
		x: 54,
		y: 186,
		pos:'destination-over'
	},
	p5: {
		x: 106,
		y: 268
	},
	p6: {
		x: 0,
		y: 319
	},
	p7: {
		x: 95,
		y: 475
	},
	p8: {
		x:54,
		y: 613
	},
	p0:{
		x:0,
		y:0,
		imgsrc:'images/per1.png',
		pos:'destination-over'
	}
}

function ImgDraw(obj,con)
{
	var img=new Image;
	if(obj.imgsrc!=undefined&&obj.imgsrc!="")
	{
		img.crossOrigin = "Anonymous";
		img.onload = function() {
			con.globalCompositeOperation=obj.pos?obj.pos:'source-over';
			con.drawImage(img, obj.x,obj.y);
		};
		img.src =obj.imgsrc;
		if (img.complete || img.complete === undefined) {
			img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
			img.src = obj.imgsrc;
		}
	}
}


var DOMURL = window.URL || window.webkitURL || window;
$('.cont a').on('click', function() {
	var img = new Image,
		src = $(this).find('img').attr('src');
		points[cur].imgsrc=src;
	$('#'+cur).attr('src', src).show();	
});

//点击切换图片
$('.mb a').on('click', function() {
	var num = $(this).attr('for');
	cur = "p" + num;
	$('.cont img').each(function() {
		var src = $(this).attr('src').replace(/(\d)/, num);
		$(this).attr('src', src);
	});
	if($('#'+cur).is(':visible'))
	{
		$('#'+cur).hide();	
		points[cur].imgsrc='';
	}
	else{
		$('#'+cur).show();		
	}

});



//保存图片
$('#save').on('click', function() {
	var c=0;
	for (var i in points)
	{
		(function(j){
			ImgDraw(points[j],con);
			++c;
		})(i)
	}
	if(c==9)
	{
		setTimeout(function(){
			$.ajax({
				url: '/saveImage',
				type: 'post',
				data: {
					image: canvasDom.toDataURL()
				},
			})
			.done(function(data) {
				if (data.imgsrc) {
					//alert('保存成功！');
					sessionStorage.setItem('imgsrc', data.imgsrc);
					window.location.href = "/share.html"
				}
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		},1000);
	}
});