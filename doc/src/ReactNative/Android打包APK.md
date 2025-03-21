---
highlight: a11y-dark
---
# React Native Android 打包APK

####  生产签名密匙

> 你可以用keytool命令生成一个私有密钥。 也可以终端执行。

```js
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```
这条命令会要求你输入密钥库`（keystore）`和对应密钥的密码，然后设置一些发行相关的信息。最后它会在`android/app`目录下生成一个叫做`my-release-key.keystore`的密钥库文件。

在运行上面这条语句之后，密钥库里应该已经生成了一个单独的密钥，有效期为 10000 天。--alias 参数后面的别名是你将来为应用签名时所需要用到的，所以记得记录这个别名。


####  设置 gradle 变量

1. 把`my-release-key.keystore`文件放到你工程中的`android/app`文件夹下（默认）。
2. 编辑`~/.gradle/gradle.properties`（全局配置，对所有项目有效）或是项目目录/android/gradle.properties（项目配置，只对所在项目有效）。如果没有`gradle.properties`文件你就自己创建一个，添加如下的代码（注意把其中的****替换为相应密匙的密码）
```js
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

#### 把签名配置加入到项目的 gradle 配置中

> 编辑你项目目录下的 `android/app/build.gradle`，添加如下的签名配置：

```js
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release // 打release包，而不是debug
        }
    }
}
...
```

#### 针对不同的 CPU 架构生成 APK 以减小 APK 文件的大小
1. 可以在 `android/app/build.gradle` 中修改如下代码（false 改为 true）来生成多个针对不同 CPU 架构的 APK。
```js
// def enableSeparateBuildPerCPUArchitecture = false
def enableSeparateBuildPerCPUArchitecture = true
```
```js
// universalApk false
universalApk true  // 额外生成一个适用不同CPU架构的通用APK
```
2.  `android/gradle.properties` 打开第13行注释，用于 调整内存设置 不至于内存溢出。
```js
org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```


#### 生成发行 APK 包
终端执行以下命令
```js
cd android // 进入 android 目录
./gradlew assembleRelease
```

> 在 macOS、Linux 或是 windows 的 PowerShell 环境中表示执行当前目录下的名为 gradlew 的脚本文件，且其运行参数为 assembleRelease，注意这个./不可省略；而在 windows 的传统 CMD 命令行下则需要去掉 `./`。


生成的 APK 文件位于`android/app/build/outputs/apk/release/app-release.apk`，它已经可以用来发布了。







[官方原文](https://reactnative.cn/docs/signed-apk-android)




