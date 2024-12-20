import { Control, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { COLOR } from '~/styles/constants';

interface CustomTextInputProps {
  name: string;
  control: Control<any>;
  error?: string;
  onSubmit?: () => void;
}

const SearchingContact = ({ control, name, onSubmit }: CustomTextInputProps) => {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: false,
            message: 'Te pole jest wymagane'
          }
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <Searchbar
            style={{
              marginRight: 10,
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              borderColor: COLOR.PRIMARY,
              backgroundColor: COLOR.BACKGROUND,
              borderWidth: 3
            }}
            onBlur={onBlur}
            onChangeText={(text) => {
              onChange(text);
              onSubmit!();
            }}
            placeholderTextColor={COLOR.LIGHT_GREY}
            placeholder="Wyszukaj użytkownika"
            value={value}
            inputStyle={{
              color: COLOR.BLACK
            }}
            // onSubmitEditing={onSubmit}
            onClearIconPress={() => (value = '')}
          />
        )}
      />
    </View>
  );
};

export default SearchingContact;
