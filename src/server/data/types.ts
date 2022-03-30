import { Type } from '../config/interfaces';

export const TYPES: Array<Type> = [
    { name: 'Migraine' },
    { name: 'Tension-Type headache' },
    { name: 'Cluster headache' },
    { name: 'Postdrome' }, //hours or days before a headache
    { name: 'Prodrome' }, //Hours or days after a headache
    { name: 'Silent migraine' }, //aura symptoms without a headache
    { name: 'Migraine with aura' },
    { name: 'Vestibular migraine' } //balance problems, vertigo, nausea, and vomiting, w/ or without a headache
];