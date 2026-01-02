import { format } from 'date-fns';
import { nl } from 'date-fns/locale/nl';

export function formatPostDate(dateString: string) {
  try {
    const date = new Date(dateString);
    return format(date, 'd MMMM yyyy', { locale: nl });
  } catch {
    return dateString;
  }
}

export function formatPortfolioDate(dateString: string) {
  try {
    const date = new Date(dateString);
    return format(date, 'MMMM yyyy', { locale: nl });
  } catch {
    return dateString;
  }
}
