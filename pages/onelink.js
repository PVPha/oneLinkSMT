import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
    const dialogRef = useRef();
    const [isRedirect, setIsRedirect] = useState(false);

    const [link, setLink] = useState('');
    const router = useRouter();



    const handleRedirect = () => {
        console.log('Desktop or unsupported device');
        console.log(router);
        const desPath = router.asPath.replace('/onelink?', '');
        router.replace(desPath);
    };

    const openModal = () => {
        dialogRef.current.showModal();
    }
    const closeModal = () => {
        dialogRef.current.close();
    }
    useEffect(() => {
        const userAgent = navigator.userAgent;
        if (/android/i.test(userAgent)) {
            console.log('Android device');
            // alert('android');
            setLink('https://resources.mobio.vn/callreport');
            openModal();
        } else if (/iphone|ipad|ipod/i.test(userAgent)) {
            console.log('iOS device');

            setLink('https://info.hdbank.com.vn/callreport');
            closeModal(true);
        } else {
            handleRedirect()
        }
    }, []);

    return (
        <div>
            <button onClick={openModal}>open dialog</button>
            <dialog ref={dialogRef} className='dialog'>
                <div style={modalContainer}>
                    <div className='text-center'>Bạn có muốn mở ứng dụng không ?</div>
                    <div className='d-flex justify-center'>
                        <a
                            href='#'
                            onClick={() => {
                                closeModal();
                                handleRedirect();
                            }}
                            className=''
                            style={btnStyle}>
                            Đóng
                        </a>
                        <a
                            href={link}
                            onClick={() => {
                                setTimeout(() => {
                                    // window.close();
                                }, [1500]);
                            }}
                            className='ml-32px'
                            style={btnStyle}>
                            Đồng ý
                        </a>
                    </div>
                </div>
            </dialog>
        </div>
    );
}



const modalContainer = {
    width: 320,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 16,
};
const btnStyle = {
    paddingTop: 12,
    paddingBottom: 12,
    textDecoration: 'none',
    color: 'blue',
    marginInline: 12,
};
