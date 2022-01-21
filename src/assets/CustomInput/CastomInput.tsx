import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    memo,
    useEffect,
    useState,
} from 'react'
import cn from 'classnames'

import style from './castomInput.module.css'
import { Eye } from './Eye'
import { ErrorAppType, StringOrNullType } from '../../helpers/types'

type CustomIntutPropsType = {
    label?: string
    type?: string
    result: (result: string) => void
    error?: ErrorAppType
    placeholder?: string
    view?: string
    startValue?: StringOrNullType
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export const CustomInput = memo(
    ({
        label,
        result,
        type = 'text',
        error,
        startValue,
        ...rest
    }: CustomIntutPropsType) => {
        // state
        const [value, setValue] = useState('')
        const [show, setShow] = useState(type)
        const [showError, setSwowError] = useState<ErrorAppType>()

        // func
        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.value)
        }
        const clearError = () => {
            setSwowError(null)
        }
        const onBlur = () => {
            result(value)
        }
        const showPass = () => {
            show === 'password' ? setShow('text') : setShow('password')
        }
        useEffect(() => {
            error && setSwowError(error)
            if (!error) {
                clearError()
            }
        }, [error])

        useEffect(() => {
            startValue && setValue(startValue)
        }, [startValue])
        return (
            <div
                className={cn(style.containerInput, {
                    [style.containerInputNoLAble]: label === 'view',
                    [style.inputPack]: rest.view === 'pack',
                })}>
                <p className={style.label}>{label}</p>
                <input
                    type={show}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={clearError}
                    {...rest}
                />
                {type === 'password' && <Eye showPass={showPass} />}
                <div className={style.error}>{showError}</div>
            </div>
        )
    }
)
