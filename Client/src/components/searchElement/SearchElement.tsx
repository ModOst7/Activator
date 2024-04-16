import React from "react";
import { useRouter } from "next/navigation";
import styles from "./seachElement.module.scss";
import Image from "next/image";
import icon from "@/icons/IconTraining.svg";
import ArrowIcon from "../icons/ArrowIcon";
import { ISearchElement } from "../search/SearchModel";
import { CustomDate } from "@/utilities/utilities";

function SearchElement(props: { disabled?: boolean; data: ISearchElement }) {
  const { data } = props;

  const router = useRouter();
  const navigateTrainer = (id: string) => {
    router.push('/generator/' + id);
  }

  return (
    <>
      <div
        className={[styles.root, props.disabled && styles.disabled].join(" ")}
        onClick={() => { navigateTrainer(String(data.id)) }}
      >
        <div className={styles.wrapper}>
          <div className={styles.icon_training}>
            <Image width={40} height={40} src={icon} alt={""} />
          </div>
          <div className={styles.data}>
            <div className={styles.text_name}>{data.name}</div>
            <div className={styles.data_container}>
              <div className={styles.text_data}>
                Дата создания: <span className={styles.span_text}>{new CustomDate(data.date).format()}</span>
              </div>
              <div className={styles.delimeter}></div>
              <div className={styles.text_vendor}>
                Артикул:  <span className={styles.span_text}>{data.vendor_code}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.icon_arrow}>
          <ArrowIcon />
        </div>
      </div>
      <Devide />
    </>
  );
}

const Devide = () => {
  return <div className={styles.devide}></div>;
};

export default SearchElement;
