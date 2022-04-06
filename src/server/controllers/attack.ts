import { prisma } from '../utils/prisma';
import { Prisma, Aura, Effect, PainLocation, ReliefMethod, Symptom, Trigger } from '@prisma/client';
import { Request, Response } from 'express';

import { INTENSITIES } from '../data/intensities';
import { MEDICATIONS } from '../data/medications';
import { SYMPTOMS } from '../data/symptoms';
import { TYPES } from '../data/types';
import { TRIGGERS } from '../data/triggers';
import { PHYSICAL_LOCATIONS } from '../data/physicalLocations';
import { EFFECTS } from '../data/effects';
import { AURAS } from '../data/auras';
import { RELIEF_METHODS } from '../data/reliefMethods';
import { PAIN_LOCATIONS } from '../data/painLocations';

import { PRISMA_ERROR, SERVER_ERROR, SERVER_SUCCESS } from '../config/serverRes';
import { 
    Intensity, 
    Medication, 
    Type, 
    PhysicalLocation,  
    AttackData 
} from '../config/interfaces';

const createIntensity = async (intensity: { number: number, level: string }):Promise<Intensity | string> => {
    const { number, level } = intensity;

    const createdIntensity = await prisma.intensity.create({
        data: {
            number: number,
            level: level,
        },
    });

    if(!createdIntensity){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdIntensity;
};

const seedIntensities = async ():Promise<void> => {
    const intensityLevels: number = INTENSITIES.length;

    for (let i: number = 0; i < intensityLevels; i++) {
        const createdIntensity = await createIntensity(INTENSITIES[i]);
        if(createdIntensity === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Intensity:', createdIntensity);
    }
};

const createMedication = async (drug: string, dose: string, type: string):Promise<Medication | string> => {
    const createdMedication = await prisma.medication.create({
        data: {
            drug: drug,
            dose: dose,
            type: type,
        },
    });

    if(!createdMedication){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdMedication;
}

export const createMedicationByUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { drug, dose, type } = req.body;
    
    const existingMedication = await prisma.medication.findFirst({
        where:{
            drug: drug,
            dose: dose,
            type: type
        }
    });

    if(!existingMedication){
        const createdMedication = await createMedication(drug, dose, type);

        if(!createdMedication){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
        }

        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdMedication});
    }

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingMedication});
};

const seedMedications = async ():Promise<void> => {
    const medicationsToSeed = MEDICATIONS.length;

    for (let i: number = 0; i < medicationsToSeed; i++) {
        const { drug, dose, type } = MEDICATIONS[i];
        const createdMedication = await createMedication(drug, dose, type);
        if(createdMedication === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Medication:', createdMedication);
    }
};

const createType = async (name: string):Promise<Type | string> => {
    const createdType = await prisma.type.create({
            data: {
                name: name
            }
    });

    if(!createdType){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdType;
}

export const createTypeByUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { name } = req.body;

    const existingType = await prisma.type.findUnique({
        where: {
            name: name
        }
    });

    if(!existingType){
        const createdType = await createType(name);

        if(!createdType){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
        }
    
        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdType });
    }

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingType});
}

const seedTypes = async ():Promise<void> => {
    const typesToSeed = TYPES.length;

    for (let i: number = 0; i < typesToSeed; i++) {
        const { name } = TYPES[i];
        const createdType = await createType(name);
        if(createdType === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Type:', createdType);
    }
}

const createSymptom = async (name: string):Promise<Symptom | string> => {
    const createdSymptom = await prisma.symptom.create({
        data: {
            name: name
        }
    });

    if(!createdSymptom){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdSymptom;
}

export const createSymptomByUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { name } = req.body;

    const existingSymptom = await prisma.symptom.findUnique({
        where: {
            name: name
        }
    });

    if(!existingSymptom){
        const createdSymptom = await createSymptom(name);

        if(!createdSymptom){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
        }
    
        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdSymptom });
    }

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingSymptom});
}

