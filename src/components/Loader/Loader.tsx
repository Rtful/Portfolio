import {FC} from "react";
import './Loader.scss';

type loaderProps = {
    type: "square" | "factory",
    isLoading?: boolean,
    text?: string,
}

export const Loader: FC<loaderProps> = (
    {type, text, isLoading}
) => {

    return (
        <div className={`loader-container ${isLoading ? 'active' : ''}`}>
            <h1>{text}</h1>
            <div className={`loader ${type}`}></div>
        </div>
    );
}