import { useState } from 'react';
import { LOCAL_STORAGE } from '../config/config';
import { DATABASE } from '../config/paths';
import { dateToString, diffBetweenDates } from '../utils';

export const Attack = (props) => {
    const { attack, index, setAttacks } = props;
    const [viewMore, setViewMore] = useState<Boolean>(false);

    const handleViewMore = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const viewMoreTemp = viewMore;
        setViewMore(!viewMoreTemp);
    };

    const deleteAttackFromDB = async ():Promise<void> => {
        const response = await fetch(`${DATABASE.ATTACK}${attack.id}`, {
            method: 'DELETE'
        });
        const deletedAttack = await response.json();
    }

    const handleDeleteRecord = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>):Promise<void> => {
        await deleteAttackFromDB();

        const getUpdatedDataFromDB = async (): Promise<void> => {
            const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);
            const response = await fetch(`${DATABASE.ATTACK}${userId}`);
            const fetchedFromDB = await response.json();

            setViewMore(false);
            setAttacks([...fetchedFromDB.data]);
        };
        getUpdatedDataFromDB();
    }

    return (
        <div key={index} className='log'>
            <div className='log-top'>
                {attack.startedAt && <span>Started: {dateToString(attack.startedAt)}</span>}
                {attack.startedAt && <span>Duration: {diffBetweenDates(attack.startedAt, attack.endedAt)}</span>}
                {attack.intensity && <span>Intensity: {attack.intensity.number}/10</span>}
                {!attack.intensity && <span>Intensity: N/A</span>}
                <button className='view-more' onClick={handleViewMore}>{viewMore? 'Hide': 'More'}</button>
            </div>
            {viewMore && (
                <div className='log-details'>
                    {attack.type && (
                        <p>
                            Type: <span>{attack.type.name}</span>
                        </p>
                    )}
                    {attack.physicalLocation && (
                        <p>
                            Location:
                            <span>{attack.physicalLocation.name}</span>
                        </p>
                    )}
                    {attack.symptoms.length !== 0 && (
                        <p>
                            Symptoms:{' '}
                            {attack.symptoms.map((sym, index) => (
                                <span key={index}>- {sym.symptom.name}</span>
                            ))}
                        </p>
                    )}
                    {attack.triggers.length !== 0 && (
                        <p>
                            Triggers:{' '}
                            {attack.triggers.map((trig, index) => (
                                <span key={index}>- {trig.trigger.name}</span>
                            ))}
                        </p>
                    )}
                    {attack.auras.length !== 0 && (
                        <p>
                            Auras:{' '}
                            {attack.auras.map((au, index) => (
                                <span key={index}>- {au.aura.name}</span>
                            ))}
                        </p>
                    )}
                    {attack.medication && (
                        <p>
                            Medication:{' '}
                            <span>{`${attack.medication.drug} ${attack.medication.dose} (${attack.medication.type})`}</span>
                        </p>
                    )}
                    {attack.reliefMethods.length !== 0 && (
                        <p>
                            Relief Methods:{' '}
                            {attack.reliefMethods.map((rF, index) => (
                                <span key={index}>- {rF.reliefMethod.name}</span>
                            ))}
                        </p>
                    )}
                    {attack.effects.length !== 0 && (
                        <p>
                            Effects on your activities:{' '}
                            {attack.effects.map((eff, index) => (
                                <span  key={index}>- {eff.effect.name}</span>
                            ))}
                        </p>
                    )}
                    {attack.painLocations.length !== 0 && (
                        <p>
                            Pain Locations:{' '}
                            {attack.painLocations.map((loc, index) => (
                                <span  key={index}>- {loc.painLocation.location}</span>
                            ))}
                        </p>
                    )}
                    {attack.note && (
                        <p>
                            Note: <span>{attack.note.content}</span>
                        </p>
                    )}
                    <button onClick={handleDeleteRecord}>Delete Record</button>
                </div>
            )}
        </div>
    );
};