const seedSymptoms = async ():Promise<void> => {
    const symptomsToSeed = SYMPTOMS.length;

    for (let i: number = 0; i < symptomsToSeed; i++) {
        const { name } = SYMPTOMS[i];
        const createdSymptom = await createSymptom(name);
        if(createdSymptom === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Symptom:', createdSymptom);
    }
}

const createTrigger = async (name: string):Promise<Trigger | string> => {
    const createdTrigger = await prisma.trigger.create({
        data: {
            name: name
        }
    });

    if(!createdTrigger){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdTrigger;
}

export const createTriggerByUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { name } = req.body;

    const existingTrigger = await prisma.trigger.findUnique({
        where: {
            name: name
        }
    });

    if(!existingTrigger){
        const createdTrigger = await createTrigger(name);

        if(!createdTrigger){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
        }
    
        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdTrigger });
    }

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingTrigger});
}

const seedTriggers = async ():Promise<void> => {
    const triggersToSeed = TRIGGERS.length;

    for (let i: number = 0; i < triggersToSeed; i++) {
        const { name } = TRIGGERS[i];
        const createdTrigger = await createTrigger(name);
        if(createdTrigger === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Trigger:', createdTrigger);
    }
}

const createPhysicalLocation = async (name: string):Promise<PhysicalLocation | string> => {
    const createdPhysicalLocation = await prisma.physicalLocation.create({
        data: {
            name: name
        }
    });

    if(!createdPhysicalLocation){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdPhysicalLocation;
}

export const createPhysicalLocationByUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { name } = req.body;

    const existingPhysicalLocation = await prisma.physicalLocation.findUnique({
        where: {
            name: name
        }
    });

    if(!existingPhysicalLocation){
        const createdPhysicalLocation = await createPhysicalLocation(name);

        if(!createdPhysicalLocation){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
        }
    
        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdPhysicalLocation });
    }

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingPhysicalLocation});
}

const seedPhysicalLocations = async ():Promise<void> => {
    const locationsToSeed = PHYSICAL_LOCATIONS.length;

    for (let i: number = 0; i < locationsToSeed; i++) {
        const { name } = PHYSICAL_LOCATIONS[i];
        const createdPhysicalLocation = await createPhysicalLocation(name);
        if(createdPhysicalLocation === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Physical Location:', createdPhysicalLocation);
    }
}

const createEffect = async (name: string):Promise<Effect | string> => {
    const createdEffect = await prisma.effect.create({
        data: {
            name: name
        }
    });

    if(!createdEffect){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdEffect;
}

export const createEffectByUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { name } = req.body;

    const existingEffect = await prisma.effect.findUnique({
        where: {
            name: name
        }
    });

    if(!existingEffect){
        const createdEffect = await createEffect(name);

        if(!createdEffect){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
        }
    
        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdEffect });
    }

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingEffect});
}

const seedEffects = async ():Promise<void> => {
    const effectsToSeed = EFFECTS.length;

    for (let i: number = 0; i < effectsToSeed; i++) {
        const { name } = EFFECTS[i];
        const createdEffect = await createEffect(name);
        if(createdEffect === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Effect:', createdEffect);
    }
}

const createAura = async (name: string):Promise<Aura | string> => {
    const createdAura = await prisma.aura.create({
        data: {
            name: name
        }
    });

    if(!createdAura){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdAura;
}

export const createAuraByUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { name } = req.body;

    const existingAura = await prisma.aura.findUnique({
        where: {
            name: name
        }
    });

    if(!existingAura){
        const createdAura = await createAura(name);

        if(!createdAura){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
        }
    
        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdAura });
    }

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingAura});
}

const seedAuras = async ():Promise<void> => {
    const aurasToSeed = AURAS.length;

    for (let i: number = 0; i < aurasToSeed; i++) {
        const { name } = AURAS[i];
        const createdAura = await createAura(name);
        if(createdAura === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Aura:', createdAura);
    }
}

const createReliefMethod = async (name: string):Promise<ReliefMethod | string> => {
    const createdReliefMethod = await prisma.reliefMethod.create({
        data: {
            name: name
        }
    });

    if(!createdReliefMethod){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdReliefMethod;
}

export const createReliefMethodByUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { name } = req.body;

    const existingReliefMethod = await prisma.reliefMethod.findUnique({
        where: {
            name: name
        }
    });

    if(!existingReliefMethod){
        const createdReliefMethod = await createReliefMethod(name);

        if(!createdReliefMethod){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
        }
    
        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdReliefMethod });
    }

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingReliefMethod});
}

