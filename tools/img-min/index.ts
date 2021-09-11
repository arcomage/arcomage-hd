;(async () => {
  const imagemin = (await import('imagemin')).default
  const imageminWebp = (await import('imagemin-webp')).default
  const imageminPng = (await import('imagemin-optipng')).default
  await imagemin(['./assets/img/*.png'], {
    destination: 'assets/img-min',
    plugins: [
      imageminWebp({ lossless: true }),
    ],
  })
  await imagemin(['./assets/img/cards/*.png'], {
    destination: 'assets/img-min/cards',
    plugins: [
      imageminWebp({ lossless: true }),
    ],
  })
  await imagemin(['./assets/img/*.png'], {
    destination: 'assets/img',
    plugins: [imageminPng({ optimizationLevel: 5 })],
  })
  await imagemin(['./assets/img/cards/*.png'], {
    destination: 'assets/img/cards',
    plugins: [imageminPng({ optimizationLevel: 5 })],
  })
})()
