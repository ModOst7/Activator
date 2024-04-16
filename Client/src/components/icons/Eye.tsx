import React from "react";

const path_close =
  "M12.8145 9.75L16.2487 13.1733C16.2487 13.1192 16.2487 13.0542 16.2487 13C16.2487 12.138 15.9063 11.3114 15.2968 10.7019C14.6873 10.0924 13.8607 9.75 12.9987 9.75C12.9337 9.75 12.8795 9.75 12.8145 9.75ZM8.1562 10.6167L9.83537 12.2958C9.7812 12.5233 9.7487 12.7508 9.7487 13C9.7487 13.862 10.0911 14.6886 10.7006 15.2981C11.3101 15.9076 12.1367 16.25 12.9987 16.25C13.237 16.25 13.4754 16.2175 13.7029 16.1633L15.382 17.8425C14.6562 18.2 13.8545 18.4167 12.9987 18.4167C11.5621 18.4167 10.1844 17.846 9.16854 16.8302C8.15271 15.8143 7.58203 14.4366 7.58203 13C7.58203 12.1442 7.7987 11.3425 8.1562 10.6167ZM2.16536 4.62583L4.63537 7.09583L5.12286 7.58333C3.33536 8.99167 1.92703 10.8333 1.08203 13C2.9562 17.7558 7.58203 21.125 12.9987 21.125C14.6779 21.125 16.2812 20.8 17.7437 20.215L18.2095 20.67L21.3729 23.8333L22.7487 22.4575L3.5412 3.25M12.9987 7.58333C14.4353 7.58333 15.813 8.15402 16.8289 9.16984C17.8447 10.1857 18.4154 11.5634 18.4154 13C18.4154 13.6933 18.2745 14.365 18.0254 14.9717L21.1995 18.1458C22.8245 16.7917 24.1245 15.015 24.9154 13C23.0412 8.24417 18.4154 4.875 12.9987 4.875C11.482 4.875 10.0304 5.14583 8.66536 5.63333L11.0162 7.9625C11.6337 7.72417 12.2945 7.58333 12.9987 7.58333Z";
const path_open =
  "M12.9987 9.75C12.1367 9.75 11.3101 10.0924 10.7006 10.7019C10.0911 11.3114 9.7487 12.138 9.7487 13C9.7487 13.862 10.0911 14.6886 10.7006 15.2981C11.3101 15.9076 12.1367 16.25 12.9987 16.25C13.8607 16.25 14.6873 15.9076 15.2968 15.2981C15.9063 14.6886 16.2487 13.862 16.2487 13C16.2487 12.138 15.9063 11.3114 15.2968 10.7019C14.6873 10.0924 13.8607 9.75 12.9987 9.75ZM12.9987 18.4167C11.5621 18.4167 10.1844 17.846 9.16854 16.8302C8.15271 15.8143 7.58203 14.4366 7.58203 13C7.58203 11.5634 8.15271 10.1857 9.16854 9.16984C10.1844 8.15402 11.5621 7.58333 12.9987 7.58333C14.4353 7.58333 15.813 8.15402 16.8289 9.16984C17.8447 10.1857 18.4154 11.5634 18.4154 13C18.4154 14.4366 17.8447 15.8143 16.8289 16.8302C15.813 17.846 14.4353 18.4167 12.9987 18.4167ZM12.9987 4.875C7.58203 4.875 2.9562 8.24417 1.08203 13C2.9562 17.7558 7.58203 21.125 12.9987 21.125C18.4154 21.125 23.0412 17.7558 24.9154 13C23.0412 8.24417 18.4154 4.875 12.9987 4.875Z";

function Eye(props: { isOpen: boolean }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="inherit"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={props.isOpen ? path_open : path_close} />
    </svg>
  );
}

export default Eye;