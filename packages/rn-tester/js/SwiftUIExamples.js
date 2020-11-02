import React from 'react';
import { View, Text, TextInput, StyleSheet, Switch } from 'react-native';

import { Button, Shadow, Mask, Rect, Circle, ScrollView, Image } from 'react-native-swiftui';

const colors = ['black', 'blue', 'orange', 'green', 'pink', 'yellow', 'purple', 'red', 'transparent'];

class SwiftUIExamples extends React.PureComponent {
  scrollRef = React.createRef()

  state = {
    colorIndex: 0,
    isButtonPressed: false,
    textInputValue: '',
    switchValue: false,
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const colorIndex = (this.state.colorIndex + 1) % colors.length;
      this.setState({ colorIndex });
    }, 500);
  }

  componentWillUnmount() {
    this.interval = clearInterval(this.interval);
  }

  onPress = () => {
    this.setState({ isButtonPressed: false });
    alert('Button has been pressed');
  }

  onRandomScroll = () => {
    const scrollX = Math.round(Math.random() * 500);
    const scrollY = Math.round(Math.random() * 1000);
    this.scrollRef.current.scrollTo({ x: scrollX, y: scrollY, animated: true });
  }

  onActiveStateChange = ({ nativeEvent }) => {
    this.setState({ isButtonPressed: nativeEvent.state });
  }

  onTextChange = ({ nativeEvent }) => {
    this.setState({ textInputValue: nativeEvent.text.toUpperCase() });
    console.log('text changed', nativeEvent.text);
  }

  onSwitchChange = ({ nativeEvent }) => {
    this.setState({ switchValue: nativeEvent.value });
    alert(`Switch value changed to ${nativeEvent.value}`);
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 44, backgroundColor: 'white' }} axes="both" showsIndicators={true} ref={this.scrollRef}>
        <View style={{ marginVertical: 20, flexDirection: 'row' }}>
          <View
            style={{
              width: 200,
              marginLeft: 10,
              paddingHorizontal: 5,
              paddingVertical: 15,
              borderWidth: 5,
              borderColor: 'royalblue',
              borderLeftWidth: 3,
              borderRightWidth: 1,
              backgroundColor: '#fa5637',
            }}>
            <Text>View with specified width, margins, border and background</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 120,
              height: 30,
              backgroundColor: colors[this.state.colorIndex],
              borderWidth: 3,
              borderColor: 'peachpuff',
              marginLeft: 30,
            }}>
            <Text>State change</Text>
          </View>
        </View>

        <View style={{ marginVertical: 20, flexDirection: 'row', alignItems: 'flex-start' }}>
          <View style={{ width: 50, height: 50, backgroundColor: 'yellow', textAlign: 'center' }}>
            <Text style={{ color: 'black' }}>50x50</Text>
          </View>
          <Text style={{ width: 70, backgroundColor: 'orange', color: 'white' }} numberOfLines={6}>
            (up to 6 lines, width 70) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <View style={{ width: 32, height: 15, backgroundColor: 'yellow', textAlign: 'center' }}>
            <Text style={{ color: 'black', fontSize: 10 }}>32x15</Text>
          </View>
          <Text style={{ flex: 1, backgroundColor: 'green', color: 'white' }} numberOfLines={2}>
            (up to 2 lines, flex width) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <View style={{ width: 60, height: 70, backgroundColor: 'yellow', textAlign: 'center' }}>
            <Text style={{ color: 'black' }}>60x70</Text>
          </View>
        </View>

        <View style={{ marginVertical: 20 }}>
          <View style={{ marginBottom: 5, alignSelf: 'center' }}>
            <Text style={{ color: 'black' }}>Text's ellipsizeMode: head, middle, tail</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Text style={{ width: 100, fontSize: 13, backgroundColor: 'darkslategrey' }} numberOfLines={1} ellipsizeMode="head">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            <Text style={{ width: 100, fontSize: 13, backgroundColor: 'maroon' }} numberOfLines={1} ellipsizeMode="middle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            <Text style={{ width: 100, fontSize: 13, backgroundColor: 'midnightblue' }} numberOfLines={1} ellipsizeMode="tail">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </View>
        </View>

        <View style={{ margin: 20, flexDirection: 'row', alignItems: 'center' }}>
          <Button onPress={this.onPress} onActiveStateChange={this.onActiveStateChange}>
            <Text style={{
              margin: 10,
              color: this.state.isButtonPressed ? 'gray' : 'black',
              fontSize: 18,
            }}>
              Press me!
            </Text>
          </Button>
          <Button onPress={this.onRandomScroll}>
            <Text style={{ margin: 10, color: 'blue', fontSize: 18 }}>
              Scroll to random
            </Text>
          </Button>
          <Switch
            style={{ margin: 10 }}
            trackColor={{ false: 'red' }}
            value={this.state.switchValue}
            onChange={this.onSwitchChange} />
        </View>

        <TextInput
          style={{ minWidth: 150, padding: 10, marginHorizontal: 10, marginVertical: 5, color: 'royalblue', borderWidth: 1, borderColor: 'lightgray' }}
          placeholder="Uncontrolled TextInput"
          onChange={this.onTextChange}
          onFocus={() => console.log('focus')}
          onBlur={() => console.log('blur')}
          onEndEditing={() => console.log('end editing')} />

        <TextInput
          style={{ minWidth: 150, padding: 10, marginHorizontal: 10, marginVertical: 5, color: 'royalblue', borderWidth: 1, borderColor: 'lightgray' }}
          placeholder="Controlled TextInput"
          value={this.state.textInputValue} />

        <View style={{ marginVertical: 20, flexDirection: 'row' }}>
          <Shadow radius={20} offsetX={-10} offsetY={50}>
            <View style={{ margin: 10, width: 100, height: 50, backgroundColor: 'magenta' }}>
              <Text numberOfLines={3}>Rectangle with shadow</Text>
            </View>
          </Shadow>

          <View style={{ width: 100, height: 100, borderWidth: 1, borderColor: 'lightgray' }}>
            <Rect
              fill="pink"
              width={50}
              height={60}
              stroke="black"
              strokeWidth={4}
              strokeDashes={[3, 8]}
              strokeLineCap="round"
              offsetX={5}
              offsetY={5}
              alignment="topLeft">
              <Shadow radius={5} opacity={0.5} offsetX={5} style={StyleSheet.absoluteFill}>
                <Circle fill="#7c238c" radius={10} />
              </Shadow>
            </Rect>
            <Circle
              fill="cyan"
              stroke="black"
              strokeWidth={2}
              strokeDashes={[12, 5]}
              strokeDashPhase={-30}
              radius={25}
              offsetX={-5}
              offsetY={-5}
              alignment="bottomRight">
              <Circle radius={18} fill="white" stroke="red" strokeDashes={[1, 8]}>
                <Circle radius={8} fill="orange" stroke="green" />
              </Circle>
            </Circle>
          </View>

          <Shadow radius={2} offsetX={20} offsetY={20} style={{ marginLeft: 10 }}>
            <Mask
              shape={
                <Circle radius={20} alignment="left">
                  <Circle radius={34} alignment="right" offsetX={50} />
                </Circle>
              }>
              <View style={{ height: 50, justifyContent: 'center', backgroundColor: 'black', borderWidth: 2, borderColor: 'red' }}>
                <Text style={{ fontSize: 9 }}>View masked by circles</Text>
              </View>
            </Mask>
          </Shadow>
        </View>

        <View style={{ marginVertical: 20, justifyContent: 'center', flexDirection: 'row' }}>
          <Image
            style={{ width: 156, height: 104 }}
            source={{ uri: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBKHUZJ.img?h=104&w=199&m=6&q=60&u=t&o=f&l=f&x=1700&y=1854' }} />
          <Image
            style={{ width: 120, height: 120 }}
            source={require('./assets/bunny.png')} />
        </View>

        {colors.map(color => <View key={color} style={{ height: 150, backgroundColor: color }} />)}
      </ScrollView>
    );
  }
}

export default SwiftUIExamples;
