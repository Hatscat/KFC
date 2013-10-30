/* --------------------------------- Minigames Class --------------------------------- */

var Shifumi = function(imgNb) {

	this.img = globalVar.aImagesMinigames[imgNb];
	this.iSigneCheval = Math.floor(Math.random() * 3 + 1);
	this.iPlayerSign = 0;
	this.iState = 0;

	this.pierre_rect = [20 * globalVar.iEchelle, 20 * globalVar.iEchelle, 100 * globalVar.iEchelle, 30 * globalVar.iEchelle];
	this.feuille_rect = [220 * globalVar.iEchelle, 20 * globalVar.iEchelle, 100 * globalVar.iEchelle, 30 * globalVar.iEchelle];
	this.ciseaux_rect = [160 * globalVar.iEchelle, 220 * globalVar.iEchelle, 100 * globalVar.iEchelle, 30 * globalVar.iEchelle];

	function run()
	{
		console.log("shifumi!!");
		
		if (this.iState == 0)
		{
			if (globalVar.bMousedown && isButtonClicked(this.pierre_rect))
			{
				this.iPlayerSign = 1;
				this.iState = 1;
				this.iSigneCheval = Math.floor(Math.random() * 3 + 1);
			}
			if (globalVar.bMousedown && isButtonClicked(this.feuille_rect))
			{
				this.iPlayerSign = 2;
				this.iState = 1;
				this.iSigneCheval = Math.floor(Math.random() * 3 + 1);
			}
			if (globalVar.bMousedown && isButtonClicked(this.ciseaux_rect))
			{
				this.iPlayerSign = 3;
				this.iState = 1;
				this.iSigneCheval = Math.floor(Math.random() * 3 + 1);
			}
		}
		else
		{
			if (this.iPlayerSign == this.iSigneCheval)
			{
				this.iResultat = 0; /* égalité */
			}
			else if ((this.iPlayerSign == 3 && this.iSigneCheval == 1)
			||		(this.iPlayerSign == 2 && this.iSigneCheval == 3)
			||		(this.iPlayerSign==1 && this.iSigneCheval == 2))
			{
				this.iResultat = -1; /* perdu */
			}
			else 
			{
				this.iResultat = 1; /* perdu */
			}
			
		}
	}

	function draw()
	{
		globalVar.context.globalAlpha = 1;
		globalVar.context.drawImage(this.img, 0, 0, 1280, 720, 0, 0, globalVar.iCanvas_w, globalVar.iCanvas_h);
	}

}