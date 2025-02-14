import style from './error.module.css'

export default function Error() {

    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <div className={style.container}>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h1 className={style.h1}>404</h1>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h3 className={style.h3}>Hiba történt az adatok betöltése közben.</h3>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h3 className={style.h3}>Kérjük ellenőrizze a link végén található kódot.</h3>
                    </div>
                </div>
            </div>
        </>
    )
}
