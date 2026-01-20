// fragment-loader-2.js
// TODO Rename data-load-origin to data-fragment-origin
// TODO Recreate scripts
// TODO Recreate stylesheets
// Events Overview
//	fragment-loader-finished
//		Dispatched in processRootContainers() to document. Annonces that all root containers have been processed by the loader.
//	fragment-loader-root-container-finished
//		Dispatched to all root containers
//		from

import { namespaces } from "../utility/xml-namespaces/xml-namespaces.js" ;
import * as initializer from "/inc/webcat/component-initializer/component-initializer.js" ;

export async function processRootContainers ( rootContainers )
	// Processes a list of container elements to be processed.
	// rootContainers {string} : Comma-separated list of container IDs
	// rootContainers {object} : A single root container object
	// rootContainers {[string|object]} : An array of container objects or IDs 
	// Returns a Promise that resolves to the jobs array when all root containers have been processed.
	{
	if ( typeof rootContainers === "string" ) rootContainers = rootContainers.split( "," );
	else if ( ! Array.isArray( rootContainers )) rootContainers = [ rootContainers ];
	const jobs = [ ];
	for ( const container of rootContainers ) jobs.push( loadFragments( container ).then( container => {
		console.log( "Root container finished", container );
		container.dispatchEvent( new CustomEvent( "fragment-loader-root-container-finished", { details : { rootContainer : container }}));
		return container ;
		} ) ) ;
	return Promise.allSettled( jobs ).then( jobs => { 
		console.log( "Root containers finished " , jobs );
		document.dispatchEvent( new CustomEvent( "fragment-loader-root-containers-finished", { details : { rootContainers : jobs }}));
		return jobs ; 
		} );
	}
export async function loadFragments ( container = document.body )
	// Processes] all HTML fragments found in the container.
	// NOTE that this function can be called recursively through loadFragment() => loadFragments().
	// container : An HTML container element or its element ID that might contain HTML fragment anchors.
	// Returns a Promise that settles when all fragment anchors have been processed.
	{
	if ( typeof container === "string" ) container = document.getElementById( container );
	const jobs = [ ] ;
	// TODOkekek make attribute data-load-fragment a class name html-fragment
	container.querySelectorAll( "A[data-load-fragment]" ).forEach( anchor => jobs.push( loadFragment( anchor )));
	return Promise.allSettled( jobs ).then(( jobs ) => {
		console.log( "loadFragments, settled:", jobs );
		for ( const job of jobs.valueOf( )) console.log( "Fragments loaded", container, job.status, job.value );
		if ( jobs.length > 0 ) container.dispatchEvent( new CustomEvent( "fragment-loader-container-finished", { detail : { container : container , anchors : jobs } } ) ) ;
		return container;	
		} ) ;
	}
export async function loadFragment( anchor )
	// Loads the HTML fragment referenced by the anchor element.
	// Includes nested fragments.
	// anchor : An HTML A element with a data-load-fragment attribute
	// Returns a Promise that fulfills when the HTML fragment have
	// been injected, or undefined if a recursion error occurs.
	{
	// Prevent recursion
	if ( anchor.closest( `[data-fragment-origin="${ anchor.href }"]` )) { 
		console.error( `Fragment address recursion: ${ anchor.href }` ) ; 
		return ;
		}
	return fetch( anchor.href )
	.then ( response => { 
		if ( response.ok ) return response.text( ) ; 
		else return response.statusText;  
		} )
	.then ( async text => { 
		let buffer = createBuffer( text, anchor.href );
		if ( anchor.hasAttribute( "data-select" )) {
			// Select a part of the content, discard the rest.
			anchor.dispatchEvent( new CustomEvent( "fragment-loader-selecting-content", { detail : { content : buffer } } ) ) ;
			buffer.replaceChildren( ...buffer.querySelectorAll( anchor.getAttribute( "data-select" )));
			}
		rebaseUrls( buffer, anchor.href );
		for ( const element of buffer.children ) element.setAttribute( "data-load-origin", anchor.href );
		await loadFragments( buffer );
		injectContent( anchor, buffer );
		return anchor;
		} );
	}
export function injectContent( anchor, buffer ) {
	const injectedNodes = [ ];
	for ( const node of buffer.childNodes ) injectedNodes.push( node );  // because buffer is empty after injection
	anchor.dispatchEvent( new CustomEvent( "fragment-loader-injecting-content", { detail : { content : buffer }}));
	switch ( anchor.getAttribute( "data-injection-method" )) {
	case "append" :
		anchor.parent.append( ...buffer.childNodes );
		break;
	case "prepend" :
		anchor.parent.prepend( ...buffer.childNodes );
		break;
	case "after" :
		anchor.after( ...buffer.childNodes );
		break;
	case "before" :
		anchor.before( ...buffer.childNodes );
		break;
	case "replace":
	default:
		anchor.replaceWith( ...buffer.childNodes );
		break;
		}
	if ( anchor.parent ) {  // deactivate
		anchor.setAttribute( "data-fragment-href", anchor.href );
		anchor.removeAttribute( "data-load-fragment" );
		anchor.removeAttribute( "href" );
		}
	console.log( "Fragment injected", anchor.href );
	anchor.dispatchEvent( new CustomEvent( "fragment-loaded", { detail : { injectedNodes : injectedNodes }}));
	}
export function createBuffer( text, origin ) {
	//	Creates a buffer with a suitable type (G, MROW or TEMPLATE element
	//	according to the filename extension) and fills the text in. 
	//	Returns a buffer (G, MROW or DocumentFragment with an HTML object structure.
	let buffer ;
	if ( origin.endsWith( ".svg" )) buffer = document.createElementNS( namespaces.svg , "G" ) ;
	else if ( origin.endsWith( ".math.htm" )) buffer = document.createElementNS( namespaces.mathml , "MROW" ) ;
	else buffer = document.createElement( "TEMPLATE" ) ; 
	buffer.innerHTML = text ;
	return buffer.content || buffer;
	}
export function rebaseUrls ( buffer, base, addressAttributes = [ "href", "src", "data" ] ) {
	for ( const addressAttribute of addressAttributes ) {
		for ( const element of buffer.querySelectorAll( `[${addressAttribute}]` )){
				// Skip elements that have host document relative addresses
			if ( element.hasAttribute( "data-host-relative" )) continue;
				// Translate target-document relative address to absolute address based on the fragment location.
			element.setAttribute( addressAttribute,  new URL( element.getAttribute( addressAttribute ), base ).href );
			}
		}
	 }
export async function init ( searchparams = null, event, 
	containers = searchparams?.get( "containers" ) || document.body )  
	// searchparams : URLSearchParams object, contains parameters passed via script module URL.
	// event : Event object if called as event handler, or null if called directly.
	// containers : HTMLElement or array of HTMLElements or comma-separated list of element ID strings
	// Returns : A job promise array, can be inspected with
	// 	result.then((r) => { for ( const x of r ) x.then( y => console.log( y )) });
	{
	return processRootContainers( containers );
	}
initializer.initComponent ( init, import.meta.url );

