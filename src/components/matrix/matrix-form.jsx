import styles from '@/styles/Form.module.css'
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi'
import { useState } from 'react'
import { useFormik } from 'formik';
import MatrixValidate from '@/src/lib/matrix_validate';

export const MatrixForm = () => {

    const [computed, setComputed] = useState("[2,2]")
    const formik = useFormik({
        initialValues: {
            matrix: '',
            target: ''
        },
        validate: MatrixValidate,
        onSubmit: onSubmit
    })

    async function fetchMatrix(url, payload){

        console.log(url);

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            return await res.json();
        } catch (error) {
            throw new Error(error);
        }
    }

    function parseMatrixResponse(response) {
        try {                                
            if (typeof response !== 'boolean') {
                return JSON.stringify(response);
            } else {
                return 'false';
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async function onSubmit(values){
        try {
            const payload = {
                "matrix": values.matrix,
                "target": values.target
            };

            console.log(payload);
            console.log(process.env.NEXT_PUBLIC_MATRIX_URL)
            
            const result = await fetchMatrix(process.env.NEXT_PUBLIC_MATRIX_URL, payload);
            const parsed = parseMatrixResponse(result);

            setComputed(parsed);
        }catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="w-1/2 mx-auto flex-col gap-10">
            {/* Login Form */}
            <form className='flex flex-col my-5 gap-5' onSubmit={formik.handleSubmit}>
                <div className={`${styles.input_group} ${formik.errors.matrix && formik.touched.matrix ? 'border-rose-600' : ''}`}>
                    <input 
                        type="text" 
                        name="matrix"
                        placeholder="[[1,4,7,8],[10,14,18,20],[23,30,32,65]]"
                        className={styles.input_text}
                        {...formik.getFieldProps('matrix')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25}/>
                    </span>                  
                </div>
                {formik.errors.matrix && formik.touched.matrix ? <span>{formik.errors.matrix}</span> : <></>}

                <div className={`${styles.input_group} ${formik.errors.target && formik.touched.target ? 'border-rose-600' : ''}`}>
                    <input 
                        type="number" 
                        name="target"
                        placeholder="32 (input numbers only)"
                        className={styles.input_text}
                        {...formik.getFieldProps('target')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiFingerPrint size={25}/>
                    </span>
                    
                </div>
                {formik.errors.target && formik.touched.target ? <span>{formik.errors.target}</span> : <></>}

                <div className="bg-gray-200 p-10">
                    <p>{computed}</p>
                </div>


                {/* Login Button */}
                <div className='input-button'>
                    <button type='submit' className={styles.button}>
                        Compute
                    </button>
                </div>
            </form>
            {/* bottom */}
        </section>       
    );
}