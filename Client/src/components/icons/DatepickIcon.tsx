import React from "react";

function DatepickIcon(props: {
    className?: string;
}) {
    return (
        <>
            <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
                <path d="M10 12H8V14H10V12ZM14 12H12V14H14V12ZM18 12H16V14H18V12ZM20 5H19V3H17V5H9V3H7V5H6C4.89 5 4 5.9 4 7V21C4 21.5304 4.21071 22.0391 4.58579 22.4142C4.96086 22.7893 5.46957 23 6 23H20C20.5304 23 21.0391 22.7893 21.4142 22.4142C21.7893 22.0391 22 21.5304 22 21V7C22 6.46957 21.7893 5.96086 21.4142 5.58579C21.0391 5.21071 20.5304 5 20 5ZM20 21H6V10H20V21Z" />
            </svg>
        </>
    );
}

export default DatepickIcon;