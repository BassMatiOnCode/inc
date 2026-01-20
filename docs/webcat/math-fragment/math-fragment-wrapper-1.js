import { setMathFragmentNumber } from "/inc/webcat/math-fragmentmath-fragment-numerator.js?noinit" ;
export function init ( )	{
	setMathFragmentNumber( document.body, document.location.pathname );
	}
initializer.initComponent ( init, import.meta.url );
