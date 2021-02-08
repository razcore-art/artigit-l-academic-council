module.exports = {
  layout: 'layout',
  eleventyComputed: {
    baseURL: (data) =>
      data.project.ENV === 'production' ? `/${data.pkg.name}` : ''
  }
}
