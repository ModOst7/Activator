import React from "react";

function ErrorIcon(props: {
    className?: string;
}) {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M14.1 14.1H11.9V7.5H14.1M14.1 18.5H11.9V16.3H14.1M13 2C11.5555 2 10.1251 2.28452 8.79048 2.83733C7.4559 3.39013 6.24327 4.20038 5.22183 5.22183C3.15893 7.28473 2 10.0826 2 13C2 15.9174 3.15893 18.7153 5.22183 20.7782C6.24327 21.7996 7.4559 22.6099 8.79048 23.1627C10.1251 23.7155 11.5555 24 13 24C15.9174 24 18.7153 22.8411 20.7782 20.7782C22.8411 18.7153 24 15.9174 24 13C24 11.5555 23.7155 10.1251 23.1627 8.79048C22.6099 7.4559 21.7996 6.24327 20.7782 5.22183C19.7567 4.20038 18.5441 3.39013 17.2095 2.83733C15.8749 2.28452 14.4445 2 13 2Z" fill="#F25C53" />
            </svg>
        </>
    );
}

export default ErrorIcon;