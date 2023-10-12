import {Text, View} from "react-native";
import {Input, InputField} from "@gluestack-ui/themed";

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Input
                style={{width:'30%'}}
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
            >
                <InputField placeholder="Enter Text here" />
            </Input>
        </View>
    );
}
export default HomeScreen;