import React, { useRef, useState } from 'react'
import { Col, Form, ProgressBar, Row } from "react-bootstrap"
import firebase from './../../../firebase';
import { useSelector } from "react-redux";
// import { mime } from 'mime-types';

function MessageForm() {
  const chatRoom = useSelector(state => state.chatRoom.currentChatRoom);
  const user = useSelector(state => state.user.currentUser);

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const messagesRef = firebase.database().ref("messages");
  const inputOpenImageRef = useRef();
  const storageRef = firebase.storage().ref();


  const handleChange = (event) => {
    setContent(event.target.value)
  }

  const createMessage = (fileURL = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        image: user.photoURL
      }
    }

    if (fileURL !== null) {
      message['image'] = fileURL;
    } else {
      message['content'] = content;
    }


    return message;
  }

  const handleSubmit = async () => {
    if (!content) {
      setErrors(prev => prev.concat('Type contents first'));
      return;
    }
    setLoading(true);

    //firebase에 메시지를 저장하는 부분
    try {
      await messagesRef.child(chatRoom.id).push().set(createMessage());
      setLoading(false);
      setContent('');
      setErrors([])
    } catch (error) {
      setErrors(pre => pre.concat(error.message));
      setLoading(false);
      setTimeout(() => {
        setErrors([])
      }, 5000);
    }
  }

  const handleImageOpenRef = () => {
    inputOpenImageRef.current.click();
  }

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const filePath = `/message/public/${file.name}`;

    console.log(file);
    // const metadata = { contentType: mime.lookup(file.name) }
    const metadata = { contentType: file.type }

    try {
      // 파일을 먼저 스토리지에 저장
      let uploadTask = storageRef.child(filePath).put(file, metadata);

      // 파일 저장되는 퍼센티지 구하기
      uploadTask.on("state_changed", UploadTaskSnapshot => {
        const percentage = Math.round(
          (UploadTaskSnapshot.bytesTransferred / UploadTaskSnapshot.totalBytes) * 100
        )

        setPercentage(percentage);
      })
    } catch (error) {
      alert(error);
    }
  }


  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows={3} value={content} onChange={handleChange} />
        </Form.Group>
      </Form>

      {
        !(percentage === 0 || percentage === 100) &&
        <ProgressBar variant='warning' label={`${percentage}%`} now={percentage} />
      }

      <div>
        {errors.map(errorMsg => <p style={{ color: 'red' }} ket={errorMsg}>
          {errorMsg}
        </p>)}
      </div>

      <Row>
        <Col>
          <button
            className="message-form-button"
            style={{ width: '100%' }}
            onClick={handleSubmit}
          >
            SEND
          </button>
        </Col>
        <Col>
          <button
            onClick={handleImageOpenRef}
            className="message-form-button"
            style={{ width: '100%' }}
          >
            UPLOAD
          </button>
        </Col>
      </Row>

      <input type='file' style={{ display: 'none' }} ref={inputOpenImageRef} onChange={handleUploadImage} />


    </div>
  )
}

export default MessageForm