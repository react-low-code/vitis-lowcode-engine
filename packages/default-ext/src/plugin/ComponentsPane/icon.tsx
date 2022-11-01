import React from 'react';

export default function SvgComponent({ className, onClick }: {className?: string, onClick?: () => void}) {
  return (
    <svg version="1.1" id="icons" xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="42px" height="42px" viewBox="0 0 42 42" enable-background="new 0 0 42 42" className={className} onClick={onClick}>
<g id="Icon_61_">
	<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M17,16c0,0.552-0.448,1-1,1H3c-0.552,0-1-0.448-1-1V3c0-0.552,0.448-1,1-1h13c0.552,0,1,0.448,1,1V16z"/>
	<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M40,16c0,0.552-0.448,1-1,1H26c-0.552,0-1-0.448-1-1V3c0-0.552,0.448-1,1-1h13c0.552,0,1,0.448,1,1V16z"/>
	<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M17,39c0,0.552-0.448,1-1,1H3c-0.552,0-1-0.448-1-1V26c0-0.552,0.448-1,1-1h13c0.552,0,1,0.448,1,1V39z"/>
	<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M40,39c0,0.552-0.448,1-1,1H26c-0.552,0-1-0.448-1-1V26c0-0.552,0.448-1,1-1h13c0.552,0,1,0.448,1,1V39z"/>
</g>
</svg>
  );
}
