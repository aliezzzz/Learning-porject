function showPic(whichpic){
	if (!document.getElementById('placeholder')) return false;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById('placeholder');
	if (placeholder.nodeName != 'IMG') return false;
	placeholder.setAttribute('src', source);
	if (document.getElementById('description')){
		var text = whichpic.getAttribute('title') ? whichpic.getAttribute('title') : '';
		var description = document.getElementById('description');
		if (description.firstChild.nodeType == 3){
			description.firstChild.nodeValue = text;
		}
	}
	return true;
}
function prepareGallery(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById('imagegallery')) return false;
	var gallery = document.getElementById('imagegallery');
	var links = gallery.getElementsByTagName('a');
	for (var i=0; i < links.length; i++){
		links[i].onclick = function(){
			return showPic(this) ? false : true;
		};
	}
}
function popUp(winURL){
	window.open(winURL,"popup","width=320,height=480");
}
function prepareLinks(){
	if (!document.getElementsByTagName) return false;
	var links = document.getElementsByTagName('a');
	for (var i=0;i<links.length;i++){
		if (links[i].getAttribute('class')=='popup'){
			links[i].onclick = function(){
				popUp(this.getAttribute('href'));
				return false;
			};
		}
	}
}

function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		};
	}
}
function preparePlaceholder(){
	var placeholder = document.createElement("img");
	placeholder.id = 'placeholder';
	placeholder.src = 'images/placeholder.png';
	placeholder.alt = 'my image gallery';
	var description = document.createElement('p');
	description.id = description;
	var description_txt = document.createTextNode('Choose an image.');
	description.appendChild(description_txt);
	var imagegallery = document.getElementById('imagegallery');
	imagegallery.parentNode.insertBefore(placeholder, imagegallery);
	imagegallery.parentNode.insertBefore(description, imagegallery);
}
addLoadEvent(prepareGallery);
addLoadEvent(prepareLinks);
addLoadEvent(preparePlaceholder);