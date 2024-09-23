import TopHeader from "./TopHeader";


function Login() {

    return (
        <>
            <TopHeader />
            <div className="flex bg-[#EDEDED] ">
                <div style={{ width: '70%' }} className="flex-1 flex flex-col">
                    <header className="h-20 flex items-center px-6 bg-white">
                        <button className="p-2 -ml-2 mr-2" >
                            <svg
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="h-6 w-6 transform"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="4" y1="6" x2="14" y2="6" />
                                <line x1="4" y1="18" x2="14" y2="18" />
                                <path d="M4 12h17l-3 -3m0 6l3 -3" />
                            </svg>
                        </button>
                        <span className="font-medium">Cases</span>
                    </header>
                    <main className="flex-1 p-6" style={{ overflowY: 'auto' }}>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Login;
