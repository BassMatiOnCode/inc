//  svg-plotter-1.js   2023-05-09 usp
//

import { setMarkerColors } from "./svg-1.js" ;

const filename = "svg-plotter-1.js" ;
function createError ( functionName, reason, actual, expected ) {
	if ( actual ) actual = ` ${actual}` ;
	if ( expected ) expected = `, expected: ${expected}` ;
	return new Error( `${filename}:${functionName}(): ${reason}${actual}${expected}` ) ; 
	}
export class svgPlotter {
	#svg ;
	#viewport = { };
	 constructor( id, options = { } ) {
		this.#svg = document.getElementById( id );
		if ( ! this.#svg ) throw createError( "svgPlotter.constructor", "Invalid element ID", id );
		const a = this.#svg.getAttribute("viewBox").replace( /\s+/g, " " ).split( " " ); 
		this.#viewport.x = +a[ 0 ];
		this.#viewport.y = +a[ 1 ];
		this.#viewport.w = +a[ 2 ];
		this.#viewport.h = +a[ 3 ];
		}

	createAxes( descriptor ) {
		// Creates the coordinate system axes. 

		// Make shure the arrowhead template elements are there.
		// Get or create the defs element
		let defs = this.#svg.querySelector( "defs" );
		if ( ! defs ) { 
			defs = document.createElementNS( this.#svg.namespaceURI, "defs" );
			this.#svg.appendChild( defs );
			}

		// Get or create the axis arrow shape
		let arrowshape = defs.querySelector( "#axisArrowShape" );
		if ( ! arrowshape ) {
			arrowshape = document.createElementNS( this.#svg.namespaceURI, "polygon" );
			arrowshape.id = "axisArrowShape" ;
			arrowshape.setAttribute( "points", "0 0 10 4 0 8" );
			defs.appendChild( arrowshape );
			}

		// Get or create the axis arrow marker template
		let arrowmarker = defs.querySelector( "#axisArrowMarker" );
		if ( ! arrowmarker ) {
			arrowmarker = document.createElementNS( this.#svg.namespaceURI, "marker" );
			arrowmarker.id = "axisArrowMarker" ;
			arrowmarker.setAttribute( "markerWidth", "10" );
			arrowmarker.setAttribute( "markerHeight", "8" ); 
			arrowmarker.setAttribute( "refX", "10" );
			arrowmarker.setAttribute( "refY", "4" );
			arrowmarker.setAttribute( "orient", "auto-start-reverse" );
			const e = document.createElementNS( this.#svg.namespaceURI, "use" );
			e.setAttribute( "href", "#axisArrowShape" );
			arrowmarker.appendChild( e );
			defs.appendChild( arrowmarker );
			}
		
		// Create the axes
		const keys = Object.keys( descriptor );
		const values = Object.values( descriptor );
		if ( keys.length > 0 ) {
			const axis = document.createElementNS( this.#svg.namespaceURI, "line" );
			axis.setAttribute( "x1", this.#viewport.x );
			axis.setAttribute( "x2", this.#viewport.w + this.#viewport.x );
			axis.setAttribute( "y1", 0 );
			axis.setAttribute( "y2", 0 );
			axis.setAttribute( "stroke", values[ 0 ].stroke || "black" );
			axis.setAttribute( "marker-end", "url(#axisArrowMarker)" );
			this.#svg.appendChild( axis );
			setMarkerColors( [ axis ], arrowmarker );
			const label = document.createElementNS( this.#svg.namespaceURI, "text" );
			label.setAttribute( "text-anchor", "middle" );
			label.setAttribute( "dominant-baseline", "middle" );
			label.setAttribute( "x", this.#viewport.w + this.#viewport.x - 10 );
			label.setAttribute( "y", "-15" );
			label.textContent = keys[ 0 ];
			this.#svg.appendChild( label );
			}
		if ( keys.length > 1 ) {
			const axis = document.createElementNS( this.#svg.namespaceURI, "line" );
			if ( keys.length > 2 ) {
				axis.setAttribute( "x1", this.#viewport.w + this.#viewport.x );
				axis.setAttribute( "x2", this.#viewport.x );
				axis.setAttribute( "y1", this.#viewport.y );
				axis.setAttribute( "y2", this.#viewport.h + this.#viewport.y );
				const label = document.createElementNS( this.#svg.namespaceURI, "text" );
				label.setAttribute( "text-anchor", "middle" );
				label.setAttribute( "dominant-baseline", "middle" );
				label.setAttribute( "x", this.#viewport.x + 5 );
				label.setAttribute( "y", this.#viewport.h  + this.#viewport.y - 25 );
				label.textContent = keys[ 1 ];
				this.#svg.appendChild( label );
				}
			else {
				axis.setAttribute( "x1", 0 );
				axis.setAttribute( "x2", 0 );
				axis.setAttribute( "y1", this.#viewport.h + this.#viewport.y );
				axis.setAttribute( "y2", this.#viewport.y );
				// Axis label
				const label = document.createElementNS( this.#svg.namespaceURI, "text" );
				label.setAttribute( "text-anchor", "middle" );
				label.setAttribute( "dominant-baseline", "middle" );
				label.setAttribute( "x", -15 );
				label.setAttribute( "y", this.#viewport.y + 10 );
				label.textContent = keys[ 2 ];
				this.#svg.appendChild( label );
				}
			axis.setAttribute( "stroke", values[ 0 ].stroke || "black" );
			axis.setAttribute( "marker-end", "url(#axisArrowMarker)" );
			this.#svg.appendChild( axis );
			setMarkerColors( [ axis ], arrowmarker );
			}
		if ( keys.length > 2 ) {
			const axis = document.createElementNS( this.#svg.namespaceURI, "line" );
			axis.setAttribute( "x1", 0 );
			axis.setAttribute( "x2", 0 );
			axis.setAttribute( "y1", this.#viewport.h + this.#viewport.y );
			axis.setAttribute( "y2", this.#viewport.y );
			axis.setAttribute( "stroke", values[ 0 ].stroke || "black" );
			axis.setAttribute( "marker-end", "url(#axisArrowMarker)" );
			this.#svg.appendChild( axis );
			setMarkerColors( [ axis ], arrowmarker );
			// Axis label
			const label = document.createElementNS( this.#svg.namespaceURI, "text" );
			label.setAttribute( "text-anchor", "middle" );
			label.setAttribute( "dominant-baseline", "middle" );
			label.setAttribute( "x", -15 );
			label.setAttribute( "y", this.#viewport.y + 10 );
			label.textContent = keys[ 2 ];
			this.#svg.appendChild( label );
			}

		}
	}