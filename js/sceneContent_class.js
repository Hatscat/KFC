/* --------------------------------- SceneContent Class --------------------------------- */

var SceneContent = function(id, imgNb)
{	
	this.id = id;
	this.img = globalVar.aImagesContent[imgNb];
	this.iDropedState = 0; /* 0 == pas cliqué, 1 == cliqué mais pas ramassé, 2 == rammassé et dans l'inventaire  */
	
	switch (id)
	{
		case 0 : /* seau */
			this.iSceneNb = 1;
			this.x = 300 * globalVar.iEchelle;
			this.y = 590 * globalVar.iEchelle;
			this.w = 75 * globalVar.iEchelle;
			this.h = 85 * globalVar.iEchelle;

		break;
		case 1 : /* fontaine */
			this.iSceneNb = 2;
			this.x = 450 * globalVar.iEchelle;
			this.y = 225 * globalVar.iEchelle;
			this.w = 460 * globalVar.iEchelle;
			this.h = 440 * globalVar.iEchelle;
		break;
	}
	
	this.iAnim = 0;
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

		if (this.iSceneNb == globalVar.iSceneNb && this.iDropedState < 2)
		{
			globalVar.context.drawImage(this.img,
				0, 0, this.w / globalVar.iEchelle, this.h / globalVar.iEchelle,
				this.x, this.y, this.w, this.h);
		}
	}
}
