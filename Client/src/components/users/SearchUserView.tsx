import React from "react";
import styles from "./searchUser.module.css";
import AdminIcon from "@/components/icons/AdminIcon";
import Label from "@/components/other/label/Label";
import EditUserIcon from "@/components/icons/EditUserIcon";
import ArchiveUserIcon from "@/components/icons/ArchiveUserIcon";

import { ISearchUserElement, TypeRights } from "./SearchUsersModel";
import useUsersManage from "./usersManage/UsersManageController";
import { operations } from "./usersManage/UsersManageModel";
import { IUser } from "@/redux/features/rootSlice";

function SearchUserView(props: { data: IUser }) {
    const { data } = props;
    const usersManageController = useUsersManage();
    const EditUser = (user: IUser) => {
        usersManageController.SetUser(user);
        usersManageController.OpenUsersManager(operations.edit);
    }
    const ArchiveUser = (user: IUser) => {
        usersManageController.OpenQuestion();
        usersManageController.SetUser(user);
    }
    return (
        <>
            <tr className={styles.row}>
                <td className={[styles.td_status, styles.td].join(" ")}><div className={styles.hovered}></div><div className={[styles.inner, styles.admin].join(" ")}>{data.type == TypeRights.administrator ? <Label icon={<AdminIcon />} text={"Администратор"} className={styles.admin_label} /> : ""}</div></td>
                <td><div className={styles.inner}>{data.id}</div></td>
                <td><div className={styles.inner}>{data.name}</div></td>
                <td><div className={styles.inner}>{data.createdDate.toLocaleDateString()}</div></td>
                <td><div className={styles.inner}>{data.login}</div></td>
                <td><div className={[styles.inner, styles.password].join(" ")}>
                    <div className={styles.hidden_pass}>•••••••••</div>
                    <div className={styles.visible_pass}>{data.password}</div>
                    </div></td>
                <td><div className={[styles.inner, styles.icons].join(" ")}>
                    <div onClick={() => EditUser(data)}><EditUserIcon /> </div>
                    <div onClick={() => ArchiveUser(data)}><ArchiveUserIcon /></div>
                    </div>
                    </td>
            </tr>
        </>
    )
}

export default SearchUserView;
