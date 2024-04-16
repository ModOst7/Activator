import React from "react";

function SearchIcon(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
    >
      <path d="M12.4286 5C14.3988 5 16.2882 5.78265 17.6814 7.17578C19.0745 8.56891 19.8571 10.4584 19.8571 12.4286C19.8571 14.2686 19.1829 15.96 18.0743 17.2629L18.3829 17.5714H19.2857L25 23.2857L23.2857 25L17.5714 19.2857V18.3829L17.2629 18.0743C15.96 19.1829 14.2686 19.8571 12.4286 19.8571C10.4584 19.8571 8.56891 19.0745 7.17578 17.6814C5.78265 16.2882 5 14.3988 5 12.4286C5 10.4584 5.78265 8.56891 7.17578 7.17578C8.56891 5.78265 10.4584 5 12.4286 5ZM12.4286 7.28571C9.57143 7.28571 7.28571 9.57143 7.28571 12.4286C7.28571 15.2857 9.57143 17.5714 12.4286 17.5714C15.2857 17.5714 17.5714 15.2857 17.5714 12.4286C17.5714 9.57143 15.2857 7.28571 12.4286 7.28571Z" />
    </svg>
  );
}

export default SearchIcon;
