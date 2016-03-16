export default `
st=>start: 该不该辞职呢？
e=>end: 不要再想了, 辞职吧! Good Luck!
hasFound=>condition: 找到新工作了吗
hasMoney=>condition: 你有没足够的资金维持自己下半生的生活
trueMoney=>condition: 你肯定
hasGanDei=>condition: 有没人养你下半生
trueGanDei=>condition: 信得过
enjoyJob=>condition: 真的想做
wouldRegret=>condition: 辞职了会后悔吗
later=>condition: 再做几个月看看
howAbout=>condition: 做得怎么样
whyHere=>operation: 为何又绕到这里呢
askWhyQuit=>operation: 老实说为什么要辞职
whyQuit=>operation: 人工不够高；做得不开心；纯粹想走；追梦想
continueQuit=>condition: 还要辞职吗
talkBoss=>operation: 跟老板谈一下
talkBossResult=>condition: 谈得怎么样
st->hasMoney
hasMoney(yes|有)->trueMoney
hasMoney(no|无)->hasGanDei
trueMoney(yes)->e
trueMoney(no)->hasFound
hasGanDei(yes)->trueGanDei
hasGanDei(no)->hasFound
trueGanDei(yes)->e
trueGanDei(no)->hasFound
hasFound(yes)->enjoyJob
hasFound(no)->askWhyQuit->whyQuit
enjoyJob(yes)->wouldRegret
enjoyJob(no)->e
wouldRegret(yes)->later
wouldRegret(no)->e
later(yes|好吧)->howAbout
later(no|决不)->e
howAbout(yes|还好)->whyHere->whyQuit
howAbout(no|不好)->continueQuit
whyQuit->talkBoss
talkBoss->talkBossResult
talkBossResult(yes|还好)->continueQuit
talkBossResult(no|不要提了)->hasFound
continueQuit(yes)->wouldRegret
continueQuit(no)->later
`

// declare var flowData:string;