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
              backgroundColor: COLOR.BACKGROUND,
              borderWidth: 1
            }}
            onBlur={onBlur}
            onChangeText={(text) => {
              onChange(text);
              onSubmit!();
            }}
            placeholder="Wyszukaj lekarza"
            value={value}
            // onSubmitEditing={onSubmit}
            onClearIconPress={() => (value = '')}
          />
        )}
      />
    </View>
  );
};

export default SearchingContact;
