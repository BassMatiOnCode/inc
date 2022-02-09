///
///  dom-helper-1.js   ES2016 module   2021-10-22   usp
///  

export function swapAttributes( e, a, b ) {
	const s = e.getAttribute( a );
	e.setAttribute( a, e.getAttribute( b ));
	e.setAttribute( b, s );
	}
