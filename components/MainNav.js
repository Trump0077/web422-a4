import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

export default function MainNav() {
    const router = useRouter();
    const [ searchText, setSearchText ] = useState("");
    const [ isExpanded, setIsExpanded ] = useState(false);
    const [ searchHistory, setSearchHistory ] = useAtom(searchHistoryAtom);
    const searchTextRef = useRef(null);
    const navbarRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setIsExpanded(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isExpanded]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsExpanded(false);
        if (searchText.trim() != '') {
            let queryString = `title=true&q=${searchText}`;
            setSearchHistory(searchHistory => [...searchHistory, queryString]);
            router.push(`/artwork?title=true&q=${searchText}`);
        }
        setSearchText('');
        searchTextRef.current.value = '';
    }

    return (
        <div>
            <Navbar expand="lg" className="bg-dark navbar-dark fixed-top nav-bar">
                <Container>
                    <Navbar.Brand>Jiaheng Wang</Navbar.Brand>
                    <Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)}>Home</Nav.Link>
                            </Link>
                            <Link href="/search" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link>
                            </Link>
                        </Nav>
                        &nbsp;
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <Form.Control ref={searchTextRef} onChange={(e) => {setSearchText(e.target.value)}} type="search" placeholder="Search" className="me-2" aria-label="Search" />
                            <Button type='submit' variant="outline-success">Search</Button>
                        </Form>
                        &nbsp;
                        <Nav>
                            <NavDropdown title="User Name" id="basic-nav-dropdown">
                                <Link href="/favourites" passHref legacyBehavior>
                                    <Nav.Link>
                                        <NavDropdown.Item active={router.pathname === "/favourites"} onClick={() => setIsExpanded(false)} href="#action/3.1">
                                            Favourites
                                        </NavDropdown.Item>
                                    </Nav.Link>
                                </Link>
                                <Link href="/history" passHref legacyBehavior>
                                    <Nav.Link>
                                        <NavDropdown.Item active={router.pathname === "/history"} onClick={() => setIsExpanded(false)} href="#action/3.2">
                                            Search History
                                        </NavDropdown.Item>
                                    </Nav.Link>
                                </Link>
                            </NavDropdown>
                        </Nav>                   
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br /><br /><br /> 
        </div>
    );
}