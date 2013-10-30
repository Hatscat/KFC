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
			||	(gVar.bCanClick && gFunc.isButtonClicked(gVar.aScene[gVar.iSceneNb].arrow_L) && !gVar.oDave.bAnim))
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
			||	(gVar.bCanClick && gFunc.isButtonClicked(gVar.aScene[gVar.iSceneNb].arrow_R) && !gVar.oDave.bAnim))
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
				&& !gVar.oDave.bAnim))
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
					case 1:
						
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
				&& !gVar.oDave.bAnim))
			{
				gVar.aPnj[i].iInteractionState = 1;
				gVar.oDave.move(gVar.aPnj[i].aBox);

				if (gFunc.collision(gVar.aPnj[i].aBox, gVar.oDave.aBox))
				{	
					gVar.aPnj[i].iInteractionState = 2;
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

				if (!gFunc.collision(gVar.aPnj[i].aBox, gVar.oDave.aBox))
				{	
					gVar.aPnj[i].iInteractionState = 0;
				}

				// switch (gVar.aPnj[i].id)
				// {
				// 	case 0 : /* poulet_metal */
				// 		oDialog.draw("poulet_metal", 0);
				// 	break;
				// 	case 1 : /* poulet_garde */
				// 		this.iSceneNb = 0;
				// 		this.sx = 700;
				// 		this.sy = 480;
				// 		this.frameAmount = 0;
				// 	break;
				// 	case 2 : /* poulet_forgeron */
				// 		this.iSceneNb = 3;
				// 		this.sx = 600;
				// 		this.sy = 470;
				// 		this.frameAmount = 3;
				// 	break;
				// 	case 3 : /* Aubergiste ------- sans image */
				// 		this.iSceneNb = 0;
				// 		this.sx = 232;
				// 		this.sy = 413;
				// 		this.sw = 125;
				// 		this.sh = 195;
				// 	break;
				// 	case 4 : /* poulet_final ------- sans image */
				// 		this.iSceneNb = 5;
				// 		this.sx = 497;
				// 		this.sy = 549;
				// 		this.sw = 125;
				// 		this.sh = 195;
				// 	break;

				// 	case 0 :
				// 		gVar.oScript.draw(["Hey! T’as l’air d’un métalleux !",
				// 							" Et en plus t’es un humain !"," Ca me rapelle LA prophéthie !",
				// 							" - La prophétie ?"," - La prophétie !",
				// 							" - Va droit au but.",
				// 							" - La prophétie dit qu’un humain viendra renverser le tyrannique roi Chickwings et blabla...",
				// 							" retablir la paix, l’harmonie blabla… ","- En gros je dois lui botter le cul ?!",
				// 							" -Ouais, c’est à peut près ça"], 30, 50);
				// 	break;
				// 	case 1 :
				// 		gVar.oScript.draw(["Les humains doivent mourir pour la gloire du grand roi Chickwings ! ",
				// 							"Je vais :rotte: te :hic: tuer ! "], 30, 50);
				// 	break;
				// 	case 2 : /*Forgeron*/
				// 		//Si Horloge changée (var globale)
				// 			gVar.oScript.draw(["Tu veux qu'on se tire l'oreille ?"], 30, 50);
				// 			//Déclenchment Baston verbale
				// 		//Sinon
				// 			//gVar.oScript.draw(["Je suis en pause, c’est pas l’heure de bosser !"], 50, 50);
				// 	break;
				// 	case 3 : /*Tavernier*/
				// 		//Si Po (variable globale Po (pièce d'or de la fontaine)
				// 			gVar.oScript.draw(["Alors comme ça tu as un Poulet d'Or et tu voudrais m'acheter cette huile ?"], 30, 50);
				// 			// Déclenchement Négoce
				// 		//Sinon
				// 			/*gVar.oScript.draw(["Ah ! Merci de m’avoir débarassé de cet ivrogne !",
				// 				" J’ai pas grand chose à te filer étant donné que t’as déjà bu trois bières à l’oeil,",
				// 				" mais tiens, prend… heuh… Cette plaquette de beurre! Le gras, c’est la vie"], 50, 50);*/
				// 	break;
				// 	case 4 :
				// 		//Si huile bouillante
				// 			//jette huile bouillante
				// 		//Sinon
				// 			gVar.oScript.draw(["Dégage minus !"], 30, 50);
				// 			//gVar.oScript.draw(["[marmonne] J’en ferais bien des chicken wings de ce type là..."], 50, 50);
				// 	break;
				// 	case 5 :
				// 		//Si Po (variable globale Po (pièce d'or de la fontaine)
				// 			gVar.oScript.draw(["La vue de cette fontaine me rajeuni d’au moins 10 ans"],30, 50);
				// 		//Sinon
				// 			//gVar.oScript.draw(["Ah… J’ai un Poulet d’Or, je sais pas quoi en faire. ",
				// 				//"-Bah file le moi ! ","-..."], 50, 50);
				// 	break;
				// }
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

		break;
		case 2:

		break;
	}
}

/* ****************** Feedback visuel lors q'un click / touch ****************** */

if (gVar.bMouseDown)
{

	gVar.context.globalAlpha = 0.5;
	gVar.context.fillStyle = "#ff5";

	gVar.context.beginPath();
	gVar.context.arc(gVar.iMouse_x, gVar.iMouse_y, 60 * gVar.iScale, 0, Math.PI * 2 , 0);
	gVar.context.closePath();
	gVar.context.fill();
}

/* affichage de la position du curseur à la pause pour le debug */

if (gVar.bPause)
{
	gVar.context.globalAlpha = 1;
	gVar.context.fillStyle = "#00f";
	gVar.context.fillRect(gVar.iMouse_x, gVar.iMouse_y, 20 * gVar.iScale, 20 * gVar.iScale);
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
