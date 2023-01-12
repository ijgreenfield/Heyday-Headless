import { FC } from "react";

const Container: FC = ({children}) => {
    return (
        <div className="px-6">
            {children}
        </div>
    )
}

export default Container