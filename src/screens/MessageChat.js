import {Text} from "react-native";


const MessageChat=({route, navigation})=>{
    const {name,otherParam}=route.params;
    return(
        <Text>
            Imię: {name}
        </Text>
    )
}
export default MessageChat;