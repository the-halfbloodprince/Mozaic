import {
    Link, useLoaderData, useLocation, useNavigate
} from "react-router-dom";

import { useState ,useContext} from "react";
import axios from "axios";
import { NFTsContext, profileContext } from "../contexts/contexts";
import { FaSearchDollar as SearchIcon } from 'react-icons/fa'

import styles from "./Navbar.module.css";

const ProfileIcon = ({ account, profile }) => {

    const bgImage = `url("${profile.profileImageUrl}") !important`

    return (
        <Link to={`/profile/${account}`}>
            <div className={styles.profileIcon} style={{ background: bgImage }}>
                <img src={profile.profileImageUrl} alt="" />
            </div>
        </Link>
    )

}

const LoginButton = ({ web3Handler }) => (
    <div onClick={web3Handler} className={styles.navButton}>Login</div>
)

const NavBar = ({ web3Handler, account }) => {

    const [searchTerm, setSearchTerm] = useState("");

    const [NFTs, setNFTs] = useContext(NFTsContext);
    const [profile, setprofile] = useContext(profileContext);
    const [matchedUsers,setMatchedUsers] = useState([]);
    const [matchedNFTs,setMatchedNFTs] = useState([]);

    const { pathname } = useLocation()
    console.log(pathname)
    const navigate = useNavigate()

    const handleSearch = async () => {

        navigate(`/search/${searchTerm}`)
        
    }

    return (
        <div className={styles.nav}>
            <Link to='/'><div className={styles.navLogo}>Moziac</div></Link>
            <div className={styles.search}>
                <input className={styles.search__input} type="text" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)}></input>
                <div className={styles.search__icon} onClick={handleSearch}><SearchIcon /></div>
            
                {/* <div className={styles.searchResults}>
                    <div className={styles.searchResults__users}>
                        {
                            matchedUsers
                                .map(u => (
                                    <div className={styles.result}>
                                        { u.name }
                                    </div>
                                ))
                        }   
                    </div>
                    <hr />
                    <div className={styles.searchResults__nfts}>
                        {
                            matchedNFTs
                                .map(n => (
                                    <div className={styles.result}>
                                        { n.nftName }
                                    </div>
                                ))
                        }   
                    </div>
                </div> */}
            
            </div>
            <div className={styles.navLinks}>
                <div className={`${styles.navLink} ${pathname === '/' && styles.activeNavLink}`}><Link to='/'> Home </Link></div>
                <div className={`${styles.navLink} ${pathname === '/marketplace' && styles.activeNavLink}`}><Link to='/marketplace'> Marketplace </Link></div>
                <div className={`${styles.navLink} ${pathname === '/transactions' && styles.activeNavLink}`}><Link to='/transactions'> Transactions </Link></div>
                <div className={`${styles.navLink} ${pathname === '/create' && styles.activeNavLink}`}><Link to='/create'> Create </Link></div>
                {account ? <ProfileIcon account={account} profile={profile} /> : <LoginButton web3Handler={web3Handler} /> }
            </div>
        </div>
        // <Navbar expand="lg" bg="secondary" variant="dark">
        //     <Container>
        //         <Navbar.Brand href="http://www.dappuniversity.com/bootcamp">
        //             <img src={market} width="40" height="40" className="" alt="" />
        //             &nbsp; DApp NFT Marketplace
        //         </Navbar.Brand>
        //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        //         <Navbar.Collapse id="responsive-navbar-nav">
        //             <Nav className="me-auto">
        //                 <Nav.Link as={Link} to="/">Home</Nav.Link>
        //                 <Nav.Link as={Link} to="/create">Create</Nav.Link>
        //                 <Nav.Link as={Link} to="/my-listed-items">My Listed Items</Nav.Link>
        //                 <Nav.Link as={Link} to="/my-purchases">My Purchases</Nav.Link>
        //             </Nav>
        //             <Nav>
        //                 {account ? (
        //                     <Nav.Link
        //                         href={`https://etherscan.io/address/${account}`}
        //                         target="_blank"
        //                         rel="noopener noreferrer"
        //                         className="button nav-button btn-sm mx-4">
        //                         <Button variant="outline-light">
        //                             {account.slice(0, 5) + '...' + account.slice(38, 42)}
        //                         </Button>

        //                     </Nav.Link>
        //                 ) : (
        //                     <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button>
        //                 )}
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
    )

}

export default NavBar;