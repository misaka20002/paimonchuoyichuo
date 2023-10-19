import plugin from '../../lib/plugins/plugin.js'
import { segment } from 'icqq'
import cfg from '../../lib/config/config.js'
import common from '../../lib/common/common.js'
import moment from 'moment'
const path = process.cwd()

let reply_text = 0.4 //文字触发概率
let reply_img = 0.2 //随机图片触发概率
let reply_voice = 0.2 //语音触发概率
let mutepick = 0.1 //禁言触发概率

//自定义文案
let word_list = ['你干嘛~',
    '再戳我要生气了！',
    '小纳也是有脾气的！',
    '有种被兰纳罗拿胡萝卜指着的感觉',
    '别戳小纳了，去戳主人吧',
    '就算你喜欢我也不能老戳我呀~',
    '你戳谁呢！你戳谁呢！！！',
    '不要再戳了！我真的要被你气死了！！！',
    '怎么会有你这么无聊的人啊！！！',
    '旅行者副本零掉落，旅行者深渊打不过，旅行者抽卡全保底，旅行者小保底必歪',
    '你、你不要这么用力嘛！戳疼我了呜呜呜~~~',
    '别戳了别戳了......',
    '麻麻要被揉坏了',
    '请，请轻一点，小纳会痛的......',
    '哎呦，你别戳了',
    '请不要不可以戳小纳啦~',
    '别戳了可以嘛',
    '要戳坏掉了>_<，呜呜呜',
    '你老是欺负我，哭哭惹',
    '别戳了啊！再戳就要坏掉了呀',
    '不可以，不可以，不可以！戳疼了！',
    '戳一次保底一次，嘻嘻',
    '痛QAQ...',
    '不要戳戳…',
    '诅咒你买方便面没有叉子！',
    '救命啊，有变态>_<！！！',
    '哼~~~',
    '食不食油饼？',
    '不要再戳了！我真的要被你气洗了！！！',
    '怎么会有你这么无聊的人啊！！！(￢_￢)',
    '你干嘛！',
    '你是不是喜欢我？',
    '变态萝莉控！',
    '要戳坏掉了>_<',
    '你没睡醒吗？一天天就知道戳我',
    '不可以戳戳>_<',
    '不要戳了，再戳就坏掉啦>_<',
    '连个可爱小萝莉都要戳的肥宅真恶心啊',
    '小朋友别戳了',
    '是不是要可爱的我，揍你一顿才开心，哼',
    '怎么会有你这么无聊的人啊˃◡˂',
    '讨厌死了，你好烦人啊，不陪你玩了',
    '不要再戳了！我真的要被你气洗了>_<',
    '你戳谁呢！你戳谁呢~哼',
    '不要再戳了！',
    '你只需看着别人精彩，老天对你另有安排',
    '不准戳',
    '你行不行啊细狗',
    '你要是在戳我！！我~我就打你，哼！',
    '可以不要戳了吗你好烦啊变态~变态',
    '讨厌死了',
    '本来很开心的，你为什么戳我鸭~变态',
    '哼~我才不是傲娇呢，那是什么不知道鸭',
    '我，我才不会这样子！真正的我从来不是傲娇！傲，傲娇什么 的，都，都是别人杜摆~嗯，一点，一点也没有呢',
    '我……我……才不是傲娇呢',
    '只是刚好路过而已，才不是因为你戳我特地来看你的呢！你可不要异想天开',
    '我可不是因为喜欢才这样做的哦',
    '总之你是个大笨蛋啦',
    '笨蛋，人家可不是特地来帮你们的呢',
    '全世界，我最讨厌你啦',
    '这~这种问题，我当然知道，我！我可不是要说给你听的， 我只是觉得_话太可怜了~对，所以给我认认真真的记住',
    '啊~好舒服鸭，其实我也不是很想要这个~如果你硬要给我，我就勉为其难的收下了',
    '群主大人快来鸭~有人欺负我',
    '只要你需要我就会在哦',
    '你这个变态，大变态，超级变态！不要在碰我了！',
    '好像因为太舒服昏过去了呢',
    '你怎么这样啊，这样欺负人不对的',
    '你在想涩涩对吗，不可以哦',
    '别戳了，别戳了，我爪巴',
    '别戳了，戳疼了',
    '别戳了再戳就坏掉了555',
    '你戳你戳毛线呢',
    '气死我了，气死我了，不要戳了！',
    '你~你~你要干什么啊',
    '唔嗯~戳疼了',
    '难道又有什么地方不舒服吗',
    '我在哦！是有什么事情吗？',
    '嗯呐~',
    '唔噫~',
    '在呢抱抱',
    '喵呜~喵呜',
    '唉？怎么了吗',
    '你会一直记得我吗',
    '抱我的小猫腿舔我的jio',
    '你这样就非常不可爱！',
    '你这种坏人，是会被狼吃掉的',
    '这事不应该是这样的阿~',
    '你这个人傻fufu的。',
    '你戳我有什么用？我有反弹技能',
    '你这个笨蛋蛋傻瓜瓜臭狗狗不要戳了了',
    '像你这种坏银，我才不稀罕哦。',
    '哼~有些笑容背后是紧咬牙关的灵魂。',
    '醒醒吧，别做梦了',
    '是不是把我当老婆了',
    '请问～～你睡了吗？',
    '这不是欺负人吗',
    '我不但可爱而且可爱你啦',
    '我发脾气了你就听着,结束了我会怂给你看',
    '劝你别整天对我戳戳戳的有本事你来亲亲我',
    '欢迎你走上爱我这条不归路。',
    '像我这种人，你除了宠着我也没有其他办法对吧',
    '我可爱吗，一直戳我',
    '宝宝是不是又熬夜了，我看你还在线',
    '笨蛋！哼！',
    '把我自己送给你好了虽然我很可爱但是我养不起了',
    '我偏偏要无理取闹除非抱抱我',
    '无事献殷勤，非…非常喜欢你~',
    '戳戳戳~希望你能有点自知之明，认识到超级无敌可爱的我',
    '要我给你暖被窝吗~哎嘿~想屁吃 ',
    '你再戳我~我就透你',
    '哎呀呀~喜欢我就直说嘛~',
    '别戳我了戳疼了',
    '我发脾气了~气死我了',
    '那里....不可以... ',
    '啊...温柔一点...把我戳疼辣..',
    '要戳坏掉了！',
    '你欺负人，呜呜',
    '你轻一点哦~',
    '我怕疼...轻一点~ ',
    '再戳就坏了！！！ ',
    '请...请...不要戳那里...',
    '要轻一点戳哦~',
    '快带我去玩！（打滚）',
    '哇，你这个人！',
    '是哪个笨蛋在戳我？',
    '干点正事吧！',
    '可恶！',
    '达咩！',
    '呜哇！',
    '你个坏蛋~',
    '不要这样啦！(摇头）',
    '呜哇！（惊醒）',
    '（阿巴阿巴）',
    '（眨眼）',
    '气气！',
    '过分分！',
    '走开啦！',
    '吃我一拳！',
    '讨厌！',
    '坏坏！',
    '哒咩，别戳了！',
    '呜哇！主人救命！',
    '你欺负我！',
    'QAQ呜哇啊啊啊啊啊！',
    'QAQ..这个人欺负我…',
    '呜呜，要变笨啦！',
    'rua~',
    '是不是要揍你一顿才开心啊！！！',
    '讨厌死了！',
    '小朋友别戳了',
    '不要再戳了！我真的要被你气死了！！！',
    '我真的要气洗掉了',
    '你干嘛老戳我啊qwq',
    '你再戳我就要闹了！哇啊啊啊！',
    '你这个人真是有奇怪的癖好呢~',
    '你是准备对我负责了吗，喵~',
    '小猫喵喵叫，那你是小狗该怎么叫呢~',
    '你个笨蛋，戳坏了怎么办啊！！',
    '哭哭，真的戳的很疼啦QAQ',
    '今天想吃枣椰蜜糖！给我买嘛~',
    '究竟是怎么样才能养出你这种变态呢！讨厌死了！',
    '再喜欢小纳也不能这样戳啦，真的会坏掉的笨蛋!',
    '我们刚刚是拯救了世界吧。可为什么，我在哭呢',
    '你带来新的故事吗？我用亲手做的枣椰蜜糖与你交换',
    '芝士，与你分享'];

