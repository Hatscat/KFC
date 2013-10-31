/* --------------------------------- InventoryContent Class --------------------------------- */

var InventoryContent = function(id, img)
{
	this.id = id;
	this.img = img;
	this.iRatio = 0.9;

	switch (id)
	{
		case 0 : /* seau */
			this.iSceneNb = 0;
			this.sx = 20;
		break;
		case 1 : /* fontaine */
			this.iSceneNb = 0;
			this.sx = 80;
		break;
	}

	this.sy = 16;
	this.sw = this.img.width;
	this.sh = this.img.height;

	this.x = this.sx * globalVar.iScale;
	this.y = this.sy * globalVar.iScale;
	this.w = this.sw * globalVar.iScale * this.iRatio;
	this.h = this.sh * globalVar.iScale * this.iRatio;

	this.aBox = [this.x, this.y, this.w, this.h];

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
		this.w = this.sw * globalVar.iScale * this.iRatio;
		this.h = this.sh * globalVar.iScale * this.iRatio;

		this.aBox = [this.x, this.y, this.w, this.h];
	}
}
