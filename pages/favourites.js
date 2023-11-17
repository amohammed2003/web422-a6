import { useAtom } from "jotai"
import { favouritesAtom } from "@/store"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import ArtworkCard from "@/components/ArtworkCard"

export default function Favourite() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom) // Getting a reference to the favouriteList from favouritesAtom

  return (
    <>
      <Row className="gy-4">
        {favouritesList.length > 0 ? (
          favouritesList.map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <Card.Text as="div">
                <h4>Nothing Here</h4>
                Try adding some new artwork to the list.{" "}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Row>

      {favouritesList.length > 0 && (
        <Row>
          <Col> </Col>
        </Row>
      )}
    </>
  )
}