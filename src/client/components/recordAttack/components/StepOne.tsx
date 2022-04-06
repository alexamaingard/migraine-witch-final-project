//startedAt
//endedAt
//physical Location
import React from 'react';
import '../../../styles/record-attack.css'

export const StepOne = (props) => {
    const { userAttackData, data, handleDateChange, handleSelectChange, nextStep } = props;

    return (
        <section className='record-attack-page'>
            <h2>Record attack</h2>
            <div className='record-attack-container'>
                <div className='progress-bar-container'>
                    <ul className="progressbar">
                        <li>Step 1</li>
                        <li>Step 2</li>
                        <li>Step 3</li>
                        <li>Step 4</li>
                        <li>Step 5</li>
                    </ul>
                </div>
                <div className='attack-form-container'>
                    <form className='attack-form'>
                        <div className='date-input'>
                            <label htmlFor='start-time'>
                                When did your migraine start?
                                <input 
                                    type='datetime-local' 
                                    onChange={handleDateChange}
                                    name='startedAt'
                                />
                            </label>
                            <label htmlFor='end-time'>
                                When did your migraine end?
                                <input 
                                    type='datetime-local' 
                                    name='endedAt'
                                    onChange={handleDateChange}
                                />
                            </label>
                        </div>
                        <label htmlFor='physical-location'>
                            Where were you when the migraine started?
                            <div className='options'>
                                <select onChange={handleSelectChange}>
                                    <option value='default'>Select</option>
                                    {data &&
                                        data.physicalLocations.map((physicalLocation, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={`physicalLocationId/${physicalLocation.id}`}
                                                > 
                                                    {physicalLocation.name}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                        </label>
                        <div className='next-button-container'>
                            <button type="button" onClick={nextStep} className='white-button'>Next</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
