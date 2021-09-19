;(async () => {
  const imagemin = (await import('imagemin')).default
  const imageminWebp = (await import('imagemin-webp')).default
  // const imageminPng = (await import('imagemin-optipng')).default
  // const imageminJpegtran = (await import('imagemin-jpegtran')).default
  await imagemin(
    ['./tools/img-min/original/*.png', '!./tools/img-min/original/bg.png'],
    {
      destination: './assets/img',
      plugins: [imageminWebp({ lossless: true })],
    },
  )
  await imagemin(['./tools/img-min/original/bg.png'], {
    destination: './assets/img',
    plugins: [imageminWebp({ quality: 90, method: 6, sns: 100 })],
  })
  await imagemin(['./tools/img-min/original/cards/*.png'], {
    destination: './assets/img/cards',
    plugins: [imageminWebp({ lossless: true })],
  })
  // await imagemin(['./tools/img-min/original/*.png'], {
  //   destination: './tools/img-min/opt/',
  //   plugins: [imageminPng({ optimizationLevel: 5 })],
  // })
  // await imagemin(['./tools/img-min/original/cards/*.png'], {
  //   destination: './tools/img-min/opt/',
  //   plugins: [imageminPng({ optimizationLevel: 5 })],
  // })
  // await imagemin(['./others/manual/manual.jpg'], {
  //   destination: './others/manual/opt/',
  //   plugins: [imageminJpegtran({ progressive: true })],
  // })
})()
