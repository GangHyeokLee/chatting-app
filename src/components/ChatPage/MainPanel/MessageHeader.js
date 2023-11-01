import React from 'react'
import { Accordion, Button, Card, Col, Container, Form, Image, InputGroup, Row, useAccordionButton } from "react-bootstrap"
import { FaLock } from "react-icons/fa"
import { MdFavorite } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'

function MessageHeader() {

  const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey, () => {});
  
    return (
      <Button
        type="button"
        style={{ border: 'none', background: 'none'}}
        onClick={decoratedOnClick}
        variant = 'link'
      >
        {children}
      </Button>
    );
  }

  return (
    <div style={{
      width: '100%',
      height: '170px',
      border: '.2rem solid #ececec',
      borderRadius: '4px',
      padding: '1rem',
      marginBottom: '1rem'
    }}>
      <Container>
        <Row>
          <Col><h2><FaLock /> ChatRoomName <MdFavorite /></h2></Col>
          <Col><InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"><AiOutlineSearch /></InputGroup.Text>
            <Form.Control
              placeholder="Search Messages"
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
          </InputGroup></Col>
        </Row>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p>
            <Image src="" />{" "} user name
          </p>
        </div>
        <Row>
          <Col>
            <Accordion>
              <Card>
                <Card.Header>
                  <CustomToggle  eventKey="0">Click me!</CustomToggle>
                </Card.Header>
                <Accordion.Collapse   eventKey="0">
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
          <Col>
          <Accordion>
              <Card>
                <Card.Header>
                  <CustomToggle variant = 'link' eventKey="0">Click me!</CustomToggle>
                </Card.Header>
                <Accordion.Collapse   eventKey="0">
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MessageHeader