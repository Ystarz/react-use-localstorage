import { Dispatch } from 'react';
export default function useLocalStorage(key: string, initialValue?: any): [any, Dispatch<string>];
