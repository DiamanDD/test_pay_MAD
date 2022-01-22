import style from './Layout.module.css'

type LayoutType = {
    children: any
}

export const Layout = ({ children }: LayoutType) => {
    return <div className={style.firstScreen}>{children}</div>
}
