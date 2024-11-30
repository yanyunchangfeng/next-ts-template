import { isVercel, isStatic } from '@/app/shared';

export const isDynamic = isVercel || !isStatic;
