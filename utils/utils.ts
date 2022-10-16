export const tad2latex = (text : string) => {
  const unicodeLatexCharacters = [['∈', '$\\in$'],
  ['∀', '$\\forall$'],
  ['∧L', '$\\land_{L}$'],
  ['∨L', '$\\lor_{L}$'],
  ['⟶L', '$\\longrightarrow_{L}$'],
  ['⟹L', '$\\longrightarrow_{L}$'],
  ['⇒L', '$\\longrightarrow_{L}$'],
  ['∧', '$\\land$'],
  ['∨', '$\\lor$'],
  ['⟶', '$\\longrightarrow$'],
  ['⟹', '$\\longrightarrow$'],
  ['⇒', '$\\longrightarrow$'],
  ['⟵', '$\\longleftarrow$'],
  ['⟨', '$\\langle$'],
  ['⟩', '$\\rangle$'],
  ['#', '\#'],
  ['≡', '$\\equiv$'],
  ['=obs', '=$_{obs}$'],
  ['<', '<\\'],
  ['>', '>\\'],
  ['≠', '$\\neq$'],
  ['!=', '$\\neq$'],
  ['	', '    '],
  ['≤', '$\\leq$'],
  ['≥', '$\\geq$'],
  ['⟷', '$\\longleftrightarrow$']]

  let output = text;
  for (const i in unicodeLatexCharacters) {
    output = output.replaceAll(unicodeLatexCharacters[i][0], unicodeLatexCharacters[i][1]);
  }
  return output;
}