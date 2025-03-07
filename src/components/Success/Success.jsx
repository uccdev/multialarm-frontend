import style from './success.module.css'

export default function Success() {

    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <div className={style.container}>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h1 className={style.h1}>Köszönjük!</h1>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h3 className={style.h3}>Rövidesen lezárjuk a riasztást!</h3>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button
                            className={style.submit}
                            onClick={() => window.location.reload()}>
                            Vissza
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
