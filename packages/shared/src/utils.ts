export function calculateSavings(
  currentCost: number,
  savingsPercentage: number
): number {
  return currentCost * (savingsPercentage / 100);
}

export function groupBillingByService(items: any[]): Record<string, number> {
  return items.reduce((acc, item) => {
    const key = item.service || 'Unknown';
    acc[key] = (acc[key] || 0) + parseFloat(item.cost || 0);
    return acc;
  }, {});
}

export function sortBySpend(items: any[]): any[] {
  return [...items].sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}