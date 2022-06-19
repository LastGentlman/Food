import Nav from 'react-bootstrap/Nav';

function BasicExample() {
  return (
    <Nav
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default BasicExample;

// import {NavbarContainer} from './Navbar.style'

// export default function Nav() {
//     return (
//         <NavbarContainer className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
//             <h1>Logo</h1>
//             <ul>
//                 <li>Home</li>
//                 <li>About</li>
//                 <li>Contact</li> 
//             </ul>
//         </NavbarContainer>
//     )
// }