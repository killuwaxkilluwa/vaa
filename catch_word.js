var myport;
var mp3url;
var cc = "#08acdf",ct = "#FFFFFF";
var sk = false,ck = true,ak = false;
initialize();
//killuwa add
// Main initialization function. Loads options and sets listeners.
function initialize() {
  // Manually inject the stylesheet into non-HTML pages that have no <head>.
  if (!document.head && document.body) {
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = chrome.extension.getURL('css/style.css');

    document.body.appendChild(link);
  }

 checkState();
myport=chrome.extension.connect({name:"wordterminate"});
myport.onMessage.addListener(onMessageRecieved);
myport.postMessage({message:"currentsc"});//sc stands for shortcut
//beginEventListener();

}






function checkState()//if the worksheet is not set,do not begin catch word;
{
	chrome.extension.sendRequest(
		{type: 'currentstate'},
		function (response) {
		if(response.result) beginEventListener();
		}
	);
}
function onMessageRecieved(a){
	if (a.message == "translate") {
			//mp3url = a.mp3url;
			var temptxt = a.txt;
			var b = document.getElementById("bubble_cont");
			if (b) b.innerText = temptxt;
			else {
			  hide();
			  show(temptxt)
			}
		}else if(a.message=="currentsc"){
			sk=(a.sk==true)?true:false;ck=(a.ck==true)?true:false;ak=(a.ak==true)?true:false;
		}
}
var styleInsert = document.createElement("style"),
styleContent = document.createTextNode(".sound { padding-left: 16pt; margin-top: 1px; margin-right: 1px; width: 16px; height: 16px; background: no-repeat url(data:image/png;base64,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%3D) !important;}#bubble_arrow {padding:0px margin: 0px;}#bubble_sel {visibility:hidden; position:absolute; z-index: 9998}#bubble {opacity: .93; position:absolute; display:block; z-index: 9998; font-family: Lucida grande, arial, sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal;}#bubble_cont{padding:7px 7px 7px 7px; z-index: 9998; -webkit-border-radius: 7px;}");
styleInsert.type = "text/css";
if (styleInsert.styleSheet) styleInsert.styleSheet.cssText = styleContent.nodeValue;
else {
  styleInsert.appendChild(styleContent);
  document.getElementsByTagName("head")[0].appendChild(styleInsert)
}
function beginEventListener()
{
	document.addEventListener("mouseup",
	function(a) {
	  if(a.target.id == "play"){
		//(new Audio(mp3url)).play();
	  }else if (a.target.parentNode.id != "bubble") {
		hide();
		myport=chrome.extension.connect({name:"wordterminate"});
		myport.onMessage.addListener(onMessageRecieved);
		myport.postMessage({
		  message: "select",
		  txt: "" + window.getSelection()
		});
		window.getSelection().type == "Range" && a.shiftKey == sk && a.ctrlKey == ck && a.altKey == ak && myport.postMessage({
		  message: "translate",
		  txt: "" + window.getSelection()
		})
	  }
	},
	false);
}
function show(a) {
  range = window.getSelection().getRangeAt(0);
  for (var b = range.commonAncestorContainer.childNodes,
  c = range.commonAncestorContainer.offsetWidth,
  e = 0; e < b.length; e++) if (b[e].offsetWidth > c && b[e].innerHTML != "") c = b[e].offsetWidth;
  bubble = document.createElement("div");
  bubble.setAttribute("id", "bubble");
  bubble.innerHTML = "<div id='bubble_up'></div><div id='bubble_cont_fram'><div id='bubble_cont' style='margin-left:10px; margin-right:10px; max-height:250px; overflow:auto;'>" + a + "</div></div><div id='bubble_down'></div>";
  document.body.appendChild(bubble); 
  clonedSelection = range.cloneContents();
  div = document.createElement("span");
  div.setAttribute("id", "bubble_sel");
  div.appendChild(clonedSelection);
  range.insertNode(div);
 // alert(document.getElementById("bubble_cont"));
  a = document.getElementById("bubble_cont_fram");
  a.setAttribute("style", "background: " + cc);
  a.style.webkitBoxShadow = "0px 0px 2px " + cc + "";
  a.style.color = ct;
  a.style.height = "300px";
  a.style.width = "450px";
  if (c > 0) {
    bubble.style.width = "100px";
    div.style.maxWidth = "46px"
  }
  bubble.style.minWidth = "46px";
  div.style.minWidth = "46px";
  if (document.body.clientWidth - (ObjectPosition(div)[1] + div.offsetWidth) <= 0) {
    c = ObjectPosition(div)[1] - (ObjectPosition(div)[1] + div.offsetWidth - document.body.clientWidth);
    div.style.left = c + "px"
  }
  position()
}
function position() {
  var a = document.getElementById("bubble"),
  b = document.getElementById("bubble_sel"),
  c = document.getElementById("bubble_up"),
  e = document.getElementById("bubble_down"),
  d = ObjectPosition(b)[0] - a.offsetHeight + document.body.scrollTop,
  f = ObjectPosition(b)[1] + b.offsetWidth / 2 - a.offsetWidth / 2,
  g = d - 8 - window.pageYOffset,
  h = f + window.pageXOffset,
  i = document.body.clientWidth - f;
  if (g <= 0 && h <= 0) {
    d = d + a.offsetHeight + b.offsetHeight;
    f = 1;
    d -= 8;
    c.innerHTML = "<left><canvas id='bubble_arrow' width='14' height='8' style='margin-left:15px; vertical-align: bottom;'></canvas></left>";
    draw_arrow("up")
  } else if (g <= 0 && i <= 0) {
    d = d + a.offsetHeight + b.offsetHeight;
    f -= a.offsetWidth / 2;
    d -= 8;
    c.innerHTML = "<right><canvas id='bubble_arrow' width='14' height='8' style='margin-right:15px; vertical-align: bottom;'></canvas></right>";
    draw_arrow("up")
  } else if (g <= 0) {
    d = d + a.offsetHeight + b.offsetHeight;
    c.innerHTML = "<center><canvas id='bubble_arrow' width='14' height='8' style='vertical-align: bottom;'></canvas></center>";
    draw_arrow("up")
  } else if (h <= 0) {
    f = 1;
    d -= 8;
    e.innerHTML = "<left><canvas id='bubble_arrow' width='14' height='14' style='margin-left:15px; vertical-align: top;'></canvas></left>";
    draw_arrow("down")
  } else if (i <= 0) {
    f -= a.offsetWidth / 2;
    d -= 8;
    e.innerHTML = "<right><canvas id='bubble_arrow' width='14' height='14' style='margin-right:15px; vertical-align: top;'></canvas></right>";
    draw_arrow("down")
  } else if (g > 0) {
    d -= 8;
    e.innerHTML = "<center><canvas id='bubble_arrow' width='14' height='14' style='vertical-align: top;'></canvas></center>";
    draw_arrow("down")
  }
  a.style.top = d + "px";
  a.style.left = f + "px"
}
function draw_arrow(a) {
  var b = document.getElementById("bubble_arrow").getContext("2d");
  b.fillStyle = cc;
  b.globalAlpha = 1;
  b.beginPath();
  if (a == "down") {
    b.moveTo(0, 0);
    b.lineTo(14, 0);
    b.lineTo(7, 8)
  } else {
    b.moveTo(0, 8);
    b.lineTo(14, 8);
    b.lineTo(7, 0)
  }
  b.fill()
}
function ObjectPosition(a) {
  var b = 0,
  c = 0;
  if (a.offsetParent) {
    do {
      b += a.offsetLeft;
      c += a.offsetTop - a.scrollTop
    } while ( a = a . offsetParent )
  }
  return [c, b]
}
function hide() {
  var a = document.getElementById("bubble"),
  b = document.getElementById("bubble_sel");
  a && a.parentNode.removeChild(a);
  b && b.parentNode.removeChild(b)
}

