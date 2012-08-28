# coding=utf-8
'''
Created on Jul 6, 2012

@author: root         
'''

import datetime, time, random, web, sys, json


speedRate = 4
showByProvince = True
areas = {
          '上海':('sh',10, 780,470), 
          '北京':('bj',10, 690, 320),
          '天津':('tj',8,700,330),
          '重庆':('cq',8,565,520),

          '内蒙古':('nmg',3,610,320),
          '新疆':('xj',3,310,260),
          '西藏':('xz',3,350,490),
          '宁夏':('nx',3,550,360),
          '广西':('gx',4,590,630),

          '厦门':('xm',6,755,570,'福建'),
		  '福州':('fz',5,750,540,'福建'),
          '宁德':('nd',4,750,500,'福建'),
		  '莆田':('pt',6,640,600,'福建'),
		  '泉州':('qz',4,320,540,'福建'),
		  '漳州':('zz',3,650,250,'福建'),
		  '龙岩':('ly',6,500,250,'福建'),
		  '南平':('np',4,520,350,'福建'),
		  '三明':('sm',3,250,360,'福建'),
		  
		  '广州':('gz',7, 670, 630, '广东'), 
          '哈尔滨':('heb',5,800,200,'黑龙江'),
          '长春':('cc',5,780,280,'吉林'),
          '沈阳':('sy',5,780,285,'辽宁'),
          '石家庄':('sjz',7,670,365,'河北'),
          '太原':('ty',5,635,380,'山西'),
          '西宁':('xn',3,450,410,'青海'),
          '济南':('jn',7,700,390,'山东'),
          '郑州':('zz',5,665,430,'河南'),
          '南京':('nj',6,750,460,'江苏'),
          '合肥':('hf',4,720,480,'安徽'),
          '杭州':('hz',7,760,500,'浙江'),
          '南昌':('nc',5,700,530,'江西'),
          '长沙':('cs',6,650,540,'湖南'),
          '武汉':('wh',6,670,500,'湖北'),
          '海口':('hk',6,620,690,'海南'),
          '兰州':('lz',3,520,410,'甘肃'),
          '西安':('xa',5,590,350,'陕西'),
          '成都':('cd',6,520,500,'四川'),
          '贵阳':('gy',5,560,575,'贵州'),
          '昆明':('km',5,500,600,'云南'),
          '台北':('tb',60,800,580,'台湾')
        }

provinceName = {'新疆' : 'xj', '西藏' : 'xz', '青海':'qh', '甘肃':'gs', '内蒙古':'nmg', '黑龙江':'hlj', '吉林':'jl', '辽宁':'ln', '四川':'sc', 
                 '陕西':'sx', '江苏':'js', '浙江':'zj', '台湾':'tw', '安徽':'ah','福建':'fj', '江西':'jx','广东':'gd','海南':'hn','广西':'gx',
                 '湖南':'hun', '贵州':'gz','云南':'yn','宁夏':'nx','山西':'shx','河南':'hen','湖北':'hb','重庆':'cq','河北':'heb','天津':'tj',
                 '北京':'bj','山东':'sd','上海':'sh'             
                }

games = {
         '造梦西游':{'w' : 10, 'icon' : 'http://s4.img4399.com/1/apps/155.gif'},
         '海贼王':{'w' : 8, 'icon' : 'http://s4.img4399.com/1/apps/800110.gif'}, 
         '4399开心农场':{'w' : 15, 'icon' : 'http://s4.img4399.com/1/apps/800112.gif'}, 
         '穿越三国':{'w' : 12, 'icon' : 'http://s4.img4399.com/1/apps/800105.gif'},
         '疯狂宠物':{'w' : 12, 'icon' : 'http://s4.img4399.com/1/apps/800106.gif'},
         '美食大战老鼠':{'w' : 12, 'icon' : 'http://s4.img4399.com/1/apps/800108.gif'},
         '神魔斗':{'w' : 12, 'icon' : 'http://s4.img4399.com/1/apps/100225.gif'},
         '4399神仙道':{'w' : 12, 'icon' : 'http://s4.img4399.com/1/apps/800103.gif'},
         '4399火影世界':{'w' : 12, 'icon' : 'http://s4.img4399.com/1/apps/800111.gif'},
         '洛克王国':{'w' : 12, 'icon' : 'http://s4.img4399.com/1/apps/100222.gif'},
         '海贼王':{'w' : 12, 'icon' : 'http://s4.img4399.com/1/apps/1005122.gif'},
         '飘渺西游':{'w' : 12, 'icon' : 'http://s4.img4399.com/1/apps/100150.gif'},
         '花园抢战':{'w' : 12, 'icon' : 'http://s4.img4399.com/1/apps/100162.gif'},
         '百炼成仙':{'w' : 12, 'icon' : 'http://s4.img4399.com/1/apps/100227.gif'},
         '海贼大冒险':{'w' : 12, 'icon' : 'http://s4.img4399.com/1/apps/100192.gif'}
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
            
    
    