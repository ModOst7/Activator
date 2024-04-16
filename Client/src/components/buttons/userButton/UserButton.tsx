"use client";
import React, { useEffect, useMemo, useState } from "react";
import ButtonPage from "../buttonPage/ButtonPage";
import styles from "./userButton.module.css";
import { usePathname } from "next/navigation";
import UserMenu from "@/components/userMenu/UserMenu";
import { useAppSelector } from "@/redux/hooks";
import { IUser, setUser } from "@/redux/features/rootSlice";

function UserButton(props: {
  select: boolean;
  user?: IUser;
  setSelect: (state: boolean) => void;
  onClickExitButton?: () => void;
}) {
  //const [select, setSelect] = useState(false);
  const path = usePathname();
  const { select, user, setSelect } = props;
  const [userName, setUserName] = useState("ИИ");
  //const user = useAppSelector((state) => state.rootReducer.user);
  useEffect(() => {
    if (user) {
      const name = user.name.split(" ");

      if (name.length > 1) {
        setUserName(`${name[0][0]}${name[1][0]}`);
      } else {
        setUserName("ИИ");
      }
    } else {
      setUserName("ИИ");
    }
  }, [user]);
  //useEffect(() => {
  //  setSelect(false);
  //}, [path, setSelect]);
  return (
    <div className={styles.root}>
      <div
        className={styles.button}
        onClick={() => {
          setSelect(!select);
        }}
      >
        <ButtonPage select={select}>
          <div
            className={[styles.user_round_icon, select && styles.select].join(
              " "
            )}
          >
            <>{userName}</>
          </div>
        </ButtonPage>
      </div>
      {select && <UserMenu onClickExitButton={props.onClickExitButton} />}
    </div>
  );
}

export default UserButton;
