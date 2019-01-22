import requests
import re
shuhao=str(input('请输入数号：'))
url='http://www.17k.com/list/'+shuhao+'.html'
r=requests.get(url)
r.encoding="utf-8"
#print(r.text)
tt=re.findall(r'<h1 class="Title">(.*?)</h1>',r.text)
zhanjie=re.findall(r'<a target="_blank" href="(.*?)" title=',r.text)
shu_ming=re.findall(r'<meta name="Keywords" content="(.*?),',r.text)
if len(tt)==0:exit('错误的书号')
print('网址：'+url)
print('小说将保存到d盘根目录！')
print('正在爬取小说：《%s》'%shu_ming[0])
fb=open('d:/ %s.txt'%tt,'w',encoding='utf-8')
fb.write(shu_ming[0])
for m in zhanjie:
    #print(m)
    m='http://www.17k.com/'+m
    #print(m)
    sxnr=requests.get(m)
    sxnr.encoding = 'utf-8'
    #print(sxnr.text)
    sxzw=re.findall(r'<div class="p">([\s\S]*?)<div class="author-say"></div>',sxnr.text)[0]
    sxzj=re.findall(r'<h1>([\s\S]*?)</h1>',sxnr.text)[0]
    sxzw=sxzw.replace('\n&#12288;&#12288;','')
    sxzw = sxzw.replace('<br />','\n')
    sxzw = sxzw.replace('&#12288;&#12288;', '')
    sxzw = sxzw.replace('&quot;', '')
    fb.write(sxzj)
    fb.write('\n')
    fb.write(sxzw)
    fb.write('\n')
    fb.write('\n')
    #print(sxzj)
    print('>',end='')
print('爬取完毕！')
fb.close()
