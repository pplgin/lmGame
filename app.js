var express = require('express')
var bodyParser = require("body-parser"); 
var app = express(),fs=require('fs');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: false }));  

app.get('/name/:id',function(req, res){
	console.log(req.params);
	//return "ok";
});

function random(){
	var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],c="";
	for (var i =4; i >= 0; i--) {
		c+=chars[Math.ceil(Math.random()*35)];
	};	
	return c;
}
app.post('/saveImage', function (req, res) {
   var imgData = req.body.image;
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, ""),
        dataBuffer = new Buffer(base64Data, 'base64');
       var picname='upload/'+(new Date()).toLocaleDateString()+random()+".png";
       console.log(picname);
    fs.writeFile(picname, dataBuffer, function(err) {
        if(err){
            res.send(err);
        }else{
        	var m={
        		imgsrc:picname
        	}
           res.send(m);
        }
    });
    
});
app.listen(90);
console.log('90服务运行中...');