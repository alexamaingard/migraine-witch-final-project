//medication
//relief methods

import React from 'react';

export const StepFour = (props) => {
    const { userAttackData, data, handleRadioChange, handleCheckboxChange, previousStep, nextStep } = props;

    return (
        <section className='record-attack-page'>
            <h2>Record attack</h2>
            <div className='record-attack-container'>
                <div className='progress-bar-container'>
                    <ul className="progressbar">
                        <li className='active'>Step 1</li>
                        <li className='active'>Step 2</li>
                        <li className='active'>Step 3</li>
                        <li>Step 4</li>
                        <li>Step 5</li>
                    </ul>
                </div>
                <div className='attack-form-container'>
                    <form className='attack-form'>
                        <label htmlFor='medication'>
                            Did you take any medication?
                            <div className='options'>
                                <ul className='checkboxes'>
                                    {data &&
                                        data.medications.map((medication, index) => {
                                            return (
                                                <li key={index}>
                                                    <label>
                                                        <input 
                                                            type='radio' 
                                                            value={`medicationId/${medication.id}`}
                                                            name='medicationId'
                                                            onChange={handleRadioChange} 
                                                        />
                                                        
                                                        <span className='checkbox-span'>
                                                            {medication.type === 'Injection' && 
                                                                <div>
                                                                    <svg viewBox="0 0 504.938 504.938" width={'30px'} height={'30px'}>
                                                                        <path d='M501.29,51.966l-12.359-12.359L464.214,14.89L450.972,1.648c-3.531-3.531-8.828-3.531-12.359,0
                                                                        c-3.531,3.531-3.531,8.828,0,12.359l7.062,7.062l-56.497,56.497L357.4,45.786c-3.531-3.531-8.828-3.531-12.359,0l-24.717,24.717
                                                                        c-1.766,1.766-2.648,3.531-2.648,6.179c0,2.648,0.883,4.414,2.648,6.179l6.179,6.179l-50.317,50.317c0,0,0,0-0.001,0.001
                                                                        l-93.571,93.571c0,0,0,0-0.001,0.001s0,0-0.001,0.001l-56.496,56.496c-3.531,3.531-3.531,8.828,0,12.359l19.421,19.421
                                                                        L127,339.745l-26.483,26.483c-7.851,7.851-9.351,19.164-4.506,28.341L1.648,488.931c-3.531,3.531-3.531,8.828,0,12.359
                                                                        c1.766,1.766,3.531,2.648,6.179,2.648c2.648,0,4.414-0.883,6.179-2.648l93.95-93.95c3.829,2.488,8.344,3.909,12.864,3.909
                                                                        c7.062,0,12.359-2.648,16.772-7.945l26.483-26.483l18.538-18.538l18.538,18.538c1.766,1.766,3.531,2.648,6.179,2.648
                                                                        c2.648,0,4.414-0.883,6.179-2.648l150.069-150.069l50.317-50.317l6.179,6.179c1.766,1.766,3.531,2.648,6.179,2.648
                                                                        c1.766,0,4.414-0.883,6.179-2.648l24.717-24.717c3.531-3.531,3.531-8.828,0-12.359l-30.897-30.897l56.497-56.497l6.179,6.179
                                                                        c1.766,1.766,3.531,2.648,6.179,2.648c1.766,0,4.414-0.883,6.179-2.648C504.821,60.793,504.821,55.497,501.29,51.966z
                                                                        M320.324,170.255L363.579,127l12.359,12.359l-43.255,43.255L320.324,170.255z M338.862,102.283l12.8,12.8l-43.697,43.697
                                                                        l-13.241-13.241L338.862,102.283z M125.234,390.945c-1.766,2.648-6.179,2.648-8.828,0l-3.531-3.531
                                                                        c-2.648-1.766-2.648-6.179,0-8.828l20.303-20.303l12.359,12.359L125.234,390.945z M157.897,357.4l-12.359-12.359l11.917-11.917
                                                                        l12.359,12.359L157.897,357.4z M208.214,358.283l-62.676-62.676l43.697-43.697l24.276,24.276c1.766,1.766,3.531,2.648,6.179,2.648
                                                                        c2.648,0,5.297-0.883,6.179-2.648c3.531-3.531,3.531-8.828,0-12.359l-24.276-24.276l18.979-18.979l24.717,24.717
                                                                        c1.766,1.766,3.531,2.648,6.179,2.648c1.766,0,4.414-0.883,6.179-2.648c3.531-3.531,3.531-8.828,0-12.359l-24.717-24.717
                                                                        l18.538-18.538l24.717,24.717c1.766,1.766,3.531,2.648,6.179,2.648c2.648,0,4.414-0.883,6.179-2.648
                                                                        c3.531-3.531,3.531-8.828,0-12.359l-24.717-24.717l18.979-18.979l18.979,18.979l24.717,24.717l18.979,18.979L208.214,358.283z
                                                                        M357.4,208.214l-12.359-12.359l43.697-43.697l12.8,12.8L357.4,208.214z M426.255,164.076l-6.179-6.179l-24.717-24.717
                                                                        l-24.717-24.717l-25.6-25.6l-6.179-6.179l12.359-12.359L383,96.103c0,0,0,0,0,0l24.717,24.717c0,0,0,0,0.001,0.001l30.896,30.896
                                                                        L426.255,164.076z M413.014,101.4l-6.131-6.131l-6.228-6.228l56.497-56.497l12.359,12.359L413.014,101.4z'/>
                                                                    </svg>
                                                                </div>
                                                            }
                                                            {medication.type === 'Pill' && 
                                                                <div>
                                                                    <svg viewBox='0 0 512 512' width={'30px'} height={'30px'}>
                                                                        <path d='M473.6,38.4c-51.2-51.2-133.818-51.2-183.855,0L204.8,123.345c-4.655,4.655-4.655,11.636,0,16.291s11.636,4.655,16.291,0
                                                                            l84.946-84.945c41.891-41.891,109.382-41.891,151.273,0c41.891,41.891,41.891,109.382,0,151.273L339.782,323.491L180.364,164.073
                                                                            c-4.655-4.655-11.636-4.655-16.291,0L38.4,289.745c-51.2,51.2-51.2,133.818,0,183.855C64,499.2,96.582,512,130.327,512
                                                                            c33.745,0,66.327-12.8,91.927-38.4l84.945-84.945c4.655-4.655,4.655-11.636,0-16.291s-11.636-4.655-16.291,0l-84.946,84.945
                                                                            c-41.891,41.891-109.382,41.891-151.273,0c-41.891-41.891-41.891-109.382,0-151.273l117.527-117.527l159.418,159.418
                                                                            c4.655,4.655,11.636,4.655,16.291,0L473.6,222.255C524.8,171.055,524.8,88.436,473.6,38.4z'/>
                                                                        <path d='M442.182,70.982c-31.418-31.418-83.782-31.418-115.2,0l-34.909,34.909c-4.655,4.655-4.655,11.636,0,16.291
                                                                            c2.327,2.327,5.818,3.491,8.145,3.491s5.818-1.164,8.145-3.491l34.909-34.909c22.109-22.109,59.345-22.109,82.618,0
                                                                            c2.327,2.327,5.818,3.491,8.145,3.491c3.491,0,5.818-1.164,8.145-3.491C446.836,82.618,446.836,75.636,442.182,70.982z'/>
                                                                    </svg>
                                                                </div>
                                                            }
                                                            {`${medication.drug} ${medication.dose}`}
                                                            </span>
                                                    </label>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
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
                                                        <label>
                                                            <input 
                                                                type='checkbox'
                                                                value={reliefMethod.name} 
                                                                name='reliefMethods'
                                                                onChange={handleCheckboxChange}
                                                                checked={userAttackData.reliefMethods.includes(reliefMethod.name)}    
                                                            />
                                                            <span className='checkbox-span'>{reliefMethod.name}</span>
                                                        </label>
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
