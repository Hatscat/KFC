/* --------------------------------- Scripts Class --------------------------------- */

var Script = function()
{
	this.i = 0;

	this.draw = function(text, x, y)
	{
		globalVar.context.fillStyle = "#fff";
		globalVar.context.font = "33px Georgia";

		globalVar.context.fillText(text[this.i], globalVar.iCanvas_w * 0.1, globalVar.iCanvas_h * 0.2);

		if (globalVar.bMouseDown && this.i < text.length)
		{
			this.i++;
		}
	}
}
