import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function App() {
  const yellowX = useSharedValue(0);
  const yellowY = useSharedValue(0);
  const yellowContext = useSharedValue({ x: 0, y: 0 });

  const yellowPan = Gesture.Pan()
    .onStart(() => {
      yellowContext.value = { x: yellowX.value, y: yellowY.value };
    })
    .onUpdate((event) => {
      yellowX.value = event.translationX + yellowContext.value.x;
      yellowY.value = event.translationY + yellowContext.value.y;
    });

  const yellowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: yellowX.value }, { translateY: yellowY.value }],
    };
  });

  const pinkX = useSharedValue(0);
  const pinkY = useSharedValue(0);
  const pinkContext = useSharedValue({ x: 0, y: 0 });

  const pinkPan = Gesture.Pan()
    .onStart(() => {
      pinkContext.value = { x: pinkX.value, y: pinkY.value };
    })
    .onUpdate((event) => {
      pinkX.value = event.translationX + pinkContext.value.x;
      pinkY.value = event.translationY + pinkContext.value.y;
    });

  const pinkAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: pinkX.value }, { translateY: pinkY.value }],
    };
  });

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.headerContainer, styles.container]}>
          <Text style={styles.title}>Here is a React Native App</Text>
          <Text>Wow, good job!</Text>
          <Text>Thanks, I hate it.</Text>
        </View>
        <GestureHandlerRootView
          style={[styles.shapesContainer, styles.container]}
        >
          <Text style={styles.title}>This is the pan gesture area</Text>
          <Text>Grab these boys and move them about.</Text>
          <GestureDetector gesture={yellowPan}>
            <Animated.View style={[styles.yellowCircle, yellowAnimatedStyle]} />
          </GestureDetector>
          <GestureDetector gesture={pinkPan}>
            <Animated.View style={[styles.pinkSquare, pinkAnimatedStyle]} />
          </GestureDetector>
        </GestureHandlerRootView>
        <View style={[styles.instructionsContainer, styles.container]}>
          <Text style={styles.title}>Scroll up to see more</Text>
        </View>
        <View style={[styles.hiddenContainer, styles.container]}>
          <Text style={styles.title}>This needed to scroll into view</Text>
          <Text>You found it!</Text>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 10,
  },
  scrolling: {
    padding: 10,
  },
  container: {
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#f20091",
    margin: 5,
  },
  title: {
    color: "#f20091",
    fontWeight: "bold",
    fontSize: 18,
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    height: 80,
  },
  shapesContainer: {
    flex: 2,
    height: 400,
  },
  instructionsContainer: {
    flex: 3,
    justifyContent: "center",
    height: 255,
  },
  hiddenContainer: {
    flex: 4,
    justifyContent: "center",
    height: 400,
  },
  yellowCircle: {
    backgroundColor: "#edff0080",
    width: 100,
    height: 100,
    borderRadius: "50%",
  },
  pinkSquare: {
    backgroundColor: "#f2009180",
    width: 100,
    height: 100,
  },
});
