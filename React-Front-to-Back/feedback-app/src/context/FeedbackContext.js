import {createContext, useState} from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
const [feedback, setFeedback] = useState([
    {
        id: 1,
        text: "This is feedback item 1",
        rating: 10
    }
])

// when edit is not happening, edit is set to false
const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
})

const addFeedback = (newFeedback) => {
    // generates new id from uuidv4
    newFeedback.id = uuidv4()
    // sets new feedback to an array of existing feedback
    setFeedback([newFeedback,...feedback])
}

const deleteFeedback = (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
        setFeedback(feedback.filter((item) => item.id !== id) )
    }
}

// Update feedback item
const updateFeedback = (id, updItem) => {
    setFeedback(
        feedback.map((item) => item.id === id ?  { ...item, ...updItem } : item )
    )
}

// when edit is happening, edit is true for that item
const editFeedback = (item) => {
    setFeedbackEdit ({
        item,
        edit: true
    })
}

    return <FeedbackContext.Provider value ={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext