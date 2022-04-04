import { useState } from 'react';
import { dateToString, diffBetweenDates } from '../utils';

export const Attack = (props) => {
    const { attack, index } = props;
    const [viewMore, setViewMore] = useState<Boolean>(false);

    const handleViewMore = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const viewMoreTemp = viewMore;
        setViewMore(!viewMoreTemp);
    };

    return (
        <div key={index} className='log'>
            <div className='log-top'>
                <span>Started: {dateToString(attack.startedAt)}</span>
                <span>Duration: {diffBetweenDates(attack.startedAt, attack.endedAt)}</span>
                <span>Intensity: {attack.intensity.number}/10</span>
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
                            Location:{' '}
                            <span>{attack.physicalLocation.name}</span>
                        </p>
                    )}
                    {attack.symptoms.length !== 0 && (
                        <p>
                            Symptoms:{' '}
                            {attack.symptoms.map((sym) => (
                                <span>- {sym.symptom.name}</span>
                            ))}
                        </p>
                    )}
                    {attack.triggers.length !== 0 && (
                        <p>
                            Triggers:{' '}
                            {attack.triggers.map((trig) => (
                                <span>- {trig.trigger.name}</span>
                            ))}
                        </p>
                    )}
                    {attack.auras.length !== 0 && (
                        <p>
                            Auras:{' '}
                            {attack.auras.map((au) => (
                                <span>- {au.aura.name}</span>
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
                            {attack.reliefMethods.map((rF) => (
                                <span>- {rF.reliefMethod.name}</span>
                            ))}
                        </p>
                    )}
                    {attack.effects.length !== 0 && (
                        <p>
                            Effects on your activities:{' '}
                            {attack.effects.map((eff) => (
                                <span>- {eff.effect.name}</span>
                            ))}
                        </p>
                    )}
                    {attack.painLocations.length !== 0 && (
                        <p>
                            Pain Locations:{' '}
                            {attack.painLocations.map((loc) => (
                                <span>- {loc.painLocation.location}</span>
                            ))}
                        </p>
                    )}
                    {attack.note && (
                        <p>
                            Note: <span>{attack.note.content}</span>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};
