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
	canvas: null,

	oDave: null,
	oShifumi: null,

	iFilesLoaded: 0,
	iFrame: 0,
	iSceneNb: 0,
	iCanvas_w: 0,
	iCanvas_h: 0,
	iScale: 1,
	iMouse_x: 0,
	iMouse_y: 0,
	iMinigamesId: 0,
	iHistoryState: 0,
	iSceneChangementState: 0,

	bMouseDown: false,
	bCanClick: true,
	bFingerSlide: false,
	bMinigames: false,
	bPause: false,

	// drawPath: [],
	aImg_Pj: [],
	aImg_Pnj: [],
	aImg_Bg: [],
	aImg_Minigames: [],
	aImg_SceneContent: [],
	aAudio: [],
	aScene: [],
	aInventoryContent: [],
	aSceneContent: [],
	aPnj: [],
	aFingerTouch: []
};

/* --------------------------------- Global Functions --------------------------------- */

var globalFunc = {

	loadImage: function (sImageSrc)
	{
		var img = new Image();
		img.onload = globalFunc.isLoadedContent;
		img.src = sImageSrc;
		return img;
	},

	loadAudio: function (sAudioSrc)
	{
		var audio = new Audio();
		audio.addEventListener("canplaythrough", globalFunc.isLoadedContent, false);
		audio.src = sAudioSrc;
		return audio;
	},

	isLoadedContent: function ()
	{
		if (++globalVar.iFilesLoaded
			>= (globalVar.aImg_Pj.length
			+	globalVar.aImg_Pnj.length
			+	globalVar.aImg_Bg.length
			+	globalVar.aImg_Minigames.length
			+	globalVar.aImg_SceneContent.length
			+	globalVar.aAudio.length))
		{
			run();
		}
	},

	collision: function (box1, box2)
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
	},

	isButtonClicked: function (xywh)
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
};

/* --------------------------------- Window Events --------------------------------- */

window.onresize = function()
{
	globalVar.iCanvas_w = canvas.width = globalVar.aImg_Bg[0].width * globalVar.iScale;
	globalVar.iCanvas_h = canvas.height = globalVar.aImg_Bg[0].height * globalVar.iScale;
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
	globalVar.bCanClick = true;
}

/* --------------------------------- Keyboard Events --------------------------------- */

window.onkeydown = function(event)
{
	if (event.keyCode == 32) /* space button */
	{
		globalVar.bPause = !globalVar.bPause;
		run();
	}	
}

/* --------------------------------- Touch Events --------------------------------- */

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
	/* ****** chargement des images et des sons ****** */

	globalVar.aImg_Bg[0] = globalFunc.loadImage("img/taverne.png"); /* le bg de la scene 1 */
	globalVar.aImg_Bg[1] = globalFunc.loadImage("img/grange.png"); /* le bg de la scene 2 */
	globalVar.aImg_Bg[2] = globalFunc.loadImage("img/place.png"); /* scene 3 */
	globalVar.aImg_Bg[3] = globalFunc.loadImage("img/forge.png"); /* scene 4 */ 
	globalVar.aImg_Bg[4] = globalFunc.loadImage("img/chateau.png"); /* scene 5 */

	globalVar.aImg_Minigames[0] = globalFunc.loadImage("img/shifumi.png"); /* shifumi */

	globalVar.aImg_Pj[0] = globalFunc.loadImage("img/dave.png"); /* le player */

	globalVar.aImg_Pnj[0] = globalFunc.loadImage("img/poulet_metal.png"); /* Poulet metal */
	globalVar.aImg_Pnj[1] = globalFunc.loadImage("img/poulet_garde.png"); /* Poulicier */
	globalVar.aImg_Pnj[2] = globalFunc.loadImage("img/poulet_forgeron.png"); /* poulet forgeron */
	/*globalVar.aImg_Pnj[3] = globalFunc.loadImage("img/poulet_base.png");*/ /* poulet basique */
	
	globalVar.aImg_SceneContent[0] = globalFunc.loadImage("img/seau.png"); /* seau */
	globalVar.aImg_SceneContent[1] = globalFunc.loadImage("img/fontaine_eau.png"); /* fontaine */
	globalVar.aImg_SceneContent[2] = globalFunc.loadImage("img/beurre.png"); /* beurre */
	globalVar.aImg_SceneContent[3] = globalFunc.loadImage("img/piece.png"); /* pièce */
	globalVar.aImg_SceneContent[4] = globalFunc.loadImage("img/huile.png"); /* huile */

	globalVar.aAudio[0] = globalFunc.loadAudio("audio/mainMusic.mp3"); /* musique */


	/* ****** la fenêtre de jeu ****** */

	globalVar.canvas = document.getElementById("canvas");
	globalVar.context = globalVar.canvas.getContext("2d");


	/* calcul de l'echelle, de manière à concerver le ratio */

	if ((window.innerWidth / globalVar.aImg_Bg[0].width) < (window.innerHeight / globalVar.aImg_Bg[0].height))
	{
		globalVar.iScale = window.innerWidth / globalVar.aImg_Bg[0].width;
	}
	else
	{
		globalVar.iScale = window.innerHeight / globalVar.aImg_Bg[0].height;
	}

	globalVar.iCanvas_w = canvas.width = globalVar.aImg_Bg[0].width * globalVar.iScale;
	globalVar.iCanvas_h = canvas.height = globalVar.aImg_Bg[0].height * globalVar.iScale;
	

	/* ****** les objets ****** */

	globalVar.oDave = new Player(globalVar.aImg_Pj[0], 4, 20, 475, 130, 220);
	globalVar.oShifumi = new Shifumi(globalVar.aImg_Minigames[0]);

	for (var i = 0; i < globalVar.aImg_Bg.length; i++)
	{
		globalVar.aScene.push(new Scene(i, globalVar.aImg_Bg[i]));
	}
	for (var i = 0; i < globalVar.aImg_SceneContent.length; i++)
	{
		globalVar.aSceneContent.push(new SceneContent(i, globalVar.aImg_SceneContent[i]));
	}
	for (var i = 0; i < globalVar.aImg_Pnj.length + 4; i++) /* le '+x' c'est pour les pnj dont l'image n'est pas séparée du bg */
	{
		globalVar.aPnj.push(new Pnj(i, globalVar.aImg_Pnj[i]));
	}


	/* ****** pour le mobile ****** */

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
