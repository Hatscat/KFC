/* --------------------------------- Pnj Class --------------------------------- */

var Pnj = function(id, imgNb, bSolid)
{	
	this.id = id;
	this.img = globalVar.aImagesPnj[imgNb];
	this.iInteractionState = 0; /* 0 == pas cliqué, 1 == cliqué mais pas collisionné, 2 == au contact  */
	this.bSolid = bSolid;

	switch (id)
	{
		case 0 : /* poulet_metal */
			this.iSceneNb = 0;
			this.x = 1000 * globalVar.iEchelle;
			this.y = 480 * globalVar.iEchelle;
			this.w = 130 * globalVar.iEchelle;
			this.h = 200 * globalVar.iEchelle;
			this.frameAmount = 3;
			
		break;
		case 1 : /* poulet_garde */
			this.iSceneNb = 0;
			this.x = 700 * globalVar.iEchelle;
			this.y = 480 * globalVar.iEchelle;
			this.w = 125 * globalVar.iEchelle;
			this.h = 195 * globalVar.iEchelle;
			this.frameAmount = 0;

		break;
		case 2 : /*poulet_forgeron*/
			this.iSceneNb = 3;
			this.x = 600 * globalVar.iEchelle;
			this.y = 470 * globalVar.iEchelle;
			this.w = 225 * globalVar.iEchelle;
			this.h = 195 * globalVar.iEchelle;
			this.frameAmount = 3;

		break;
		case 3 : /*poulet_final */
			this.iSceneNb = 5;
			this.x = 232 * globalVar.iEchelle;
			this.y = 413 * globalVar.iEchelle;
			this.w = 125 * globalVar.iEchelle;
			this.h = 195 * globalVar.iEchelle;
			this.frameAmount = 0;

		break;

		case 4 : /*poulet_final */
			this.iSceneNb = 5;
			this.x = 497 * globalVar.iEchelle;
			this.y = 549 * globalVar.iEchelle;
			this.w = 125 * globalVar.iEchelle;
			this.h = 195 * globalVar.iEchelle;
			this.frameAmount = 0;

		break;
	}
	
	this.iAnim = 0;
	this.iSpeed = 4;
	this.aBox = [this.x, this.y, this.w, this.h];

	this.draw = function()
	{
		if (globalVar.bPause)
		{
			globalVar.context.globalAlpha = 1;
			globalVar.context.strokeStyle = "#fff"; 
			globalVar.context.lineWidth = 5 * globalVar.iEchelle;
			globalVar.context.strokeRect(this.aBox[0], this.aBox[1], this.aBox[2], this.aBox[3]);
		}

		if (this.iSceneNb == globalVar.iSceneNb)
		{
			if (globalVar.iFrame % 16 == 0)
			{
				if (this.iAnim < this.frameAmount)
				{
					++this.iAnim;
					
				}
				else
				{
					this.iAnim = 0;
				}
			}
			if (this.bSolid)
			{
				globalVar.context.drawImage(this.img,
					this.iAnim * (this.w  / globalVar.iEchelle), 0, this.w / globalVar.iEchelle, this.h / globalVar.iEchelle,
					this.x, this.y, this.w, this.h);
			}
		}
	}
}
