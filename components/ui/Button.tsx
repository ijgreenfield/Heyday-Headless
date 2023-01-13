import { FC } from "react";
import Link from "./Link";

interface Props {
    children?: any,
    href?: string,
    className: string,
    onClick?: any,
}

const Button: FC<Props> = ({ href, children, className, onClick }) => {
    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    )
}

export default Button;