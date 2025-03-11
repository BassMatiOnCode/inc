// 2025-03-11
function setAttributes( target, attributes = { } ) { 
	for ( const [ name, value ] of Object.entries( attributes )) 
		if ( value === undefined ) target.removeAttribute( name );
		else target.setAttribute( name, value );
	}
function setProperties( target, properties = { } ) {
	for ( const [ name, value ] of Object.entries( properties )) 
		if ( value === undefined ) delete target[ name ] ;
		else target[ name ] = value ;
	}
function addSvgElement( tagName, attributes={ }, properties={ }, parent ) {
	const element = document.createElementNS( "http://www.w3.org/2000/svg", tagName );
	setAttributes( element, attributes );
	setProperties( element, properties );
	if ( parent === undefined ) {
		switch ( tagName ) {
		case "text" :
			parent = "text" ;
			break;
		case "use" : 
			switch ( attributes.href ) {
			case "#pointSolid" :
			case "#pointHollow" :
				parent = "points" ;
				break;
			default : 
				parent = "main" ;
				}
			break;
		default :
			parent = "main" ;	
			}
		}
	if ( typeof parent === "string" ) parent = document.getElementById( parent ) ;
	parent.append( element );
	}
function addNamedPoint( text, { x, y, tox=-5, toy=-10, ref="pointHollow" }={ } ) {
	const p = addSvgElement( "use", { x: x, y: y, href: "#" + ref } );
	const anchor = tox < 0 ? "end" : tox > 0 ? "start" : undefined ;
	const baseline = tox !== 0 ? undefined : toy < 0 ? "auto" : toy > 0 ? "hanging" : undefined ;  // text-after-edge and text-before-edge work but distance is too big
	const t = addSvgElement( "text", { x: (x || 0) + tox, y: (y || 0) + toy, "text-anchor": anchor, "dominant-baseline": baseline }, { innerHTML: text } );
	return { point : p, text: t };
	}

	/*
	// Create ellipse
addSvgElement( "ellipse", { rx: 120, ry: 90 } );
	// Center point
addNamedPoint( "C" ); 
	// Major axis
addSvgElement( "line", { x1: -120, x2: +120 } );
addNamedPoint( "A1", { x: -120 } ); 
addNamedPoint( "A2", { x: +120, tox: 5 } ); 
addSvgElement( "use", { x: +120, href: "#pointHollow" } ); 
addSvgElement( "text", { x: -120 / 2, "dominant-baseline": "middle" }, { textContent: "a" } ) ;
addSvgElement( "text", { x: +120 / 2, "dominant-baseline": "middle" }, { textContent: "a" } ) ;
	// Minor Axis
addSvgElement( "line", { y1: -90, y2: +90 } );
addNamedPoint( "B1", { y: -90, tox: 0 } ); 
addNamedPoint( "B2", { y: +90, tox: 0, toy: 10 } ); 
*/
