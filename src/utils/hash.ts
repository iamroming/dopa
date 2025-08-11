import { createHash } from 'crypto';
export const generateHash = (str: string): string => {
  return createHash('md5').update(str).digest('hex');
};