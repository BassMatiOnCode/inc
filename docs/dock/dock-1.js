//
//	dock-1.js    usp    2023-10-14
//
export function getPropertyName ( panel ) {
	switch ( panel.getAttribute( "dock" )) {
	case "left" :
	case "right" :
		return "width" ;
	case "top" :
	case "bottom" :
		return "height" ;
	}	}
export function expand ( panel ) {
	if ( panel.style.display !== "" ) return ;
	panel.style.display = "block" ;
	const property = getPropertyName( panel );
	panel.style[ property ] = "auto" ;
	const length = window.getComputedStyle( panel )[ property ] ;
	panel.style[ property ] = "0px" ;
	setTimeout ( ( ) => {
	setTimeout ( ( ) => {
		panel.style[ property ] = length ;
		} ) } ) ;
	}
export function collapse ( panel ) {
	panel.style.removeProperty( "overflow" );
	const property = getPropertyName( panel );
	panel.style[ property ] = window.getComputedStyle( panel )[ property ] ;
	setTimeout ( ( ) => {
	setTimeout ( ( ) => {
		panel.style[ property ] = "0px" ;
		} ) } ) ;
	}
export function transitionEndHandler ( evt ) {
	const property = getPropertyName( evt.target );
	if ( evt.target.style[ property ] === "0px" ) {  
		// collapsed
		evt.target.style.removeProperty( property );
		evt.target.style.removeProperty( "display" );
		}
	else {  
		// expanded
		evt.target.style[ property ] = "auto" ;
		evt.target.style.overflow = "auto" ;
	}	}
export function init ( root = document.body ) {
	for ( const element of root.querySelectorAll( "[dock]" )) {
		element.addEventListener( "transitionend" , transitionEndHandler ) ;
	}	}

