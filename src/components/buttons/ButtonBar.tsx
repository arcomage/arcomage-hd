import React, { memo } from 'react'
import ButtonPref from './ButtonPref'
import ButtonLangPref from './ButtonLangPref'
import ButtonSgPref from './ButtonSgPref'
import ButtonHelp from './ButtonHelp'
import ButtonGithub from './ButtonGithub'
import ButtonFullscreen from './ButtonFullscreen'

const ButtonBar = () => (
  <div>
    <ButtonPref />
    <ButtonLangPref />
    <ButtonSgPref />
    <ButtonFullscreen />
    <ButtonHelp />
    <ButtonGithub />
  </div>
)

export default memo(ButtonBar)
