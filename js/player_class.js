/* --------------------------------- Player Class --------------------------------- */

var Player = function(x, y)
{
	this.imgR = globalVar.aImagesPj[0];
	this.imgL = globalVar.aImagesPj[1];
	this.x = x;
	this.y = y;
	this.iMoveX = x * globalVar.iEchelle;
	this.iMoveY = y * globalVar.iEchelle;
	this.w = 130 * globalVar.iEchelle;
	this.h = 220 * globalVar.iEchelle;
	this.aBox = [x, y, this.w, this.h];
	this.bAnim = false;
	this.iAnim = 0;
	this.iSpeed = 3;
	this.bOrientation = true; /* true == droite, false == gauche */
	
	this.move = function(aTarget_box)
	{
		this.bAnim = true;

		var iDir_x = (aTarget_box[0] - this.x) / (Math.abs(aTarget_box[0] - this.x) + Math.abs(aTarget_box[1] - this.y)),
		iDir_y = (aTarget_box[1] - this.y) / (Math.abs(aTarget_box[0] - this.x) + Math.abs(aTarget_box[1] - this.y));

		this.iMoveX += iDir_x * this.iSpeed;
		/*this.iMoveY += iDir_y * this.iSpeed * 0.4;*/

		this.aBox[0] = this.x;
		this.aBox[1] = this.y;

		if (this.iMoveX < this.x)
		{
			this.bOrientation = false;
		}
		else
		{
			this.bOrientation = true;
		}

		if ((this.iMoveX > 0)
		&& (this.iMoveX + this.w < globalVar.iCanvas_w))
		{
			this.x = this.iMoveX;
		}
		else
		{
			this.iMoveX = this.x;
		}

		if (this.iMoveY + this.h < globalVar.iCanvas_h)
		{
			this.y = this.iMoveY;
		}
		else
		{
			this.iMoveY = this.y;
		}

		this.aBox[0] = this.x;
		this.aBox[1] = this.y;
	}

	this.draw = function()
	{

		if (globalVar.bPause)
		{
			globalVar.context.globalAlpha = 1;
			globalVar.context.strokeStyle = "#fff"; 
			globalVar.context.lineWidth = 5 * globalVar.iEchelle;
			globalVar.context.strokeRect(this.aBox[0], this.aBox[1], this.aBox[2], this.aBox[3]);
		}

		if (this.bAnim && globalVar.iFrame % 16 == 0)
		{
			if (this.iAnim < 3)
			{
				++this.iAnim;
			}
			else
			{
				this.iAnim = 0;
			}
		}
		globalVar.context.globalAlpha = 1;
		if (this.bOrientation)
		{
			globalVar.context.drawImage(this.imgR, this.iAnim * 130, 0, 130, 220, this.x, this.y, this.w, this.h);
		}
		else
		{
			globalVar.context.drawImage(this.imgL, this.iAnim * 130, 0, 130, 220, this.x, this.y, this.w, this.h);
		}
		
	}
}

