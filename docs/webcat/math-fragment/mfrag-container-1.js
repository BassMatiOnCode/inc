import numberedEquationStyles from "../numbered-equation/numbered-equation-2.css" with { type: "css" } ;
import { initDocument as prepareNumberedEquations } from "../numbered-equation/numbered-equation-2.js"
import mathFragmentStyles from "/inc/webcat/math-fragment/mfrag-container.css" with { type: "css" } ;
import mathFragmentAnchorStyles from "/inc/webcat/math-fragment/mfrag-anchor.css" with { type: "css" } ;

const searchParams = ( new URL ( import.meta.url )).searchParams ;
const mathFragmentHostUrl = searchParams.get( "fragment-host" ) || "/inc/webcat/math-fragment/mfrag-host.htm" ;  // URL for the stand-alone fragment host document 

class MathFragmentContainer extends HTMLElement {
	fragmentAnchor = undefined ;
constructor ( ) {
	super( );
	const shadow = this.attachShadow ( { mode : "open" } ) ;
	shadow.adoptedStyleSheets.push( numberedEquationStyles );
	shadow.adoptedStyleSheets.push( mathFragmentStyles );
	// Create the heading
	const heading = document.createElement( "P" );
	// Heading anchor
	const anchor = this.fragmentAnchor = document.createElement( "A" );
	const fragmentId = this.getAttribute( "id" );
	const fragmentUrl = this.compileFragmentAddress( );
//	anchor.href = `${ mathFragmentHostUrl }?fragmentUrl=${ fragmentUrl.href }&backlink=${ document.location.pathname }&hash=${ fragmentId }` ;
	anchor.setAttribute( "backlink" , `${ mathFragmentHostUrl }?fragmentUrl=${ fragmentUrl.href }&backlink=${ document.location.pathname }&hash=${ fragmentId }` );
	anchor.setAttribute( "target", "_blank'" );
	let span = document.createElement( "SPAN" );
	span.textContent = fragmentId ;
	anchor.appendChild( span );
	anchor.appendChild( document.createTextNode( " " ));
	heading.appendChild( anchor );
	shadow.appendChild( heading );
	// Add normalized fragment type to the element's class list
	const fragmentType = ( fragmentId.match( /[a-zA-Z]+/ )[ 0 ] || "" ).toLowerCase( );
	if ( [ "d", "def", "dfn", "definition" ].includes( fragmentType )) this.classList.add( "definition" );
	else if ( [ "a", "ax", "axiom" ].includes( fragmentType )) this.classList.add( "axiom" );
	else if ( [ "t", "thm", "theorem" ].includes( fragmentType )) this.classList.add( "theorem" );
	else if ( [ "c", "cor", "corollary" ].includes( fragmentType )) this.classList.add( "corollary" );
	else if ( [ "l", "lm", "lem", "lemma" ].includes( fragmentType )) this.classList.add( "lemma" );
	// Load the fragment content.
	fetch ( fragmentUrl.href )
	.then ( response => response.ok ? response.text( ) : "not found" )
	.then ( text => { 
		const template = document.createElement( "TEMPLATE" );
		template.innerHTML = text ;
		prepareNumberedEquations( template.content );
		shadow.appendChild( template.content.querySelector( ".content" ));
		// Fragment title
		span = document.createElement( "SPAN" );
		span.innerHTML = this.getAttribute( "title" ) || template.content.querySelector( "H1" ).innerHTML ;
		anchor.appendChild( span );
		} ) ;
	anchor.addEventListener( "click" , evt => {
		if ( ! evt.shiftKey ) return ;
		window.open( anchor.href + "&popup=true", "_blank", "width=400,height=300,menubar=no,toolbar=no,status=no" );
		evt.preventDefault( );
		} ) ;
	}
compileFragmentAddress ( ) {
	let s = this.getAttribute( "path" ) || "" ;
	if ( s.length > 0 && ! s.endsWith( "/" )) s += "/" ;
	s += this.getAttribute( "id" );
	if ( this.hasAttribute( "name" )) s += "=" + this.getAttribute( "name" );
	if ( ! ( s.endsWith( ".htm" ) || s.endsWith( ".html" ))) s += ".htm" ;
	return new URL( s, document.location );
	}
	}

class MathFragmentAnchor extends HTMLElement {
static get observedAttributes ( ) { return [ "href", "target" ] }
constructor ( ) {
	super( );
	const shadow = this.attachShadow ( { mode : "open" } ) ;
	shadow.adoptedStyleSheets.push( mathFragmentAnchorStyles );
	shadow.innerHTML = `<a part="link" target="_blank"><slot></slot></a>` ;
	this.addEventListener( "click", ( evt ) => {
		const mathFragment = document.getElementById( this.getAttribute( "href" ).substring( 1 ));
		if ( ! mathFragment ) {
			window.open( `${ mathFragmentHostUrl }?fragmentUrl=${ this.href }${ evt.shiftKey ? "&popup=true" : "" }` , "_blank", `${ evt.shiftKey ? "popup, " : "" }width=400,height=300,menubar=no,toolbar=no,status=no` );
			evt.preventDefault( );
			}
		else if ( evt.shiftKey || evt.ctrlKey ) {
			const clickEvent = new Event( "click" );
			if ( evt.shiftKey ) clickEvent.shiftKey = evt.shiftKey ;
			mathFragment.fragmentAnchor.dispatchEvent( clickEvent );
			}
		else this.shadowRoot.querySelector( "a" ).click( );
		} ) ;
	}
attributeChangedCallback ( name, oldValue, newValue ) {
	this.shadowRoot.querySelector( "a" )[ name ] = newValue ;
	}
connectedCallback ( ) {
    this.shadowRoot.querySelector( "a" ).href = this.getAttribute( "href" );
	}
	}

customElements.define( "mfrag-container", MathFragmentContainer );
customElements.define( "mfrag-anchor", MathFragmentAnchor );