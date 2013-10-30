/* --------------------------------- Pnj Class --------------------------------- */

var Pnj = function(id, img)
{	
	this.id = id;
	this.img = img;
	this.iInteractionState = 0; /* 0 == pas cliqué, 1 == cliqué mais pas collisionné, 2 == au contact  */
	this.frameAmount = 0;
	this.iDialog_state = 0;

	switch (id)
	{
		case 0 : /* poulet_metal */
			this.iSceneNb = 0;
			this.sx = 1000;
			this.sy = 480;
			this.frameAmount = 3;
		break;
		case 1 : /* poulet_garde */
			this.iSceneNb = 0;
			this.sx = 700;
			this.sy = 480;
			this.frameAmount = 0;
		break;
		case 2 : /* poulet_forgeron */
			this.iSceneNb = 3;
			this.sx = 600;
			this.sy = 461;
			this.frameAmount = 3;
		break;
		case 3 : /* Aubergiste ------- sans image 1 */
			this.iSceneNb = 0;
			this.sx = 232;
			this.sy = 310;
			this.sw = 160;
			this.sh = 250;
		break;
		case 4 : /* poulet_au_bar ------- sans image 2 */
			this.iSceneNb = 0;
			this.sx = 540;
			this.sy = 325;
			this.sw = 110;
			this.sh = 250;
		break;
		case 5 : /* poulet_blanc ------- sans image 3 */
			this.iSceneNb = 2;
			this.sx = 940;
			this.sy = 500;
			this.sw = 120;
			this.sh = 190;
		break;
		case 6 : /* poulet_final ------- sans image 4 */
			this.iSceneNb = 4;
			this.sx = 479;
			this.sy = 480;
			this.sw = 126;
			this.sh = 195;
		break;
	}

	if (!!this.img)
	{
		this.sw = this.img.width / (this.frameAmount + 1);
		this.sh = this.img.height;
	}

	this.x = this.sx * globalVar.iScale;
	this.y = this.sy * globalVar.iScale;
	this.w = this.sw * globalVar.iScale;
	this.h = this.sh * globalVar.iScale;
	
	this.iAnim = 0;
	this.iSpeed = 4 * globalVar.iScale;
	this.aBox = [this.x, this.y, this.w, this.h];

	this.draw = function()
	{
		if (globalVar.bPause) /* pour le debug */
		{
			globalVar.context.globalAlpha = 1;
			globalVar.context.strokeStyle = "#fff"; 
			globalVar.context.lineWidth = 5 * globalVar.iScale;
			globalVar.context.strokeRect(this.aBox[0], this.aBox[1], this.aBox[2], this.aBox[3]);
		}

		if (this.frameAmount > 0 && globalVar.iFrame % 8 == 0)
		{
			if (this.iAnim < this.frameAmount)
			{
				this.iAnim++;
			}
			else
			{
				this.iAnim = 0;
			}
		}

		if (!!this.img) /* si c'est un pnj avec image */
		{
			globalVar.context.drawImage(this.img, this.iAnim * this.sw, 0, this.sw, this.sh, this.x, this.y, this.w, this.h);
		}
	}

	this.dialog = function()
	{	
		var aDialog_box = [0, 140 * globalVar.iScale, globalVar.iCanvas_w, 80 * globalVar.iScale];
		var iDialog_x = globalVar.iCanvas_w * 0.5;
		var iDialog_y = 195 * globalVar.iScale;
		var iFontScale = 30 * globalVar.iScale;

		globalVar.context.fillStyle = "#000";
		globalVar.context.globalAlpha = 0.75;
		globalVar.context.fillRect(aDialog_box[0], aDialog_box[1], aDialog_box[2], aDialog_box[3]);

		globalVar.context.fillStyle = "#fff";
		globalVar.context.globalAlpha = 1;
		globalVar.context.textAlign="center"; 
		globalVar.context.font = "bold " + iFontScale + "pt Minecraftia, Georgia, Arial";

		switch (this.id)
		{
			case 0 : /* poulet_metal */
				switch (this.iDialog_state)
				{
					case 0 :
						globalVar.context.fillText("Hey ! T’as l’air d’un métalleux !", iDialog_x, iDialog_y);
					break;
					case 1 :
						globalVar.context.fillText("Et en plus t’es un humain !", iDialog_x, iDialog_y);
					break;
					case 2 :
						globalVar.context.fillText("Ca me rapelle LA prophéthie !", iDialog_x, iDialog_y);
					break;
					case 3 :
						globalVar.context.fillText("\"- La prophétie ?\"", iDialog_x, iDialog_y);
					break;
					case 4 :
						globalVar.context.fillText("La prophétie !", iDialog_x, iDialog_y);
					break;
					case 5 :
						globalVar.context.fillText("\"- Va droit au but.\"", iDialog_x, iDialog_y);
					break;
					case 6 :
						globalVar.context.fillText("La prophétie dit qu’un humain viendra...", iDialog_x, iDialog_y);
					break;
					case 7 :
						globalVar.context.fillText("...et renversera le tyrannique roi Chickwings...", iDialog_x, iDialog_y);
					break;
					case 8 :
						globalVar.context.fillText("...et retablira la paix, l’harmonie...", iDialog_x, iDialog_y);
					break;
					case 9 :
						globalVar.context.fillText("\"- En gros je dois lui botter le cul ?!\"", iDialog_x, iDialog_y);
					break;
					case 10 :
						globalVar.context.fillText("Ouais, c’est à peut près ça.", iDialog_x, iDialog_y);
					break;
					default :
						globalVar.context.fillText("...", iDialog_x, iDialog_y);
					break;
				}
			break;
		}
	}

	this.resize = function()
	{
		this.x = this.sx * globalVar.iScale;
		this.y = this.sy * globalVar.iScale;
		this.w = this.sw * globalVar.iScale;
		this.h = this.sh * globalVar.iScale;

		this.aBox = [this.x, this.y, this.w, this.h];
	}
}
