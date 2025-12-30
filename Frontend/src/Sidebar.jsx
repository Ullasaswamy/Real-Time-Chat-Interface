import './Sidebar.css';
function Sidebar(){
    return(
        <>
        <section className='sidebar'>
        <button>
            <img src="/src/assets/blacklogo.png" alt="No image" className='logo' />
            <span><i className="fa-solid fa-pen-to-square"></i></span>
        </button>

        <div className="history">
            <h2 className='chat'>Chats</h2>
                <li>History 1</li>
                <li>History 1</li>
                <li>History 1</li>
                <li>History 1</li>
        </div>

        <div className="sign">
            <p>Developer Ullas &hearts;</p>
        </div>


        </section>
        </>
    )
}
export default Sidebar;