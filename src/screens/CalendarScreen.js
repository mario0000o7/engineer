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
    View
} from "@gluestack-ui/themed";
import {Calendar} from "react-native-calendars";
import {Text} from "react-native-paper";
import {Path, Rect} from "react-native-svg";
import {useState} from "react";
import {LocaleConfig} from "react-native-calendars/src/index";

const InfoIcon = createIcon({
    viewBox: "0 0 49 49",
    path:(
        <>
        <Rect width="49" height="49" />
        <Path d="M24.4795 44.9167C13.2064 44.9054 4.07575 35.7596 4.08326 24.4864C4.09077 13.2133 13.2336 4.07959 24.5067 4.08334C35.7799 4.0871 44.9166 13.2268 44.9166 24.5C44.9098 35.781 35.7605 44.9212 24.4795 44.9167ZM8.16659 24.8512C8.26319 33.837 15.6005 41.057 24.5868 41.0089C33.573 40.9604 40.8323 33.662 40.8323 24.6756C40.8323 15.6892 33.573 8.39079 24.5868 8.34225C15.6005 8.29418 8.26319 15.5141 8.16659 24.5V24.8512ZM26.5416 34.7083H22.4583V30.625H26.5416V34.7083ZM26.5416 26.5417H22.4583V14.2917H26.5416V26.5417Z" fill="#2E3A59"/>
        </>
)


})




const VisitComponent =()=>{
return(
    <VStack
        p="$5"
        alignItems="flex-start"
        borderColor="$backgroundLight300"
        borderWidth={5}


    >
        <Box w='100%' >
            <Heading mb="$1.5">Wizyta położnicza + USG ciąży do 11 tygodnia</Heading>
            <HStack w={'100%'} h={'auto'} justifyContent='space-between' alignItems='center'>
                <Text style={{fontSize:25,fontWeight:'bold',color:'black'}}>Godzina</Text>
                <ButtonGroup style={{alignItems:'center'}} >



                    <Button variant={'link'} size='xl' >

                        <ButtonIcon as={InfoIcon} w='$10' h='$10'/>
                    </Button>
                    <Button variant="solid" bg='red' size="3xl" action="primary" onPress={() => {console.log('Pressed')}}
                            sx={{
                                ":hover": {
                                    bg: "orange",
                                },
                                ":active": {
                                    bg: "orange",
                                },
                            }}
                    >

                        <ButtonText color="black">Odwołaj</ButtonText>
                    </Button>
                </ButtonGroup>
            </HStack>
            <HStack w={'100%'} h={'auto'} justifyContent='space-between' alignItems='center'>
                <Text style={{fontSize:25,fontWeight:'bold',color:'black'}}>12:45</Text>
                <HStack>
                    <Text style={{fontSize:25,fontWeight:'bold',color:'black'}}>12:45</Text>
                    <Text style={{fontSize:25,fontWeight:'bold',color:'black',paddingRight:'2%',paddingLeft:'2%'}}>-</Text>
                    <Text style={{fontSize:25,fontWeight:'bold',color:'black'}}>13:30</Text>
                </HStack>




            </HStack>

        </Box>

    </VStack>
    )

}
LocaleConfig.locales['pl'] = {
    monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec', 'Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
    monthNamesShort: ['Sty.','Lut.','Mar.','Kwi.','Maj','Cze.','Lip.','Sie.','Wrz.','Paź.','Lis.','Gru.'],
    dayNames: ['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'],
    dayNamesShort: ['Nie.','Pon.','Wt.','Śr.','Czw.','Pt.','Sob.'],
    today: 'Dzisiaj\''
}
LocaleConfig.defaultLocale = 'pl';

function CalendarScreen() {
    const [day, setDay] = useState('');
    return (
        <View style={{ justifyContent: 'center',width:'100%',height:'100%',backgroundColor:'white'}}>
            <Calendar style={{width:'100%',alignSelf:'center',maxWidth:'800px',height:'auto',borderColor:'grey'}}
                      onDayPress={(day) => {console.log('selected day', day);setDay(day.dateString)}}
                      current={new Date().toDateString()}
                      markedDates={{[day]:{selected: true, disableTouchEvent: true},
                          '2023-10-16': { marked: true,dotColor:'orange',disableTouchEvent: false,selected:day === '2023-10-16'}}}



            />
            <Text style={{alignSelf:'center',fontSize:40,fontWeight:'bold',color:'black',paddingTop:'2%',paddingBottom:'2%'}}>Wizyty</Text>
            <ScrollView style={{width:'100%',alignSelf:'center',maxWidth:'800px'}}>

            <VisitComponent/>
            <VisitComponent/>
            <VisitComponent/>
            <VisitComponent/>
            <VisitComponent/>
            <VisitComponent/>
            <VisitComponent/>
            <VisitComponent/>
            </ScrollView>


        </View>
    );
}
export default CalendarScreen;