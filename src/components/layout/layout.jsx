export default function Layout({children}){
    return (
        <div className="flex h-screen w-screen bg-blue-400 justify-center">           
            <div className="m-auto bg-slate-50 rounded-md w-1/2 h-3/5">      
                <div className="flex flex-col justify-evenly">
                    <div className="text-center py-10">
                    {children}
                    </div>
                </div>
            </div>
            
        </div>
    );
}