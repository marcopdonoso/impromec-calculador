import plugin from 'tailwindcss/plugin'

export default plugin(({ addComponents, theme }) => {
  addComponents({
    '.heading_h4': {
      fontSize: theme('fontSize.3xl'),
      fontWeight: theme('fontWeight.bold'),
    },
    '.heading_h6': {
      fontSize: theme('fontSize.2xl'),
      fontWeight: theme('fontWeight.semibold'),
    },
    '.body_large_semibold': {
      fontSize: theme('fontSize.lg'),
      fontWeight: theme('fontWeight.semibold'),
    },
    '.body_large_regular': {
      fontSize: theme('fontSize.lg'),
      fontWeight: theme('fontWeight.normal'),
    },
    '.body_medium_bold': {
      fontSize: theme('fontSize.base'),
      fontWeight: theme('fontWeight.bold'),
    },
    '.body_medium_medium': {
      fontSize: theme('fontSize.base'),
      fontWeight: theme('fontWeight.medium'),
    },
    '.body_medium_regular': {
      fontSize: theme('fontSize.base'),
      fontWeight: theme('fontWeight.normal'),
    },
    '.body_small_medium': {
      fontSize: theme('fontSize.sm'),
      fontWeight: theme('fontWeight.medium'),
    },
    '.body_small_regular': {
      fontSize: theme('fontSize.sm'),
      fontWeight: theme('fontWeight.normal'),
    },
    '.body_xs_medium': {
      fontSize: theme('fontSize.xs'),
      fontWeight: theme('fontWeight.medium'),
    },
    '.body_xs_regular': {
      fontSize: theme('fontSize.xs'),
      fontWeight: theme('fontWeight.normal'),
    },
    '.body_xxs_regular': {
      fontSize: '10px',
      fontWeight: theme('fontWeight.normal'),
    },
  })
})
