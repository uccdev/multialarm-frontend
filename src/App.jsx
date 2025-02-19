import { useState, useEffect } from 'react';
import Logo from '/multialarm-logo.svg'
import Dataform from './components/Dataform/Dataform'
import Error from './components/Error/Error'
import Success from './components/Success/Success'
import Loading from './components/Loading/Loading'
import './App.css'

function App() {

    const endpoint = import.meta.env.VITE_API_ENDPOINT;

    const [modal, setModal] = useState('loading'); // 'loading', 'error', 'form', 'success'
    const [data, setData] = useState(null);
    const [hash, setHash] = useState(null);
    const [loadingText, setLoadingText] = useState('Adatok betöltése folyamatban') // 'Adatok elküldése folyamatban'
    const [loadingNumber, setLoadingNumber] = useState('4') // form: 4, error: 2, success: 1
    const [showAlert, setShowAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try{
                const urlParams = new URLSearchParams(window.location.search);
                const token = urlParams.get('token');
                setHash(token);

                if (!token){
                    throw new Error('Invalid token');
                }

                const response = await fetch(`${endpoint}/backend/api/alarms`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token })
                });

                const result = await response.json();

                if (!result || Object.keys(result).length === 0){
                    setErrorMsg('Nem sikerült csatlakozni a szerverhez. Kérem próbálja újra később vagy ellenőrizze a link végén található kódot.')
                    setShowAlert('true');
                    throw new Error('No data found');
                }

                //console.table(result.activeAlarms);
                setData(result.activeAlarms);

                setModal('form');
            }
            catch(error){
                setModal('error');
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 8000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const handleSubmit = async (formData) => {
        setModal('loading');
        //console.table(formData);

        if (!formData.password){
            setErrorMsg('A jelszó megadása kötelező!')
            setShowAlert('true');
            setModal('form');
            return;
        }

        try {
            const response = await fetch(`${endpoint}/backend/api/cancel-alarm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            //console.log(response)

            if (response.status === 200) {
                setModal('success');
            } else {
                setErrorMsg(response.statusText || "Hibás adatok. Kérjük ellenőrizze a megadott jelszót.")
                setShowAlert('true');
                setModal('form');
            }
        } catch (error) {
            setModal('error');
        }
    };

  return (
    <>
    {showAlert && (
        <div className="alert alert-danger toprow" role="alert">
           {errorMsg}
        </div>
    )}
    <div className='outer'>
      <div className='d-flex align-items-center justify-content-center'>
        <a href="https://www.multialarm.hu/" target="_blank">
          <img src={Logo} className="logo" alt="Multi Alarm" />
        </a>
      </div>
      <div>
            {modal === 'loading' && <Loading text={loadingText} number={loadingNumber}/>}
            {modal === 'error' && <Error />}
            {modal === 'form' && <Dataform data={data || {}} onSubmit={handleSubmit} hash={hash} />}
            {modal === 'success' && <Success />}
        </div>
    </div>
    </>
  )
}

export default App
