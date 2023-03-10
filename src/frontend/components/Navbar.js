import {
    Link, useLoaderData, useLocation
} from "react-router-dom";

import { useState ,useContext} from "react";
import axios from "axios";
import { NFTsContext } from "../contexts/contexts";

import styles from "./Navbar.module.css";

const ProfileIcon = () => (
    <Link to="/profile">
        <div className={styles.profileIcon}>
            {/* <img src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80" alt="" /> */}
        </div>
    </Link>
)

const LoginButton = ({ web3Handler }) => (
    <div onClick={web3Handler} className={styles.navButton}>Login</div>
)

const NavBar = ({ web3Handler, account }) => {

    const [searchTerm, setSearchTerm] = useState("");

    const [NFTs, setNFTs] = useContext(NFTsContext);
    const [matchedUsers,setMatchedUsers] = useState([]);
    const [matchedNFTs,setMatchedNFTs] = useState([]);

    const { pathname } = useLocation()
    console.log(pathname)

    const handleSearch = async () => {
        const term = searchTerm;
        try {
            const {data}  = await axios.get(`${process.env.REACT_APP_SERVER_URL}/search?term=${term}`);
            setMatchedUsers(data);
            console.log(data);
            console.log(NFTs);
            const foundNFTs = NFTs.filter((nft) => nft.name.includes(term));
            setMatchedNFTs(foundNFTs);
            console.log(foundNFTs);
        } catch (e) {
            console.log(e);
        }
        
    }


    return (
        <div className={styles.nav}>
            <Link to='/'><div className={styles.navLogo}>Moziac</div></Link>
            <div>
                <input className={styles.navSearch} type="text" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)}></input>
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className={styles.navLinks}>
                <div className={`${styles.navLink} ${pathname === '/' && styles.activeNavLink}`}><Link to='/'> Home </Link></div>
                <div className={`${styles.navLink} ${pathname === '/marketplace' && styles.activeNavLink}`}><Link to='/marketplace'> Marketplace </Link></div>
                <div className={`${styles.navLink} ${pathname === '/create' && styles.activeNavLink}`}><Link to='/create'> Create </Link></div>
                {account ? <ProfileIcon /> : <LoginButton web3Handler={web3Handler} /> }
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