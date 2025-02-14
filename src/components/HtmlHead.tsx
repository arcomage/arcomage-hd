import React, { memo, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { langInfo } from '../i18n/langs'
import { setVolume } from '../utils/sound/Sound'
import { useAppSelector } from '../utils/hooks/useAppDispatch'
import { I18nContext } from '../i18n/I18nContext'

const HtmlHead = () => {
  const lang = useAppSelector((state) => state.lang.code)
  const volume = useAppSelector((state) => state.sound.volume)
  const erathian: boolean = useAppSelector((state) => state.lang.erathian)
  const noanim: boolean = useAppSelector((state) => state.visual.noanim)
  const _ = useContext(I18nContext)

  useEffect(() => {
    setVolume(volume)
  }, [volume])

  return (
    <Helmet>
      <html
        lang={lang}
        dir={langInfo[lang].isRtl ? 'rtl' : 'ltr'}
        data-erathian={(erathian && langInfo[lang].isLatinScript).toString()}
        data-noanime={noanim.toString()}
      />
      <title>{_.i18n('ArcoMage HD')}</title>
      <meta name="title" content={_.i18n('ArcoMage HD')} />
      <meta name="description" content={_.i18n('DESC')} />
      <meta property="og:locale" content={lang} />
      <meta property="og:title" content={_.i18n('ArcoMage HD')} />
      <meta property="og:description" content={_.i18n('DESC')} />
      <meta name="twitter:title" content={_.i18n('ArcoMage HD')} />
      <meta name="twitter:description" content={_.i18n('DESC')} />
    </Helmet>
  )
}

export default memo(HtmlHead)