const seedReliefMethods = async ():Promise<void> => {
    const reliefMethodToSeed = RELIEF_METHODS.length;

    for (let i: number = 0; i < reliefMethodToSeed; i++) {
        const { name } = RELIEF_METHODS[i];
        const createdReliefMethod = await createReliefMethod(name);
        if(createdReliefMethod === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Relief Method:', createdReliefMethod);
    }
}

const createPainLocation = async (location: string):Promise<PainLocation | string> => {
    const createdPainLocation = await prisma.painLocation.create({
        data: {
            location: location
        }
    });

    if(!createdPainLocation){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdPainLocation;
}

const seedPainLocations = async ():Promise<void> => {
    const painLocationsToSeed = PAIN_LOCATIONS.length;

    for (let i: number = 0; i < painLocationsToSeed; i++) {
        const { location } = PAIN_LOCATIONS[i];
        const createdPainLocation = await createPainLocation(location);
        if(createdPainLocation === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Pain Location:', createdPainLocation);
    }
}

export const initDataBase = async (req: Request, res: Response):Promise<void> => {
    await seedIntensities();
    await seedMedications();
    await seedTypes();
    await seedSymptoms();
    await seedTriggers();
    await seedPhysicalLocations();
    await seedEffects();
    await seedAuras();
    await seedReliefMethods();
    await seedPainLocations();

    res.status(SERVER_SUCCESS.OK.CODE).json('Database seeded successfully');
};

export const createNote = async (req: Request, res: Response):Promise<void> => {
    const { content } = req.body;

    const createdNote = await prisma.note.create({
        data: {
            content: content
        }
    });
    console.log('Created Note:', createdNote);

    if(!createdNote){
        res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
    }

    res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdNote });
}

export const updateNote = async (req: Request, res: Response):Promise<void> => {
    const { content } = req.body;
    const noteId: number = Number(req.params.noteId);

    const updatedNote = await prisma.note.update({
        where: {
            id: noteId
        },
        data: {
            content: content
        }
    });

    if(!updatedNote){
        res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
    }

    res.status(SERVER_SUCCESS.UPDATE_OK.CODE).json({ data: updatedNote });
}

export const deleteNote = async (req: Request, res: Response):Promise<void> => {
    const noteId: number = Number(req.params.noteId);

    const deletedNote = await prisma.note.delete({
        where: {
            id: noteId
        }
    });
    console.log('Deleted Note:', deletedNote);

    res.status(SERVER_SUCCESS.DELETE_OK.CODE).json(SERVER_SUCCESS.DELETE_OK.MESSAGE);
}

const buildAttackData = (req: Request):AttackData => {
    let { startedAt, endedAt } = req.body;
    const { userId } = req.body;
    const { intensityId, medicationId, typeId, physicalLocationId, noteId } = req.body;
    const { symptoms, triggers, effects, auras, reliefMethods, painLocations } = req.body;

    console.log('noteId', noteId);

    if(!startedAt){
        startedAt = Date.now();
    }

    if(!endedAt){
        endedAt = Date.now();
    }

    const data = {
        startedAt: new Date(startedAt),
        endedAt: new Date (endedAt),
        userId: userId,
        intensityId: intensityId,
        medicationId: medicationId,
        typeId: typeId,
        physicalLocationId: physicalLocationId,
        noteId: noteId,
        symptoms,
        triggers,
        effects,
        auras,
        reliefMethods,
        painLocations
    }

    if(symptoms){
        data.symptoms = {
            create: symptoms.map((symptom: Symptom) => {
                return {
                    symptom: {
                        connectOrCreate: {
                            where: {
                                name: symptom
                            },
                            create: {
                                name: symptom
                            }
                        }
                    }
                };
            })
        }
    }

    if(triggers){
        data.triggers = {
            create: triggers.map((trigger: Trigger) => {
                return {
                    trigger: {
                        connectOrCreate: {
                            where: {
                                name: trigger
                            },
                            create: {
                                name: trigger
                            }
                        }
                    }
                };
            })
        }
    }

    if(effects){
        data.effects = {
            create: effects.map((effect: Effect) => {
                return {
                    effect: {
                        connectOrCreate: {
                            where: {
                                name: effect
                            },
                            create: {
                                name: effect
                            }
                        }
                    }
                };
            })
        }
    }

    if(auras){
        data.auras = {
            create: auras.map((aura: Aura) => {
                return {
                    aura: {
                        connectOrCreate: {
                            where: {
                                name: aura
                            },
                            create: {
                                name: aura
                            }
                        }
                    }
                };
            })
        }
    }

    if(reliefMethods){
        data.reliefMethods = {
            create: reliefMethods.map((reliefMethod: ReliefMethod) => {
                return {
                    reliefMethod: {
                        connectOrCreate: {
                            where: {
                                name: reliefMethod
                            },
                            create: {
                                name: reliefMethod
                            }
                        }
                    }
                };
            })
        }
    }

    if(painLocations){
        data.painLocations = {
            create: painLocations.map((painLocation: PainLocation) => {
                return {
                    painLocation: {
                        connect: {
                            location: painLocation
                        }
                    }
                };
            })
        }
    }

    return data;
}

const buildAttackInclude = () => {
    return {
        user: true,
        intensity: true,
        medication: true,
        type: true,
        physicalLocation: true,
        note: true,
        symptoms: {
            include: {
                symptom: true
            }
        },
        triggers: {
            include: {
                trigger: true
            }
        },
        effects: {
            include: {
                effect: true
            }
        },
        auras: {
            include: {
                aura: true
            }
        },
        reliefMethods: {
            include: {
                reliefMethod: true
            }
        },
        painLocations: {
            include: {
                painLocation: true
            }
        }
    }
}

export const createAttack = async (req: Request, res: Response):Promise<void> => {
    const data = buildAttackData(req);
    const include = buildAttackInclude();

    const createdAttack = await prisma.attack.create({
        data: {
            ...data
        },
        include: {
            ...include
        }
    });
    console.log('Created Attack:', createdAttack);

    if(!createdAttack){
        res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
    }

    res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdAttack });
}

