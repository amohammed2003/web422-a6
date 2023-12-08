import {
    Container,
    Nav,
    Navbar,
    Form,
    Button,
    NavDropdown
} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'

import { useAtom } from 'jotai'
import { searchHistoryAtom } from '../store'

import { addToHistory } from '../lib/userData'
import { readToken, removeToken } from '../lib/authenticate'

export default function MainNav() {
    let token = readToken()
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    const router = useRouter()
    const [isExpanded, setIsExpanded] = useState(false)
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            search: ''
        }
    })

    const logout = () => {
        setIsExpanded(false)
        removeToken()
        router.push('/login') // the demo redirects to '/' instead of '/login'
    }

    /**
     * Handle submit search form, redirect to url based on search param
     * @param {any} data
     */
    const handleSubmitForm = async (data) => {
        const query = `title=true&q=${data.search}`
        router.push(`/artwork?${query}`)
        reset({ search: '' })
        setIsExpanded((prevState) => false)
        setSearchHistory(await addToHistory(query))
    }

    return (
        <>
            <Navbar
                bg='dark'
                variant='dark'
                expand='lg'
                className='fixed-top'
                style={{ paddingTop: '12px', paddingBottom: '12px' }}
                expanded={isExpanded}
            >
                <Container>
                    <Navbar.Brand>Alam Mohammed</Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls='navbarScroll'
                        onClick={() => setIsExpanded((prevState) => !prevState)}
                    />
                    <Navbar.Collapse id='navbarScroll'>
                        <Nav
                            className='me-auto my-2 my-lg-0'
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link href='/' passHref>
                                <Nav.Link
                                    active={router.pathname === '/'}
                                    onClick={() =>
                                        setIsExpanded((prevState) => false)
                                    }
                                >
                                    Home
                                </Nav.Link>
                            </Link>
                            {token && (
                                <Link href='/search' passHref>
                                    <Nav.Link
                                        active={router.pathname === '/search'}
                                        onClick={() =>
                                            setIsExpanded((prevState) => false)
                                        }
                                    >
                                        Advanced Search
                                    </Nav.Link>
                                </Link>
                            )}
                        </Nav>
                        &nbsp;
                        {token && (
                            <>
                                <Form
                                    className='d-flex'
                                    onSubmit={handleSubmit(handleSubmitForm)}
                                >
                                    <Form.Control
                                        type='search'
                                        placeholder='Search'
                                        className='me-2 form-control-sm'
                                        aria-label='Search'
                                        {...register('search')}
                                    />
                                    <Button
                                        variant='success'
                                        className='btn-sm'
                                        type='submit'
                                    >
                                        Search
                                    </Button>
                                </Form>
                                &nbsp;&nbsp; &nbsp;&nbsp;
                                <Nav>
                                    <NavDropdown
                                        title={token.userName}
                                        id='basic-nav-dropdown'
                                    >
                                        <Link href='/favourites' passHref>
                                            <NavDropdown.Item
                                                active={
                                                    router.pathname ===
                                                    '/favourites'
                                                }
                                                onClick={() =>
                                                    setIsExpanded(
                                                        (prevState) => false
                                                    )
                                                }
                                            >
                                                Favourites
                                            </NavDropdown.Item>
                                        </Link>
                                        <Link href='/history' passHref>
                                            <NavDropdown.Item
                                                active={
                                                    router.pathname ===
                                                    '/history'
                                                }
                                                onClick={() =>
                                                    setIsExpanded(
                                                        (prevState) => false
                                                    )
                                                }
                                            >
                                                Search History
                                            </NavDropdown.Item>
                                        </Link>
                                        <NavDropdown.Item
                                            onClick={() => {
                                                logout()
                                                setIsExpanded(
                                                    (prevState) => false
                                                )
                                            }}
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </>
                        )}
                        {!token && (
                            <Nav>
                                <Link href='/register' passHref>
                                    <Nav.Link
                                        active={router.pathname === '/register'}
                                        onClick={() =>
                                            setIsExpanded((prevState) => false)
                                        }
                                    >
                                        Register
                                    </Nav.Link>
                                </Link>
                                <Link href='/login' passHref>
                                    <Nav.Link
                                        active={router.pathname === '/login'}
                                        onClick={() =>
                                            setIsExpanded((prevState) => false)
                                        }
                                    >
                                        Login
                                    </Nav.Link>
                                </Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    )
}
