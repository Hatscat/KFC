/* --------------------------------- Scene Class --------------------------------- */

var Scene = function(id, img)
{
	this.id = id;
	this.img = img;
	this.iArrowSize = 125;
	this.iMoveDir = 0;

	this.sw = this.img.width;
	this.sh = this.img.height;

	switch(id)
	{
		case 0:
			this.arrow_L = null;

			this.arrow_R = [globalVar.iCanvas_w - (this.iArrowSize * globalVar.iScale),
							globalVar.iCanvas_h - (this.iArrowSize * 3 * globalVar.iScale),
							this.iArrowSize * globalVar.iScale,
							this.iArrowSize * 3 * globalVar.iScale];
		break;
		case 1:
			this.arrow_L = [0,
							globalVar.iCanvas_h - (this.iArrowSize * 3 * globalVar.iScale),
							this.iArrowSize * globalVar.iScale,
							this.iArrowSize * 3 * globalVar.iScale];

			this.arrow_R = [globalVar.iCanvas_w - (this.iArrowSize * globalVar.iScale),
							globalVar.iCanvas_h - (this.iArrowSize * 3 * globalVar.iScale),
							this.iArrowSize * globalVar.iScale,
							this.iArrowSize * 3 * globalVar.iScale];
		break;
		case 2:
			this.arrow_L = [0,
							globalVar.iCanvas_h - (this.iArrowSize * 3 * globalVar.iScale),
							this.iArrowSize * globalVar.iScale,
							this.iArrowSize * 3 * globalVar.iScale];

			this.arrow_R = [globalVar.iCanvas_w - (this.iArrowSize * globalVar.iScale),
							globalVar.iCanvas_h - (this.iArrowSize * 3 * globalVar.iScale),
							this.iArrowSize * globalVar.iScale,
							this.iArrowSize * 3 * globalVar.iScale];
		break;
		case 3:
			this.arrow_L = [0,
							globalVar.iCanvas_h - (this.iArrowSize * 3 * globalVar.iScale),
							this.iArrowSize * globalVar.iScale,
							this.iArrowSize * 3 * globalVar.iScale];

			this.arrow_R = [globalVar.iCanvas_w - (this.iArrowSize * globalVar.iScale),
							globalVar.iCanvas_h - (this.iArrowSize * 3 * globalVar.iScale),
							this.iArrowSize * globalVar.iScale,
							this.iArrowSize * 3 * globalVar.iScale];
		break;
		case 4:
			this.arrow_L = [0,
							globalVar.iCanvas_h - (this.iArrowSize * 3 * globalVar.iScale),
							this.iArrowSize * globalVar.iScale,
							this.iArrowSize * 3 * globalVar.iScale];

			this.arrow_R = null;
		break;
	}

	this.draw = function()
	{
		globalVar.context.globalAlpha = 1;
		globalVar.context.drawImage(this.img, 0, 0, this.sw, this.sh, 0, 0, globalVar.iCanvas_w, globalVar.iCanvas_h);

		
		if (globalVar.bDebug) /* pour le debug */
		{
			if (!!this.arrow_L)
			{
				globalVar.context.fillStyle = "#f00";
				globalVar.context.fillRect(this.arrow_L[0], this.arrow_L[1], this.arrow_L[2], this.arrow_L[3]);
			}
			if (!!this.arrow_R)
			{
				globalVar.context.fillStyle = "#0f0";
				globalVar.context.fillRect(this.arrow_R[0], this.arrow_R[1], this.arrow_R[2], this.arrow_R[3]);
			}
		}
	}
}