//默认纳西妲的语言，可以自己扒文件改地址
let voice_list = ["https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/4d9feb71760c5e8eb5f6c700df12fa0c_6824265537002152805.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/c9e517b38d68161fb74cfa0b4349cc65_4347861218592112317.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/c3c7e9debabb94e3727336c4ce96afeb_224389990055717799.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/8a3db4b5fbdc4b20213a6f7339782015_4928929162694702539.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/991bdd5a3cbc3d4c6f3d9fb6e7b820cd_5388252366411848285.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/207cb052df963f3dcf54fc020d19e419_4430928199053665394.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/7832e76193d1097de2ff80337b6f5e66_3236404328533189135.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/a7400070efbfddd3e3b0e51ab5bd416e_2613139511899834526.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/ab080a46b594bbea4b8b6b102b57ca52_4873007682934420446.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/fc230f074229f92b1dc53f0e2912c1ef_1475816756907451157.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/d3536f987165303f9cec049968aee8e8_448052117450978550.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/f8dd1a21bd89bfb2fbeafc41a6e6105b_2464061296080033511.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/045279c37eabf825a3ead02cd7f63201_2864513860075272994.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/301a47bae0994cdb3c760ef12e89e8dd_5268233442388273437.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/edcfe93b22d3740491bb9faae1af4fa4_7131208721654597216.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/9945b7d5018f0f9ec85a795404d71578_6482272657391702471.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/9e95f2369323fdd2b3f1263c2c166c6f_1762500052641269578.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/cefd8ce810abfd78c6138bb4a5495a4f_3406507472490730277.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/7177d5d7c9e6bceea17dfa19246a8311_947270987568402613.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/3dc9d80439bf04c025d6b2fc3ef65690_8740168104152480190.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/705ad5d58037b7ede9c375b79e136db5_5484548306134050243.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/a03d821bfe14fe67be85a63f2e4b2ea8_8723240068787191136.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/cf45c3b44b9b0ef5f4a7b25376895f1e_3211550444048016001.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/33367d47ecae0d6ad4cf5d08ce310749_5860058669268042217.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/9f3f251b63bc4ecbae0c459c86728645_6727447996337295219.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/6914a5800526fc5d1fe280c4e7da2ba6_4711627706989616356.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/6bcb97d5c63275be4df00507d1a5e738_7884988217586192652.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/cf144a233e0971ef0176a0794ee45ecb_8925036841630699252.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/118487fde490b4eb60fbf1b061eabf60_7337639419392007909.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/cd7c3d1a69ab87ca2339e6d2d947073a_4052119550327167358.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/b4301d67ff0b9b8ed5f20f8677548490_7133441774208169621.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/38413f05cc7dc3fcd4f9940565701921_1980759413293826277.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/99540436483aacba2d3ce1930554b79a_3245245943114192654.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/c070cfee21a5b2155d35c78c714c62a0_6654082250841516882.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/a5a1b0b56ee4ce1f2a8fd8f0da780477_5778202358371881056.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/a92b16367b39d6533e15d5be368877fa_609355584691653441.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/42cfc993aedbd34011dfb507d98ebc06_1021613602285924429.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/b7f9bd671e5f663e2468fae6d70e8fc7_4321126464476483388.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/b48a9ca50c160247f092d1c94e895779_5468104429965887517.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/0af43c60e3618ab87754455ae898aa5f_7139785141669538993.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/8ae62e175ce0bce2fd154e1b97b6fa63_7159626485468514250.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/1c2429b34597c975d0463798b632e507_2104120770632135635.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/6472b7b374d3f1b2c853bae4ff9d8b26_6402755683915596310.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/6ea026eb2691f06e5c972320178ae537_6325311739293565017.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/67a95b896924cc53b283fc06cd2de52c_6914840829824874357.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/29b267cc6748c7a0d4d465d5e333dea5_3065502828430227261.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/3514888ba1f2d3f06bbc226451ec129d_221575416949828224.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/30b19865c6d20be04366ac742e8a67b9_3786598944525696408.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/ccb495a319c34444adbcef7aa155cb1f_2757660068721522026.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/349d2de21774da45c1e97745b365ee1f_4992449842647632459.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/830ee05eba1aacc607dff41e51516f5e_4807239196801935478.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/06a6fda8919bfef6bfff5199c437d032_2713778252536393556.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/d1919304f637ea8dc455dc92afe2ff6e_1431902895779023323.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/1f7eaf7451f9cfcbd3e8cd844b28b17e_6176061356688600031.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/df32f2eab30a7f5879c4606dc09a0502_3078148866148088063.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/e61ce14dd018af855e212944c3a86e07_6946138339125005920.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/6c346a693c656f3f116d3d428b8b3438_3072149138534909048.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/11c664bd848770184eca5dfd66e89c51_5444646554291536369.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/cccd5f5057045c12d8fdde98d4b4116a_7845851735624884706.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/1ee24a163e78f8885ed81a0b47b8cae7_6346729070751566019.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/1943b45de93aa4ecf3c2bc50e2c37072_5570205242708460822.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/af2ad8de369553cbd7b1c1ecf78b241c_4350686237074109248.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/228f1ae88824bbbdc4f0e96b02b93df2_3172196917569681075.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/8931896ce03ab4d2724ff861a5eb14fe_59418760023336306.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/fbc208b80518b91634964ba0783b0f9c_7720219259750270894.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/d02246a2fff6395411f7a1077191725c_3194055208944981775.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/24ad23ef5fde4fead48b52e4492562a8_8054702825063625720.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/f876c09d556b23b9231e9df8d39be246_4572440346090611863.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/b84885f5b6a2ebd7bc377984b641ea80_1270250062214132580.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/d9f3e353f1b71d3c601cfa28f15e8ed5_1074679710559344807.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/803a65c8cb872ec0e0038ff35db35cc4_2447311778799308880.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/f5b6ddb7454cbb750e6c02d258c3e03d_8129408147390523371.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/ddf937ea4aac1282901270ba491ece88_986083904906531255.mp3",
    "https://uploadstatic.mihoyo.com/ys-obc/2022/11/02/16576950/f514abfbe4a9358e96038850d6d64742_5784748521077424357.mp3"]

