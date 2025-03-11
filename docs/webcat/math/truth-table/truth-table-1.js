// Documentation : .../webcat/math/truth-table.htm

import * as initializer from "../../component-initializer/component-initializer-1.js" ;

/**
*		init ( )
*		Initializes the WebCAT component.
*
*/ export function init( searchparams = new URLSearchParams( )) {
	const parameterValue = searchparams.get( "parameterName" ) || "default-value" ;
	for ( const table of document.querySelectorAll( "table.truth-table" )) {
		table.addEventListener( "click" , evt => {
			if ( evt.target.parentElement.parentElement.tagName !== "THEAD" ) return ;
			for ( const cell of evt.currentTarget.querySelectorAll( `tbody > tr > :nth-child( ${ evt.target.cellIndex + 1 } )` )) {
				cell.classList.toggle( "column-selected" );
				} ;
			} ) ;
		}
	}

// * * * Module init code * * * // 

initializer.initComponent( init, import.meta.url );
