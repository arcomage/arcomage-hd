import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { I18nContext } from '@/i18n/I18nContext'
import { langInfo } from '@/i18n/langs'
import cl from '@/utils/clarr'
import { useAppSelector } from '@/utils/hooks/useAppDispatch'
import { setVolume } from '@/utils/sound/Sound'

const HtmlHead = () => {
  const lang = useAppSelector((state) => state.lang.code)
  const volume = useAppSelector((state) => state.sound.volume)
  const erathian: boolean = useAppSelector((state) => state.lang.erathian)
  const boldfont: boolean = useAppSelector((state) => state.lang.boldfont)
  const noanim: boolean = useAppSelector((state) => state.visual.noanim)
  const _ = useContext(I18nContext)

  useEffect(() => {
    setVolume(volume)
  }, [volume])

  return (
    <Helmet>
      <html lang={lang} dir={langInfo[lang].isRtl ? 'rtl' : 'ltr'} />

      <title>{_.i18n('ArcoMage HD')}</title>
      <meta name="title" content={_.i18n('ArcoMage HD')} />
      <meta name="description" content={_.i18n('DESC')} />
      <meta property="og:locale" content={lang} />
      <meta property="og:title" content={_.i18n('ArcoMage HD')} />
      <meta property="og:description" content={_.i18n('DESC')} />
      <meta name="twitter:title" content={_.i18n('ArcoMage HD')} />
      <meta name="twitter:description" content={_.i18n('DESC')} />

      <body
        className={cl(
          erathian && langInfo[lang].isLatinScript && 'with-erathian',
          noanim ? 'noanim' : 'anim',
          boldfont && 'with-boldfont',
        )}
      />
    </Helmet>
  )
}

export default HtmlHead
