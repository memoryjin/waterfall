window.onload = waterfall;

function waterfall(){
	//the pictures can be loaded
	var dataInt = {
		data: [{src:"40.jpg"},{src:"41.jpg"},{src:"42.jpg"},{src:"43.jpg"},{src:"44.jpg"},{src:"45.jpg"},{src:"46.jpg"},
		{src:"47.jpg"},{src:"48.jpg"},{src:"40.jpg"},{src:"41.jpg"},{src:"42.jpg"},{src:"43.jpg"},{src:"44.jpg"},{src:"45.jpg"},
		{src:"46.jpg"},{src:"47.jpg"},{src:"48.jpg"},{src:"49.jpg"},{src:"50.jpg"},{src:"51.jpg"},{src:"52.jpg"},{src:"53.jpg"},
		{src:"54.jpg"},{src:"55.jpg"},{src:"56.jpg"},{src:"57.jpg"},{src:"58.jpg"},{src:"59.jpg"},{src:"60.jpg"},{src:"61.jpg"},
		{src:"62.jpg"},{src:"63.jpg"},{src:"64.jpg"},{src:"65.jpg"},{src:"66.jpg"},{src:"67.jpg"},{src:"68.jpg"},{src:"69.jpg"},
		{src:"70.jpg"},{src:"71.jpg"},{src:"72.jpg"},{src:"73.jpg"},{src:"74.jpg"},{src:"75.jpg"},{src:"76.jpg"},{src:"77.jpg"},
		{src:"78.jpg"},{src:"79.jpg"},{src:"80.jpg"},{src:"81.jpg"},{src:"82.jpg"},{src:"83.jpg"},{src:"84.jpg"},{src:"85.jpg"},
		{src:"86.jpg"},{src:"87.jpg"},{src:"88.jpg"},{src:"89.jpg"},{src:"90.jpg"},{src:"91.jpg"},{src:"92.jpg"},{src:"93.jpg"}]							
		};
	//main、boxes are elementNode
	//minH is the minimun value of colsHeight and minHIndex is the index of the minimun value
	//length refer to boxes.length and dataLength refer to dataInt.data.length 
	var main, boxes, minH, minHIndex, boxWidth, length, dataLength;	
	var j = 0;//as the count of the above pictures	
	var colsHeight = [];//storage the height of columns
	
	//initial layout for the 40 pictures
	function layout(){
		dataLength = dataInt.data.length;
		boxes = document.getElementsByClassName("box");
		main = document.getElementById("main");
		boxWidth = boxes[0].offsetWidth; //as all the picture's width are the same 
		var totalWidth = document.documentElement.clientWidth;
		var cols = Math.floor(totalWidth/boxWidth);
		main.style.cssText = "Width: " + boxWidth * cols + "px; margin: 0 auto;";
		length = boxes.length;
		for(var i = 0; i < length; i++){
			if(i < cols){
				colsHeight.push(boxes[i].offsetHeight);
			}
			else{
				minH = Math.min.apply(this, colsHeight);
				minHIndex = colsHeight.indexOf(minH);
				boxes[i].style.position = "absolute";
				boxes[i].style.left = minHIndex * boxWidth + "px";
				boxes[i].style.top = minH + "px";
				colsHeight[minHIndex] += boxes[i].offsetHeight;
			}
		}
		main.style.height = Math.max.apply(this,colsHeight) + "px";	
	}
	
	//loading the pictures dynamically when the wheel is scrolling
	function scroll(){
		window.removeEventListener("scroll", scroll, false);//prevent triggering the event repeatedly
		minH = Math.min.apply(this, colsHeight);
		minHIndex = colsHeight.indexOf(minH);
		var scrollSpace = document.documentElement.scrollTop || document.body.scrollTop;
		var actualSpace = minH - scrollSpace;
		var compSpace = document.documentElement.clientHeight;
		//insert the new images to the columns according to the height
		if(actualSpace < compSpace){			
			for(var i = 0; i < 10; i++){				
				if(j < dataLength){
					var divBox = document.createElement("div");
					divBox.className = "box";
					var divPic =document.createElement("div");
					divPic.className = "pic";
					var img = document.createElement("img");
					img.alt = "picture";
					img.src = "images/" + dataInt.data[j].src;
					divPic.appendChild(img);
					divBox.appendChild(divPic);
					main.appendChild(divBox);
					/*js动态加载图片，for循环过程中图片可能没有加载完成，从而无法获得图片的height等信息，
					通过给img添加load事件处理函数，这样只有当picture完成Load后再对这些图片进行style的正确设置。
					此外，由于j是全局变量，当img.load事件处理函数开始执行时，for循环已结束，此时事件处理函数中
					的j都将指向相同的全局变量。为了解决该问题，引入了经典的IIFE*/
					(function(m){					
						img.addEventListener("load", function(){	
							minH = Math.min.apply(this, colsHeight);
							minHIndex = colsHeight.indexOf(minH);
							boxes[m + length].style.position = "absolute";
							boxes[m + length].style.top = minH + "px";
							boxes[m + length].style.left = minHIndex * boxWidth + "px"; 
							colsHeight[minHIndex] += boxes[m + length].offsetHeight;										
						}, false);
					})(j);
					j++;					
				}
				else return;//there is no more picture,use "return" to leave the function,and do not 
							//perform the following statement "window.addEventListener("scroll", scroll, false);"
			}				
		}
	window.addEventListener("scroll", scroll, false);			
	}

	layout();		
	window.addEventListener("scroll", scroll, false);
}