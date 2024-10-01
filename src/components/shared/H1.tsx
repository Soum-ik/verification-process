import { ReactNode } from 'react';

interface H1Props {
    children: ReactNode;
}

const H1 = ({ children }: H1Props) => {
    return <h1 className=" font-Inter text-headingColor  font-bold text-[24px] text-center leading-normal">{children}</h1>;
};

// eslint-disable-next-line react-refresh/only-export-components
export default H1;
