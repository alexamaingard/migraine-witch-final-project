import { LOCAL_STORAGE } from "./config"

export interface SignInForm {
    username: string,
    password: string
}

export interface SignUpForm {
    username: string,
    email: string,
    password: string
}

export interface UserFromDB {
    data: {
        id: number,
        username: string
    },
    token: string,
    error: string
}

export interface UserAttackData {
    userId: number,
    startedAt: Date | null,
    endedAt: Date | null, 
    typeId: number | null,
    intensityId: number | null,
    physicalLocationId: number | null,
    symptoms: Array<string> | null,
    triggers: Array<string> | null,
    auras: Array<string> | null,
    medicationId: number | null,
    reliefMethods: Array<string> | null,
    effects: Array<string> | null,
    painLocations: Array<string> | null,
    noteId: number | null
}

export interface UserLogData {
    userId: number,
    startedAt: Date | null,
    endedAt: Date | null, 
    type: {
        name: string
    },
    intensity: {
       number: number,
       level: string 
    },
    physicalLocation: {
        name: string
    },
    symptoms: Array<string> | undefined,
    triggers: Array<string> | undefined,
    auras: Array<string> | undefined,
    medicationId: number | null,
    reliefMethods: Array<string> | undefined,
    effects: Array<string> | undefined,
    painLocations: Array<string> | undefined,
    note: null | {
        content: string
    }
}

export const InitialUserAttackData:UserAttackData = {
    userId: Number(localStorage.getItem(LOCAL_STORAGE.USER_ID)),
    startedAt: null,
    endedAt: null, 
    typeId: null,
    intensityId: null,
    physicalLocationId: null,
    symptoms: [],
    triggers: [],
    auras: [],
    medicationId: null,
    reliefMethods: [],
    effects: [],
    painLocations: [],
    noteId: null
}