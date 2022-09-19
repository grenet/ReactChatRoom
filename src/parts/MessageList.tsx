import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, query, orderBy } from 'firebase/firestore'

import { db } from '../firebase'
import Message from '../parts/Message'

const MessageList = () => {
  const messageRef = collection(db, 'chatrooms', 'room1', 'messages')
  const [value] = useCollection(query(messageRef, orderBy('timestamp', 'asc')))

  return (
    <>
      {value?.docs.map((doc) => (
        <Message
          key={doc.id}
          userName={doc.data().userName}
          icon={doc.data().icon}
          text={doc.data().text}
        />
      ))}
    </>
  )
}

export default MessageList
