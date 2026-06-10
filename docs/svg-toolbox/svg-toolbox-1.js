// ToDo
//	1. Attribute parameters, always the last. Previous parameters may overwrite attribute entries.
//	2. SvgElement is an optional first element, the syntax following does not change.
//	3. Explain the concept of default element attributes. Default attributes must be cloned.
// 4. Explain the concept of variable parameter list. Some combinations are possible, others not.

export const svgNamespace = "http://www.w3.org/2000/svg" ; 
export const degree = Math.PI / 180 ;
export const combine = ( a, b ) => {
	// Returns an object with the combined members of a and b.
	// b overrides a. a and b are not changed.
	const c = { ...a } ;
	for ( const [ key, value ] of Object.entries( b )) c[ key ] = value ;
	return c ;
	}
export class Attributes {
		// Encapsulates the SVG element attributes.
	constructor ( o ) {
		for ( const [ key, value ] of Object.entries( o )) this[ key ] = value ;
		}
	}
export class Base {
	constructor ( svgElement ) { 
		this.svgElement = svgElement ;
		}
	setAttributes( attributes, defaultAttributes = this.constructor.defaultAttributes || { } ) {
		// Join default and explicitly given attributes
		const a = { ...( this.constructor.defaultAttributes || { }), ...attributes };
		//	Set instance attributes
		for ( const [key, value] of Object.entries( a )) this.svgElement.setAttribute( key, value );
		}
	}
export class Circle extends Base {
	static defaultAttributes = { } ;
	constructor ( ...args ) {
		//		Wraps an SVGCircleElement.
		// Syntax
		//		new Circle( [ svgCircleElement] [,( cx, cy )| cp] [, r] [ , attributes ] )
		// with
		//		svgLineElement { SVGLineElement } : Creates a wrapper for an existing SVG line element.
		//		cx, cy { number } : center point coordinates, must appear in pairs.
		//		cp { Point } : center point location, alternative to cx, cy.
		//		r { number } : radius, optional.
		//		attributes { object } : name-value container which carries attributes
		//			to be set on the svgElement, optional. 
		// Extract or create the attribute carrier object. It must be the last argument.
		const attributes = args[ args.length - 1 ]?.constructor.name === "Object" ? args.pop( ) : { } ;
		// Create the wrapped element pointer.
		super( args[ 0 ]?.constructor.name === "SVGCircleElement" ? args.shift( ) : document.createElementNS( svgNamespace, "circle" ));		
		// Find the center point coordinates, two numbers or a Point object.
		const cp = ( typeof args[ 0 ] === "number" && typeof args[ 1 ] === "string" ) ? new Point( args.shift( ), args.shift( )) : args[ 0 ]?.constructor.name === "Point" ? args.shift( ) : undefined ;
		if ( cp ) { attributes.cx = p1.x ; attributes.cy = p1.y }
		// Set attributes on the SVG element.
		this.setAttributes( attributes );
		}
	}
export class G extends Base {
	static defaultAttributes = { } ;
	children = [ ] ;
	constructor ( ...args ) {
		//		Wraps an SVGGElement.
		// Syntax
		//		new Group( [svgGElement] [, attributes] )
		// with
		//		svgGElement { SVGGElement } : An existing SVG group element, optional.
		//		attributes { object } : name-value container which carries attributes to be set on the element, optional. 
		//	- - -
		// Extract or create the attribute carrier object. It must be the last argument.
		const groupElement = args[ 0 ] instanceof SVGGElement ? args.shift( ) : document.createElementNS( svgNamespace, "g" );
		const attributes = args[ args.length - 1 ] instanceof Object ? args.pop( ) : { } ;
		// Create the wrapped element pointer.
		super( groupElement );		
		// Set attributes on the SVG element.
		this.setAttributes( attributes );
		}
	append ( item ) {
		this.svgElement.appendChild( item.svgElement );
		}
	}
