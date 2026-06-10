/* 2026-05-01 usp */
/* Wraps math blocks in a div, appends the number carrier and decorates elements. */

export function initDocument( container = document ) {
	for ( const m of container.querySelectorAll( "math[ eqn-num ]" )) {
		const wrapper = document.createElement( "div" );
		wrapper.setAttribute( "class" , "webcat numbered-equation" );
		m.replaceWith( wrapper );
		wrapper.append ( m );
		const eqnum = m.getAttribute( "eqn-num" );
		wrapper.id = `eqn-${ eqnum }` ; 
		const div = wrapper.appendChild( document.createElement( "div" )); 
		if ( ! m.classList.contains( "webcat" ) || ! m.classList.contains( "fragment" )) 
			div.textContent = `(${ eqnum })`  ;
		else {
			const anchor = div.appendChild( document.createElement( "a" ));
			anchor.setAttribute( "class" , "webcat fragment-source" );
			anchor.textContent = `(${ eqnum })`  ;
			} 
		}
	}

if ( ! new URL( import.meta.url ).searchParams.has( "no-init" )) initDocument( );