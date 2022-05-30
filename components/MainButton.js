import { TouchableOpacity, Text } from 'react-native';

function MainButton({ buttonColor, textColor, text, onPress, width }) {
    return (
        <TouchableOpacity onPress={onPress} style={[{
            width: "95%",
            height: 45,
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
