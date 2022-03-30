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
    deleteNote,
    initDataBase, 
    updateNote
} from '../controllers/attack';

const router = Router();

//Tested
router.post('/init', initDataBase);

//Not tested yet
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

export default router;