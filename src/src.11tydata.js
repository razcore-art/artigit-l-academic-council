module.exports = {
  layout: 'layout',
  eleventyComputed: {
    baseURL: ({ project, pkg }) =>
      project.ENV === 'production' ? `/${pkg.name}` : ''
  }
}
