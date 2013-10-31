/* --------------------------------- Run Loop --------------------------------- */

function run()
{
	var gVar = globalVar; /* pour optimiser les performances, en stockant ici toutes les valeurs des variables globales */
	var gFunc = globalFunc;

	if (!gVar.bPause)
	{
		requestAnimFrame(run);
	}

if (!gVar.bMinigames)
{
/* ****************** scenes ****************** */
		
		gVar.aScene[gVar.iSceneNb].draw();

		if 	(!!gVar.aScene[gVar.iSceneNb].arrow_L) /* présence d'une flèche à gauche de la scene */
		{
			if ((gVar.aScene[gVar.iSceneNb].iMoveDir == -1)
			||	(gVar.bCanClick
				&& gFunc.isButtonClicked(gVar.aScene[gVar.iSceneNb].arrow_L)
				&& !gVar.oDave.bAnim
				&& !gVar.oDave.bDialog))
			{
				gVar.bCanClick = false;
				gVar.aScene[gVar.iSceneNb].iMoveDir = -1;
				gVar.aScene[gVar.iSceneNb].arrow_L[0] = -gVar.aScene[gVar.iSceneNb].arrow_L[2] * 2;
				gVar.oDave.move(gVar.aScene[gVar.iSceneNb].arrow_L);

				if (gFunc.collision(gVar.aScene[gVar.iSceneNb].arrow_L, gVar.oDave.aBox))
				{
					gVar.aScene[gVar.iSceneNb].iMoveDir = 0;
					gVar.iSceneChangementState = -1;
					gVar.aScene[gVar.iSceneNb].arrow_L[0] = 0;
				}
			}
		}
		

		if (!!gVar.aScene[gVar.iSceneNb].arrow_R) /* présence d'une flèche à droite de la scene */
		{
			if 	((gVar.aScene[gVar.iSceneNb].iMoveDir == 1)
			||	(gVar.bCanClick
				&& gFunc.isButtonClicked(gVar.aScene[gVar.iSceneNb].arrow_R)
				&& !gVar.oDave.bAnim
				&& !gVar.oDave.bDialog))
			{
				gVar.bCanClick = false;
				gVar.aScene[gVar.iSceneNb].iMoveDir = 1;
				gVar.aScene[gVar.iSceneNb].arrow_R[0] = gVar.iCanvas_w + gVar.aScene[gVar.iSceneNb].arrow_R[2];
				gVar.oDave.move(gVar.aScene[gVar.iSceneNb].arrow_R);

				if (gFunc.collision(gVar.aScene[gVar.iSceneNb].arrow_R, gVar.oDave.aBox))
				{
					gVar.aScene[gVar.iSceneNb].iMoveDir = 0;
					gVar.iSceneChangementState = 1;
					gVar.aScene[gVar.iSceneNb].arrow_R[0] = gVar.iCanvas_w - gVar.aScene[gVar.iSceneNb].arrow_R[2];
				}
			}
		}

		if (gVar.iSceneChangementState == -1) /* changement de scene à gauche */
		{
			gVar.iSceneChangementState = -2;
			gVar.iSceneNb--;
			gVar.oDave.x = gVar.iCanvas_w;
		}
		else if (gVar.iSceneChangementState == 1) /* changement de scene à droite */
		{
			gVar.iSceneChangementState = 2;
			gVar.iSceneNb++;
			gVar.oDave.x = -gVar.oDave.w;
		}
		else if (gVar.iSceneChangementState == -2)
		{
			var aTransitionTarget = [gVar.iCanvas_w - gVar.oDave.w * 2, gVar.oDave.y, gVar.oDave.w, gVar.oDave.h];
			gVar.oDave.move(aTransitionTarget);

			if (gFunc.collision(aTransitionTarget, gVar.oDave.aBox))
			{
				gVar.iSceneChangementState = 0;
				gVar.bCanClick = true;
				gVar.oDave.bAnim = false;
				gVar.oDave.iAnim = 0;
			}
		}
		else if (gVar.iSceneChangementState == 2)
		{
			var aTransitionTarget = [gVar.oDave.w, gVar.oDave.y, gVar.oDave.w, gVar.oDave.h];
			gVar.oDave.move(aTransitionTarget);

			if (gFunc.collision(aTransitionTarget, gVar.oDave.aBox))
			{
				gVar.iSceneChangementState = 0;
				gVar.bCanClick = true;
				gVar.oDave.bAnim = false;
				gVar.oDave.iAnim = 0;
			}
		}

/* ****************** Scene Content ****************** */

	for (var i = 0, c = gVar.aSceneContent.length; i < c; i++)
	{
		if (gVar.aSceneContent[i].iSceneNb == gVar.iSceneNb)
		{
			gVar.aSceneContent[i].draw();
		
			if ((gVar.aSceneContent[i].iDropedState == 1)
			||	(gFunc.isButtonClicked(gVar.aSceneContent[i].aBox)
				&& gVar.aSceneContent[i].iDropedState == 0
				&& !gVar.oDave.bAnim
				&& !gVar.oDave.bDialog))
			{
				gVar.aSceneContent[i].iDropedState = 1;
				gVar.oDave.move(gVar.aSceneContent[i].aBox);

				if (gFunc.collision(gVar.aSceneContent[i].aBox, gVar.oDave.aBox))
				{	
					gVar.aSceneContent[i].iDropedState = 2;
					gVar.oDave.bAnim = false;
					gVar.oDave.iAnim = 0;
				}
			}
			else if (gVar.aSceneContent[i].iDropedState == 2)
			{
				switch (gVar.aSceneContent[i].id)
				{
					//case 0: /* le seau */
						//gVar.bMinigames = true;
						//gVar.iMiniGameId = 0;
					//break;
					case 1: /* la fontaine */
						gVar.bGoldCoin = true;
						/* ********** */
					break;
					default :
						gVar.aInventoryContent.push(new InventoryContent(gVar.aSceneContent[i].id, gVar.aSceneContent[i].img));

						gVar.aSceneContent.splice(i, 1);
						i--;
						c--;
					break;
				}
			}
		}
	}

/* ****************** Pnj ****************** */

	for (var i = 0, c = gVar.aPnj.length; i < c; i++)
	{
		if (gVar.aPnj[i].iSceneNb == gVar.iSceneNb)
		{
			gVar.aPnj[i].draw();
			
			if ((gVar.aPnj[i].iInteractionState == 1)
			||	(gFunc.isButtonClicked(gVar.aPnj[i].aBox)
				&& gVar.aPnj[i].iInteractionState == 0
				&& !gVar.oDave.bAnim
				&& !gVar.oDave.bDialog))
			{
				gVar.aPnj[i].iInteractionState = 1;
				gVar.oDave.move(gVar.aPnj[i].aBox);

				if (gFunc.collision(gVar.aPnj[i].aBox, gVar.oDave.aBox))
				{	
					gVar.aPnj[i].iInteractionState = 2;
					gVar.oDave.bDialog = true;
					gVar.oDave.bAnim = false;
					gVar.oDave.iAnim = 0;
				}
			}
			else if (gVar.aPnj[i].iInteractionState == 2) /* contact */
			{
				gVar.aPnj[i].dialog();

				if (gVar.bCanClick && gVar.bMouseDown)
				{
					gVar.bCanClick = false;
					gVar.aPnj[i].iDialog_state++;
				}
			}
			else if (gVar.aPnj[i].iInteractionState == 3) /* dernière phrase */
			{
				gVar.aPnj[i].dialog();

				if (gVar.bCanClick && gVar.bMouseDown)
				{
					gVar.bCanClick = false;
					gVar.oDave.bDialog = false;
					gVar.aPnj[i].iInteractionState = 0;
				}
			}
		}
	}

/* ****************** Inventory Content ****************** */

	for (var i = 0, c = gVar.aInventoryContent.length; i < c; i++)
	{
		gVar.aInventoryContent[i].draw();
	}
		
/* ****************** Player ****************** */

	gVar.oDave.draw();

}
else
{

/* ****************** Minijeux ****************** */

	switch (gVar.iMiniGameId)
	{
		case 0:
			gVar.oShimumi.run();
		break;
		case 1:
			gVar.oTalkFight.run();
		break;
		case 2:

		break;
	}
}

/* ****************** Feedback visuel lors q'un click / touch ****************** */

if (gVar.bMouseDown)
{
	var gradient = gVar.context.createRadialGradient(
		gVar.iMouse_x, gVar.iMouse_y, 10 * gVar.iScale, gVar.iMouse_x, gVar.iMouse_y, 80 * gVar.iScale);
	gradient.addColorStop(0,"#ff0");
	gradient.addColorStop(1,"#ffc");

	gVar.context.globalAlpha = 0.5;
	gVar.context.fillStyle = gradient;

	gVar.context.beginPath();
	gVar.context.arc(gVar.iMouse_x, gVar.iMouse_y, 80 * gVar.iScale, 0, Math.PI * 2 , 0);
	gVar.context.closePath();
	gVar.context.fill();
}

/* affichage de la position du curseur à la pause pour le debug */

if (gVar.bDebug)
{
	var iCursorSize = 20 * gVar.iScale;
	gVar.context.globalAlpha = 1;
	gVar.context.fillStyle = "#00f";
	gVar.context.fillRect(gVar.iMouse_x - iCursorSize * 0.5, gVar.iMouse_y - iCursorSize * 0.5, iCursorSize, iCursorSize);
}


/* ****************** frame incrementation ****************** */

	if (++gVar.iFrame > 9999)
	{
		gVar.iFrame = 0;
		gVar.context.clearRect(0, 0, gVar.iCanvas_w, gVar.iCanvas_y);
	}
	
	globalVar = gVar;
	globalFunc = gFunc;
}
