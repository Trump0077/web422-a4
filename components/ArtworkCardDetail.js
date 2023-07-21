import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(
        objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` 
            : null
    );
    const [ favourites, setFavourites ] = useAtom(favouritesAtom);
    const [ showAdded, setShowAdded ] = useState(favourites.includes(objectID) ? true : false);
    const favouritesClicked = () => {
        if (showAdded) {
            setFavourites(favourites => favourites.filter(fav => fav != objectID));
            setShowAdded(false);
        } else {
            setFavourites(favourites => [...favourites, objectID]);
            setShowAdded(true);
        }
    }


    if (error) {
        console.error('Error fetching artwork:', error);
        return <Card.Text>Error fetching artwork details.</Card.Text>;
    } else {
        if (!data || data.length === 0) {
        return null;
        } else {
        return (
            <Card className="hero-card">
            {data.primaryImageSmall && (
                <Card.Img variant="top" src={data.primaryImage} />
            )}
                <Card.Body>
                    {data.title ? (
                    <Card.Title className="card-title">{data.title}</Card.Title>
                    ) : (
                    <Card.Title>N/A</Card.Title>
                    )}
                    <Card.Text>
                        {data.objectDate ? (
                            <p className="card-date">{data.objectDate}</p>
                        ) : (
                            <p>N/A</p>
                        )}
                        {data.classification ? <p>{data.classification}</p> : <p>N/A</p>}
                        {data.medium ? <p>{data.medium}</p> : <p>N/A</p>} <br /><br />
                        {data.artistDisplayName ? (
                            <span>
                            <p>{data.artistDisplayName}</p>
                            <p>
                                <a
                                href={data.artistWikidata_URL}
                                target="_blank"
                                rel="noreferrer"
                                >
                                wiki
                                </a>
                            </p>
                            </span>
                        ) : (
                            <p>N/A</p>
                        )}
                        {data.creditLine ? <p>{data.creditLine}</p> : <p>N/A</p>}
                        {data.dimensions ? <p>{data.dimensions}</p> : <p>N/A</p>}
                        {showAdded ? <Button onClick={favouritesClicked} variant='primary'>+ Favourite (added)</Button> 
                            : <Button onClick={favouritesClicked} variant='outline-primary'>+ Favourite</Button>}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
        }
    }
}
