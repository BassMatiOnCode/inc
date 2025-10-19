//	2025-10-06 USP

import * as loader from "/inc/webcat/fragment-loader/fragment-loader-2.js" ;
import * as smp from "/inc/webcat/scroll-margin-provider/scroll-margin-provider.js" ;

( async function initialize( ) {
	// Initializes an SPA content document.
	console.log( `Initializing ${ document.location.href }` );
	window.frameElement.style.height = "150px" ;
	await loader.loadFragments( );
	const observer = new ResizeObserver(( entries ) => {
		// console.debug( entries[ 0 ].target.offsetHeight, window.frameElement.scrollHeight );
		window.frameElement.style.height = entries[ 0 ].target.offsetHeight + 0 +  "px" ;
		} ) ;
	observer.observe( document.documentElement );
	requestAnimationFrame(( ) => 
	requestAnimationFrame(( ) => {
		const target = document.getElementById( document.location.hash.substring( 1 ));
		if ( target ) {
			const { marginTop, marginBottom } = smp.getScrollMargins( window.frameElement.ownerDocument );
			target.style.scrollMarginTop = marginTop + "px" ;
			target.style.scrollMarginBottom = marginBottom + "px" ;
			target.scrollIntoView( { behavior : "smooth" } ); 
	} } ) ) } ) ( ) ;