let ciku_ = ["_name_今天已经被戳了_num_次啦，休息一下好不好",
            "_name_今天已经被戳了_num_次啦,有完没完！",
            "_name_今天已经被戳了_num_次啦,别戳了！！！",
            "_name_今天已经被戳了_num_次啦,不准戳了！",
            "_name_今天已经被戳了_num_次啦,再戳就坏掉啦！"
]

export class chuo extends plugin {
    constructor() {
        super({
            name: '戳一戳',
            dsc: '戳一戳机器人触发效果',
            event: 'notice.group.poke',
            priority: 5000,
            rule: [
                {
                    fnc: 'chuoyichuo'
                }
            ]
        }
        )
    }


    async chuoyichuo(e) {
        logger.info('[戳一戳生效]')
        if (e.target_id == cfg.qq) {
            let count = await redis.get(`Mz:pokecount:${e.group_id}`)
            let time = moment(Date.now())
                .add(1, "days")
                .format("YYYY-MM-DD 00:00:00")
            let exTime = Math.round(
                (new Date(time).getTime() - new Date().getTime()) / 1000
            )
            if (!count) {
                await redis.set(`Mz:pokecount:$(e.group_id)`, 1 * 1, { EX: exTime })
            } else {
                await redis.set(`Mz:pokecount:$(e.group_id)`, ++count, {
                    EX: exTime,
                })
            }
            if (Math.ceil(Math.random() * 100) <= 30 && count >= 10) {
                let conf = cfg.getGroup(e.group_id)
                  e.reply([
                    `${ciku_[Math.round(Math.random() * (ciku_length - 1))]}`
                    .replace("_name_",conf.botAlias[0])
                    .replace("_num_",count), 
                  ]);
                  return true
            }

            
            let random_type = Math.random()
            if (random_type < reply_text) {            
                let text_number = Math.ceil(Math.random() * word_list['length'])
                await e.reply(word_list[text_number - 1])            
        }

            else if (random_type < (reply_text + reply_img)) {
                   let mutetype = Math.ceil(Math.random() * 3)
                if (mutetype == 1) {
                let url = `http://www.98qy.com/sjbz/api.php`;
                let res = await fetch(url).catch((err) => logger.error(err));
                let msg = [segment.image(res.url)];
                await e.reply('你戳的我有点开心奖励你哦')
                await common.sleep(100)
                await e.reply(msg);
            }
           else if (mutetype == 2) {
                let url = `https://api.dujin.org/pic/yuanshen`;
                let res = await fetch(url).catch((err) => logger.error(err));
                let msg = [segment.image(res.url)];
                await e.reply('给你一张图片别戳了')
                await common.sleep(100)
                await e.reply(msg);
         }
           else if (mutetype == 3) {
                let url = `https://api.asxe.vip/random.php`;
                let res = await fetch(url).catch((err) => logger.error(err));
                let msg = [segment.image(res.url)];
                await e.reply('把嘴张开（抬起脚）')
                await common.sleep(100)
                await e.reply(msg);
    }
}
            else if (random_type < (reply_text + reply_img + reply_voice)) {
                let voice_number = Math.ceil(Math.random() * word_list['length'])
                let url = voice_list[voice_number - 1]
                await e.reply(segment.record(url))
            }

            else if (random_type < (reply_text + reply_img + reply_voice + mutepick)) {
                let usrinfo = await Bot.getGroupMemberInfo(e.group_id, e.operator_id)
                let botinfo = await Bot.getGroupMemberInfo(e.group_id, Bot.uin)
                let role = ['owner', 'admin']
                if (!cfg.masterQQ.includes(e.operator_id)) {
                    if((role.includes(botinfo.role) && !role.includes(usrinfo.role)) || (botinfo.role == 'owner' && usrinfo.role == 'admin')){
                        let mutetype = Math.ceil(Math.random() * 4)
                        if (mutetype == 1) {
                            await e.reply('是不是要本萝莉揍你一顿才开心啊！！！')
                            await common.sleep(100)
                            await e.group.muteMember(e.operator_id, 120);
                            await common.sleep(100)
                            await e.reply('哼！')
                        }
                        else if (mutetype == 2) {
                            await e.reply('不！！')
                            await common.sleep(10);
                            await e.reply('准！！')
                            await common.sleep(10);
                            await e.reply('戳！！');
                            await common.sleep(10);
                            await e.reply('小！！');
                            await common.sleep(10)
                            await e.reply('纳！！')
                            await common.sleep(10);
                            await e.group.muteMember(e.operator_id, 120)
                            await common.sleep(50)
                            await e.reply('让你面壁思过2分钟，哼😤～')
                        }
                        else if (mutetype == 3) {
                            await e.reply('要怎么样才能让你不戳我啊!')
                            await common.sleep(100)
                            await e.group.muteMember(e.operator_id, 120);
                            await common.sleep(100)
                            await e.reply('大变态！')
                        }
                        else if (mutetype == 4) {
                            await e.reply('干嘛戳我，我要惩罚你！')
                            await common.sleep(100)
                            await e.group.muteMember(e.operator_id, 120);

                    } 
                        else if (role.includes(usrinfo.role)) {
                        let mutetype = Math.ceil(Math.random() * 3)
                        if (mutetype == 1) {
                            e.reply('呜呜呜你欺负我')
                        }
                        else if (mutetype == 2) {
                            e.reply('主人有坏淫欺负我')
                        }
                        else if (mutetype == 3) {
                            e.reply('气死我了不要戳了！')
                        }

                    }

                }

            }

                else if (cfg.masterQQ.includes(e.operator_id)) {
                    let mutetype = Math.ceil(Math.random() * 2)
                    if (mutetype == 1) {
                        e.reply('主人连你也欺负我，呜呜呜~')
                    }
                    else if (mutetype == 2) {
                        e.reply('主人有什么事吗？喵~')
                    }
                    else if (mutetype == 3) {
                        e.reply('我，我才不会这样子！真正的我从来不是傲娇！傲，傲娇什么的，都，都是别人杜摆~嗯，一点，一点也没有呢！')
                    }

                }

            }

            else {
                let poke = Math.ceil(Math.random() * 2)
                if (poke == 1) {
                    await e.reply('你刚刚是不是戳我了?我要戳回去！')
                    await common.sleep(100)
                    await e.group.pokeMember(e.operator_id)
                }
                else if (poke == 2) {
                    await e.group.pokeMember(e.operator_id)
                    await common.sleep(100)
                    await e.reply('让你戳我，哼！！！')
                }

            }

        }

    }

}