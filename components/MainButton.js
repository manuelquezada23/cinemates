import { TouchableOpacity, Text } from 'react-native';

function MainButton({ buttonColor, textColor, text, onPress, disabled }) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={[{
            width: "90%",
            height: 40,
            backgroundColor: buttonColor,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            borderColor: textColor,
            borderWidth: 1,
        }]}>
            <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold" }}>{text}</Text>
        </TouchableOpacity>
    );
}

export default MainButton;
