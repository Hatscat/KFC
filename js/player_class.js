/* --------------------------------- Player Class --------------------------------- */

var Player = function(img, frames, x, y, w, h)
{
	this.img = img;
	this.iFramesAmount = frames - 1; /* -1 car on compte a partir de l'animation 0 */

	this.sx = x;
	this.sy = y;
	this.sw = w;
	this.sh = h;

	this.x = this.sx * globalVar.iScale;
	this.y = this.sy * globalVar.iScale;
	this.w = this.sw * globalVar.iScale;
	this.h = this.sh * globalVar.iScale;

	this.aBox = [this.x, this.y, this.w, this.h];

	this.iSpeed_max = 6 * globalVar.iScale;
	this.iSpeed_min = 2 * globalVar.iScale;
	this.iOrigin_x = 0;
	this.iMiddleDistance = 0;
	this.bAnim = false;
	this.iAnim = 0;
	this.bOrientation = 1; /* 1 == droite, -1 == gauche */

	this.move = function(aTarget_box)
	{
		var iDistance_x, iSpeed, iSpeedVariance;

		if (aTarget_box[0] + aTarget_box[2] * 0.5 < this.x + this.w * 0.5) /* la cible est à gauche du joueur */
		{
			this.bOrientation = -1;
			iDistance_x = Math.abs((aTarget_box[0] + aTarget_box[2]) - this.x);
		}
		else
		{
			this.bOrientation = 1;
			iDistance_x = Math.abs(aTarget_box[0] - (this.x + this.w));
		}

		if (!this.bAnim) /* première frame de l'animation */
		{
			this.iOrigin_x = this.x;
			this.iMiddleDistance = iDistance_x * 0.5;
		}

		iSpeed = (globalVar.iFrame % 30 < 20) ? this.iSpeed_max : this.iSpeed_min; /* alternance de rythme pour imiter la cadence des pas */


		if (Math.abs(this.iOrigin_x - this.x) < this.w) /* acceleration */
		{
			iSpeedVariance =  (this.iMiddleDistance / iDistance_x + 0.25);
			if (iSpeedVariance >= 1)
			{
				iSpeedVariance = 0.7;
			}
		}
		else if (iDistance_x < this.w) /* decceleration */
		{
			iSpeedVariance =  iDistance_x / this.iMiddleDistance + 0.5;
		}
		else /* vitesse stable */
		{
			iSpeedVariance =  1;
		}

		this.x += iSpeed * this.bOrientation * iSpeedVariance;

		this.bAnim = true;
		this.aBox[0] = this.x;

		/*
		if (iDistance_x < 6 * globalVar.iScale)
		{
			this.bAnim = false;
			this.iAnim = 0;
		}
		*/
	}

	this.draw = function()
	{
		if (globalVar.bPause) /* pour le debug */
		{
			globalVar.context.globalAlpha = 1;
			globalVar.context.strokeStyle = "#fff"; 
			globalVar.context.lineWidth = 5 * globalVar.iScale;
			globalVar.context.strokeRect(this.aBox[0], this.aBox[1], this.aBox[2], this.aBox[3]);
		}

		if (this.bAnim && globalVar.iFrame % 16 == 0)
		{
			if (this.iAnim < this.iFramesAmount)
			{
				++this.iAnim;
			}
			else
			{
				this.iAnim = 0;
			}
		}

		globalVar.context.globalAlpha = 1;
		if (this.bOrientation) /* tourné vers la droite */
		{
			globalVar.context.drawImage(this.img, this.iAnim * this.sw, 0, this.sw, this.sh, this.x, this.y, this.w, this.h);
		}
		else
		{
			globalVar.context.drawImage(this.img, this.iAnim * this.sw, this.sh, this.sw, this.sh, this.x, this.y, this.w, this.h);
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

