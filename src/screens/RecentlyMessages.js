import {
    AddIcon,
    Box,
    Button, ButtonGroup, ButtonIcon,
    ButtonText,
    Center, createIcon,
    Heading,
    HStack,
    Input,
    InputField,
    ScrollView,
    VStack,
    View, Text, InputIcon, InputSlot, SearchIcon, MessageCircleIcon, Icon, Divider
} from "@gluestack-ui/themed";
import {Screen} from "react-native-screens";


const DoctorMessage = () => {
    return(
        <Box w='100%' >
        <HStack style={{justifyContent:'space-between',width:'100%'}}>
            <VStack>
                <Text>Lek. Jan Kowalski</Text>
                <Text>Ginekolog i Położnictwo</Text>



            </VStack>
            <Button variant={'link'} size='xl' >
                <ButtonIcon as={MessageCircleIcon} w='$10' h='$10'/>
            </Button>

        </HStack>
            <Divider my="$1" bg='black'/>
        </Box>

    )
}


const RecentlyMessagesScreen = () => {
    return (
        <View style={{flex:1,backgroundColor:'white'}}>
        <View style={{width:'90%',alignSelf:'center',backgroundColor:'white'}}>
            <Input
            variant="underlined"
            borderColor="black"

            >
                <InputSlot>
                    <InputIcon as={SearchIcon} color={'black'} />
                </InputSlot>

                <InputField pl="$3" placeholder="Wyszukaj lekarza" />


            </Input>
        <ScrollView>
            <VStack space={4} alignItems="center" justifyContent="center">
                <DoctorMessage/>
                <DoctorMessage/>
                <DoctorMessage/>
                <DoctorMessage/>
                <DoctorMessage/>
            </VStack>



        </ScrollView>
        </View>
        </View>
    )
}

export default RecentlyMessagesScreen