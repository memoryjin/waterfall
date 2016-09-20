window.addEventListener("load", function() {
	const dataInt = {
		data: [{src:"40.jpg"},{src:"41.jpg"},{src:"42.jpg"},{src:"43.jpg"},{src:"44.jpg"},{src:"45.jpg"},{src:"46.jpg"},
		{src:"47.jpg"},{src:"48.jpg"},{src:"49.jpg"},{src:"50.jpg"},{src:"51.jpg"},{src:"52.jpg"},{src:"53.jpg"},
		{src:"54.jpg"},{src:"55.jpg"},{src:"56.jpg"},{src:"57.jpg"},{src:"58.jpg"},{src:"59.jpg"},{src:"60.jpg"},{src:"61.jpg"},
		{src:"62.jpg"},{src:"63.jpg"},{src:"64.jpg"},{src:"65.jpg"},{src:"66.jpg"},{src:"67.jpg"},{src:"68.jpg"},{src:"69.jpg"},
		{src:"70.jpg"},{src:"71.jpg"},{src:"72.jpg"},{src:"73.jpg"},{src:"74.jpg"},{src:"75.jpg"},{src:"76.jpg"},{src:"77.jpg"},
		{src:"78.jpg"},{src:"79.jpg"},{src:"80.jpg"},{src:"81.jpg"},{src:"82.jpg"},{src:"83.jpg"},{src:"84.jpg"},{src:"85.jpg"},
		{src:"86.jpg"},{src:"87.jpg"},{src:"88.jpg"},{src:"89.jpg"},{src:"90.jpg"},{src:"91.jpg"},{src:"92.jpg"},{src:"93.jpg"}]
	};			
	
	//create flexCount according to clientWidth
	const oWaterfall = document.querySelector("section");
	const oBoxes = document.querySelectorAll(".box");
	const oHidden = document.querySelector(".hidden");
	let aColHeight = [];
	let colsCount = 0;
	let allowScroll = true;
	let allowResize = true;
	let scrollCount = 0;
	let oCols = null;

	function moveElem(origi, target, className) {
		let oMatch = origi.querySelectorAll(className);
		for(let i = 0, length = oMatch.length; i < length; i++) {
			target.appendChild(oMatch[i]);
		}
	}
	function iniLayout() {
		if(allowResize === true) {
			let clientWidth = document.documentElement.clientWidth;
			let totalWidth = (clientWidth > 500) ? clientWidth : 484;
			let _colsCount = Math.floor(totalWidth / 242);
			if(_colsCount === colsCount) return;
			else {
				allowResize = false;
				colsCount = _colsCount;
				aColHeight = [];
				moveElem(oWaterfall, oHidden, ".flex");
				for(let i = 0; i < _colsCount; i++) {
					let oDiv = document.createElement("div");
					oDiv.className = "flex";
					oWaterfall.appendChild(oDiv);					
				}
				oCols = oWaterfall.querySelectorAll(".flex");
				for(let i = 0, boxLength = oBoxes.length; i < boxLength; i++) {
					if(i < colsCount) {
						aColHeight.push(oBoxes[i].offsetHeight);						
						oCols[i].appendChild(oBoxes[i]);
					} else {				
						let minHeight = Math.min.apply(this, aColHeight);
						let minHeightIndex = aColHeight.indexOf(minHeight);
						aColHeight[minHeightIndex] += oBoxes[i].offsetHeight;
						oCols[minHeightIndex].appendChild(oBoxes[i]);	
					}
				}
				allowResize = true;				
			}								
		}
		oHidden.innerHTML = "";
	}	
	iniLayout();
	window.addEventListener("resize", iniLayout, false);

	function scroll() {
		if(allowScroll === true) {
			allowScroll = false;
			let minHeight = Math.min.apply(this, aColHeight);
			minHeightIndex = aColHeight.indexOf(minHeight);
			let scrollSpace = document.documentElement.scrollTop || document.body.scrollTop;
			let actualSpace = minHeight - scrollSpace;
			let compSpace = document.documentElement.clientHeight;	
			if(actualSpace < compSpace) {
				for(let i = 0, colsCount = aColHeight.length; i < 2 * colsCount; i++) {
					let dataLength = dataInt.data.length;
					if(scrollCount < dataLength) {
						let divBox = document.createElement("div");
						divBox.className = "box";
						let divPic =document.createElement("div");
						divPic.className = "pic";
						let img = document.createElement("img");
						img.alt = "picture";
						img.src = "images/" + dataInt.data[scrollCount].src;
						divPic.appendChild(img);
						divBox.appendChild(divPic);
						oHidden.appendChild(divBox);						
						img.addEventListener("load", function() {
							minHeight = Math.min.apply(this, aColHeight);
							minHeightIndex = aColHeight.indexOf(minHeight);
							aColHeight[minHeightIndex] += divBox.offsetHeight;
							oCols[minHeightIndex].appendChild(divBox);
						}, false);							
						scrollCount ++;
					}
				}
			}
			allowScroll = true;			
		}
	}
	window.addEventListener("scroll", scroll, false);
}, false);