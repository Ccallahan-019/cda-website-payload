export function formatCamelCase(input: string): string {
    return input
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ') 
      .replace(/\./g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }