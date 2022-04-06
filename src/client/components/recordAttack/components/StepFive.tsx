//note

import React from 'react';

export const StepFive = (props) => {
    const { handleNoteChange, handleSubmit, previousStep } = props;

    return (
        <section className='record-attack-page'>
            <h2>Record attack</h2>
            <div className='record-attack-container'>
                <div className='attack-form-container'>
                    <form className='attack-form'>
                        <label htmlFor='note'>
                            Would you like to add any additional notes?
                            <textarea
                                name=''
                                id=''
                                cols={30}
                                rows={5}
                                onChange={handleNoteChange}
                            ></textarea>
                        </label>
                        <div className='step-buttons-container'>
                            <button type="button" className='white-button' onClick={previousStep}>Previous</button>
                            <button type='submit' className='white-button' onClick={handleSubmit}>Submit Attack!</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};