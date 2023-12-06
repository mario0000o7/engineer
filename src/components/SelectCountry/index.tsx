import { Control, Controller } from 'react-hook-form';
import { Picker, View } from 'react-native-ui-lib';
import Country from '~/types/country';
import { COLOR } from '~/styles/constants';

interface CustomTextInputProps {
  name: string;
  control: Control<any>;
  error?: string;
}

const SelectCountry = ({ control, name, error }: CustomTextInputProps) => {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Te pole jest wymagane'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            color={COLOR.PRIMARY}
            showSearch={true}
            placeholder={'Kraj'}
            fieldStyle={{
              borderWidth: 5,
              borderColor: COLOR.PRIMARY,
              borderRadius: 50,
              paddingHorizontal: 10,
              paddingVertical: 10
            }}
            useSafeArea={true}
            validateOnChange={true}
            validationMessageStyle={{
              marginLeft: 10,
              display: error ? 'flex' : 'none'
            }}
            validationMessage={[error!]}
            text90={true}
            floatingPlaceholder={true}
            placeholderTextColor={COLOR.LIGHT_GREY}
            floatingPlaceholderColor={COLOR.PRIMARY}
            floatingPlaceholderStyle={{
              marginTop: value ? -17 : 0
            }}>
            {/*<Picker.Item label="Wybierz kraj" value="" />*/}
            {Country.map((item) => (
              <Picker.Item key={item.iso} label={item.country} value={item.iso} />
            ))}
          </Picker>
        )}
      />
    </View>
  );
};

export default SelectCountry;
