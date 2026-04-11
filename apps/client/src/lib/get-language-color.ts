export const getLanguageColor = (language: string): { bg: string; text: string } => {
  
  const colors: Record<string, { bg: string; text: string }> = {
    TypeScript:  { bg: '#3178c6', text: 'white' },
    JavaScript:  { bg: '#f1e05a', text: 'black' },
    Python:      { bg: '#3572A5', text: 'white' },
    Rust:        { bg: '#dea584', text: 'black' },
    Go:          { bg: '#00ADD8', text: 'white' },
    Java:        { bg: '#b07219', text: 'white' },
    Ruby:        { bg: '#701516', text: 'white' },
    PHP:         { bg: '#4F5D95', text: 'white' },
    CSS:         { bg: '#563d7c', text: 'white' },
    HTML:        { bg: '#e34c26', text: 'white' },
    Swift:       { bg: '#F05138', text: 'white' },
    Kotlin:      { bg: '#A97BFF', text: 'white' },
    'C#':        { bg: '#178600', text: 'white' },
    'C++':       { bg: '#f34b7d', text: 'white' },
    Shell:       { bg: '#89e051', text: 'black' },
    Vue:         { bg: '#41b883', text: 'white' },
    Dart:        { bg: '#00B4AB', text: 'white' },
    Astro:       { bg: '#fc570c', text: 'white' },
    Blade:       { bg: '#f85636', text: 'white' },
  };

  return colors[language] ?? { bg: 'transparent', text: 'inherit' };
};
