# coding=utf-8
'''
Created on Jul 6, 2012

@author: root         
'''

import datetime, time, random, web, sys, json


speedRate = 1
showByProvince = True
areas = {'厦门':(6, 30, 50, '福建'), '泉州':(3, 41, 62, '福建'), '福州':(5, 20, 80, '福建'),
          '广州':(20, 130, 150, '广东'), '梅州':(2, 140, 160, '广东'), '珠海':(4, 120, 180, '广东'),
          '上海':(30, 30, 50), '北京':(25, 45, 63)}

games = {'卡布西游':{'w' : 10, 'icon' : 'ga.png'}, '神魔遮天':{'w' : 8, 'icon' : 'gb.png'}, 
         '植物大战僵尸':{'w' : 15, 'icon' : 'gc.png'} , '4399开心农场':{'w' : 12, 'icon' : 'gd.png'}}

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
        all_place_weight += area_conf[0]
        place_conf['w_end'] = all_place_weight - 1
        place_conf['x'] = area_conf[1]
        place_conf['y'] = area_conf[2]
        
        province_conf = None
        if len(area_conf) == 4:
            province_conf = provinces.get(area_conf[3])
            if province_conf is None:
                province_conf = {}
                provinces[area_conf[3]] = province_conf
        else:
            province_conf = {}
            provinces[area] = province_conf
        province_conf['w'] = province_conf.get('w', 0) + area_conf[0]
        province_conf['x'] = province_conf.get('x', 0) + area_conf[1]
        province_conf['y'] = province_conf.get('y', 0) + area_conf[2]
        province_conf['n'] = province_conf.get('n', 0) + 1
    all_place_weight = 0
    for province in provinces:
        province_conf = provinces[province]
        province_conf['w_start'] = all_place_weight
        all_place_weight += province_conf['w']
        province_conf['w_end'] = all_place_weight - 1
        province_conf['x'] /= province_conf['n']
        province_conf['y'] /= province_conf['n']
    
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

class ProvinceWeight():
    def GET(self):
        web.header('Content-Type','text/html; charset=utf-8', unique=True) 
        return json.dumps(dict([(i[0], i[1]['w']) for i in provinces.items()]), ensure_ascii = False)

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
                    'place' : place, 
                    'x' : places[place]['x'] + offset_x, 
                    'y' : places[place]['y'] + offset_y
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
            
    
    
