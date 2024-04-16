import React from "react";

function CloseIcon(props: {
  className?: string;
  onClick() : void;
}) {
  return (
    <svg onClick={() => {props.onClick()}} className={props.className} width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path d="M13 7L7 13M7 7L13 13" stroke="#D5DEF0" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
</svg>
  );
}

export default CloseIcon;
