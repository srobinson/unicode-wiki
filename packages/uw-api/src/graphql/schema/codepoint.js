export const CodepointSchema = `
type CodepointColor {
  bg: String
  text: String
}

type CodepointProps {
  scx: String
  kCompatibilityVariant: String
  kTraditionalVariant: String
  kDefinition: String
  kJapaneseKun: String
  kJapaneseOn: String
  kMandarin: String
  kTang: String
  kTotalStrokes: String
  kVietnamese: String
}

type Codepoint {
  cp: Int!
  na: String
  na1: String
  color: CodepointColor
  charts: String
  k: CodepointProps
}
`
export const CodepointQuery = `
  codepoint(ucp: String): Codepoint
  codepoints(range: String): [Codepoint]
  suggest(text: String): [String]
`