export const updateAttack = () => {}

export const deleteAttack = async (req: Request, res: Response):Promise<void> => {
    const id: number = Number(req.params.id);

    const foundAttack = await prisma.attack.findUnique({
        where: {
            id: id
        }
    });

    if(foundAttack?.noteId){
        const deletedNote = await prisma.note.delete({
            where: {
                id: foundAttack.noteId
            }
        });
        console.log('Deleted', deletedNote);
    }

    const attackOnAuras = await prisma.attacksOnAuras.findMany({
        where: {
            attackId: id
        }
    });

    if(attackOnAuras){
        for(let i:number = 0; i < attackOnAuras.length; i++){
            const deletedAttackOnAuras = await prisma.attacksOnAuras.delete({
                where: {
                    attackId_auraId: {
                        attackId: id,
                        auraId: attackOnAuras[i].auraId
                    }
                }
            });
            console.log('Deleted', deletedAttackOnAuras);
        }
    }

    const attacksOnSymptoms = await prisma.attacksOnSymptoms.findMany({
        where: {
            attackId: id
        }
    });

    if(attacksOnSymptoms){
        for(let i:number = 0; i < attacksOnSymptoms.length; i++){
            const deletedAttackOnSymptoms = await prisma.attacksOnSymptoms.delete({
                where: {
                    attackId_symptomId: {
                        attackId: id,
                        symptomId: attacksOnSymptoms[i].symptomId
                    }
                }
            });
            console.log('Deleted', deletedAttackOnSymptoms);
        }
    }

    const attacksOnEffects = await prisma.attacksOnEffects.findMany({
        where: {
            attackId: id
        }
    });

    if(attacksOnEffects){
        for(let i:number = 0; i < attacksOnEffects.length; i++){
            const deletedAttackOnEffects = await prisma.attacksOnEffects.delete({
                where: {
                    attackId_effectId: {
                        attackId: id,
                        effectId: attacksOnEffects[i].effectId
                    }
                }
            });
            console.log('Deleted', deletedAttackOnEffects);
        }
    }

    const attacksOnPainLocations = await prisma.attacksOnPainLocations.findMany({
        where: {
            attackId: id
        }
    });

    if(attacksOnPainLocations){
        for(let i:number = 0; i < attacksOnPainLocations.length; i++){
            const deletedAttackOnPainLocations = await prisma.attacksOnPainLocations.delete({
                where: {
                    attackId_painLocationId: {
                        attackId: id,
                        painLocationId: attacksOnPainLocations[i].painLocationId
                    }
                }
            });
            console.log('Deleted', deletedAttackOnPainLocations);
        }
    }

    const attacksOnReliefMethods = await prisma.attacksOnReliefMethods.findMany({
        where: {
            attackId: id
        }
    });

    if(attacksOnReliefMethods){
        for(let i:number = 0; i < attacksOnReliefMethods.length; i++){
            const deletedAttackOnReliefMethods = await prisma.attacksOnReliefMethods.delete({
                where: {
                    attackId_reliefMethodId: {
                        attackId: id,
                        reliefMethodId: attacksOnReliefMethods[i].reliefMethodId
                    }
                }
            });
            console.log('Deleted', deletedAttackOnReliefMethods);
        }
    }

    const attacksOnTriggers = await prisma.attacksOnTriggers.findMany({
        where: {
            attackId: id
        }
    });

    if(attacksOnTriggers){
        for(let i:number = 0; i < attacksOnTriggers.length; i++){
            const deletedAttackOnTriggers = await prisma.attacksOnTriggers.delete({
                where: {
                    attackId_triggerId: {
                        attackId: id,
                        triggerId: attacksOnTriggers[i].triggerId
                    }
                }
            });
            console.log('Deleted', deletedAttackOnTriggers);
        }
    }

    //delete all the aOnB and note

    const deletedAttack = await prisma.attack.delete({
        where: {
            id: id
        }
    });
    console.log('Deleted Attack:', deletedAttack);

    res.status(SERVER_SUCCESS.DELETE_OK.CODE).json(SERVER_SUCCESS.DELETE_OK.MESSAGE);
}

