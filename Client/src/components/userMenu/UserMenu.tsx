import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import styles from "./user_menu.module.css";
import UserIcon from "../icons/UserIcon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { LogOut, setUser } from "@/redux/features/rootSlice";
import { useAppSelector } from "@/redux/hooks";
import useHeaderController from "@/components/header/HeaderController";

function UserMenu(props: { onClickExitButton?: () => void }) {
  const userName = useAppSelector((state) => state.rootReducer.user?.name);
  const ref = useRef<HTMLDivElement>(null);
  const headerController = useHeaderController();

  const ClickFromWindow = (e: MouseEvent) => {
    console.log(e.target as HTMLDivElement);
    let itemFound = false;
    const parentElement = [
      ref.current?.parentElement?.children[0].children[0].children[0],
      ref.current?.parentElement?.children[0].children[0],
      ref.current?.parentElement?.children[0],
    ];
    ref.current?.childNodes.forEach((node) => {
      if (node === e.target) {
        console.log("Current");
        itemFound = true;
      }
    });

    if (!itemFound && !parentElement.includes(e.target as HTMLDListElement)) {
      headerController.SetOpenUserCard(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", ClickFromWindow);

    return () => {
      window.removeEventListener("click", ClickFromWindow);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={styles.root}
      onBlurCapture={() => {
        console.log("user blur");
      }}
      onFocus={() => console.log("user focus")}
    >
      <TriangleIcon className={styles.triangle} />
      <div className={styles.user_info}>
        <UserIcon className={styles.user_icon} />
        {userName}
      </div>
      <div className={styles.buttons}>
        <Button href="/help">FAQ</Button>
        <Button href="" onClick={props.onClickExitButton}>
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
}

const TriangleIcon = (props: { className?: string }) => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="7"
      viewBox="0 0 14 7"
    >
      <path d="M7 0L0 7H14L7 0Z" fill="#C5D1E9" />
    </svg>
  );
};

const Button = (props: {
  children: ReactNode;
  onClick?: () => void | void;
  href?: string;
}) => {
  if (props.href == null || props.href == undefined || props.href == "") {
    return (
      <div className={styles.button} onClick={props.onClick}>
        {props.children}
      </div>
    );
  } else {
    return (
      <Link
        href={props.href ? props.href : ""}
        className={styles.button}
        onClick={props.onClick}
      >
        {props.children}
      </Link>
    );
  }
};

export default UserMenu;
