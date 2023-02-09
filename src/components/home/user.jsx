import { MatrixForm } from '@/src/components/matrix/matrix-form'

export const User = ({session, handleSignOut}) => {

    return (
        <main className="container mx-auto text-center py-20">
            <h3 className="text-2xl font-bold">Authorized User's Page</h3>
              
            <div className='details'>
              <h5>{session.user.email}</h5>
            </div>
    
            <MatrixForm />
    
            <div className='flex justify-center'>
              <button onClick={handleSignOut} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray'>Sign Out</button>
            </div>
    
        </main>
      )

}