import {createContext} from "react";

const FeedbackGroupIdContext = createContext<{groupId: number}>({groupId: 0})
export default FeedbackGroupIdContext
