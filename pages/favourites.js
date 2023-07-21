import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() {
    const [ favourites, setFavourites ] = useAtom(favouritesAtom);
    let [ artworkList, setArtworkList ] = useState([]);
      
    useEffect(() => {
            setArtworkList(favourites);
    }, []);

    return (
        <>
            {artworkList.length > 0 ? (
            <>
                <Row className="gy-4">
                    {artworkList.map((currentObjectID) => (
                        <Col lg={3} key={currentObjectID}>
                            <ArtworkCard objectID={currentObjectID} />
                        </Col>
                    ))}
                </Row>
            </>
            ) : (
                <Card>
                    <Card.Body>
                        <h4>Nothing Here</h4>
                        <p>Try adding some favourites.</p>
                    </Card.Body>
                </Card>
            )}
        </>
    );
}