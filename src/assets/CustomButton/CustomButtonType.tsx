import React from 'react'
import cn from 'classnames'
import style from './CustomButton.module.css'

interface iCustomButton extends iSingUpSingInForgotPage {
    title: string
}

interface iSingUpSingInForgotPage {
    onClick?: () => void
    view?:
        | 'primary'
        | 'cancel'
        | 'pack'
        | 'delete'
        | 'edit'
        | 'save'
        | 'deleteV2'
        | 'paginator'
        | 'selectPaginator'
    disabled?: boolean
}

export function CustomButton({ title, view, ...rest }: iCustomButton) {
    return (
        <button
            className={cn({
                [style.button]: view === 'primary',
                [style.paginator]: view === 'paginator',
                [style.selectPaginator]: view === 'selectPaginator',
                [style.cancel]: view === 'cancel',
                [style.pack]: view === 'pack',
                [style.delete]: view === 'delete',
                [style.edit]: view === 'edit',
                [style.save]: view === 'save',
                [style.deleteV2]: view === 'deleteV2',
                [style.disabled]: rest.disabled,
            })}
            {...rest}>
            {title}
        </button>
    )
}
