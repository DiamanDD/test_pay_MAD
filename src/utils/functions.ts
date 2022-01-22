import { StatusType } from '../main/m1-bll/appTypes'

export const getIsLoading = (status: StatusType) => status === 'loading'
