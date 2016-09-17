window.onload = waterfall;

function waterfall(){
	//the pictures can be loaded
	const dataInt = {
		data: [{src:"40.jpg"},{src:"41.jpg"},{src:"42.jpg"},{src:"43.jpg"},{src:"44.jpg"},{src:"45.jpg"},{src:"46.jpg"},
		{src:"47.jpg"},{src:"48.jpg"},{src:"49.jpg"},{src:"50.jpg"},{src:"51.jpg"},{src:"52.jpg"},{src:"53.jpg"},
		{src:"54.jpg"},{src:"55.jpg"},{src:"56.jpg"},{src:"57.jpg"},{src:"58.jpg"},{src:"59.jpg"},{src:"60.jpg"},{src:"61.jpg"},
		{src:"62.jpg"},{src:"63.jpg"},{src:"64.jpg"},{src:"65.jpg"},{src:"66.jpg"},{src:"67.jpg"},{src:"68.jpg"},{src:"69.jpg"},
		{src:"70.jpg"},{src:"71.jpg"},{src:"72.jpg"},{src:"73.jpg"},{src:"74.jpg"},{src:"75.jpg"},{src:"76.jpg"},{src:"77.jpg"},
		{src:"78.jpg"},{src:"79.jpg"},{src:"80.jpg"},{src:"81.jpg"},{src:"82.jpg"},{src:"83.jpg"},{src:"84.jpg"},{src:"85.jpg"},
		{src:"86.jpg"},{src:"87.jpg"},{src:"88.jpg"},{src:"89.jpg"},{src:"90.jpg"},{src:"91.jpg"},{src:"92.jpg"},{src:"93.jpg"}]							
		};
	//main、boxes are elementNode
	//minH is the minimun value of colsHeight and minHIndex is the index of the minimun value
	//length refer to boxes.length and dataLength refer to dataInt.data.length 
	let main, boxes, minH, minHIndex, boxWidth, length;
	let dataLength = dataInt.data.length;	
	let j = 0;//as the count of the above pictures	
	let colsHeight = [];//storage the height of columns
	let allowScroll = true;
	
	//initial layout for the 40 pictures
	function layout(){
		colsHeight = [];
		boxes = document.querySelectorAll(".box");
		main = document.querySelector("#main");
		boxWidth = boxes[0].offsetWidth; //as all the picture's width are the same 
		let width = document.documentElement.clientWidth;
		let totalWidth = (width > 500) ? width : document.body.scrollWidth;
		let cols = Math.floor(totalWidth/boxWidth);
		main.style.cssText = "Width: " + boxWidth * cols + "px; margin: 0 auto;";
		length = boxes.length;
		for(let i = 0; i < length; i++){
			if(i < cols){
				colsHeight.push(boxes[i].offsetHeight);
				boxes[i].style.position = "absolute";
				boxes[i].style.left = boxWidth * i + "px";
				boxes[i].style.top = 0;
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
		if(allowScroll === true) {
			allowScroll = false;
			minH = Math.min.apply(this, colsHeight);
			minHIndex = colsHeight.indexOf(minH);
			let scrollSpace = document.documentElement.scrollTop || document.body.scrollTop;
			let actualSpace = minH - scrollSpace;
			let compSpace = document.documentElement.clientHeight;
			//insert the new images to the columns according to the height
			if(actualSpace < compSpace){			
				for(let i = 0, colsLength = colsHeight.length; i < colsLength * 2; i++){				
					if(j < dataLength){
						let divBox = document.createElement("div");
						divBox.className = "box";
						let divPic =document.createElement("div");
						divPic.className = "pic";
						let img = document.createElement("img");
						img.alt = "picture";
						img.src = "images/" + dataInt.data[j].src;						
						divPic.appendChild(img);
						divBox.appendChild(divPic);
						main.appendChild(divBox);
						img.addEventListener("load", function(){								
							minH = Math.min.apply(this, colsHeight);
							minHIndex = colsHeight.indexOf(minH);
							divBox.style.position = "absolute";
							divBox.style.top = minH + "px";
							divBox.style.left = minHIndex * boxWidth + "px"; 
							colsHeight[minHIndex] += divBox.offsetHeight;										
						}, false);												
						j++;
					}
				}				
			}
			allowScroll = true;			
		}			
	}
	layout();		
	window.addEventListener("resize", layout, false);
	window.addEventListener("scroll", scroll, false);
}