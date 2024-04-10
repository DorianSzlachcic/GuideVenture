import {StyleSheet, View, Text, Image} from 'react-native';

export function RadioButton(props) {
  return (
    <View style={stylesheet.root}>
      <View style={stylesheet.body}>
        <Image source={{uri: "asset:images/check.png"}} style={{width: 24, height: 24}} resizeMode="cover"/>
        <Text style={stylesheet.answer}>
            {props.answer}
        </Text>
      </View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  root: {
    width: 302,
    height: 52,
  },
  body: {
    width: 302,
    height: 52,
    borderRadius: 5,
    backgroundColor: 'grey',
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  answer: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
  },
});