export class Line extends Base {
	static defaultAttributes = { } ;
	constructor ( ...args ) {
		//		Wraps an SVGLineElement.
		// Syntax
		//		new Line( svgLineElement [, attributes ] )
		//		new Line( x1, y1, x2, y2 [, attributes ] )
		//		new Line( p1, p2 [, attributes ] )
		// with
		//		svgLineElement { SVGLineElement } : Creates a wrapper for
		//			an existing SVG line element.
		//		x1, y1, x2, y2 { number } : start and end point coordinates
		//		p1, p2 { Point } : start and end point coordinates
		//		attributes { object } : name-value container which carries attributes
		//			to be set on the svgElement.

		// Extract or create the attribute carrier object. It must be the last argument.
		const attributes = args[ args.length - 1 ]?.constructor.name === "Object" ? args.pop( ) : { } ;
		// Create the wrapped element pointer.
		super( args[ 0 ]?.constructor.name === "SVGTextElement" ? args.shift( ) : document.createElementNS( svgNamespace, "text" ));		
		// Find the start and end point coordinates
		// Two numbers or a Point object.
		const p1 = ( typeof args[ 0 ] === "number" ) ? new Point( args.shift( ), args.shift( )) : args[ 0 ]?.constructor.name === "Point" ? args.shift( ) : undefined ;
		if ( p1 ) { attributes.x1 = p1.x ; attributes.y1 = p1.y }
		// Another two numbers or a Point object.
		const p2 = ( typeof args[ 0 ] === "number" ) ? new Point( args.shift( ), args.shift( )) : args[ 0 ]?.constructor.name === "Point" ? args.shift( ) : undefined ;
		if ( p2 ) { attributes.x2 = p2.x ; attributes.y2 = p2.y }
		// Set attributes on the SVG element.
		this.setAttributes( attributes );
		}
	}
export class Options {
	constructor ( o ) {
		for ( const [ key, value ] of Object.entries( o )) this[ key ] = value ;
		}
	}
export class Point {
		// Encapsulates the notion of a "position" in 2D space.
	constructor ( ...args ) {
		//		Creates a non-SVG Point object from two numbers or another 
		//		point object.
		// Syntax
		//		new Point( x, y )
		//		new Point ( p )
		//		new Point( o )
		// Parameters
		//		x, y { number } : Numerical point coordinates
		//		p { Point } : Another point, its coordinates are copied.
		//		o { { x : Number, y : Number } }
		if ( typeof args[ 0 ] === "number" ) {
			this.x = args.shift( );
			this.y = args.shift( );
			}
		else if ( args[ 0 ] instanceof Point || args[ 0 ].constructor.name === "Object" ) {
			const point = argument.shift( );
			this.x = point.x ;
			this.y = point.y ;
			}
		}
	distanceFrom( p ) {
		return new Size( this.x - p.x , this.y - p.y );
		}
	}
export class Rect1 extends Base {
	static defaultAttributes = { } ;
	constructor ( ...args ) {
		//		Wraps an SVGRectElement. The flag attributes.centered=true causes the rectangle
		//		to be centered around the position.
		// Syntax
		//		new RecteBySize( [ svgRectElement,] p, s [, attributes] )
		// with
		//		svgRectElement { SVGRectElement } : Creates a wrapper for an existing SVG rect element.
		//		p { number, number | Point } : Position of the left upper corner or center point
		//		attributes { object } : name-value container which carries attributes
		//			to be set on the svgElement, optional.
		//		attributes.centered { boolean } : Make p the center point of the rectangle.
		
		// Extract or create the attribute carrier object. It must be the last argument.
		const attributes = args[ args.length - 1 ]?.constructor.name === "Object" ? args.pop( ) : { } ;
		// Create the wrapped element pointer.
		super( args[ 0 ]?.constructor.name === "SVGRectElement" ? args.shift( ) : document.createElementNS( svgNamespace, "rect" ));
		// Position
		const p = ( typeof args[ 0 ] === "number" ) ? new Point( args.shift( ), args.shift( )) : args[ 0 ]?.constructor.name === "Point" ? args.shift( ) : undefined ;
		// Size
		const s = ( typeof args[ 0 ] === "number" ) ? new Point( args.shift( ), args.shift( )) : args[ 0 ]?.constructor.name === "Point" ? args.shift( ) : undefined ;
		// Centered?
		if ( attributes.centered ) { p.x -= s.x / 2 ; p.y -= s.y / 2 }
		// Set position and size.
		if ( p ) { attributes.x = p.x ; attributes.y = p.y }
		if ( s ) { attributes.width = s.x ; attributes.height = s.y }
		// Set attributes on the SVG element.
		this.setAttributes( attributes );
		}
	}
