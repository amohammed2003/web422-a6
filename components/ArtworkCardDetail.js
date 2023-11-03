import useSWR from "swr"
import Error from "next/error"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
  )

  if (error) {
    return <Error statusCode={404} />
  } else if (!data) {
    return <Error statusCode={403} />
  } else {
    return (
      <Card>
        {data?.primaryImage && (
          <Card.Img variant="top" src={data.primaryImage} />
        )}
        <Card.Body>
          <Card.Title>{data.title || "N/A"}</Card.Title>
          <Card.Text>
            <>
              <strong>Date: </strong>
              {data.objectDate || "N/A"}
              <br />
              <strong>Classification: </strong>
              {data.classification || "N/A"}
              <br />
              <strong>Medium: </strong>
              {data.medium || "N/A"}
              <br />
              <br />
              <strong>Artist: </strong>
              {data.artistDisplayName ? (
                <>
                  {data.artistDisplayName} (
                  <a
                    href={data.artistWikidata_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    wiki
                  </a>
                  )
                </>
              ) : (
                "N/A"
              )}
              <br />
              <strong>Credit Line: </strong>
              {data.creditLine || "N/A"}
              <br />
              <strong>Dimensions: </strong>
              {data.dimensions || "N/A"}
            </>
          </Card.Text>
          <br />
          <Button onClick={() => history.back()}>Back</Button>
        </Card.Body>
      </Card>
    )
  }
}