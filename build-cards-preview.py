# -*- coding: utf-8 -*-
"""Создаёт страницу /card-preview — локальная проверка карточек для Twitter/X.

Читает метатеги прямо из ваших html-файлов и рисует карточку так, как её
покажет X. Адрес картинки jezebel.news подменяется на localhost ТОЛЬКО
для показа — сами файлы не трогаются.

Запуск:  python build-cards-preview.py
Открыть: http://localhost:8996/card-preview
"""
import os, re, glob, json

HERE = os.path.dirname(os.path.abspath(__file__))
DOMAIN = "https://jezebel.news"

slugs = []
for f in sorted(glob.glob(os.path.join(HERE, "*.html"))):
    name = os.path.basename(f)
    if name in ("card-preview.html",):
        continue
    try:
        h = open(f, encoding="utf-8").read()
    except Exception:
        continue
    if 'id="article-detail-container"' not in h:
        continue
    m = re.search(r'<h1 class="title">(.*?)</h1>', h, re.S)
    title = re.sub(r"<[^>]+>", "", m.group(1)).strip() if m else name[:-5]
    ours = "МЕТАТЕГИ" in h and "assets/ext/" in h
    slugs.append({"slug": name[:-5], "title": title[:90], "ours": ours})

PAGE = """<!doctype html>
<html lang="ru"><head><meta charset="utf-8">
<title>Проверка карточек для X / Twitter</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#0f1419;color:#e7e9ea;font:15px/1.5 -apple-system,Segoe UI,Roboto,sans-serif}
header{padding:18px 24px;border-bottom:1px solid #2f3336;position:sticky;top:0;background:#0f1419;z-index:5}
h1{margin:0 0 4px;font-size:19px}
.sub{color:#71767b;font-size:13px}
.wrap{display:flex;gap:24px;padding:24px;align-items:flex-start;flex-wrap:wrap}
.left{flex:1 1 380px;min-width:340px}
.right{flex:1 1 460px;min-width:340px;position:sticky;top:96px}
select,input{width:100%;padding:10px 12px;background:#202327;color:#e7e9ea;
 border:1px solid #2f3336;border-radius:8px;font-size:14px;margin-bottom:10px}
.card{border:1px solid #2f3336;border-radius:16px;overflow:hidden;background:#000;max-width:520px}
.card .ph{width:100%;aspect-ratio:1.91/1;object-fit:cover;display:block;background:#16181c}
.card .bar{padding:10px 14px;border-top:1px solid #2f3336}
.card .t{font-size:15px;font-weight:600;line-height:1.3;margin:0 0 3px;
 display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.card .d{font-size:14px;color:#71767b;margin:0 0 5px;
 display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.card .u{font-size:13px;color:#71767b}
.chk{margin-top:18px;border:1px solid #2f3336;border-radius:12px;padding:14px 16px;background:#16181c}
.chk h3{margin:0 0 10px;font-size:14px;color:#71767b;font-weight:600;text-transform:uppercase;letter-spacing:.4px}
.row{display:flex;gap:9px;padding:4px 0;font-size:14px;align-items:flex-start}
.ok{color:#00ba7c}.bad{color:#f4212e}.warn{color:#ffd400}
.row code{color:#8ecdf8;font-size:12.5px;word-break:break-all}
.tags{margin-top:18px;border:1px solid #2f3336;border-radius:12px;padding:14px 16px;background:#16181c;
 font-family:ui-monospace,Consolas,monospace;font-size:12.5px;white-space:pre-wrap;word-break:break-all;color:#a9b3ba}
.count{color:#71767b;font-size:13px;margin-bottom:10px}
</style></head><body>
<header>
  <h1>Проверка карточек для X / Twitter</h1>
  <div class="sub">Метатеги читаются из ваших файлов. Домен <b>jezebel.news</b> подменяется
   на localhost только для показа картинки — файлы не меняются.</div>
</header>
<div class="wrap">
  <div class="left">
    <div class="count" id="count"></div>
    <input id="q" placeholder="Поиск по заголовку…">
    <select id="sel" size="24"></select>
  </div>
  <div class="right">
    <div class="card">
      <img class="ph" id="ph" alt="">
      <div class="bar">
        <p class="t" id="ct">—</p>
        <p class="d" id="cd">—</p>
        <div class="u" id="cu">—</div>
      </div>
    </div>
    <div class="chk"><h3>Проверка</h3><div id="chk"></div></div>
    <div class="tags" id="tags"></div>
  </div>
</div>
<script>
const DOMAIN = %DOMAIN%;
const ITEMS  = %ITEMS%;
const sel=document.getElementById('sel'), q=document.getElementById('q');
document.getElementById('count').textContent = 'Статей: ' + ITEMS.length;

function fill(filter){
  sel.innerHTML='';
  ITEMS.filter(i=>!filter||i.title.toLowerCase().includes(filter)||i.slug.includes(filter))
    .forEach(i=>{const o=document.createElement('option');o.value=i.slug;
      o.textContent=(i.ours?'★ ':'  ')+i.title;sel.appendChild(o);});
  if(sel.options.length) show(sel.options[0].value);
}
q.oninput=()=>fill(q.value.trim().toLowerCase());
sel.onchange=()=>show(sel.value);

function local(u){ return u ? u.replace(DOMAIN, location.origin) : ''; }

async function show(slug){
  const html = await (await fetch('/'+slug)).text();
  const doc  = new DOMParser().parseFromString(html,'text/html');
  const get  = n => { const e=doc.querySelector('meta[name="'+n+'"],meta[property="'+n+'"]');
                      return e ? e.getAttribute('content') : null; };
  const card=get('twitter:card'), title=get('twitter:title')||get('og:title'),
        desc=get('twitter:description')||get('og:description'),
        img =get('twitter:image')||get('og:image'), url=get('og:url'),
        dom =get('twitter:domain');

  document.getElementById('ct').textContent = title || '(нет заголовка)';
  document.getElementById('cd').textContent = desc  || '(нет описания)';
  document.getElementById('cu').textContent = 'From ' + (dom || '—');
  const ph=document.getElementById('ph');
  ph.removeAttribute('src'); ph.alt='';
  let loaded=null;
  if(img){ ph.src=local(img);
           loaded=new Promise(r=>{ph.onload=()=>r(true);ph.onerror=()=>r(false);}); }

  const rows=[];
  const add=(ok,txt,extra)=>rows.push('<div class="row"><span class="'+
     (ok===true?'ok':ok===false?'bad':'warn')+'">'+(ok===true?'✔':ok===false?'✘':'!')+
     '</span><div>'+txt+(extra?'<br><code>'+extra+'</code>':'')+'</div></div>');

  add(card==='summary_large_image', card==='summary_large_image'
      ? 'Тип карточки: крупная с фото' : 'twitter:card не summary_large_image', card||'тега нет');
  add(!!title, title?'Заголовок есть ('+title.length+' знаков)':'Нет заголовка');
  if(desc) add(desc.length<=200||'warn', 'Описание: '+desc.length+' знаков'+
      (desc.length>200?' — X обрежет примерно на 200':''));
  else add(false,'Нет описания');
  add(!!url,'Адрес страницы', url||'тега нет');
  add(!!img,'Ссылка на картинку', img||'тега нет');
  document.getElementById('chk').innerHTML=rows.join('');

  const names=['twitter:card','twitter:site','twitter:title','twitter:description',
               'twitter:image','twitter:domain','og:type','og:site_name','og:title',
               'og:description','og:url','og:image','og:image:width','og:image:height'];
  document.getElementById('tags').textContent =
    names.map(n=>n.padEnd(22)+(get(n)||'— нет —')).join('\\n');

  if(loaded){ const okimg = await loaded;
    document.getElementById('chk').innerHTML += '<div class="row"><span class="'+
      (okimg?'ok':'bad')+'">'+(okimg?'✔':'✘')+'</span><div>'+
      (okimg? 'Картинка открывается (проверено локально, '+ph.naturalWidth+'×'+ph.naturalHeight+')'
            : 'Картинка НЕ открывается по этому адресу')+'</div></div>'; }
}
fill('');
</script></body></html>
"""

page = PAGE.replace("%DOMAIN%", json.dumps(DOMAIN)).replace("%ITEMS%", json.dumps(slugs, ensure_ascii=False))
open(os.path.join(HERE, "card-preview.html"), "w", encoding="utf-8").write(page)
print("страница создана: card-preview.html")
print("  статей в списке: %d (звёздочкой помечены наши)" % len(slugs))
print("  открыть: http://localhost:8996/card-preview")
