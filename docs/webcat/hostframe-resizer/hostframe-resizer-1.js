if ( window.parent !== window ) {
	document.body.toggleAttribute( "data-webcat-hosted", true );
	document.documentElement.style.height = "fit-content";
	document.body.style.height = "fit-content";
	const borderHeight = window.frameElement.offsetHeight - window.frameElement.scrollHeight ;
	function setFrameHeight ( ) { window.frameElement.style.height = document.documentElement.offsetHeight + borderHeight + "px" }
	setFrameHeight( );
	window.addEventListener( "resize" , setFrameHeight ) ;
	}