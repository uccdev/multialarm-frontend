import { useState, useEffect } from 'react';
import Logo from '/multialarm-logo.svg'
import Dataform from './components/Dataform/Dataform'
import Error from './components/Error/Error'
import Success from './components/Success/Success'
import Loading from './components/Loading/Loading'
import './App.css'

function App() {

    const [modal, setModal] = useState('loading'); // 'loading', 'error', 'form', 'success'
    const [data, setData] = useState(null);
    const [loadingText, setLoadingText] = useState('Adatok betöltése folyamatban') // 'Adatok elküldése folyamatban'
    const [loadingNumber, setLoadingNumber] = useState('4') // form: 4, error: 2, success: 1

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const hash = urlParams.get('hash');

                if (!hash || hash.length !== 12) {
                    throw new Error('Invalid hash');
                }

                const response = await fetch(`https://example.com/api/?hash=${hash}`);
                const result = await response.json();

                if (!result || Object.keys(result).length === 0) {
                    throw new Error('No data found');
                }

                setData(result);
                setModal('form');
            } catch (error) {
                setModal('form'); //error kell majd ide
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (formData) => {
        setModal('loading');
        try {
            const response = await fetch('https://example.com/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                setModal('success');
            } else {
                setModal('error');
            }
        } catch (error) {
            setModal('error');
        }
    };

  return (
    <>
    <div className='outer'>
      <div className='d-flex align-items-center justify-content-center'>
        <a href="https://www.multialarm.hu/" target="_blank">
          <img src={Logo} className="logo" alt="Multi Alarm" />
        </a>
      </div>
      <div>
            {modal === 'loading' && <Loading text={loadingText} number={loadingNumber}/>}
            {modal === 'error' && <Error />}
            {modal === 'form' && <Dataform data={data || {}} onSubmit={handleSubmit} />}
            {modal === 'success' && <Success />}
        </div>
    </div>
    </>
  )
}

export default App
