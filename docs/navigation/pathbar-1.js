/*
 *    Navigation Path Bar
 *    2022-07-15 usp
 *    Related: pathbar-1.css
 */

export function initDocument ( parents ) {
	///		Makes the path bars visible and creates the parent node list.
	///		parents : list of links to the parent documents.
	debugger ;
	if ( ! parents || ! parents.length ) return ;
	// Data
	const buttonWidth = 40 ;
	const scrollIncrement = 50 ;
	function initPathBar ( pathbar ) {
		// Make the pathbar visible.
		pathbar.style.display = "block" ;
		// Create the content container.
		let content = document.createElement( "DIV" );
		div.className = "content" ;
		pathbar.appendChild( content );
		// Create the link list in the content container.
		for ( let i = 0 ; i < parents.length ; i ++ ) {
			if ( i > 0 ) content.innerHTML += " > " ;
			content.innerHTML += `<a href="${parents[ i ]}">
			}
		// Create the buttons.
		let buttons = [ document.createElement( "DIV" ), document.createElement( "DIV" ) ];
		buttons[ 0 ].className = "scroll right" ;
		buttons[ 1 ].className = "scroll left" ;
		pathbar.appendChild( buttons[ 0 ] );
		pathbar.appendChild( buttons[ 1 ] );
		// They are hidden initially.
		let buttonsHidden = false ;
		// left button event handler
		pathbar.getElementsByClassName( "right" )[ 0 ].addEventListener( "click", function( ) { 
			window.event.stopPropagation( );
			window.event.preventDefault( );
			content.style.left = Math.max( content.offsetLeft - scrollIncrement, pathbar.offsetWidth - content.offsetWidth - buttonWidth ) + "px" ;
			} ) ;
		// right button event handler
		pathbar.getElementsByClassName( "left" )[ 0 ].addEventListener( "click", function( ) { 
			window.event.stopPropagation( );
			window.event.preventDefault( );
			content.style.left = Math.min( content.offsetLeft + scrollIncrement, buttonWidth ) + "px" ;
			} ) ;
		// container size monitoring
		window.addEventListener( "resize", function( ) { 
			// Show or hide scroll buttons
			if ( buttonsHidden && content.scrollWidth > pathbar.offsetWidth ) {
				buttons[ 0 ].style.display = buttons[ 1 ].style.display = "inline-block" ;
				buttonsHidden = false ;
				}	
			else if ( ! buttonsHidden && content.scrollWidth < pathbar.offsetWidth ) {
				buttons[ 0 ].style.display = buttons[ 1 ].style.display = "none" ;
				buttonsHidden = true ;
				content.style.left = "0px" ;
			}	} ) ;
		}
	let pathBars = document.getElementsByClassName( "path-bar" );
	if ( ! pathBars.length ) return ;
	// Code
	for ( let i = 0 ; i < pathBars.length ; i ++ ) initPathBar( pathBars[ i ] );
	}
