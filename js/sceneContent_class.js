/* --------------------------------- SceneContent Class --------------------------------- */

var SceneContent = function(id, img)
{	
	this.id = id;
	this.img = img;
	this.iDropedState = 0; /* 0 == pas cliqué, 1 == cliqué mais pas ramassé, 2 == rammassé et dans l'inventaire  */
	
	switch (id)
	{
		case 0 : /* seau */
			this.iSceneNb = 1;
			this.sx = 300;
			this.sy = 590;
		break;
		case 1 : /* fontaine */
			this.iSceneNb = 2;
			this.sx = 450;
			this.sy = 227;
		break;
	}

	this.sw = this.img.width;
	this.sh = this.img.height;

	this.x = this.sx * globalVar.iScale;
	this.y = this.sy * globalVar.iScale;
	this.w = this.sw * globalVar.iScale;
	this.h = this.sh * globalVar.iScale;
	
	this.aBox = [this.x, this.y, this.w, this.h];

	this.iAnim = 0;

	this.draw = function()
	{
		if (globalVar.bDebug)  /* pour le debug */
		{
			globalVar.context.globalAlpha = 1;
			globalVar.context.strokeStyle = "#fff"; 
			globalVar.context.lineWidth = 5 * globalVar.iScale;
			globalVar.context.strokeRect(this.aBox[0], this.aBox[1], this.aBox[2], this.aBox[3]);
		}

		globalVar.context.drawImage(this.img, 0, 0, this.sw, this.sh, this.x, this.y, this.w, this.h);
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
