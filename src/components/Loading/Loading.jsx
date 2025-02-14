import style from './loading.module.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading({ text, number }) {


    return (
        <>
            <SkeletonTheme baseColor="#ccc" highlightColor="#999">
                <div className='d-flex row justify-content-center align-items-center'>
                    <div className={style.container}>
                        <div className='d-flex alig-items-center justify-content-center pt-5'>
                            <div className={`${style.skeletonContainer} skeleton-wrapper`}>
                                <h5 className={`${style.graytext} text-center pb-3`}>{text}</h5>
                                <h1><Skeleton duration={2}/></h1>
                                <h3><Skeleton count={number} duration={2}/></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </SkeletonTheme>

            {/*             <div className={`${style.classOne} ${style.fix} d-flex row justify-content-center align-items-center`}>
                <div className='d-flex justify-content-center align-items-center'>
                    <h1 className={style.h1}>{children}</h1>

                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <span className={style.loader}></span>
                </div>
            </div> */}
        </>
    )
}
