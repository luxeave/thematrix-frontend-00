const Layout = ({children}) => {
    return (
        <div className="flex h-screen w-screen bg-blue-400 justify-center overflow-hidden">           
            <div className="mt-10 bg-slate-50 rounded-md w-2/3 h-4/5">      
                <div className="flex justify-center">           
                    {children}               
                </div>
            </div>
            
        </div>
    );
}

export default Layout;