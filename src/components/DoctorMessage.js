import {Avatar, Box, Button, ButtonIcon, Divider, HStack, MessageCircleIcon, Text, VStack} from "@gluestack-ui/themed";

const DoctorMessage = ({navigation}) => {
    return(
        <Box w='100%' >

            <HStack style={{justifyContent:'space-between',width:'100%',alignItems:'center',paddingTop:'2%'}}>
                <HStack>
                    <Avatar size='md' source={{uri:'https://www.w3schools.com/howto/img_avatar.png'}} style={{marginRight:'2%'}}/>
                    <VStack>
                        <Text>Lek. Jan Kowalski</Text>
                        <Text>Ginekolog i Położnictwo</Text>



                    </VStack>
                </HStack>
                <Button variant={'link'} size='xl'
                        onPress={()=> {navigation.navigate('MessageChat',{name:'Lek. Jan Kowalski'})}}
                >
                    <ButtonIcon as={MessageCircleIcon} w='$10' h='$10'

                    />
                </Button>

            </HStack>
            <Divider my="$1" bg='black'/>
        </Box>

    )
}
export default DoctorMessage;