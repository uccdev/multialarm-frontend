import { useState, useEffect } from 'react';
import style from './dataform.module.css';

export default function Dataform({ data = {}, onSubmit , hash}) {
    const [selectedAddress, setSelectedAddress] = useState('');

    const [formData, setFormData] = useState({
        token: hash,
        intAccId: '',
        personId: '',
        password: '',
    });

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            setFormData((prevState) => ({
                ...prevState,
                intAccId: data[0].int_acc_id || '',
                personId: data[0].person_id || '',
            }));
            setSelectedAddress(data[0].address || '');
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    return (
        <>
            <div className={style.innerContainer}>
                <div className={style.form}>
                    <div className='d-flex justify-content-between'>
                        <h3>Riasztás lemondása</h3>
                        <select name="language" id="language" className={style.languagechange}>
                            <option value="hu">HU</option>
{/*                             <option value="en">EN</option>
                            <option value="ger">GER</option> */}
                        </select>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>

                        {/* <div className={style.responsive}>
                            <label htmlFor='phone'>Bejelentkező telefonszáma</label>
                            <div className={style.iconphone} />
                            <input
                                name='phone'
                                id='phone'
                                type="text"
                                value={formData.phone}
                                placeholder={data.phone || "+36 30 555 4444"}
                                onChange={handleChange}
                            />
                        </div> */}
                        <div className={style.responsive}>
                            <label htmlFor='address'>Kérjük, válassza ki az érintett ingatlant</label>
                            <div className={style.iconaddress} />
                            <select name="address" id="address" className={style.addressSelect} value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
                                {Array.isArray(data) && data.length > 0 ? (
                                    data.map((item, index) => (
                                        <option key={index} value={item.address}>
                                            {item.address}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Nincs cím</option>
                                )}
                            </select>
                        </div>


                        {/*
                        <div className={style.responsive}>
                            <label htmlFor='address'>Kérjük, válassza ki az érintett ingatlant</label>
                            <div className={style.iconaddress} />
                            <input
                                name='address'
                                id='address'
                                type="text"
                                placeholder={data.address || "test"}
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div> */}

                        <div className={style.responsive}>
                            <label htmlFor='password'>Jelszó megadása</label>
                            <div className={style.iconpw} />
                            <input
                                name='password'
                                id='password'
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='d-flex justify-content-center align-items-center'>
                            <input type="submit" value="Riasztás lemondása" className={style.submit} />
                        </div>

                    </form>

                </div>
            </div>
        </>
    )
}
