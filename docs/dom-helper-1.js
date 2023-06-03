///
///  dom-helper-1.js   ES2016 module   2023-06-03   usp
///  

export const swap = function ( o, a, b ) {
	const t = o[ a ];
	o[ a ] = o[ b ];
	o[ b ] = t ;
	}

export  const swapAttributes = function ( e, a, b ) {
	const s = e.getAttribute( a );
	e.setAttribute( a, e.getAttribute( b ));
	e.setAttribute( b, s );
	return e ;
	} ;

export const setAttributes = function ( e, attributes ) {
	attributes = Object.values( attributes );
	for ( const [key, value] of attributes ) e.setAttribute( key, value );
	return e ;
	} ;