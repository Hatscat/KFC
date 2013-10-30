/* --------------------------------- InventoryContent Class --------------------------------- */

var InventoryContent = function(id, img)
{
	this.id = id;
	this.img = img;

	switch (id)
	{
		case 0 : /* seau */
			this.iSceneNb = 0;
			this.x = 20 * globalVar.iEchelle;
			this.y = 16 * globalVar.iEchelle;
			this.w = 75 * globalVar.iEchelle;
			this.h = 85 * globalVar.iEchelle;
			this.iAnim = 0;
		break;
		case 1 : /* garde */
			this.iSceneNb = 0;
			this.x = 80 * globalVar.iEchelle;
			this.y = 16 * globalVar.iEchelle;
			this.w = 125 * globalVar.iEchelle;
			this.h = 195 * globalVar.iEchelle;
			this.iAnim = 0;
		break;
	}

	this.aBox = [this.x, this.y, this.w, this.h];

	this.draw = function()
	{
		globalVar.context.drawImage(this.img, 0, 0, this.w / globalVar.iEchelle, this.h / globalVar.iEchelle, this.x, this.y, this.w, this.h);
	}

	this.resize = function()
	{
		switch (id)
		{
			case 0 : /* seau */
				this.w = 30 * globalVar.iEchelle;
				this.h = 30 * globalVar.iEchelle;
			break;
			case 1 : /* garde */
				this.w = 30 * globalVar.iEchelle;
				this.h = 30 * globalVar.iEchelle;
			break;
		}
		this.aBox = [this.x, this.y, this.w, this.h];
	}
}