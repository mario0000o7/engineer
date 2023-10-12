import {Input, InputField, InputIcon, InputSlot, ScrollView, SearchIcon, View, VStack} from "@gluestack-ui/themed";
import DoctorMessage from "./DoctorMessage";

const DoctorList = ({route,navigation}) => {
    console.log(route.params)

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
                        <DoctorMessage navigation={navigation} />




                    </VStack>



                </ScrollView>
            </View>
        </View>
    )
}
export default DoctorList;