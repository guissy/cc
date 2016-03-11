

```flow
st=>start: 该不该辞职呢？
e=>end: 不要再想了辞职了
hasFound=>condition: 找到新工作了吗
hasMoney=>condition: 有没足够钱维持下半生
trueMoney=>condition: 你肯定
hasGanDei=>condition: 有没人养你下半生
trueGanDei=>condition: 信得过
enjoyJob=>condition: 真的想做
wouldRegret=>condition: 辞职了会后悔吗
later=>condition: 再做几个月看看
howAbout=>condition: 做得怎么样
goodJob=>operation: 还好
whyHere=>operation: 为何又绕到这里呢
askWhyQuit=>operation: 老实说为什么要辞职
whyQuit=>operation: 人工不够高；做得不开心；纯粹想走；追梦想
continueQuit=>condition: 还要辞职吗
talkBoss=>operation: 跟老板谈一下
talkBossResult=>condition: 谈得怎么样
st->hasMoney
hasMoney(yes)->trueMoney
hasMoney(no)->hasGanDei

trueMoney(yes)->e
trueMoney(no)->hasFound
hasGanDei(yes)->trueGenDei
hasGanDei(no)->hasFound
trueGanDei(yes)->e
trueGanDei(no)->hasFound
hasFound(yes)->enjoyJob
hasFound(no)->askWhyQuit->whyQuit
enjoyJob(yes)->wouldRegret
enjoyJob(no)->e
wouldRegret(yes)->later
wouldRegret(no)->e
later(yes)->howAbout
later(no)->e
howAbout(yes)->goodJob->whyHere->whyQuit
howAbout(no)->continueQuit

whyQuit->talkBoss
talkBoss->talkBossResult
talkBossResult(yse)->continueQuit
talkBossResult(no)->hasFound
continueQuit(yse)->wouldRegret
continueQuit(no)->later
```