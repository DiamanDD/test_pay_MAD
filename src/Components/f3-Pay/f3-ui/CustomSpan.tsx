import React, { ChangeEvent } from 'react'

type CustomSpan = {
    title: string
    status: boolean
    setSpan: (state: boolean) => void
    state: string
    onBlur: () => void
    changeState: (e: ChangeEvent<HTMLInputElement>) => void
    newState: string
}

export const CustomSpan = ({
    status,
    setSpan,
    state,
    onBlur,
    changeState,
    newState,
    title,
}: CustomSpan) => {
    return (
        <div>
            <span>{title}: </span>
            {status ? (
                <span onDoubleClick={() => setSpan(false)}>{state}</span>
            ) : (
                <input
                    autoFocus={true}
                    onBlur={onBlur}
                    onChange={changeState}
                    type="text"
                    value={newState}
                />
            )}
        </div>
    )
}
