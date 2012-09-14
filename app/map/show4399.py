# coding=utf-8
'''
Created on Jul 6, 2012

@author: root         
'''

import datetime, time, random, web, sys, json


speedRate = 4
showByProvince = True
areas = {
          '上海':('sh',10, 2706,1186), 
          '北京':('bj',10, 2450, 762),
          '天津':('tj',8,2484,760),
          '重庆':('cq',4,2084,1286),
		  '澳门':('am',2,2406,1660),
          '香港':('xg',3,2426,1658),

          '内蒙古':('nmg',3,2262,700),
          '新疆':('xj',3,1396,572),
          '西藏':('xz',3,1424,1288),
          '宁夏':('nx',3,2066,856),
          '广西':('gx',4,2182,1604),

          '厦门':('xm',6,755,570,'福建'),
		  '福州':('fz',6,2602,1458,'福建'),
          '宁德':('nd',4,750,500,'福建'),
    	  '莆田':('pt',6,640,600,'福建'),
    	  '泉州':('qz',4,320,540,'福建'),
    	  '漳州':('zz',3,650,250,'福建'),
    	  '龙岩':('ly',6,500,250,'福建'),
    	  '南平':('np',4,520,350,'福建'),
    	  '三明':('sm',3,250,360,'福建'),
		  
		  '广州':('gz',7, 2396, 1638, '广东'), 
		  '哈尔滨':('heb',5,2754,350,'黑龙江'),
		  '长春':('cc',5,2730,536,'吉林'),
		  '沈阳':('sy',5,2686,648,'辽宁'),
		  '石家庄':('sjz',7,2390,882,'河北'),
		  '太原':('ty',5,2300,900,'山西'),
		  '西宁':('xn',3,1778,986,'青海'),
		  '济南':('jn',7,2488,946,'山东'),
		  '郑州':('zz',5,2354,1054,'河南'),
		  '南京':('nj',6,2604,1056,'江苏'),
		  '合肥':('hf',6,2530,1176,'安徽'),
		  '杭州':('hz',7,2658,1242,'浙江'),
		  '南昌':('nc',6,2488,1344,'江西'),
		  '长沙':('cs',6,2308,1380,'湖南'),
		  '武汉':('wh',6,2412,1258,'湖北'),
		  '海口':('hk',6,2286,1792,'海南'),
		  '兰州':('lz',3,1968,1004,'甘肃'),
		  '西安':('xa',5,2176,1088,'陕西'),
		  '成都':('cd',4,1982,1278,'四川'),
		  '贵阳':('gy',5,2044,1478,'贵州'),
		  '昆明':('km',5,1914,1556,'云南'),
		  '台北':('tb',3,2744,1534,'台湾')
        }

provinceName = {'新疆' : 'xj', '西藏' : 'xz', '青海':'qh', '甘肃':'gs', '内蒙古':'nmg', '黑龙江':'hlj', '吉林':'jl', '辽宁':'ln', '四川':'sc', 
                 '陕西':'sx', '江苏':'js', '浙江':'zj', '台湾':'tw', '安徽':'ah','福建':'fj', '江西':'jx','广东':'gd','海南':'hn','广西':'gx',
                 '湖南':'hun', '贵州':'gz','云南':'yn','宁夏':'nx','山西':'shx','河南':'hen','湖北':'hb','重庆':'cq','河北':'heb','天津':'tj',
                 '北京':'bj','山东':'sd','上海':'sh','香港':'xg','澳门':'am'             
                }

