/* --------------------------------- Scene Class --------------------------------- */

var Scene = function(id)
{
	this.id = id;
	this.iArrowSize = 120;
	this.iArrowDir = 0;

	switch(id)
	{
		case 0:
			this.img = globalVar.aImagesScenes[this.id];
			
			this.arrow_L = null;

			this.arrow_R = [globalVar.iCanvas_w - (this.iArrowSize * globalVar.iEchelle),
							globalVar.iCanvas_h - (this.iArrowSize * globalVar.iEchelle),
							this.iArrowSize * globalVar.iEchelle,
							this.iArrowSize * globalVar.iEchelle];
		break;
		case 1:
			this.img = globalVar.aImagesScenes[this.id];

			this.arrow_L = [0,
							globalVar.iCanvas_h - (this.iArrowSize * globalVar.iEchelle),
							this.iArrowSize * globalVar.iEchelle,
							this.iArrowSize * globalVar.iEchelle];

			this.arrow_R = [globalVar.iCanvas_w - (this.iArrowSize * globalVar.iEchelle),
							globalVar.iCanvas_h - (this.iArrowSize * globalVar.iEchelle),
							this.iArrowSize * globalVar.iEchelle,
							this.iArrowSize * globalVar.iEchelle];
		break;
		case 2:
			this.img = globalVar.aImagesScenes[this.id];

			this.arrow_L = [0,
							globalVar.iCanvas_h - (this.iArrowSize * globalVar.iEchelle),
							this.iArrowSize * globalVar.iEchelle,
							this.iArrowSize * globalVar.iEchelle];

			this.arrow_R = [globalVar.iCanvas_w - (this.iArrowSize * globalVar.iEchelle),
							globalVar.iCanvas_h - (this.iArrowSize * globalVar.iEchelle),
							this.iArrowSize * globalVar.iEchelle,
							this.iArrowSize * globalVar.iEchelle];
		break;
		case 3:
			this.img = globalVar.aImagesScenes[this.id];

			this.arrow_L = [0,
							globalVar.iCanvas_h - (this.iArrowSize * globalVar.iEchelle),
							this.iArrowSize * globalVar.iEchelle,
							this.iArrowSize * globalVar.iEchelle];

			this.arrow_R = [globalVar.iCanvas_w - (this.iArrowSize * globalVar.iEchelle),
							globalVar.iCanvas_h - (this.iArrowSize * globalVar.iEchelle),
							this.iArrowSize * globalVar.iEchelle,
							this.iArrowSize * globalVar.iEchelle];
		break;
		case 4:
			this.img = globalVar.aImagesScenes[this.id];

			this.arrow_L = [0,
							globalVar.iCanvas_h - (this.iArrowSize * globalVar.iEchelle),
							this.iArrowSize * globalVar.iEchelle,
							this.iArrowSize * globalVar.iEchelle];

			this.arrow_R = null;
		break;
	}
		

	this.draw = function()
	{
		globalVar.context.globalAlpha = 1;
		globalVar.context.drawImage(this.img, 0, 0, 1280, 720, 0, 0, globalVar.iCanvas_w, globalVar.iCanvas_h);

		
		
			// if (!!this.arrow_L)
			// {
			// 	globalVar.context.fillStyle = "#f00";
			// 	globalVar.context.fillRect(this.arrow_L[0], this.arrow_L[1], this.arrow_L[2], this.arrow_L[3]);
			// }
			// if (!!this.arrow_R)
			// {
			// 	globalVar.context.fillStyle = "#0f0";
			// 	globalVar.context.fillRect(this.arrow_R[0], this.arrow_R[1], this.arrow_R[2], this.arrow_R[3]);
			// }
		
	}
}
