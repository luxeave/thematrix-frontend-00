import styles from '@/styles/Form.module.css'
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi'
import { useState } from 'react'

import { useFormik } from 'formik';
import LoginValidate from '@/src/lib/login_validate';
import { signIn} from 'next-auth/react';
import { useRouter } from 'next/router';

export const LoginForm = () => {

    // to switch between hidden-password-view and text-view
    const [show, setShow] = useState(false)
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: LoginValidate,
        onSubmit: onSubmit
    })

    async function onSubmit(values){       
        try {
            const status = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
                callbackUrl: '/'
            })

            if (status.ok){
                router.push(status.url)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="w-1/2 mx-auto flex-col gap-10">
            <div className='title'>
                <h1 className='block w-700 text-gray-800 text-4xl font-bold py-10'>Login</h1>
            </div>

            {/* Login Form */}
            <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email"
                        className={styles.input_text}
                        {...formik.getFieldProps('email')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25}/>
                    </span>                  
                </div>
                {formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span> : <></>}

                <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                    <input 
                        type={`${show ? "text" : "password"}`} 
                        name="password"
                        placeholder="password"
                        className={styles.input_text}
                        {...formik.getFieldProps('password')}
                    />
                    <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                        <HiFingerPrint size={25}/>
                    </span>
                    
                </div>
                {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span> : <></>}

                {/* Login Button */}
                <div className='input-button'>
                    <button type='submit' className={styles.button}>
                        Login
                    </button>
                </div>
            </form>
            {/* bottom */}
        </section>       
    );
}