// Documentation: .../webcat/download-element/download-element.htm

import * as initializer from "../component-initializer/component-initializer-1.js" ;

/**
*		prepareStaticDownloadAnchor ( )
*		Initializes a download anchor. Prepares the outer HTML of the referenced 
*		element for download.
*
*/ export function prepareStaticDownloadAnchor ( anchor, 
		{
		element = anchor.getAttribute("data-element-id" ),  
		fileName = anchor.getAttribute( "download" ) || "element.htm", 
		contentType = anchor.getAttribute( "data-mimetype" ) || "text/html" 
		} = { } ) {
	// Resolve ID strings
	if ( typeof anchor === "string" ) anchor = document.getElementById( anchor );
	if ( typeof element === "string" ) element = document.getElementById( element );
	// If a URL exists, revoke it to free resources
	URL.revokeObjectURL( anchor.href );
	// Create a new object URL and set the file name
	anchor.href = URL.createObjectURL ( new Blob ( [ element.outerHTML ] , { type : contentType } ) );
    anchor.download = fileName;
	}
/**
*		prepareDynamicDownloadAnchor ( )
*		The object URL is created on the fly when the user clicks on the link. 
*		element for download.
*
*/ export function prepareDynamicDownloadAnchor ( anchor, {
		element = anchor.getAttribute("data-element-id" ),  
		fileName = anchor.getAttribute( "download" ) || "element.htm", 
		contentType = anchor.getAttribute( "data-mimetype" ) || "text/html" 
		} = { } ) {
	// Resolve ID strings
	if ( typeof anchor === "string" ) anchor = document.getElementById( anchor );
	if ( typeof element === "string" ) element = document.getElementById( element );
	// Set the file name
    anchor.download = fileName;
	// Setup a click event listener
	anchor.addEventListener( "click" , ( evt ) => {
		// Create an object URL on the fly
		anchor.href = URL.createObjectURL ( new Blob ( [ element.outerHTML ] , { type : contentType } ) );
		// Release the object URL *after* the download has started
		globalThis.requestAnimationFrame( ( ) => URL.revokeObjectURL( anchor.href ));
		// The download will start now
		} ) ;
	}
/**
*		init ( )
*		Initializes the WebCAT component.
*
*/ export function init( ) {
	for ( const anchor of document.querySelectorAll( "a.download-element" )) prepareDynamicDownloadAnchor( anchor );
	}

// * * * Module init code * * * // 

initializer.initComponent( init, import.meta.url );
