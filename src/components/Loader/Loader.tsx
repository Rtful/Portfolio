import {FC} from "react";
import './Loader.scss';

type loaderProps = {
    type: "square" | "factory",
    text?: string,
}

export const Loader: FC<loaderProps> = (
    {type, text}
) => {

    return (
        <div className="loader-container">
            <h1>{text}</h1>
            <div className={`loader ${type}`}></div>
        </div>
    );
}