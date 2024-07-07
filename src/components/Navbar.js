const Navbar = ({rightText}) => {
    return(
        <div className='navbar'>
            <div className='navbar-left'>Money Monitor</div>
            <div className='navbar-right'>{rightText}</div>
        </div>
    )
}

export default Navbar