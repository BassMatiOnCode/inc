// spa-iframe-host-1.js

import * as smp from "/inc/webcat/scroll-margin-provider/scroll-margin-provider.js" ;
const configuration = new URLSearchParams( import.meta.url );
( function initialize ( ) {
	navigation.addEventListener('navigate', evt => {
		const url = new URL( evt.destination.url );
		if ( url.pathname === "/host.htm" ) return ;
		console.log( `Navigate event: url=${evt.destination.url}` );
		if ( ! evt.canIntercept || evt.downloadRequest ||evt.formData ) return ;
		evt.intercept( { scroll : "manual" , async handler ( ) {
			console.log( "Intercepting" );
			if ( ! evt.hashChange ) mainContent.setAttribute( "src", evt.destination.url );
			else {	// scroll smoothly to the target element
				const target = mainContent.contentDocument.getElementById( url.hash.substring( 1 ));
				if ( target ) {
					console.log( "Serving hash change " + target );
					const { marginTop, marginBottom } = smp.getScrollMargins( );
					target.style.scrollMarginTop = marginTop + "px" ;
					target.style.scrollMarginBottom = marginBottom + "px" ;
					target.scrollIntoView( { behavior : "smooth" } ); 
				}	}	
		} } ) ; } ) ; 
	const sp = new URLSearchParams( document.location.search );
	let url = sp.get( "goto" ) ;
	if ( ! url ) url = configuration.get( "landing-page" ) || "landing-page.htm" ; 
	else {   // content redirection
		sp.delete( "goto" );
		if ( sp.size > 0 ) url += `?${ sp.toString( ) }` ;
		url += document.location.hash ;
		history.replaceState( null, "", "index.htm" );
		}
	navigation.navigate( url );
	} ) ( ) ;