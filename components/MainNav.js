import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"
import { useAtom } from "jotai"
import { searchHistoryAtom } from "@/store"

export default function MainNav() {
  const router = useRouter()

  // Getting a reference to the searchHistory from searchHistoryAtom
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

  //This form is using Controlled Component with useState. To see the demonstration of using React-Hook-Form, please check /pages/search.js
  const [keyword, setKeyword] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  function submitForm(e) {
    e.preventDefault()
    setIsExpanded(false)
    // Add the computed queryString value to the searchHistory
    let queryString = `title=true&q=${keyword}`
    setSearchHistory((current) => [...current, queryString])
    router.push(`/artwork?title=true&q=${keyword}`)
  }

  return (
    <>
      <Navbar
        bg="secondary"
        data-bs-theme="light"
        expand="lg"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>Alam Mohammed</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={toggleExpand}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  onClick={() => setIsExpanded(false)}
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/search"}
                  onClick={() => setIsExpanded(false)}
                >
                  Advanced Search
                </Nav.Link>
              </Link>
            </Nav>
            &nbsp;
            <Form className="d-flex" onSubmit={submitForm}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button
                type="submit"
                variant="secondary"
                onClick={() => setIsExpanded(false)}
              >
                Search
              </Button>
            </Form>
            &nbsp;
            <Nav>
              <NavDropdown title="User Name" id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  {/*legacyBehavior is a must add to avoid double <a> which occurs errors*/}
                  <NavDropdown.Item
                    active={router.pathname === "/favourites"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Favourite
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item
                    active={router.pathname === "/history"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Search History
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  )
}