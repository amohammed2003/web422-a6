import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"

export default function AdvancedSearch() {
  const router = useRouter()
  //This form is using React-Hook-Form to register the values and handle the form. formState is used so that it gives access to the errors in the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  let queryString = ""

  //submitForm function to handle the queryString and pass to router
  const submitForm = (data) => {
    //Set up parameters accordingly from the received query "data"
    const { q, searchBy, geoLocation, medium, isHighlight, isOnView } = data

    //Append queryString with the query parameters if available
    queryString +=
      `${searchBy}=true` +
      (geoLocation ? `&geoLocation=${geoLocation}` : "") +
      (medium ? `&medium=${medium}` : "") +
      `&isOnView=${isOnView}` +
      `&isHighlight=${isHighlight}` +
      `&q=${q}`

    router.push(`/artwork?${queryString}`)
  }
  return (
    <>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Search Query</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="q"
                {...register("q", { required: true })}
                className={errors.q && "is-invalid"}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Label>Search By</Form.Label>
            <Form.Select
              name="searchBy"
              className="mb-3"
              {...register("searchBy")}
            >
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="geoLocation"
                {...register("geoLocation")}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (ie &quot;Europe&quot;,
                &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;,
                &quot;New York&quot;, etc.), with multiple values separated by
                the | operator
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="medium"
                {...register("medium")}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (ie: &quot;Ceramics&quot;,
                &quot;Furniture&quot;, &quot;Paintings&quot;,
                &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with
                multiple values separated by the | operator
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Highlighted"
              name="isHighlight"
              {...register("isHighlight")}
            />
            <Form.Check
              type="checkbox"
              label="Currently on View"
              name="isOnView"
              {...register("isOnView")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}