export const getAll = async (req: Request, res: Response) => {
    const auras = await prisma.aura.findMany({});
    const effects = await prisma.effect.findMany({});
    const intensities = await prisma.intensity.findMany({});
    const medications = await prisma.medication.findMany({});
    const painLocations = await prisma.painLocation.findMany({});
    const physicalLocations = await prisma.physicalLocation.findMany({});
    const reliefMethods = await prisma.reliefMethod.findMany({});
    const symptoms = await prisma.symptom.findMany({});
    const triggers = await prisma.trigger.findMany({});
    const types = await prisma.type.findMany({});

    res.status(SERVER_SUCCESS.OK.CODE).json({ 
        data: {
            auras, 
            effects, 
            intensities, 
            medications, 
            painLocations, 
            physicalLocations, 
            reliefMethods, 
            symptoms, 
            triggers, 
            types 
        }}
    );
}

export const getAttacksByUser = async (req: Request, res: Response) => {
    const userId:number = Number(req.params.userId);
    const include = buildAttackInclude();

    const userAttacks = await prisma.attack.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            startedAt: 'desc'
        },
        include: {
            ...include
        }
    });

    if(!userAttacks){
        res.status(SERVER_ERROR.NOT_FOUND.CODE).json({ error: SERVER_ERROR.NOT_FOUND.MESSAGE });
    }

    res.status(SERVER_SUCCESS.OK.CODE).json({ data: userAttacks });
}