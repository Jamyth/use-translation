import { useContext } from 'react';
import { TranslationContext } from '../context';

export const useTranslate = () => useContext(TranslationContext);
