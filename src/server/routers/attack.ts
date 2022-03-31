import { Router } from 'express';

import { 
    createAttack,
    createAuraByUser,
    createEffectByUser,
    createMedicationByUser,
    createNote,
    createPhysicalLocationByUser,
    createReliefMethodByUser,
    createSymptomByUser,
    createTriggerByUser,
    createTypeByUser,
    deleteAttack,
    deleteNote,
    getAll,
    initDataBase, 
    updateNote
} from '../controllers/attack';

const router = Router();

router.post('/init', initDataBase);
router.post('/med', createMedicationByUser);
router.post('/type', createTypeByUser);
router.post('/symptom', createSymptomByUser);
router.post('/trigger', createTriggerByUser);
router.post('/phyLoc', createPhysicalLocationByUser);
router.post('/effect', createEffectByUser);
router.post('/aura', createAuraByUser);
router.post('/relief', createReliefMethodByUser);
router.post('/note', createNote);
router.patch('/note/:noteId', updateNote);
router.delete('/note/:noteId', deleteNote);

router.post('/', createAttack);
router.delete('/', deleteAttack);

router.get('/', getAll);

export default router;