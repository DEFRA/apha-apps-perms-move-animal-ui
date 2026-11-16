import nunjucks from 'nunjucks'
import { formatAbbreviations } from './format-abbreviations.js'

describe('#formatAbbreviations', () => {
  const titles = {
    APHA: 'Animal and Plant Health Agency',
    GDPR: 'General Data Protection Regulation'
  }

  it('marks each complete abbreviation while leaving surrounding text intact', () => {
    expect(
      formatAbbreviations(
        'APHA’s APHA and UK GDPR, not APHAS.',
        titles
      ).toString()
    ).toBe(
      '<abbr title="Animal and Plant Health Agency">APHA</abbr>’s <abbr title="Animal and Plant Health Agency">APHA</abbr> and UK <abbr title="General Data Protection Regulation">GDPR</abbr>, not APHAS.'
    )
  })

  it('escapes text and titles before marking the result safe', () => {
    const env = new nunjucks.Environment(null, { autoescape: true })
    env.addFilter('formatAbbreviations', formatAbbreviations)

    expect(
      env.renderString('{{ text | formatAbbreviations(titles) }}', {
        text: '<script>alert("APHA")</script> & GDPR',
        titles: { APHA: '" onclick="alert(1)', GDPR: '<unsafe>' }
      })
    ).toBe(
      '&lt;script&gt;alert(&quot;<abbr title="&quot; onclick=&quot;alert(1)">APHA</abbr>&quot;)&lt;/script&gt; &amp; <abbr title="&lt;unsafe&gt;">GDPR</abbr>'
    )
  })
})
