import { SettingsStateType } from './state'

export type FormFieldsType = SettingsStateType & {
  opponentId: string
}

export type FormFieldsAllPartialType = Partial<FormFieldsType>
