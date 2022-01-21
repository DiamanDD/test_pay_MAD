import { StatusType } from '../Components/store/app-reducer'

export const getIsLoading = (status: StatusType) => status === 'loading'
