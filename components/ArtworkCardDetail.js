import useSWR from 'swr';
import Card from 'react-bootstrap/Card';

export default function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

    if (error) {
        return <Error statusCode={404} />;
    } else {
        if (!data || data.length === 0) {
            return null;
        }
        else {
            return (
                <Card className='hero-card'>
                    {data.primaryImageSmall && <Card.Img variant="top" src={data.primaryImage} />}
                    <Card.Body>
                        {data.title ? <Card.Title className='card-title'>{data.title}</Card.Title> : <Card.Title>N/A</Card.Title> }
                        <Card.Text>
                            {data.objectDate ? <p className='card-date'>{data.objectDate}</p> : <p>N/A</p> }
                            {data.classification ? <p>{data.classification}</p> : <p>N/A</p> }
                            {data.medium ? <p>{data.medium}</p> : <p>N/A</p> } <br /><br />
                            {data.artistDisplayName ? 
                            <span><p>{data.artistDisplayName}</p><p><a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a></p></span> 
                            : <p>N/A</p> }
                            {data.creditLine ? <p>{data.creditLine}</p> : <p>N/A</p> }
                            {data.dimensions ? <p>{data.dimensions}</p> : <p>N/A</p> }
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        }
    }
}