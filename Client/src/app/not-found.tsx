"use client";
import React, { useEffect } from "react";
import styles from "@/otherStyles/not-font-page.module.css";
import Button from "@/components/buttons/button/Button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ErorStatusType, setErrorStatus } from "@/redux/features/rootSlice";
import { useAppSelector } from "@/redux/hooks";

function NotFound() {
  const router = useRouter();
  const dispatch = useDispatch();
  const error = useAppSelector((state) => state.rootReducer.errorStatus);
  useEffect(() => {
    console.log("Not Found mounted");
    dispatch(setErrorStatus(ErorStatusType.NotFound));
    return () => {
      console.log("Not Found unmounted");
      dispatch(setErrorStatus(ErorStatusType.None));
    };
  }, [dispatch]);

  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div className={styles.root}>
      Ошибка 404 - страница не найдена
      <Button
        OnClick={() => {
          router.back();
        }}
        className={styles.button}
      >
        Вернуться назад
      </Button>
    </div>
  );
}

export default NotFound;