export class Rect extends Base {
	static defaultAttributes = { width : 200 , height : 50 } ;
	static defaultOptions = { } ;
	constructor ( ...args ) {
		// Syntax
		//		new Rect2( [p1|x, y] [, s|p2|w, h] [, attributes] [, options] [, svgRectElement]
		// Parameters
		//		p1 { Point } : Coordinates of the upper left corner.
		//		x, y { Number } : Alternative to p1.
		//		s { Size } : Width and height
		//		p2 { Point } : Coordinates of the lower right corner, alternative to s.
		//		w, h { Number } : width and height, alternative to s.
		//		attributes { Attributes } : SVG element attributes carrier.
		//		options { Options } : Constructor options.
		//		svgRectElement { SVGRectElement } : SVG element to be wrapped by the Rect instance.
		// Options
		//		center, centerX, centerY { boolean } : Centers the rectangle about the point p1.
		//		= = =
		// Left upper corner 
		const p = args[ 0 ] instanceof Number ? new Point( args.shift( ), args.shift( )) 
			: args[ 0 ] instanceof Point ? new Point( args.shift( )) 
			: args[ 0 ]?.constructor.name === "Object" ? new Point( args.shift( )) 
			: undefined ;
		// Size
		const s = args[ 0 ] instanceof Number ? new Size( args.shift( ), args.shift( )) 
			: args[ 0 ] instanceof Size || args[ 0 ]?.constructor.name === "Object" ? new Size( args.shift( )) 
			: args[ 0 ] instanceof Point ? args.shift( ).distanceFrom( p )
			: undefined;
		// Attributes
		const attributes = args[0] instanceof Attributes || args[ 0 ]?.constructor.name === "Object" 
			? { ...Rect2.defaultAttributes, ...args.shift( ) } 
			: Rect2.defaultAttributes ;
		// Options
		const options = args[ 0 ] instanceof Options || args[ 0 ]?.constructor.name === "Object" 
			? { ...Rect2.defaultOptions, ...args.shift( ) } 
			: Rect2.defaultOptions ;
		// Initialize instance
		super( args[ 0 ] instanceof SVGRectElement ? args.shift( ) : document.createElementNS( svgNamespace, "rect" ));
		// Prepare attributes
		if( p ) { attributes.x = p.x ; attributes.y = p.y }
		if ( s ) { attributes.width = s.w ; attributes.height = s.h }
		this.setAttributes( attributes );
		// Process constructor options
		switch ( options.center ) {
		case true :
		case "both" :
		case "hv" :
			this.svgElement.x.baseVal.value -= this.svgElement.width.baseVal.value / 2 ; 
			this.svgElement.y.baseVal.value -= this.svgElement.height.baseVal.value / 2 ;
			break ;
		case "h" :
		case "horizontal" :
			this.svgElement.x.baseVal.value -= this.svgElement.width.baseVal.value / 2 ;
			break ;
		case "v" :
		case "vertical" :
			this.svgElement.y.baseVal.value -= this.svgElement.height.baseVal.value / 2 ;
			break ;
			}
		}
	}
export class Rectangle {
	// Encapsulates position and size.
	constructor ( x, y, w, h ) {
		this.x = x ; this.y = y ; this.w = w ; this.h = h ;
		}
	}
export class Size {
		// Encapsulates the notion of "width" and "height" in 2D space.
	constructor ( ...args ) {
		//		Creates a JavaScript Size object from two numbers or another 
		//		Size object.
		// Syntax
		//		new Size ( w, h )
		//		new Size ( s )
		// Parameters
		//		w, h { number } : Numerical size values.
		//		s { Size } : Another Size object, will be cloned.
		if ( typeof args[ 0 ] === "number" ) {
			this.w = args.shift( );
			this.h = args.shift( );
			}
		else if ( typeof args[ 0 ] === "object" ) {
			const size = args.shift( );
			this.w = size.w ;
			this.h = size.h ;
			}
		}
	}
export class Text extends Base {
	static defaultAttributes = {
		fill : "black" ,
		stroke : "white" ,
		"stroke-width" : 8 ,
		"paint-order" : "stroke fill" ,
		"text-anchor" : "middle" ,
		"dominant-baseline" : "central"
		} ;
	constructor ( ...args ) {
		// Syntax
		//		new Text ( svgTextElement [, s] [, attributes ] )
		//		new Text ( s, x, y, [, attributes ] )
		//		new Text ( s, p [, attributes ] )
		// Parameters
		//		svgTextElement { SVGTextElement } : An existing SVG text element.
		//		s { string } : 
		//		x, y { number } : Numerical coordinate values
		//		p { Point } : Defines the text coordinates
		//		attributes { object } : Defines additional attributes.

		// Retrieve or create the attribute container object.
		const attributes = args[ args.length - 1 ]?.constructor.name === "Object" ? args.pop( ) : { } ;
		// Initialize the base class structures.
		super( args[ 0 ]?.constructor.name === "SVGTextElement" ? args.shift( ) : document.createElementNS( svgNamespace, "text" ));
		// Retrieve the text content.
		if ( typeof args[ 0 ] === "string" ) this.svgElement.textContent = args.shift( );
		// Retrieve the coordinates
		const p = ( typeof args[ 0 ] === "number" ) ? new Point( args.shift( ), args.shift( )) : args[ 0 ]?.constructor.name === "Point" ? args.shift( ) : undefined ;
		if ( p )	{ attributes.x = p.x ; attributes.y = p.y }
		// Configure the SVG element.
		this.setAttributes( attributes );
		}
	}
