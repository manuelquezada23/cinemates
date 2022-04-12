import { View, Button, StyleSheet, Alert } from 'react-native';

function MainButton({ buttonColor, textColor, text, onPress }) {
    return (
        <View style={[{
            width: "95%",
            margin: 10,
            height: 48,
            backgroundColor: buttonColor,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#F2F2F2",
            borderWidth: 1
        }]}>
            <Button
                onPress={onPress}
                title={text}
                color={textColor}
            />
        </View>
    );
}

export default MainButton;
