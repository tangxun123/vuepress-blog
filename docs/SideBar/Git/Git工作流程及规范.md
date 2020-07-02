# Git工作流程及规范


## 基本使用流程
`新建分支->切换本地分支->进行开发->提交到feature->合并到develop->进行测试->合并到master`


## 分支概念
分支是git中最重要的概念，分支可以理解为工作区，每个分支各自独立，在一个分支上修改代码时不会影响其他分支，在分支上我们可以做修改，提交，回退，合并等操作。
当我们要做某项工作时我们需要基于develop创建新分支，当工作完成时我们需要提交合并申请将修改提交到develop再由负责人合并到master分支。
举个例子：
假设你准备开发一个新功能，但是需要两周才能完成，第一周你写了50%的代码，如果立刻提交，由于代码还没写完，不完整的代码库会导致别人不能干活了。如果等代码全部写完再一次提交，又存在丢失每天进度的巨大风险。
现在有了分支，就不用怕了。你创建了一个属于你自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活，想提交就提交，直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。


## 分支管理
`分支主要分为master、develop、feature、hotfix`
1. feature分支为功能分支，当我们需要开发新功能时我们要基于develop创建自己的feature分支，格式为feature/xxxx（功能描述）。
使用完毕后需要删除掉此分支。
2. develop分支为开发分支，当我们在feature分支开发完毕后要将代码提交到develop分支，develop的代码将发布到测试环境供测试人员测试。
3. master分支为项目的主分支，当develop分支的代码测试完成后会提交到master分支，master分支的代码为稳定版本供项目上线使用。
4. hotfix分支为补丁分支，当master上的代码出现bug时我们将基于master创建hotfix分支来修改紧急的bug，hotfix分支的格式为hotfix/xxxx(功能描述)，使用完毕后需要删除掉此分支。


## Git常用指令
1. `add` 将文件添加/移除暂存区

**add 前一定要`git diff .`检查一下自己的修改**
```js
// 添加
git add 文件路径
git add .  // 代表将全部修改加入暂存区；

// 移除
git checkout 文件路径
git checkout . // 代表将修改全部移除暂存区；
```

2. `commit` 将暂存区的文件修改记做一次提交并保存在本地分支
```js
git commit -m 'xxx'  // 保存一次提交
git log -n第几次提交 -p // 查看指定提交的具体提交内容；
git log -n第几次提交 --stat // 查看指定提交的提交内容列表

```

3. `pull` 拉取远程分支的代码
```js
git pull origin xxx  // 拉取指定远程分支代码，(git pull)不指定具体分支时拉取本地分支对应的远程分支
```
> 如果是多人协作开发，拉取代码的时候可能会产生冲突，这时需要解决冲突 再次提交解决冲突后的最新代码，`即以下操作`
```js
git add . 
git commit -m '解决冲突'
git push origin xxx // 将当前本地分支的修改推送到远程分支
```

4. `push` 推送本地分支修改至远程分支
```js
git push origin xxx // 将当前本地分支的修改推送到远程分支
git push -f // 为强制提交 如果本地分支落后于远程分支使用 git push -f 会覆盖掉远程分支的提交。慎用!
```

5. `checkout` 切换分支及创建新分支
```js
git checkout '分支名'  // 切换分支；
git checkout -b '分支名' origin/远程分支名 // 创建分支并关联远程分支；
git checkout . // 将修改移除暂存区
```
> 想要切换分支，vscode编辑器同样可以操作-----左下角源代码管理，点击可以切换分支及创建新分支

6. `reset` 回退版本 及 回退已经加入暂存区的文件

如果你想回到上一次commit的版本可以`git reset --hard`，
如果想要回到指定版本可以`git reset --hard "版本哈希值"`，
在回退版本时加 -- hard是将代码完全恢复到指定的版本，也就是说当前的修改将消失，如果不加-- hard的话你的修改也会被带到恢复的版本。

7. `branch` 列出分支/创建分支/删除分支
```js
git branch  // 列出本地所有分支,当前分支会被星号标示出。
git branch -v //可以看见每一个分支的最后一次提交。
git branch '分支名'  // 创建一个新的分支(当你用这种方式创建分支的时候,分支是基于你的上一次提交建立的)。
git branch -d '分支名' // 删除一个分支
git branch -D '分支名' // 强制删除一个分支

```

8. `log` 查看一个分支的历史提交记录
```js
git log --oneline --number  //每条log只显示一行,显示number条.
git log --oneline --graph  // 可以图形化地表示出分支合并历史.
git log '分支名'  // 可以显示特定分支的log.
git log --oneline branch1 ^branch2  // 可以查看在分支1,却不在分支2中的提交.^表示排除这个分支(Window下可能要给^branch2加上引号).
git log --decorate  //会显示出tag信息.
git log --author=[author name]  // 可以指定作者的提交历史.
git log --since --before --until --after  // 根据提交时间筛选log
```