export class Textbox {
	static defaultAttributes = { 
		group : { } ,
		rectangle : { width : 200 , height : 50 },
		textlines : {  "text-anchor" : "middle" , "dominant-baseline" : "central" } 
		} ;
	static defaultOptions = {
			rectangle : { center : "true" , autosize : true , wmod : 40 , hmod : 20 }
			} ;
	constructor ( t, ...args ) {
		//		Wraps an SVGGElement that serves as textbox with border.
		// Syntax
		//		new Textbox( t, [x,y, | p,] [w,h, | ,s] [,attributes] [,options] [,group] [,rect] [,text] )
		// with
		//		t { string | [string] } : text content, mandatory.
		//		x, y { number } : left upper or center point coordinates, must appear in pairs, optional, alternative to p.
		//		p { Point } : Left upper or center point location, optional, alternative to x, y.
		//		w, h { number } : Width and height, optional, alternatives to s.
		//		s { Size } : Size, optional, alternative to w and h.
		//		t { string | [ string ] } : Text or lines of text.
		//		attributes { TextboxAttributes } : Attribute carriers for the group, rectangle and text elements.
		//		group { SVGGElement } : An existing SVG group element.
		//		rectangle { SVGRectElement } : An existing SVG rectangle element.
		//		text { SVGTextElement | [ SVGTextElement ] } : Existing SVG text element(s).
		//		- - -
		//
		if ( typeof t === "string" ) t = [ t ];
		// Center point
		const p = typeof args[ 0 ] === "number" ? new Point( args.shift( ), args.shift( )) 
			: args[ 0 ] instanceof Point || args[ 0 ]?.constructor.name === "Object" ? args.shift( )
			: new Point( 0, 0 );
		// Rectangle size
		const s = typeof args[ 0 ] === "number" ? new Point( args.shift( ), args.shift( )) 
			: args[ 0 ] instanceof Point || args[ 0 ]?.constructor.name === "Object" ? args.shift( ) 
			: undefined ;
		
		if ( targs[ 0 ] instanceof SVGTextElement ? [ args.shift( ) ] : args[ 0 ] instanceof Array ? args.shift( ) : undefined ;
		// Extract or create the attribute carriers. It must be the last argument.
		const attributes = args[ args.length - 1 ] instanceof Array ? args.pop( ) : { } ;
		const group = new G( args[ 0 ] instanceof SVGGElement ? args.shift( ) : document.createElementNS( svgNamespace, "g" ), attributes.groupAttributes );
		const rectangle = args[ 0 ] instanceof SVGRectElement ? args.shift( ) : undefined ;
		// Append the rectangle
		const box = group.append( new Rect( p, s, attributes.rectangleAttributes ));
		// Make sure that t is an array
		if ( typeof t === "string" ) t = [ t ];
		 
		}
	}
export class TextboxAttributes {
		//	Container for rectangle and text element abttributes.
	constructor ( groupAttributes = { }, rectangleAttributes = { }, textAttributes = { } ) {
		this.groupAttributes = groupAttributes ;
		this.rectangleAttributes = rectangleAttributes ;
		this.textAttributes = textAttributes ;
		}
	}
export class TSpan extends Base {
	static defaultAttributes = { } ;
	constructor ( ...args ) {
		// Syntax
		//		new TSpan ( [ tspanElement ,] [, s] [, flags] [, attributes ] )
		// Parameters
		//		tspanElement { SVGTSpanElement } : An existing SVG element that will be wrapped.
		//		s { string } : The text content
		//		flags { array of strings } : Invokes the various options, like "sub" or "sup"
		//		attributes { object } : Key-value pairs that will be converted to attributes
		// Notes
		//		Flags will be converted into element attributes.
		// Retrieve or create the attribute container object.
		const attributes = args[ args.length - 1 ]?.constructor.name === "Object" ? args.pop( ) : { } ;
		// Initialize the base class structures.
		super( args[ 0 ]?.constructor.name === "SVGTextElement" ? args.shift( ) : document.createElementNS( svgNamespace, "text" ));
		// Retrieve the text content.
		if ( typeof args[ 0 ] === "string" ) this.svgElement.textContent = args.shift( );
		if ( args[ 0 ]?.constructor.name === "Array" ) {
			const flags = args.shift( );
			for ( const flag of flags ) {
				switch ( flag ) {
				case "sup" :
				case "super" :
					attributes[ "basline-shift" ] = "super" ;
					attributes[ "font-size" ] = "70%" ;
					break;
				case "sub" :
					attributes[ "basline-shift" ] = "sub" ;
					attributes[ "font-size" ] = "70%" ;
					break;
					}
				}
			}
		this.setAttributes( attributes );
		}
	}

