/* --------------------------------- requestAnimFrame --------------------------------- */

window.requestAnimFrame = (
		function()
		{
			return	window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback, element)
			{
				window.setTimeout(callback, 1000 / 60);
			};
		}
)();

/* --------------------------------- Global variables --------------------------------- */

var globalVar = {
		
		context: null,
		canvas: null, /*modif max 11h07*/
		drawPath: [], /*modif max 11h10*/
		aImagesPj: [],
		aImagesPnj: [],
		aImagesScenes: [],
		aImagesMinigames: [],  /* new */
		aImagesContent: [],
		aAudio: [],
		aScene: [],
		aInventoryContent: [],
		aSceneContent: [],
		aPnj: [],
		iFrame: 0,
		iSceneNb: 0,
		iCanvas_w: 0,
		iCanvas_h: 0,
		filesLoaded: 0,
		iEchelle: 5,
		iSceneChangementState:0,

		iMouse_x: 0,
		iMouse_y: 0,
		bMouseDown: false,
		bFingerSlide: false,
		aFingerTouch: [],
		
		oDave: null,
		oScript: null, /* modified */
		iHistoryState: 0, /*modified*/
		oShifumi: null, /* new */
		bMinigames: false, /* new */
		iMinigamesId: 0, /* new */
		bPause: false
};

/* --------------------------------- Window Events --------------------------------- */

window.onresize = function()
{
	globalVar.iCanvas_w = canvas.width = 1280;/*window.innerWidth;*/
	globalVar.iCanvas_h = canvas.height = 720;/*window.innerHeight;*/
}

window.onmousemove = function(event)
{
	globalVar.iMouse_x = event.x;
	globalVar.iMouse_y = event.y;
}

window.onmousedown = function(event)
{
	globalVar.bMouseDown = true;
}

window.onmouseup = function(event)
{
	globalVar.bMouseDown = false;
}

/* --------------------------------- touch events feature --------------------------------- */

function drawPathSeting(idx) {
    for (var i = 0;i < drawPath.length;i++) {
        var _idx = drawPath[i].identifier;
        if (_idx === idx) {
            return i;
        }
    }
    return -1;
}

function touchStartHandler(e)
{
    globalVar.aFingerTouch = e.changedTouches; /* Stockage des informations du touch en cours (les coordonées) */
    drawPath.push(touches[0]);
    globalVar.bMouseDown = true;
}

function touchMoveHandler(e)
{
	var context = globalVar.context;
    globalVar.bFingerSlide = true;
    globalVar.aFingerTouch = e.changedTouches;
	context.lineJoin = "round";

    //Loop as many as the numbers of touch
    for (var i = 0;i < touches.length;i++) {
        var idx = drawPathSeting(touches[i].identifier);

        //Draw a line from the stored coordinates to the current coordinates
        context.beginPath();
        context.moveTo(drawPath[idx].pageX - this.offsetLeft, drawPath[idx].pageY - this.offsetTop);
        context.lineTo(touches[i].pageX - this.offsetLeft, touches[i].pageY - this.offsetTop);
        context.closePath();
        //context.stroke();

        globalVar.drawPath.splice(idx, 1, touches[i]);	//Deletes the stored coordinates and stores the current  coordinates
    }
    e.preventDefault();
}

function touchEndHandler()
{
    if(!bFingerSlide)
    {
    	globalVar.iMouse_x = touches[0].pageX - this.offsetLeft;
    	globalVar.iMouse_y = touches[0].pageY- this.offsetTop;
    }
    globalVar.bFingerSlide = false;
    globalVar.bMouseDown = false;
	globalVar.drawPath.length = 0; //Initialize the stored coordinates
}

/* --------------------------------- Initialization --------------------------------- */

