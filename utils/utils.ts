import { unicodeLatexCharacters, regexPatterns } from "./constants";

export const unicode2latex = (text: string) => {
  let output = text;
  for (const i in unicodeLatexCharacters) {
    output = output.replaceAll(unicodeLatexCharacters[i][0], unicodeLatexCharacters[i][1]);
  }
  return output.replaceAll('$$', '');
}

export const convertInterfaceFunction = (text: string) => {
  const betweenBracketsPattern    = /(?<={)(\n|.)*?(?=})/gi;
  const betweenParenthesisPattern = /(?<=: +).*?(?=$|\n)/gi;

  const patterns = ['interfaceName', 'parameters', 'resultType', 'pre', 'post', 'complexity', 'description', 'aliasing'];

  const toLatex : {[key: string]: Function} = {
    interfaceName: (text: string) => `\\InterfazFuncion{${text}}`,
    parameters: (text: string) => `{${parseParameters(text)}}`,
    resultType: (text: string) => `{${text.split(':')[1].trim()}}`,
    pre: (text: string) => `[ ${text.match(betweenBracketsPattern)![0]} ]`,
    post: (text: string) => `{ ${text.match(betweenBracketsPattern)![0]} }`,
    complexity: (text: string) => `[\\oGrande{${text.match(betweenParenthesisPattern)![0]}}]\n`,
    description: (text: string) => `[${text.split(':')[1].trim()}]`,
    aliasing: (text: string) => `[${text.split(':')[1].trim()}]`,
  }

  patterns.forEach((pattern) =>
    text.match(regexPatterns[pattern])?.forEach((match) => {
      text = text.replaceAll(regexPatterns[pattern], toLatex[pattern](match));
    })
  );

  return text;
}

export const convertAlgorithmFunction = (text: string) => {
  const patterns = ['algorithmName', 'parameters', 'resultType'];

  const toLatex : {[key: string]: Function} = {
    algorithmName: (text: string) => `\\begin{algorithm}[H]{\\textbf{${text}}`,
    parameters: (text: string) => `(${parseParameters(text)})`,
    resultType: (text: string) => ` $\\to$ $res$ : ${text.split(':')[1].trim()}}  \\begin{algorithmic}[1]`,
    algorithm: (text: string) => text.split('\n').map((line) => `  \\State ${line}`).join('\n'),
  }

  patterns.forEach((pattern) =>
    text.match(regexPatterns[pattern])?.forEach((match) => {
      text = text.replaceAll(regexPatterns[pattern], toLatex[pattern](match));
    })
  );

  let algorithm = text.split('\n');
  algorithm.shift();

  return text.split('\n')[0] + '\n' +
         algorithm.map((line) => toLatex.algorithm(line)).join('\n') +
         '\n  \\medskip\n' +
         '  \\Statex \\underline{Complejidad:} $\\mathcal{O}$(???)\n' +
         '  \\end{algorithmic}\n' +
         '\\end{algorithm}';
}

const parseParameters = (text: string) => (
  text.split(',').map((parameter) => {
    if (!text.includes('in')) return '';

    const test = parameter.trim().split(':');
    const mode = test[0].split(' ')[0];
    const name = test[0].split(' ')[1].trim();
    const type = test[1].trim();
    const command = mode.includes('in/out') ? 'Inout' : 'In';
    return `\\${command}{${name}}{${type}}`;
  }).join(', ')
);
