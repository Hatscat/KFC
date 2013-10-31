/* --------------------------------- Minigames Class --------------------------------- */

var Shifumi = function(img)
{
	this.img = img;

	this.iState = 0; /* pour TOUT les minijeux : this.iState == -1 s'il est terminé et réussit, sinon -2 en cas d'échec */

	this.sw = this.img.width;
	this.sh = this.img.height;

	this.iSigneCheval = 0;
	this.iPlayerSign = 0;

	this.pierre_rect = [20 * globalVar.iScale, 20 * globalVar.iScale, 100 * globalVar.iScale, 30 * globalVar.iScale];
	this.feuille_rect = [220 * globalVar.iScale, 20 * globalVar.iScale, 100 * globalVar.iScale, 30 * globalVar.iScale];
	this.ciseaux_rect = [160 * globalVar.iScale, 220 * globalVar.iScale, 100 * globalVar.iScale, 30 * globalVar.iScale];

	this.draw = function()
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

		globalVar.context.globalAlpha = 1;
		globalVar.context.drawImage(this.img, 0, 0, this.sw, this.sh, 0, 0, globalVar.iCanvas_w, globalVar.iCanvas_h);
	}

}

var TalkFight = function(img) /* baston verbale */
{
	this.img = img;

	this.iState = 0; /* pour TOUT les minijeux : this.iState == -1 s'il est terminé et réussit, sinon -2 en cas d'échec */

	// this.sw = this.img.width;
	// this.sh = this.img.height;
}