window.onload = function()
{
	var canvas = document.getElementById("canvas");
	globalVar.context = canvas.getContext("2d");

	globalVar.aImagesScenes[0] = loadImage("img/taverne.png"); /* le bg de la scene 1 */
	globalVar.aImagesScenes[1] = loadImage("img/grange.png"); /* le bg de la scene 2 */
	globalVar.aImagesScenes[2] = loadImage("img/place.png"); /* scene 3 */
	globalVar.aImagesScenes[3] = loadImage("img/forge.png"); /* scene 4 */ 
	globalVar.aImagesScenes[4] = loadImage("img/chateau.png"); /* scene 5 */

	globalVar.aImagesPj[0] = loadImage("img/daveR.png"); /* le player de droite */
	globalVar.aImagesPj[1] = loadImage("img/daveL.png"); /* le player de gauche */

	globalVar.aImagesPnj[0] = loadImage("img/poulet_metal.png"); /* Poulet metal */
	globalVar.aImagesPnj[1] = loadImage("img/poulet_garde.png"); /* Poulicier */
	globalVar.aImagesPnj[2] = loadImage("img/poulet_forgeron.png"); /* poulet forgeron */
	globalVar.aImagesPnj[3] = loadImage("img/poulet_base.png"); /* poulet basique */
	
	globalVar.aImagesContent[0] = loadImage("img/seau.png"); /* seau */
	globalVar.aImagesContent[1] = loadImage("img/fontaine_eau.png"); /* fontaine */
	globalVar.aImagesContent[2] = loadImage("img/beurre.png"); /* beurre */
	globalVar.aImagesContent[3] = loadImage("img/piece.png"); /* pièce */
	globalVar.aImagesContent[4] = loadImage("img/huile.png"); /* huile */


	globalVar.iCanvas_w = canvas.width = 1280; /* window.innerWidth; */
	globalVar.iCanvas_h = canvas.height = 720; /* window.innerHeight; */

	globalVar.iEchelle = globalVar.iCanvas_w / 1280;

	globalVar.oDave = new Player(20, globalVar.iCanvas_h * 0.65);

	globalVar.oScript = new Script();

	/* les objets des minigames */
	globalVar.oShifumi = new Shifumi(0);


	for(var i = 0; i < globalVar.aImagesContent.length; i++)
	{
		globalVar.aSceneContent[i] = new SceneContent(i, i);
	}

	for(var i = 0; i < globalVar.aImagesPnj.length; i++)
	{
		if (i == 3)
		{
			globalVar.aPnj[i] = new Pnj(i, i, false);
		}
		else
		{
			globalVar.aPnj[i] = new Pnj(i, i, true);
		}
	}

	for(var i = 0; i < globalVar.aImagesScenes.length; i++)
	{
		globalVar.aScene[i] = new Scene(i, i);
	}

	canvas.addEventListener("touchstart", touchStartHandler, false);
	canvas.addEventListener("touchend", touchEndHandler, false);
	canvas.addEventListener("touchmove", touchMoveHandler, false);

	/* pour killer l'app */ 
	window.addEventListener('tizenhwkey', function(e)
	{
	    if(e.keyName == "back")
	    {
	    	 tizen.application.getCurrentApplication().exit();
	    }
	});
}

/* --------------------------------- Functions --------------------------------- */

function loadImage(sImageSrc)
{
	var img = new Image();
	img.onload = isLoadedContent;
	img.src = sImageSrc;
	return img;
}

function loadAudio(sAudioSrc)
{
	var audio = new Audio();
	audio.addEventListener("canplaythrough", isLoadedContent, false);
	audio.src = sAudioSrc;
	return audio;
}

function isLoadedContent()
{
	if (++globalVar.filesLoaded >=
		(globalVar.aImagesContent.length
		+ globalVar.aImagesScenes.length
		+ globalVar.aImagesPnj.length
		+ globalVar.aAudio.length))
	{
		run();
	}
}

function collision(box1, box2)
{
	if ((box1[0] >= box2[0] + box2[2])
	|| (box1[0] + box1[2] <= box2[0])
	|| (box1[1] >= box2[1] + box2[3])
	|| (box1[1] + box1[3] <= box2[1]))
	{
		return false;
	}
	else
	{
		return true;
	}
}

function isButtonClicked(xywh)
{
	if ((globalVar.bMouseDown && globalVar.iMouse_x >= xywh[0] && globalVar.iMouse_x < xywh[0] + xywh[2])
	&& (globalVar.iMouse_y >= xywh[1] && globalVar.iMouse_y < xywh[1] + xywh[3]))
	{
		return true;
	}
	else
	{
		return false;
	}
    
}
