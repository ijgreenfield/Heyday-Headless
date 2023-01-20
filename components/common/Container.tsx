import { FC } from "react";

const Container: FC = ({children}) => {
    return (
        <div className="px-6 md:px-12">
            {children}
        </div>
    )
}

export default Container