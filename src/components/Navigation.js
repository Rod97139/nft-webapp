
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ethers } from 'ethers';
import Web3Modal from "web3modal"
import { useRouter } from 'next/router'


const Navigation = () => {

    const providerOptions = {
    }
    

  const router = useRouter()
    
async function connectWallet() {
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions
      })

      const web3ModalInstance = await web3Modal.connect()
      const web3ModalProvider = new ethers.BrowserProvider(web3ModalInstance)

    }catch(err){
      console.error(err);
    }
  }

  const goToHomePage = () => {
    router.push(`/`)
  }


    return (
        <>
        <Nav variant="pills" activeKey="1" 
        className='mb-5'>
        <Nav.Item>
          <Nav.Link eventKey="2" onClick={goToHomePage} title="Acceuil">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={connectWallet} eventKey="2" title="Connect">
            Connect Wallet
          </Nav.Link>
        </Nav.Item>
        <NavDropdown title="A propos" id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">Qui sommes nous</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Contact</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">Partenaires</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      </>

    )
}


export default Navigation