//medication
//relief methods

import React from 'react';

export const StepFour = (props) => {
    const { userAttackData, data, handleSelectChange, handleCheckboxChange, previousStep, nextStep } = props;

    return (
        <section className='record-attack-page'>
            <h2>Record attack</h2>
            <div className='record-attack-container'>
                <div className='attack-form-container'>
                    <form className='attack-form'>
                        <label htmlFor='medication'>
                            Did you take any medication?
                            <div className='options'>
                                <select onChange={handleSelectChange}>
                                    <option value='default'>Select</option>
                                    {data &&
                                        data.medications.map((medication, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={`medicationId/${medication.id}`}
                                                > 
                                                    {`${medication.drug} ${medication.dose} (${medication.type})`}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                        </label>
                        <label htmlFor='relief-methods'>
                            What relief methods have you tried?
                            <div className='options'>
                                <ul className='checkboxes'>
                                    {data &&
                                        data.reliefMethods.map(
                                            (reliefMethod) => {
                                                return (
                                                    <li key={reliefMethod.id}>
                                                        <input 
                                                            type='checkbox'
                                                            value={reliefMethod.name} 
                                                            name='reliefMethods'
                                                            onChange={handleCheckboxChange}
                                                            checked={userAttackData.reliefMethods.includes(reliefMethod.name)}    
                                                        />
                                                        <span>{reliefMethod.name}</span>
                                                    </li>
                                                );
                                            }
                                        )}
                                </ul>
                            </div>
                        </label>
                        <div className='step-buttons-container'>
                            <button type="button" className='white-button' onClick={previousStep}>Previous</button>
                            <button type="button" className='white-button' onClick={nextStep}>Next</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
