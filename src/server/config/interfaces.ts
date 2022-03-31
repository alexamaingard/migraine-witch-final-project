export interface Intensity {
    number: number, 
    level: string
}

export interface Medication {
    drug: string,
    dose: string,
    type: string
}

export interface Type {
    name: string
}

export interface Symptom {
    name: string
}

export interface Trigger {
    name: string
}

export interface PhysicalLocation {
    name: string
}


export interface Effect {
    name: string
}

export interface Aura {
    name: string
}

export interface ReliefMethod {
    name: string
}

export interface PainLocation {
    location: string
}

export interface AttackData {
    startedAt: string,
    endedAt: string,
    userId: number,
    intensityId: number,
    medicationId: number,
    typeId: number,
    physicalLocationId: number,
    noteId: number,
    symptoms: any,
    triggers: any,
    effects: any,
    auras: any,
    reliefMethods: any,
    painLocations: any
}