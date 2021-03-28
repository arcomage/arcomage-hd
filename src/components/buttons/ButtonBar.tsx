import React, { memo } from 'react'
import ButtonPref from './ButtonPref'
import ButtonLangPref from './ButtonLangPref'
import ButtonVolumePref from './ButtonVolumePref'
import ButtonHelp from './ButtonHelp'
import ButtonGithub from './ButtonGithub'
import ButtonFullscreen from './ButtonFullscreen'

const ButtonBar = () => (
  <div>
    <ButtonPref />
    <ButtonLangPref />
    <ButtonVolumePref />
    <ButtonFullscreen />
    <ButtonHelp />
    <ButtonGithub />
  </div>
)

export default memo(ButtonBar)
