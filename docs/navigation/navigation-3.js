//
// navigation-3.js  2022-02-04  usp
//

	// Store a reference to the frequently needed navigation panel
let navpanel = document.getElementById( "navigation-panel" );
	// Special site links
export let parent = "#", first = "#", previous = "#", next = "#", last = "#" ;
	// Link list, the nodes between root and the current document node
export let parents = [ ] ;

export function initPage ( tocsrc = "/toc.htm" ) {
	/// tocsrc : path to the table-of-contents file
	if ( ! navpanel ) {
		navpanel = document.body.appendChild( document.createElement( "DIV" ));
		navpanel.id = "navigation-panel" ;
		const toolbar = navpanel.appendChild( document.createElement( "DIV" ));
		let button = toolbar. appendChild( document.createElement( "BUTTON" ));
		button.innerText = "Close" ;
		button.addEventListener( "click" , function ( ) {
			navpanel.style.width = navpanel.scrollWidth + "px" ;
			window.requestAnimationFrame( ( ) => navpanel.style.width = "0px" ) ; 
			} ) ;
		}
	navpanel.style.width = "0px" ;
	let tocroot = navpanel.querySelector( "#toc-root" );
	if ( ! tocroot ) {
		tocroot = navpanel.appendChild( document.createElement( "UL" ));
		tocroot.id = "toc-root" ;
		tocroot.className = "collapsible" ;
		}
	if ( ! tocroot.hasAttribute( "load-src" )) tocroot.setAttribute( "load-src", tocsrc );
	tocroot.setAttribute( "cbc-default", "collapsed" );
	navpanel.addEventListener( "transitionend", transitionEndHandler );
	navpanel.addEventListener( "click", panelClickHandler );
	}

function panelClickHandler ( evt ) {
	if ( evt.target.id === "navigation-panel" ) navigateButtonClickHandler( evt );
	}

export function toggleNavigationPane ( ) {
	if ( navpanel.style.width === "0px" ) {
		// Temporarily switch width to auto to determine the correct scroll width.
		navpanel.style.width = "auto" ;
		const w = navpanel.scrollWidth + "px" ;
		navpanel.style.width = "0px" ;
		window.requestAnimationFrame( function ( ) { navpanel.style.width = w ; } ) ; } 
	else {
		navpanel.style.width = navpanel.scrollWidth + "px" ;
		window.requestAnimationFrame( ( ) => navpanel.style.width =  "0px" ) ; 
		}
	}

export function navigateButtonClickHandler ( evt ) {
	toggleNavigationPane( );
	evt.preventDefault( );
	evt.stopPropagation( );
	}

function transitionEndHandler ( evt ) {
	if ( evt.target.style.width !== "0px" ) evt.target.style.width = "auto" ;
	evt.preventDefault();
	evt.stopPropagation( );
	}

export function findCurrentDocument( ) {
	const links = navpanel.getElementsByTagName( "A" );
	for ( let i = 0 ; i < links.length ; i ++ ) {
		const link = links[ i ];
		if ( link.href === document.location.href ) {
			if ( i > 0 ) previous = links[ i - 1 ].href;
			if ( i < links.length - 1 ) next = links[ i + 1 ].href;
			let e = link.parentNode.parentNode.firstElementChild.querySelector( "LI>A" );
			if ( e ) first = e.href;
			e = link.parentNode.parentNode.lastElementChild.querySelector( "LI>A" );
			if ( e ) last = e.href;
			activateLinkChain( link );
			if ( parents.length > 0 ) parent = parents[ parents.length - 1 ];
			break;
	} } }

export function activateLinkChain( e ) {
	while ( (e = e.parentNode) ) {
		if ( e.tagName === "LI" ) {
			let link = e.querySelector( "LI>A" );
			if ( link ) parents.unshift( link.href );
			e.setAttribute( "active", "" );
			if ( e.getAttribute( "cbc" ) === "collapsed" ) {
				e.setAttribute( "cbc", "expanded" );
				e.synesis.collapsibleBlocks[ 0 ].style.height = e.synesis.collapsibleBlocks[ 0 ].scrollHeight + "px";
	} } } 
	if (parents.length > 0) parents.pop( );
	}

