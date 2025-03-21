---
highlight: a11y-dark
---
# react-native 导航器

### 1. 安装依赖
```json
npm install @react-navigation/native
npm install react-native-gesture-handler 
npm install react-native-reanimated 
npm install react-native-screens 
npm install react-native-safe-area-context 
npm install @react-native-community/masked-view

// yarn 则使用 yarn add
```
> React Native 0.60及更高版本，链接是自动的。因此，不需要运行 **react-native link**

> 如果在Mac上并为iOS开发，您需要安装Pad（通过Cocoapods）以完成链接
```js
npx pod-install ios
```

> 在 App.js 或者 index.js 拷贝进以下代码

```js
import 'react-native-gesture-handler';
```

### 2. 创建一个堆栈导航器（Stack Navigation）

#### 2.1 安装堆栈导航依赖
```js
npm install @react-navigation/stack
```

#### 2.2 navigation 可用 API
在所有的页面组件中都可以获取到navigation属性（只要组件被定义为路由配置和使用React Navigation来渲染路由）。
```js
// const {route, navigation} = this.props; // class写法
// 可用api
navigation.navigate("RouteName") // 如果新路由不在堆栈中，则将其推到堆栈导航器，否则将跳转到这个页面。
navigation.push("RouteName") // 跳转去相关路由页面 可以多次跳转到相同路由页面
navigation.goBack() // 返回上一个页面
navigation.popToTop() // 回到堆栈的第一个屏幕页面
navigation.popToTop() // 回到堆栈的第一个屏幕页面
navigation.popToTop() // 回到堆栈的第一个屏幕页面

```

#### 2.3 Example 

```js
// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function LoginScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen</Text>
      <Button title="User Login" onPress={() => navigation.navigate("Home")}></Button>
    </View>
  );
}
function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Home Page" onPress={() => navigation.navigate("Login")}></Button>
    </View>
  );
}

const Stack = createStackNavigator();
// 想隐藏第一个标题的头部导航 
// <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        // options={({ route }) => ({ title: route.params.name })} // 头部导航可以根据路由参数动态修改
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```
---
每次调用推送时，我们都会向导航堆栈添加新路由。当您调用导航时，它首先尝试查找具有该名称的现有路由，并且只有在堆栈上还没有新路由时，才会推送新路由。

这样就完成了一个堆栈导航了，可以完成登录注册这种类似页面的切换了。

#### 2.4 导航器（路由）传参
##### 2.4.1  嵌套在导航内的参数
将路由上需要的参数放在一个对象里，作为 `navigation.navigate` 函数的第二个参数：`navigation.navigate('RouteName', {key: value})` ，在组件中获取这个参数：route.params。
```js
navigation.navigate('Home', {
  screen: 'Settings',
  params: { user: 'Tom' },
});
```

##### 2.4.2 更新参数
页面上也可以更新参数，类似更新页面状态。`navigation.setParams`就可以用来更新页面参数

你也可以向页面传递一些初始参数。如果导航到页面并没有设置任何参数，这个初始参数将会被使用。它们会与传递的参数进行浅合并。初始参数被指定为initialParams 属性:

```js
<Stack.Screen
  name="Login"
  component={Login}
  initialParams={{ userId: 42 }}
/>
```

##### 2.4.3 传递参数到之前的页面
不仅仅能传递参数到新的页面，也能传递参数到之前的页面。

想做到这个，你可以使用`navigate`的方法，如果页面存在的话，可以使用像 `goBack` 这样的方法。你可以通过`navigate`携带参数将参数传回去：

```js
// Some.js
import React, { useState, Component } from "react";
import { Text, View } from "react-native";

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View>
       <Text>{this.props.route.params.type ? this.props.route.params.type : "has null"}</Text>
      </View>
    )
  }
}
export default App;
```
```js
// Home.js
import * as React from 'react';
import { View, TextInput, Button } from 'react-native';
function goLogin(navigation, postText) {
  navigation.push("Login", {type: postText}) // 把输入框的值传递给 Login 页面
}
function Some({navigation, route}) {
  let {text} = route.params;
  let [postText, setPostText] = React.useState(text);
  return (
    <View>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'gray' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Go to Login"
        onPress={() => goLogin(navigation, postText)}
      />
    </View>
  );
}
export default Some;
```
#### 2.5 配置header bar
自定义 `header` 样式有3个关键属性：`headerStyle`, `headerTintColor` ,和 `headerTitleStyle`。
```js
function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'My home',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
```

#### 2.6 Header  Button
给 header 右侧添加一个操作按钮--常见功能
```js
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{headerShown: false}}  name="Login"  component={Login} />
        <Stack.Screen name="Some" component={Some} 
          options={{
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="add"
                color="#999"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### 3. 嵌套导航（Tabs）
#### 3.1 安装依赖
```js
npm install @react-navigation/bottom-tabs
```
##### 3.2 Example
```js
// Some.js // 将之前的 Some.js 替换为以下代码
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { View, Button, Text } from 'react-native';

const Tab = createBottomTabNavigator(); // 

function HomePage() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>HomePage</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.push('Login')}
      />
    </View>
  );
}

function Geo({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Geo</Text>
    </View>
  );
}
function Mine({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Mine</Text>
    </View>
  );
}
function Some({navigation, route}) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomePage" component={HomePage} />
      <Tab.Screen name="Geo" component={Geo} />
      <Tab.Screen name="Mine" component={Mine} />
    </Tab.Navigator>
  );
}
export default Some;
```


