import '../styles/my-logs.css';

export const MyLogs = () => {
    return (
        <section className='my-logs-page'>
            <h2>My Records</h2>
            <div className='my-logs-container'>
                <div className='user-logs'>
                    <div className='log'></div>
                    <div className='log'></div>
                    <div className='log'></div>
                </div>
                <div className='new-attack-box'>
                    <p>New attack? We're sorry to hear</p>
                    <button className='white-button'>Record Attack</button>
                </div>
            </div>
        </section>
    );
};