games = {
			 '造梦西游3':{'w':5014838,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_15000763190.jpg'},
			'洛克王国':{'w':4604366,'icon':'http://imga.4399.com/upload_pic/2012/5/19/4399_16250109272.jpg'},
			'赛尔号':{'w':3768674,'icon':'http://imga.4399.com/upload_pic/2012/5/19/4399_16091448059.jpg'},
			'4399奥拉星':{'w':2900644,'icon':'http://imga.4399.com/upload_pic/2012/5/19/4399_16195998160.jpg'},
			'卡布西游':{'w':1909759,'icon':'http://imga.4399.com/upload_pic/2012/5/28/4399_20463526837.jpg'},
			'奥比岛':{'w':1672544,'icon':'http://imga.4399.com/upload_pic/2012/5/28/4399_16484098728.jpg'},
			'植物大战僵尸':{'w':900101,'icon':'http://imga.4399.com/upload_pic/2012/6/2/4399_14041075644.jpg'},
			'4399小花仙':{'w':791636,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_14231052036.jpg'},
			'Q版泡泡堂':{'w':768420,'icon':'http://imga.4399.com/upload_pic/7272/9/3881.jpg'},
			'死神VS火影1.3':{'w':693858,'icon':'http://imga.4399.com/upload_pic/2012/8/13/4399_11571658422.jpg'},
			'4399弹弹堂2':{'w':674640,'icon':'http://imga.4399.com/upload_pic/2012/7/19/4399_08554666238.jpg'},
			'愤怒的小鸟':{'w':548289,'icon':'http://imga.4399.com/upload_pic/2012/6/15/4399_15145294307.jpg'},
			'勇者之路精灵物语速升版':{'w':534333,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_19591204196.jpg'},
			'摩尔庄园':{'w':481698,'icon':'http://imga.4399.com/upload_pic/2012/5/19/4399_15542880787.jpg'},
			'勇士的信仰':{'w':479058,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_15192682213.jpg'},
			'美食大战老鼠':{'w':475207,'icon':'http://imga.4399.com/upload_pic/2012/8/17/4399_19350335117.jpg'},
			'火柴人勇者试炼无敌版':{'w':463143,'icon':'http://imga.4399.com/upload_pic/2012/8/17/4399_10183674941.jpg'},
			'快刀切水果3':{'w':455566,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_16491828040.jpg'},
			'火柴人勇者试炼':{'w':455106,'icon':'http://imga.4399.com/upload_pic/2012/8/15/4399_09373039295.jpg'},
			'火柴人打羽毛球2':{'w':441043,'icon':'http://imga.4399.com/upload_pic/2012/5/30/4399_14205331920.jpg'},
			'植物大战僵尸无敌版':{'w':433308,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20323933014.jpg'},
			'三国小镇':{'w':416901,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_15585397132.jpg'},
			'造梦西游2':{'w':408197,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_15212426275.jpg'},
			'王牌卡车司机':{'w':401661,'icon':'http://imga.4399.com/upload_pic/2012/8/14/4399_14571057227.jpg'},
			'二战前线2无敌版':{'w':398718,'icon':'http://imga.4399.com/upload_pic/7272/9/21674.jpg'},
			'战火英雄无敌版':{'w':389010,'icon':'http://imga.4399.com/upload_pic/2012/6/5/4399_12463564431.jpg'},
			'封神太子2':{'w':388161,'icon':'http://imga.4399.com/upload_pic/2012/7/2/4399_15272587040.jpg'},
			'闪翼双星无敌版':{'w':367784,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20294361633.jpg'},
			'小鳄鱼爱洗澡中文版':{'w':365960,'icon':'http://imga.4399.com/upload_pic/2012/7/17/4399_09483612600.jpg'},
			'铠甲勇士激斗传炎龙登场无敌版':{'w':362072,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20034102418.jpg'},
			'造梦西游':{'w':361698,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20183749703.jpg'},
			'Q版泡泡堂4':{'w':325382,'icon':'http://imga.4399.com/upload_pic/7272/9/75769.jpg'},
			'拳皇Wing1.7无敌版':{'w':324231,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_16030887751.jpg'},
			'森林冰火人3无敌版':{'w':307754,'icon':'http://imga.4399.com/upload_pic/2012/8/20/4399_09392296026.jpg'},
			'捕鱼达人':{'w':305246,'icon':'http://imga.4399.com/upload_pic/2012/4/23/4399_09521448440.jpg'},
			'森林冰火人中文版':{'w':294709,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_16064659687.jpg'},
			'宠物连连看2.5版':{'w':293188,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16210762932.jpg'},
			'爆炸贪吃蛇':{'w':290456,'icon':'http://imga.4399.com/upload_pic/2012/8/10/4399_09135145352.jpg'},
			'疯狂小人战斗':{'w':277438,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20114593193.jpg'},
			'4399开心农场':{'w':275441,'icon':'http://imga.4399.com/upload_pic/2012/7/3/4399_14542119105.jpg'},
			'泰米时空':{'w':274656,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_16441582013.jpg'},
			'奥特曼打怪兽2':{'w':267994,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20361389205.jpg'},
			'果蔬连连看':{'w':261212,'icon':'http://imga.4399.com/upload_pic/2012/3/16/4399_09291367604.jpg'},
			'数码宝贝格斗版3':{'w':260632,'icon':'http://imga.4399.com/upload_pic/2012/7/31/4399_09241141101.jpg'},
			'黄金矿工双人版':{'w':250583,'icon':'http://imga.4399.com/upload_pic/2012/7/5/4399_14524371796.jpg'},
			'王子公主回家记':{'w':239403,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20301740111.jpg'},
			'国王的勇士3':{'w':234373,'icon':'http://imga.4399.com/upload_pic/2012/7/12/4399_16004360600.jpg'},
			'3D双人极速飙车':{'w':227992,'icon':'http://imga.4399.com/upload_pic/7272/9/74213.jpg'},
			'大便超人':{'w':227917,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20370868083.jpg'},
			'双人旋转赛车':{'w':221202,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20421848857.jpg'},
			'西游大战僵尸':{'w':212858,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_14031864725.jpg'},
			'双箭头2无敌版':{'w':210647,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20132165729.jpg'},
			'奥特曼激斗传1.2无敌版':{'w':204912,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_19544233628.jpg'},
			'超级马里奥水上摩托':{'w':202632,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20013536781.jpg'},
			'拳皇Wing1.7':{'w':192159,'icon':'http://imga.4399.com/upload_pic/7272/9/80841.jpg'},
			'灰太狼滑板大冒险':{'w':188491,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_19573542495.jpg'},
'青蛙祖玛':{'w':184993,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20141018727.jpg'},
'狙击小日本':{'w':184729,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10250433013.jpg'},
'猫和老鼠穿越记2':{'w':179992,'icon':'http://imga.4399.com/upload_pic/2012/8/6/4399_14180111737.jpg'},
'石头连连看':{'w':176885,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16303074490.jpg'},
'勇闯地下城2.7无敌版':{'w':176501,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_15074427003.jpg'},
'打屁股':{'w':174196,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20085695208.jpg'},
'水果大战害虫':{'w':173797,'icon':'http://imga.4399.com/upload_pic/2012/8/7/4399_08430412082.jpg'},
'勇者之路双人速升版':{'w':172268,'icon':'http://imga.4399.com/upload_pic/7272/9/45046.jpg'},
'勇者之路2加强版':{'w':169545,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_19215875281.jpg'},
'高楼爆破3无敌版':{'w':166551,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_17413298989.jpg'},
'Q版泡泡堂3升级版':{'w':165639,'icon':'http://imga.4399.com/upload_pic/2012/3/31/4399_11061742638.jpg'},
'突击对决无敌版':{'w':162262,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10003256635.jpg'},
'粘液实验室选关版':{'w':159251,'icon':'http://imga.4399.com/upload_pic/2012/6/30/4399_10032766727.jpg'},
'小怪物探险3':{'w':155493,'icon':'http://imga.4399.com/upload_pic/2012/7/28/4399_11564557964.jpg'},
'坏蛋冰淇淋无敌版':{'w':154422,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_15272933030.jpg'},
'僵尸危机3无敌版':{'w':153984,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_14463760594.jpg'},
'宠物连连看3.1':{'w':153154,'icon':'http://imga.4399.com/upload_pic/2012/5/28/4399_16293879496.jpg'},
'挖地小子无敌版':{'w':153035,'icon':'http://imga.4399.com/upload_pic/2012/7/5/4399_15065080875.jpg'},
'二战前线3无敌选关版':{'w':150399,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_17540996597.jpg'},
'逗小猴开心7':{'w':149871,'icon':'http://imga.4399.com/upload_pic/2012/7/7/4399_10033824643.jpg'},
'懒羊羊飞碟保羊村':{'w':148933,'icon':'http://imga.4399.com/upload_pic/2012/8/15/4399_19173083915.jpg'},
'喜羊羊闯狼堡':{'w':145237,'icon':'http://imga.4399.com/upload_pic/7272/9/71535.jpg'},
'美羊羊卡丁车':{'w':144347,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16271837650.jpg'},
'少年骇客异形救援':{'w':143874,'icon':'http://imga.4399.com/upload_pic/2012/4/10/4399_11254117479.jpg'},
'敢死队2':{'w':143659,'icon':'http://imga.4399.com/upload_pic/2012/8/17/4399_12352115044.jpg'},
'黄金沙鹰无敌版':{'w':142288,'icon':'http://imga.4399.com/upload_pic/2012/7/5/4399_15404321992.jpg'},
'猫和老鼠摩托大赛':{'w':140284,'icon':'http://imga.4399.com/upload_pic/2012/8/20/4399_09385453174.jpg'},
'数码宝贝3':{'w':139708,'icon':'http://imga.4399.com/upload_pic/2012/7/6/4399_12562089024.jpg'},
'拯救慢羊羊':{'w':138818,'icon':'http://imga.4399.com/upload_pic/7272/9/45997.jpg'},
'冰火人冒险双人无敌版':{'w':136945,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_15222598486.jpg'},
'五子连珠':{'w':135871,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16283737561.jpg'},
'双刃战士无敌版':{'w':135664,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20345922007.jpg'},
'猫和老鼠大侦探':{'w':135351,'icon':'http://imga.4399.com/upload_pic/2012/7/30/4399_14480058908.jpg'},
'猫和老鼠炸弹堂':{'w':134949,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10181031796.jpg'},
'变色小恐龙':{'w':134385,'icon':'http://imga.4399.com/upload_pic/2012/4/3/4399_09404121752.jpg'},
'五星战队之超级武士加强无敌版':{'w':134068,'icon':'http://imga.4399.com/upload_pic/2012/6/1/4399_16572531130.jpg'},
'愤怒小鸟炮弹球3':{'w':132517,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_17243974393.jpg'},
'神魔仙界':{'w':131997,'icon':'http://imga.4399.com/upload_pic/2012/7/5/4399_10341451400.jpg'},
'屁王兄弟无敌版':{'w':131094,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10280636648.jpg'},
'快乐美发师3':{'w':123354,'icon':'http://imga.4399.com/upload_pic/2012/8/18/4399_10080502477.jpg'},


'捏橘子':{'w':123291,'icon':'http://imga.4399.com/upload_pic/2012/8/10/4399_14451850635.jpg'},
'冰火双星宝箱守卫2':{'w':123079,'icon':'http://imga.4399.com/upload_pic/2012/5/9/4399_19113484591.jpg'},
'制作美味蛋糕':{'w':122475,'icon':'http://imga.4399.com/upload_pic/2012/7/5/4399_14561065257.jpg'},
'逃命的火鸡':{'w':122272,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_09241464704.jpg'},
'钢铁蜘蛛侠':{'w':122065,'icon':'http://imga.4399.com/upload_pic/2012/4/18/4399_19330227938.jpg'},
'战车撞僵尸':{'w':119872,'icon':'http://imga.4399.com/upload_pic/2012/7/5/4399_15110655177.jpg'},
'超合金战记2':{'w':119550,'icon':'http://imga.4399.com/upload_pic/2012/8/9/4399_14470906964.jpg'},
'装载卡车3':{'w':116916,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_19535057894.jpg'},
'3D超级漂移':{'w':116398,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20042961160.jpg'},
'皇后成长计划':{'w':115527,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20553935547.jpg'},
'死神VS火影1.2':{'w':114947,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_19275049854.jpg'},
'黄金矿工中文版':{'w':114902,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16295222433.jpg'},
'4399涂鸦画板':{'w':114432,'icon':'http://imga.4399.com/upload_pic/2012/7/5/4399_10444321071.jpg'},
'会说话的汤姆猫3':{'w':113875,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_15105573771.jpg'},
'豪华越野车':{'w':113518,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_14172503234.jpg'},
'跟小美医生学打针':{'w':113170,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20021626481.jpg'},

'泡泡兔3':{'w':112272,'icon':'http://imga.4399.com/upload_pic/2012/6/28/4399_17295388321.jpg'},
'喜羊羊开心闯龙年':{'w':111375,'icon':'http://imga.4399.com/upload_pic/7272/9/80824.jpg'},
'奥特曼兄弟双人版':{'w':111175,'icon':'http://imga.4399.com/upload_pic/7272/9/38310.jpg'},
'飞天忍者猫':{'w':110284,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20085834901.jpg'},
'奶油鸡食谱':{'w':110133,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20481616618.jpg'},
'倒霉熊逃离房间':{'w':110078,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_16014077324.jpg'},
'可爱炸弹人2':{'w':109989,'icon':'http://imga.4399.com/upload_pic/2012/5/19/4399_15551646393.jpg'},
'皇城突袭1.082中文版':{'w':108953,'icon':'http://imga.4399.com/upload_pic/2012/6/29/4399_19204406585.jpg'},
'兄弟奥特曼2':{'w':108837,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_15405939936.jpg'},
'大鱼吃小鱼双人版':{'w':107069,'icon':'http://imga.4399.com/upload_pic/2012/7/12/4399_17264606067.jpg'},
'3D极速飙车':{'w':106869,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10222947404.jpg'},
'拳皇wing1.4':{'w':106048,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16084325108.jpg'},
'大嘴怪冒险无敌版':{'w':105838,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20452155481.jpg'},
'Q版泡泡堂4修改版':{'w':105471,'icon':'http://imga.4399.com/upload_pic/7272/9/78988.jpg'},
'神奇小妖怪中文版':{'w':103546,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16353554438.jpg'},
'二战前线2中文无敌版':{'w':103525,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16045339319.jpg'},
'双人旋转赛车选关版':{'w':103389,'icon':'http://imga.4399.com/upload_pic/2012/7/3/4399_17035211987.jpg'},
'投篮挑战选关版':{'w':103202,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20024340347.jpg'},
'猫和老鼠抢奶酪':{'w':103042,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_09391558850.jpg'},
'奥特曼大战僵尸0.6':{'w':102893,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10081434092.jpg'},
'阿sue煮鸡蛋面':{'w':102545,'icon':'http://imga.4399.com/upload_pic/2012/8/15/4399_15104933418.jpg'},
'奥特曼娶新娘':{'w':102502,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_15345244582.jpg'},
'激光炮轰小怪2':{'w':102421,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_21015347411.jpg'},
'森林冰火人3':{'w':102094,'icon':'http://imga.4399.com/upload_pic/7272/8/79452.jpg'},
'保护橙子增强版3':{'w':101490,'icon':'http://imga.4399.com/upload_pic/2012/6/14/4399_14352004367.jpg'},
'TH穿越火线1.2':{'w':101366,'icon':'http://imga.4399.com/upload_pic/2012/7/30/4399_15152332930.jpg'},
'极限越野':{'w':100224,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16243365228.jpg'},
'僵尸危机3':{'w':100023,'icon':'http://imga.4399.com/upload_pic/7272/9/5931.jpg'},

'森林冰火人双人迷宫':{'w':99790,'icon':'http://imga.4399.com/upload_pic/7272/9/63033.jpg'},
'朵拉救狗狗':{'w':99624,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16225941833.jpg'},
'愤怒的僵尸':{'w':98980,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10201650031.jpg'},
'阿sue的美容店':{'w':98915,'icon':'http://imga.4399.com/upload_pic/7272/9/57980.jpg'},
'游戏明星大乱斗3.5':{'w':98599,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_15500797507.jpg'},
'拳皇大战八神版':{'w':98459,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10261900753.jpg'},
'灰太狼潜入羊村':{'w':97816,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10160170232.jpg'},
'蝙蝠侠追击猫女2':{'w':97429,'icon':'http://imga.4399.com/upload_pic/2012/8/8/4399_17262240476.jpg'},
'喜羊羊与灰太狼消消看':{'w':97090,'icon':'http://imga.4399.com/upload_pic/7272/9/12681.jpg'},
'勇闯冰火岛阿狸版':{'w':95945,'icon':'http://imga.4399.com/upload_pic/7272/6/53596.jpg'},
'皇城突袭1.082中文无敌版':{'w':95667,'icon':'http://imga.4399.com/upload_pic/2012/6/30/4399_15395044419.jpg'},
'拯救精灵世界':{'w':94599,'icon':'http://imga.4399.com/upload_pic/2012/8/17/4399_08323858509.jpg'},
'奥维斗地主':{'w':94276,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16340527809.jpg'},
'建筑队大战僵尸疯狂版':{'w':94237,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10283893192.jpg'},
'拯救美羊羊过山车':{'w':93642,'icon':'http://imga.4399.com/upload_pic/2012/4/20/4399_09342495047.jpg'},
'朵拉美人鱼':{'w':93492,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16371537200.jpg'},
'巧虎甜品店':{'w':93366,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16484441444.jpg'},
'乐园过山车中文版':{'w':93262,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20163825542.jpg'},
'奥特曼迪迦进化':{'w':93247,'icon':'http://imga.4399.com/upload_pic/2012/7/4/4399_20044855718.jpg'},
'超级玛丽完美版':{'w':93226,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_14452046189.jpg'},
'火娃冰娃闯关无敌版':{'w':93162,'icon':'http://imga.4399.com/upload_pic/7272/9/43755.jpg'},
'送小羊回家2无敌版':{'w':93026,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20395737023.jpg'},
'绿巨人逃生':{'w':92874,'icon':'http://imga.4399.com/upload_pic/2012/5/25/4399_19595187132.jpg'},
'灰姑娘变公主':{'w':91710,'icon':'http://imga.4399.com/upload_pic/2012/7/18/4399_09180215791.jpg'},
'喜羊羊画板3':{'w':91656,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_19225848718.jpg'},
'蜗牛鲍勃2中文版':{'w':91265,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_21001132123.jpg'},
'复仇的鲨鱼中文版':{'w':90939,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20461958031.jpg'},
'炮打笑脸集合版':{'w':90209,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20431948210.jpg'},
'天线宝宝兄弟':{'w':90202,'icon':'http://imga.4399.com/upload_pic/2012/8/14/4399_17170432817.jpg'},
'彩8对战':{'w':89860,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_19531805066.jpg'},
'多拉A梦来钓鱼':{'w':89807,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16351137769.jpg'},
'神奇宝贝大冒险':{'w':89517,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20584651345.jpg'},
'巧虎数字连线':{'w':88690,'icon':'http://imga.4399.com/upload_pic/2012/8/13/4399_14475597922.jpg'},
'喜羊羊坦克大战':{'w':88215,'icon':'http://imga.4399.com/upload_pic/7272/8/73551.jpg'},
'二战前线2完整版':{'w':88108,'icon':'http://imga.4399.com/upload_pic/7272/9/10672.jpg'},
'炎龙传说2三度冲击无敌版':{'w':87879,'icon':'http://imga.4399.com/upload_pic/7272/9/55021.jpg'},
'奥特曼追杀罪犯':{'w':87605,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16193319624.jpg'},
'魂斗罗完美版':{'w':87587,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16172096084.jpg'},
'小羊快快跑':{'w':87295,'icon':'http://imga.4399.com/upload_pic/2012/8/18/4399_15523498144.jpg'},
'懒羊羊大冒险':{'w':87207,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20285338476.jpg'},
'恐龙快打双人选关版':{'w':87064,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_09411379004.jpg'},
'小怪物探险':{'w':86215,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20131583233.jpg'},
'街头暴扣':{'w':85672,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10254146241.jpg'},
'中国象棋':{'w':85647,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16395132510.jpg'},
'送小羊回家2新版':{'w':85419,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_19560007851.jpg'},
'双偷盗宝':{'w':85153,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20194643768.jpg'},
'极限滑板爱好者':{'w':84528,'icon':'http://imga.4399.com/upload_pic/2012/5/25/4399_15000579151.jpg'},
'龙珠激斗1.8':{'w':83985,'icon':'http://imga.4399.com/upload_pic/2012/6/29/4399_11502017705.jpg'},
'变形金刚赛车':{'w':83963,'icon':'http://imga.4399.com/upload_pic/2012/5/17/4399_09132540499.jpg'},
'腾飞吧！铠甲勇士':{'w':83194,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_09345451538.jpg'},
'海盗军团抢宝藏':{'w':83075,'icon':'http://imga.4399.com/upload_pic/7272/9/18173.jpg'},
'无敌流浪汉6无敌版':{'w':81819,'icon':'http://imga.4399.com/upload_pic/2012/8/31/4399_15214547085.jpg'},
'玛丽兄弟炸弹人':{'w':81802,'icon':'http://imga.4399.com/upload_pic/7272/9/54233.jpg'},
'打屁股2':{'w':81560,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10242083668.jpg'},
'偷袭敌人阵地':{'w':81132,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_14493496316.jpg'},
'能量旋转忍者':{'w':80810,'icon':'http://imga.4399.com/upload_pic/2012/6/5/4399_15462072876.jpg'},
'超级米拉奇战记':{'w':80781,'icon':'http://imga.4399.com/upload_pic/7272/9/48390.jpg'},
'Q版泡泡堂3':{'w':80665,'icon':'http://imga.4399.com/upload_pic/7272/9/42107.jpg'},
'大鱼吃小鱼':{'w':80589,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16365716574.jpg'},
'火娃冰娃闯关2无敌版':{'w':80321,'icon':'http://imga.4399.com/upload_pic/7272/9/45256.jpg'},
'黄金矿工双人无敌版':{'w':80298,'icon':'http://imga.4399.com/upload_pic/2012/5/29/4399_11380033107.jpg'},
'铁头小子':{'w':79652,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16363018782.jpg'},
'水果大战害虫无敌版':{'w':78978,'icon':'http://imga.4399.com/upload_pic/2012/8/10/4399_14103832544.jpg'},
'疯狂的愤怒小鸟':{'w':78915,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_19505022363.jpg'},
'奔跑彩虹马百变版':{'w':78537,'icon':'http://imga.4399.com/upload_pic/2012/5/11/4399_15103622177.jpg'},
'美羊羊回家':{'w':77894,'icon':'http://imga.4399.com/upload_pic/7272/9/16910.jpg'},
'3D弯道漂移赛':{'w':77623,'icon':'http://imga.4399.com/upload_pic/2012/8/15/4399_13025499543.jpg'},
'小灰狼吃小羊':{'w':77073,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_09591028092.jpg'},
'巧虎料理小帮手':{'w':76277,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16430495111.jpg'},
'智商球圣诞版':{'w':76175,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_19582100337.jpg'},
'狙击手的使命':{'w':75792,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_10093775849.jpg'},
'极品赛车':{'w':75762,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16220382827.jpg'},
'拳皇大战之饿狼来袭':{'w':75432,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_09395298190.jpg'},
'植物大战僵尸2':{'w':75415,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_09300460988.jpg'},
'疯狂过山车2':{'w':75222,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10062875297.jpg'},
'摩托赛车':{'w':75061,'icon':'http://imga.4399.com/upload_pic/7272/9/10942.jpg'},
'黄金大盗':{'w':75023,'icon':'http://imga.4399.com/upload_pic/2012/8/16/4399_13443938925.jpg'},
'打扮双胞胎姐妹':{'w':74884,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_15554890603.jpg'},
'关谷捏橘子':{'w':74829,'icon':'http://imga.4399.com/upload_pic/2012/8/13/4399_17351235560.jpg'},
'轩辕剑天之痕之唐嫣':{'w':74148,'icon':'http://imga.4399.com/upload_pic/2012/8/4/4399_11405274188.jpg'},
'CS挑战赛中文版':{'w':74047,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_14523768611.jpg'},
'老爹汉堡店':{'w':73973,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16504592667.jpg'},
'托马斯过河':{'w':73912,'icon':'http://imga.4399.com/upload_pic/2012/5/21/4399_09490863517.jpg'},
'喜羊羊月球冒险':{'w':73627,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20330799559.jpg'},
'拯救恐龙':{'w':73617,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10190561887.jpg'},
'城市追缉无敌版':{'w':73280,'icon':'http://imga.4399.com/upload_pic/2012/8/17/4399_15552885258.jpg'},
'爱美的美羊羊':{'w':72944,'icon':'http://imga.4399.com/upload_pic/7272/9/77258.jpg'},

'乞丐找老婆无敌版':{'w':72807,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20114167474.jpg'},
'灰太狼地下城':{'w':72345,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10014074080.jpg'},
'热血狂飙无敌版':{'w':72317,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16251968046.jpg'},
'冰火人冒险':{'w':72241,'icon':'http://imga.4399.com/upload_pic/7272/9/31307.jpg'},
'冰火小人闯关':{'w':71848,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16202277425.jpg'},
'数码宝贝格斗版3无敌版':{'w':71747,'icon':'http://imga.4399.com/upload_pic/2012/8/6/4399_11243735442.jpg'},
'变形金刚之战无敌版':{'w':71557,'icon':'http://imga.4399.com/upload_pic/2012/7/5/4399_15022700053.jpg'},
'4399火影世界':{'w':70987,'icon':'http://imga.4399.com/upload_pic/2012/8/9/4399_11553214235.jpg'},
'山地自行车3D版':{'w':70691,'icon':'http://imga.4399.com/upload_pic/7272/9/11487.jpg'},
'胖胖猫山洞大闯关2':{'w':70596,'icon':'http://imga.4399.com/upload_pic/2012/5/18/4399_10453009341.jpg'},
'经典90坦克大战':{'w':70334,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16055981233.jpg'},
'皇帝成长计划':{'w':69968,'icon':'http://imga.4399.com/upload_pic/2012/6/13/4399_15582065490.jpg'},
'4399醉西游':{'w':69962,'icon':'http://imga.4399.com/upload_pic/2012/8/27/4399_15145644078.jpg'},
'红太狼逼婚2':{'w':69787,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16415513736.jpg'},
'红球与绿球':{'w':69512,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20593057676.jpg'},
'CF名枪之巴雷特2':{'w':69456,'icon':'http://imga.4399.com/upload_pic/2012/8/10/4399_11354429396.jpg'},
'小球进洞':{'w':69413,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20523445065.jpg'},
'空姐阿Sue':{'w':69316,'icon':'http://imga.4399.com/upload_pic/7272/5/46428.jpg'},
'拳皇大战之饿狼来袭无敌版':{'w':69146,'icon':'http://imga.4399.com/upload_pic/7272/8/70197.jpg'},
'打屁股2升级版':{'w':68677,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_09514547230.jpg'},
'大便超人保卫战':{'w':68296,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16163862601.jpg'},
'高楼爆破无敌版':{'w':68123,'icon':'http://imga.4399.com/upload_pic/7272/7/65959.jpg'},
'敌对狙击中文版':{'w':67995,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10294310437.jpg'},
'喜羊羊切水果':{'w':67994,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_17160535411.jpg'},
'海绵宝宝大富翁':{'w':67513,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16383066053.jpg'},
'凡人修真2':{'w':67366,'icon':'http://imga.4399.com/upload_pic/2012/8/31/4399_10322270052.jpg'},
'英雄大作战V0.2.2':{'w':67363,'icon':'http://imga.4399.com/upload_pic/7272/3/28965.jpg'},
'开心斗地主':{'w':67101,'icon':'http://imga.4399.com/upload_pic/7272/4/36990.jpg'},
'一起来做布娃娃':{'w':66912,'icon':'http://imga.4399.com/upload_pic/7272/7/60281.jpg'},
'QQ水浒':{'w':66836,'icon':'http://imga.4399.com/upload_pic/2012/3/16/4399_09045851060.jpg'},
'雷神奥特曼无敌版':{'w':66522,'icon':'http://imga.4399.com/upload_pic/2012/4/9/4399_11513852196.jpg'},
'阿SUE在冰淇淋店打工':{'w':66265,'icon':'http://imga.4399.com/upload_pic/7272/5/45740.jpg'},
'图图找茬':{'w':65777,'icon':'http://imga.4399.com/upload_pic/7272/3/24434.jpg'},
'阿sue化妆比赛':{'w':65618,'icon':'http://imga.4399.com/upload_pic/7272/9/42883.jpg'},
'会说话的汤姆猫4':{'w':65329,'icon':'http://imga.4399.com/upload_pic/2012/6/27/4399_13514579384.jpg'},
'植物大战僵尸无敌战略版2':{'w':65119,'icon':'http://imga.4399.com/upload_pic/2012/3/23/4399_09135606291.jpg'},
'河马饲养员':{'w':64912,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10164095141.jpg'},
'幼儿园照顾小宝宝':{'w':64590,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20224763959.jpg'},
'图图快快跑':{'w':64562,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20561215447.jpg'},
'梦幻超人精装无敌版':{'w':64518,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10085999585.jpg'},
'蝴蝶连连看':{'w':64420,'icon':'http://imga.4399.com/upload_pic/7272/9/57474.jpg'},
'高塔吃钻石':{'w':64397,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_10104490287.jpg'},
'奥特曼狂扁小怪兽':{'w':63802,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10301554240.jpg'},
'4399画板':{'w':63626,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20381793821.jpg'},
'炎龙传说3炽凤速升级版':{'w':63533,'icon':'http://imga.4399.com/upload_pic/7272/7/61628.jpg'},
'冰火熊猫大冒险':{'w':63510,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16234479893.jpg'},
'野人部落2修改版':{'w':62918,'icon':'http://imga.4399.com/upload_pic/7272/7/65951.jpg'},
'蜡笔小新骑车2':{'w':62886,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10152540438.jpg'},
'超级玛丽中文版':{'w':62865,'icon':'http://imga.4399.com/upload_pic/7272/6/58993.jpg'},
'美羊羊收拾屋':{'w':62538,'icon':'http://imga.4399.com/upload_pic/7272/9/45878.jpg'},
'XEVOZ变种战士':{'w':62381,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16354063330.jpg'},
'屁王兄弟':{'w':62289,'icon':'http://imga.4399.com/upload_pic/7272/9/54547.jpg'},
'狂扁小豆丁无敌版':{'w':61812,'icon':'http://imga.4399.com/upload_pic/2012/5/22/4399_10083355284.jpg'},
'生化战士中文无敌版':{'w':61809,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_19573698494.jpg'},
'爆发的小火山':{'w':61664,'icon':'http://imga.4399.com/upload_pic/7272/9/54185.jpg'},
'TH穿越火线1.1':{'w':61622,'icon':'http://imga.4399.com/upload_pic/2012/4/27/4399_10423833718.jpg'},
'神奇的魔笔':{'w':61618,'icon':'http://imga.4399.com/upload_pic/2012/7/18/4399_10313257295.jpg'},
'变形金刚拯救星球':{'w':61565,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20310568453.jpg'},
'设计公主房':{'w':61548,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_15371781527.jpg'},
'轩辕剑之天之痕':{'w':61489,'icon':'http://imga.4399.com/upload_pic/2012/7/18/4399_19404921032.jpg'},
'阿SUE的小屋':{'w':61332,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_15393888882.jpg'},
'超级女忍者':{'w':61264,'icon':'http://imga.4399.com/upload_pic/2012/8/15/4399_17544341465.jpg'},
'高空弹力球':{'w':61015,'icon':'http://imga.4399.com/upload_pic/2012/8/17/4399_09182552315.jpg'},
'炸飞汤姆':{'w':60946,'icon':'http://imga.4399.com/upload_pic/2012/7/13/4399_16211543497.jpg'},
'巧虎的化妆舞会':{'w':60893,'icon':'http://imga.4399.com/upload_pic/7272/9/60139.jpg'},
'CF名枪之巴雷特':{'w':60836,'icon':'http://imga.4399.com/upload_pic/2012/5/24/4399_13594020402.jpg'},
'巫婆造女孩中文版':{'w':60660,'icon':'http://imga.4399.com/upload_pic/7272/10/51548.jpg'},
'钻头车挖宝石':{'w':60553,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10065282734.jpg'},
'巴拉啦小魔仙':{'w':60521,'icon':'http://imga.4399.com/upload_pic/2012/4/25/4399_10542330824.jpg'},
'朵拉摘星':{'w':60393,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16221004647.jpg'},
'混乱大枪战':{'w':60206,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16053144478.jpg'},
'混乱大枪战无敌版':{'w':60123,'icon':'http://imga.4399.com/upload_pic/7272/8/70119.jpg'},
'勇闯冰火岛阿狸无敌版':{'w':59992,'icon':'http://imga.4399.com/upload_pic/2012/8/2/4399_15020731074.jpg'},
'机器侠联盟':{'w':59973,'icon':'http://imga.4399.com/upload_pic/2012/8/10/4399_16494545206.jpg'},
'奥特曼变身':{'w':59814,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16440336461.jpg'},
'极限跑酷':{'w':59556,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20404337759.jpg'},
'黄金矿工单人版':{'w':59365,'icon':'http://imga.4399.com/upload_pic/2012/5/17/4399_15400396905.jpg'},
'大雄拯救机器猫无敌版':{'w':59243,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20570658432.jpg'},
'地震小恐龙':{'w':59049,'icon':'http://imga.4399.com/upload_pic/7272/8/71906.jpg'},
'战争进化史2无敌版':{'w':58974,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20385798275.jpg'},
'暴打火柴人':{'w':58962,'icon':'http://imga.4399.com/upload_pic/7272/10/14950.jpg'},
'雪怪双侠':{'w':58451,'icon':'http://imga.4399.com/upload_pic/2012/4/6/4399_19281246989.jpg'},
'4399画板2':{'w':58288,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_17012638735.jpg'},
'美女找茬5小家碧玉':{'w':58055,'icon':'http://imga.4399.com/upload_pic/2012/6/26/4399_12205749026.jpg'},
'帮精灵化妆':{'w':57804,'icon':'http://imga.4399.com/upload_pic/2012/8/15/4399_17474126478.jpg'},
'阿Sue做蛋糕':{'w':57206,'icon':'http://imga.4399.com/upload_pic/7272/9/2878.jpg'},
'神奇七侠':{'w':57151,'icon':'http://imga.4399.com/upload_pic/2012/7/12/4399_09490142633.jpg'},
'魂斗罗双打DIY完整版':{'w':57097,'icon':'http://imga.4399.com/upload_pic/7272/9/1253.jpg'},
'蓝色药水3':{'w':57069,'icon':'http://imga.4399.com/upload_pic/7272/9/61129.jpg'},
'可爱小灰灰':{'w':57017,'icon':'http://imga.4399.com/upload_pic/7272/9/74303.jpg'},
'数码宝贝3无敌版':{'w':56819,'icon':'http://imga.4399.com/upload_pic/2012/7/9/4399_19002892926.jpg'},
'海绵宝宝海底清洁工':{'w':56593,'icon':'http://imga.4399.com/upload_pic/7272/9/8734.jpg'},
'大炮轰气球3':{'w':56484,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_17501631999.jpg'},
'高速抢车':{'w':56420,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20495687850.jpg'},
'无敌小坦克':{'w':56349,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20490813109.jpg'},
'小怪物探险2':{'w':56323,'icon':'http://imga.4399.com/upload_pic/7272/9/51444.jpg'},
'制作汉堡':{'w':56203,'icon':'http://imga.4399.com/upload_pic/7272/9/1997.jpg'},
'坦克突击战2':{'w':56073,'icon':'http://imga.4399.com/upload_pic/2012/7/25/4399_18063974828.jpg'},
'黑太狼吃羊2':{'w':56072,'icon':'http://imga.4399.com/upload_pic/2012/5/14/4399_14314920831.jpg'},
'奥特曼格斗进化3':{'w':55534,'icon':'http://imga.4399.com/upload_pic/2012/4/11/4399_09443516121.jpg'},
'唤醒嗜睡的小人':{'w':55511,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_09520846310.jpg'},
'双猫战士2选关版':{'w':55239,'icon':'http://imga.4399.com/upload_pic/7272/9/49231.jpg'},
'两人打麻将':{'w':55126,'icon':'http://imga.4399.com/upload_pic/2012/5/16/4399_20344982286.jpg'},
'小婴儿逃出系列3':{'w':55062,'icon':'http://imga.4399.com/upload_pic/2012/6/4/4399_14384329304.jpg'},
'阿sue美甲店中文版':{'w':54491,'icon':'http://imga.4399.com/upload_pic/7272/8/79302.jpg'},
'喜羊羊可爱连连看':{'w':54089,'icon':'http://imga.4399.com/upload_pic/7272/8/81592.jpg'},
'植物战僵尸3D连连看':{'w':54088,'icon':'http://imga.4399.com/upload_pic/7272/6/50909.jpg'},
'双猫战士修改版':{'w':54021,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20355404395.jpg'},
'极速飞车2':{'w':53859,'icon':'http://imga.4399.com/upload_pic/2012/3/30/4399_10323497116.jpg'},
'神勇蜘蛛侠2':{'w':53792,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10123100882.jpg'},
'奥特曼打怪兽2无敌版':{'w':53749,'icon':'http://imga.4399.com/upload_pic/7272/9/72833.jpg'},
'美羊羊送水果':{'w':53744,'icon':'http://imga.4399.com/upload_pic/2012/7/19/4399_14021067299.jpg'},
'阿sue的粉色医院':{'w':53710,'icon':'http://imga.4399.com/upload_pic/7272/6/58694.jpg'},
'特种任务':{'w':53705,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16114022389.jpg'},
'乐高游戏嘉年华':{'w':53673,'icon':'http://imga.4399.com/upload_pic/2012/5/24/4399_10011130813.jpg'},
'花花连连看':{'w':53307,'icon':'http://imga.4399.com/upload_pic/7272/9/4781.jpg'},
'宠物连连看经典版2':{'w':53297,'icon':'http://imga.4399.com/upload_pic/7272/8/80972.jpg'},
'数码宝贝2无敌版':{'w':53216,'icon':'http://imga.4399.com/upload_pic/2012/5/22/4399_10092116534.jpg'},
'国王的勇士2':{'w':53123,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20000479035.jpg'},
'神魔遮天':{'w':53100,'icon':'http://imga.4399.com/upload_pic/2012/8/14/4399_18071265479.jpg'},
'皇家公主房':{'w':53083,'icon':'http://imga.4399.com/upload_pic/2012/8/16/4399_15160824862.jpg'},
'乐高积木岛':{'w':53007,'icon':'http://imga.4399.com/upload_pic/2012/6/11/4399_19283776191.jpg'},
'网络红人斗地主':{'w':52925,'icon':'http://imga.4399.com/upload_pic/7272/5/42859.jpg'},
'灰太狼卡丁车':{'w':52868,'icon':'http://imga.4399.com/upload_pic/7272/9/78718.jpg'},
'狗狗养成大作战':{'w':52384,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20472523152.jpg'},
'梦幻飞仙':{'w':52317,'icon':'http://imga.4399.com/upload_pic/2012/8/30/4399_09452967818.jpg'},
'吻新娘':{'w':52038,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16015358973.jpg'},
'彩色泡泡龙':{'w':52019,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16274908904.jpg'},
'悄悄放屁':{'w':51706,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20552726025.jpg'},
'乱斗三国':{'w':51605,'icon':'http://imga.4399.com/upload_pic/2012/5/11/4399_14133558757.jpg'},
'小火车载货':{'w':51385,'icon':'http://imga.4399.com/upload_pic/2012/4/5/4399_09085585980.jpg'},
'泡泡兔3无敌版':{'w':51220,'icon':'http://imga.4399.com/upload_pic/2012/6/29/4399_19113646796.jpg'},
'二战前线3无敌版':{'w':50902,'icon':'http://imga.4399.com/upload_pic/7272/9/75120.jpg'},
'手工爱心蛋糕':{'w':50804,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20070242214.jpg'},
'做奶酪汉堡包':{'w':50746,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_15512695049.jpg'},
'火柴人打羽毛球':{'w':50741,'icon':'http://imga.4399.com/upload_pic/2012/5/7/4399_19470180547.jpg'},
'喜羊羊VS灰太狼':{'w':50550,'icon':'http://imga.4399.com/upload_pic/7272/9/65791.jpg'},
'朵拉卡丁车':{'w':50328,'icon':'http://imga.4399.com/upload_pic/7272/8/83096.jpg'},
'益智乐高2中文版':{'w':50252,'icon':'http://imga.4399.com/upload_pic/2012/5/8/4399_15515617564.jpg'},
'霸气的蠕虫':{'w':50040,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_09232888608.jpg'},
'火娃冰娃闯关修改版':{'w':49890,'icon':'http://imga.4399.com/upload_pic/7272/9/34722.jpg'},
'杨幂与袁珊珊':{'w':49794,'icon':'http://imga.4399.com/upload_pic/2012/8/7/4399_17040308610.jpg'},
'二战前线2超级版':{'w':49629,'icon':'http://imga.4399.com/upload_pic/7272/9/19663.jpg'},
'朵拉的迷你高尔夫':{'w':49514,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10304703380.jpg'},
'双偷盗宝无敌版':{'w':49461,'icon':'http://imga.4399.com/upload_pic/7272/7/68724.jpg'},
'黄金铠甲3':{'w':49323,'icon':'http://imga.4399.com/upload_pic/2012/7/14/4399_14540764205.jpg'},
'高楼爆破2无敌版':{'w':49312,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_10114726796.jpg'},
'穿越火线':{'w':49104,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_14473976483.jpg'},
'战车撞僵尸无敌版':{'w':49088,'icon':'http://imga.4399.com/upload_pic/7272/8/75846.jpg'},
'忍者神龟之王者归来':{'w':49033,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_15264150922.jpg'},
'幼儿园小女孩':{'w':48942,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_15535846301.jpg'},
'快枪射僵尸':{'w':48887,'icon':'http://imga.4399.com/upload_pic/2012/7/25/4399_17355049333.jpg'},
'小软和鲜花':{'w':48869,'icon':'http://imga.4399.com/upload_pic/2012/6/30/4399_11043988861.jpg'},
'欢乐斗地主':{'w':48868,'icon':'http://imga.4399.com/upload_pic/7272/4/35005.jpg'},
'帕拉狗骑士':{'w':48828,'icon':'http://imga.4399.com/upload_pic/2012/5/10/4399_14425307759.jpg'},
'乱舞格斗1.0':{'w':48758,'icon':'http://imga.4399.com/upload_pic/2012/8/13/4399_16122980884.jpg'},
'暴力摩托':{'w':48685,'icon':'http://imga.4399.com/upload_pic/7272/9/12164.jpg'},
'豆豆大战豪华版':{'w':48616,'icon':'http://imga.4399.com/upload_pic/2012/8/15/4399_20190503448.jpg'},
'好玩斗地主':{'w':48520,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_16391873444.jpg'},
'4399你画我猜':{'w':48518,'icon':'http://imga.4399.com/upload_pic/2012/5/29/4399_12281921759.jpg'},
'火柴人进银行':{'w':48187,'icon':'http://imga.4399.com/upload_pic/7272/5/49523.jpg'},
'2039赛车手':{'w':48045,'icon':'http://imga.4399.com/upload_pic/7272/6/52272.jpg'},
'愤怒的冰人火人':{'w':47978,'icon':'http://imga.4399.com/upload_pic/2012/5/25/4399_14054375681.jpg'},
'沙滩越野车':{'w':47789,'icon':'http://imga.4399.com/upload_pic/7272/9/7522.jpg'},
'功夫成龙无敌版':{'w':47539,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_20232207919.jpg'},
'阿sue的海鲜烧烤':{'w':47534,'icon':'http://imga.4399.com/upload_pic/7272/8/70259.jpg'},
'巧虎自行车比赛':{'w':47452,'icon':'http://imga.4399.com/upload_pic/2012/6/4/4399_10285184307.jpg'},
'美甲时间':{'w':47341,'icon':'http://imga.4399.com/upload_pic/2012/3/15/4399_15551546164.jpg'},
'汤姆猫情人节':{'w':47295,'icon':'http://imga.4399.com/upload_pic/2012/3/12/4399_16503995156.jpg'},
'雷神奥特曼':{'w':47262,'icon':'http://imga.4399.com/upload_pic/2012/3/13/4399_09191062327.jpg'},
'超级玛丽无限生命版':{'w':47233,'icon':'http://imga.4399.com/upload_pic/7272/7/65700.jpg'},
'坏蛋冰淇淋':{'w':47220,'icon':'http://imga.4399.com/upload_pic/7272/5/44369.jpg'}
        }

'''
normal 和 weekend_holiday 是必须有的，
其他可以自己定义，然后在specific_visit_raw中定义对应的日期即可
'''
visits_by_hour = {'normal' : {0 : 20, 1 : 14, 2 : 12, 3 : 11, 4 : 10, 5 : 12, 
                              6 : 16, 7 : 24, 8 : 35, 9 : 50, 10 : 70, 11 : 70,  
                              12 : 80, 13 : 90, 14 : 70, 15 : 60, 16 : 70, 17 : 70, 
                              18 : 85, 19 : 100, 20 : 90, 21 : 80, 22 : 60, 23 : 40},
                  'weekend_holiday' : {0 : 30, 1 : 18, 2 : 14, 3 : 11, 4 : 10, 5 : 12, 
                                       6 : 16, 7 : 24, 8 : 35, 9 : 60, 10 : 90, 11 : 120,  
                                       12 : 140, 13 : 130, 14 : 150, 15 : 130, 16 : 110, 17 : 100, 
                                       18 : 110, 19 : 120, 20 : 100, 21 : 90, 22 : 70, 23 : 50},
                  'cusotomized' : {0 : 30, 1 : 18, 2 : 14, 3 : 11, 4 : 10, 5 : 12, 
                                       6 : 16, 7 : 24, 8 : 35, 9 : 60, 10 : 90, 11 : 120,  
                                       12 : 140, 13 : 130, 14 : 150, 15 : 130, 16 : 110, 17 : 100, 
                                       18 : 110, 19 : 120, 20 : 100, 21 : 90, 22 : 70, 23 : 50}
                  }

specific_visit_raw = {2012: {'weekend_holiday' : ['7.1-8.31', '9.30-10.7'], 'normal' : ['9.29', '10.8-10.10'], 'cusotomized' : ['7.10']}}

places = {}
provinces = {}
all_place_weight = 0
def construct_place_conf():
    global all_place_weight
    for area in areas:
        area_conf = areas[area]
        place_conf = {}
        places[area] = place_conf
        place_conf['w_start'] = all_place_weight
        place_conf['brief'] = area_conf[0]
        all_place_weight += area_conf[1]
        place_conf['w_end'] = all_place_weight - 1
        place_conf['x'] = area_conf[2]
        place_conf['y'] = area_conf[3]
        
        province_conf = None
        if len(area_conf) == 5:
            province_conf = provinces.get(area_conf[3])
            if province_conf is None:
                province_conf = {}
                provinces[area_conf[4]] = province_conf
        else:
            province_conf = {}
            provinces[area] = province_conf
        province_conf['w'] = province_conf.get('w', 0) + area_conf[1]
        province_conf['x'] = province_conf.get('x', 0) + area_conf[2]
        province_conf['y'] = province_conf.get('y', 0) + area_conf[3]
        province_conf['n'] = province_conf.get('n', 0) + 1
    all_place_weight = 0
    for province in provinces:
        province_conf = provinces[province]
        province_conf['w_start'] = all_place_weight
        all_place_weight += province_conf['w']
        province_conf['w_end'] = all_place_weight - 1
        province_conf['x'] /= province_conf['n']
        province_conf['y'] /= province_conf['n']
        brief = provinceName.get(province)
        if brief is None:
            province_conf['brief'] = ''
        else:
            province_conf['brief'] = brief
        
    
all_game_weight = 0
def construct_game_conf():
    global all_game_weight
    for game in games:
        game_conf = games[game]
        game_conf['w_start'] = all_game_weight
        all_game_weight += game_conf['w']
        game_conf['w_end'] = all_game_weight - 1


def specificDateVisit(year, date_range):
    dates = date_range.split('-')
    startDateStr = dates[0]
    if len(dates) == 1 : 
        endDateStr = startDateStr
    else:
        endDateStr = dates[1]
    startDate = startDateStr.split('.')
    endDate = endDateStr.split('.')
    startTime = int(time.mktime(datetime.datetime(year, int(startDate[0]), int(startDate[1])).timetuple()))
    endTime = int(time.mktime(datetime.datetime(year, int(endDate[0]), int(endDate[1])).timetuple()))
    result = set()
    for i in range(startTime, endTime + 1, 86400):
        result.add(i)
    return result;
    
def construct_specific_visit():
    for year in specific_visit_raw:
        specific_visit[year] = {}
        for visit_type in specific_visit_raw[year]:
            specific_visit[year][visit_type] = set()
            for date_range in specific_visit_raw[year][visit_type]:
                specific_visit[year][visit_type] = specific_visit[year][visit_type].union(specificDateVisit(year, date_range))
            
specific_visit = {}

def printDic(a, b):
    print b
    for i in a:
        print '\t', i, a[i]
    print


urls = (r'/show4399', 'RequestShow', 
        r'/provinceWeight', 'ProvinceWeight')
#,
#        r'/(.*)', 'StaticResource')
render = web.template.render('template/')
app = web.application(urls, globals())

construct_specific_visit()
printDic(specific_visit, 'specific_visit')
construct_game_conf()
printDic(games, 'games')
construct_place_conf()
printDic(places, 'places')
printDic(provinces, 'provinces')
if showByProvince:
    places = provinces

visit = None
today = None
show_time = datetime.datetime.now()

#class StaticResource():
#    def GET(self, name):
#        print 'name', name
#        return render.name()
    
class ProvinceWeight():
    def GET(self):
        web.header('Content-Type','text/html; charset=utf-8', unique=True) 
        return json.dumps(dict([(i[0], dict([('w', i[1]['w']), ('brief', provinceName.get(i[0]))])) for i in provinces.items()]), ensure_ascii = False)

#        return json.dumps(provinces, ensure_ascii = False)

class RequestShow():
    def GET(self):
        web.header('Content-Type','text/html; charset=utf-8', unique=True) 
        return json.dumps(self.getShowDetail(), ensure_ascii = False)
    
    def getShowDetail(self):
        global visit
        global today
        global show_time
        t_today = datetime.date.today()
        if today != t_today:
            today = t_today
            sv = specific_visit.get(today.year)
            if sv is not None:
                d = int(time.mktime(datetime.datetime(today.year, today.month, today.day).timetuple()))
                for visit_type in sv:
                    if d in sv[visit_type]:
                        visit = visits_by_hour[visit_type]
                        break
            if visit is None:
                wd = t_today.weekday()
                if wd >= 5:
                    visit = visits_by_hour['weekend_holiday']
                else:
                    visit = visits_by_hour['normal']
        now = datetime.datetime.now()
        w1 = visit[now.hour]
        if now.hour == 23:
            w2 = visit[now.hour]
        else:
            w2 = visit[now.hour + 1]
        w = w1 * now.minute / 60.0 + w2 * (60 - now.minute) / 60.0
        
        game = None
        if (now - show_time).total_seconds() > 60.0 / (w * speedRate):
            game_w = random.randint(0, all_game_weight - 1)
#            print now
            for g in games:
                if game_w >= games[g]['w_start'] and game_w <= games[g]['w_end']:
                    game = g
                    break
#            print game_w, game, games[game]
            place_w = random.randint(0, all_place_weight - 1)
            for p in places:
                if place_w >= places[p]['w_start'] and place_w <= places[p]['w_end']:
                    place = p
                    break
#            print place_w, place, places[place], '\n'
            show_time = now
        if game is not None:
            if showByProvince :
                offset_x = random.randint(1, 11) - 6
                offset_y = random.randint(1, 11) - 6
            else :
                offset_x = random.randint(1, 7) - 4
                offset_y = random.randint(1, 7) - 4
            return {'game' : game, 
                    'icon' : games[game]['icon'], 
                    'place' : places[place]['brief'], 
                    'name' : place, 
                    'x' : places[place]['x'] + offset_x, 
                    'y' : places[place]['y'] + offset_y,
                    }
        
        

if __name__ == '__main__':
    if len(sys.argv) > 1:
        app.run()
    else:
        rp = RequestShow()
        while True:
            dic = rp.getShowDetail()
            if dic is not None:
                printDic(dic, datetime.datetime.now())
            time.sleep(0.1)
            
    
    