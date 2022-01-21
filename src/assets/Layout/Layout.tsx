import { ReactChild, ReactChildren, ReactElement } from 'react'
import style from './Layout.module.css'

type LayoutType = {
    children: ReactChildren | ReactChild[] | ReactElement<any, any>
}

export const Layout = ({ children }: LayoutType) => {
    return <div className={style.firstScreen}>{children}</div>
}
