import { Chip } from 'react-native-paper';

interface ErrorChipProps {
  errorMsg: string;
  onClose: () => void;
}

const ErrorChip = ({ errorMsg, onClose }: ErrorChipProps) => {
  return (
    <Chip
      style={{ marginVertical: 10, backgroundColor: '#FFDBDB', borderRadius: 50 }}
      selectedColor="#8E0000"
      closeIcon="close"
      onClose={onClose}
      onPress={onClose}>
      {errorMsg}
    </Chip>
  );
};

export default ErrorChip;
