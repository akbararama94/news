# -*- coding: utf-8 -*-
"""Пересобирает страницу статьи из JSON-файла.

Как пользоваться:
    python build-article.py article-robots.json

Что можно править в JSON:
    title      — заголовок
    subtitle   — подзаголовок под заголовком
    date       — дата в формате ГГГГ-ММ-ДД
    author     — подпись автора
    section    — рубрика: label (название) и url (адрес рубрики)
    hero       — большое фото вверху: url, caption (подпись), credit (чьё фото)
    body       — тело статьи, по порядку. Три вида блоков:
                   {"type": "p",     "text": "абзац"}
                   {"type": "h",     "text": "подзаголовок"}
                   {"type": "photo", "url": "...", "caption": "...", "credit": "..."}
                 Чтобы переставить фото — просто передвиньте его блок в списке.
    sources    — список источников внизу: name и url
    pin_on     — на каких страницах закрепить первой (index / latest / рубрика)

После правки JSON запустите скрипт — страница пересоберётся, закрепление обновится.
"""
import os, re, sys, json, html as ht, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE = "bari-weiss-cbs-hits-a-new-low.html"   # страница-образец, из неё берётся шапка и подвал


def esc(s):
    return ht.escape(str(s), quote=True)


def human_date(iso):
    try:
        return datetime.date.fromisoformat(iso).strftime("%B %d, %Y").replace(" 0", " ")
    except ValueError:
        return iso


def match_tag(s, start, tag):
    pat = re.compile(r"</?%s\b" % tag)
    depth, i = 0, start
    while True:
        m = pat.search(s, i)
        if not m:
            return -1
        depth += 1 if m.group(0) == "<" + tag else -1
        i = m.end()
        if depth == 0:
            return s.find(">", i) + 1


IMG_FAIL = "this.closest('figure')&&(this.closest('figure').style.display='none')"

CSS = """
<style>
#article-detail-container .mv-ad-box,#article-detail-container [class*="mv-video"],
#article-detail-container [id*="mv_slot"],#article-detail-container .adthrive,
#article-detail-container [class*="ad-slot"]{display:none !important;height:0 !important;margin:0 !important}
#article-detail-container .copy.entry{overflow:visible !important}
#article-detail-container .copy.entry p{margin:0 0 1.15em;font-size:19px;line-height:1.65}
#article-detail-container .copy.entry h2{font-size:26px;line-height:1.25;margin:1.9em 0 .7em;
 font-weight:bold;color:#111;border-left:5px solid #c00;padding-left:14px}
#article-detail-container .copy.entry p:first-of-type::first-letter{
 float:left;font-size:64px;line-height:.82;padding:4px 10px 0 0;font-weight:bold;color:#c00}
#article-detail-container figure{margin:1.8em 0;padding:0}
#article-detail-container figure img{width:100%;height:auto;display:block;background:#eee}
#article-detail-container figcaption{font-size:13px;color:#777;font-style:italic;line-height:1.45;padding:7px 2px 0}
#article-detail-container .video-embed{position:relative;padding-bottom:56.25%;height:0;margin:1.8em 0;background:#000}
#article-detail-container .video-embed iframe{position:absolute;top:0;left:0;width:100%;height:100%;border:0}
#article-detail-container .lead figure{margin-top:0}
#article-detail-container .source-note{margin:34px 0 0;padding:10px 0 0;border-top:1px solid #ddd;
 font-size:12px;line-height:1.5;color:#999}
#article-detail-container .source-note a{color:#999;text-decoration:underline}
</style>
"""


def figure(ph):
    cap = (ph.get("caption") or "").strip()
    credit = (ph.get("credit") or "").strip()
    text = cap
    if credit:
        text = (cap + " &middot; Photo: " + esc(credit)) if cap else "Photo: " + esc(credit)
    else:
        text = esc(cap)
    if cap:
        text = esc(cap) + ((" &middot; Photo: " + esc(credit)) if credit else "")
    return ('<figure><img src="%s" alt="%s" loading="lazy" referrerpolicy="no-referrer" '
            'onerror="%s" /><figcaption>%s</figcaption></figure>'
            % (esc(ph["url"]), esc(cap[:120]), IMG_FAIL, text))


def video(url):
    return ('<div class="video-embed"><iframe src="%s" loading="lazy" allowfullscreen '
            'allow="accelerometer; encrypted-media; picture-in-picture"></iframe></div>' % esc(url))


def build(data):
    tpl = open(os.path.join(HERE, TEMPLATE), encoding="utf-8").read()
    base = tpl
    while True:
        m = re.search(r'<div post_id="[^"]*" class="scroll-article-container hide"', base)
        if not m:
            break
        e = match_tag(base, m.start(), "div")
        if e == -1:
            break
        base = base[:m.start()] + base[e:]
    a_start = base.find("<article url=")
    a_end = match_tag(base, a_start, "article")
    head, tail = base[:a_start], base[a_end:]

    parts = []
    for b in data["body"]:
        t = b.get("type")
        if t == "h":
            parts.append("<h2>%s</h2>" % esc(b["text"]))
        elif t == "p":
            parts.append("<p>%s</p>" % esc(b["text"]))
        elif t == "photo":
            parts.append(figure(b))
        elif t == "video":
            parts.append(video(b["url"]))
    body_html = "\n        ".join(parts)

    srcs = ", ".join('<a href="%s" target="_blank" rel="noopener">%s</a>' % (esc(s["url"]), esc(s["name"]))
                     for s in data.get("sources", []))
    note = ("Reporting drawn from " + srcs + ". ") if srcs else ""
    d = human_date(data["date"])
    sec = data.get("section", {"label": "Latest", "url": "/latest"})

    block = """<article url="/{slug}" id="article-detail-container">
    <div class="header">
        <h1 class="title">{title}</h1>
        <h2 class="subtitle">{sub}</h2>
        <div class="bylinepublished">By <a href="/">{author}</a> &nbsp;|&nbsp; {date}</div>
        <b class="type"><a class='non' href="{shref}">{slabel}</a></b>
    </div>
    <div class="lead">{lead}</div>
    <div class="copy entry manual-ads">
        {body}
        <div class="source-note">{note}Text &copy; {author}.
            Photographs &copy; their respective owners, shown here by link and used for reference only.</div>
    </div>
</article>""".format(slug=esc(data["slug"]), title=esc(data["title"]), sub=esc(data["subtitle"]),
                     author=esc(data["author"]), date=d, shref=esc(sec["url"]), slabel=esc(sec["label"]),
                     lead=figure(data["hero"]), body=body_html, note=note)

    page = head + block + tail
    t = esc(data["title"])
    page = re.sub(r"<title>.*?</title>", "<title>" + t + "</title>", page, count=1, flags=re.S)
    page = re.sub(r'(<meta property="og:title" content=")[^"]*"', r"\1" + t + '"', page)
    page = re.sub(r'(<meta name="description" content=")[^"]*"', r"\1" + esc(data["subtitle"]) + '"', page)
    page = re.sub(r'(<meta property="og:description" content=")[^"]*"', r"\1" + esc(data["subtitle"]) + '"', page)
    page = re.sub(r'<link rel="canonical" href="[^"]*"',
                  '<link rel="canonical" href="/' + esc(data["slug"]) + '"', page)
    return page.replace("</head>", CSS + "</head>", 1)


PIXEL = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
HDR_RE = re.compile(r'<div[^>]*class="[^"]*articles-header[^"]*"[^>]*>(?:\s|<(?!a\b)[^>]*>)*'
                    r'<a[^>]*class="[^"]*hed[^"]*"[^>]*>(.*?)</a>', re.S)
UL_RE = re.compile(r'<ul[^>]*class="[^"]*articles[^"]*"[^>]*>')
SKIP = ["resurrected", "recommended for you", "most popular", "trending"]


def pin(data):
    d = human_date(data["date"])
    card = ('<li class="grid-x grid-padding-x" data-pinned="{slug}"><a x="sam" '
            'class="large-3 medium-3 cell image" href="/{slug}" aria-label="{t}">'
            '<img class="no-lazy lazyload" src="{px}" alt="{t}" data-src="{img}" decoding="async" />'
            '<noscript><img class="no-lazy" src="{img}" alt="{t}" data-eio="l" /></noscript>'
            '</a><a class="auto cell copy-container" href="/{slug}">'
            '<b class="title">{t}</b><b class="byline">By {author}</b>'
            '<b class="time" data-iso-date="{iso}T09:00:00+00:00">{d}</b></a></li>').format(
        slug=esc(data["slug"]), t=esc(data["title"]), px=PIXEL, img=esc(data["hero"]["url"]),
        author=esc(data["author"]), iso=data["date"], d=d)

    for name in data.get("pin_on", []):
        p = os.path.join(HERE, name + ".html")
        if not os.path.isfile(p):
            print("  ! нет страницы %s.html" % name)
            continue
        h = open(p, encoding="utf-8").read()
        h = re.sub(r'<li class="grid-x grid-padding-x" data-pinned="%s">.*?</li>' % re.escape(data["slug"]),
                   "", h, flags=re.S)
        target = None
        for m in HDR_RE.finditer(h):
            lab = re.sub(r"<[^>]+>", "", m.group(1)).strip()
            if any(k in lab.lower() for k in SKIP):
                continue
            u = UL_RE.search(h, m.end())
            if u:
                target = (lab, u.end())
                break
        if not target:
            print("  ! на %s.html не найден главный блок" % name)
            continue
        lab, pos = target
        open(p, "w", encoding="utf-8").write(h[:pos] + card + h[pos:])
        print("  закреплена первой в блоке '%s' на /%s" % (lab, name))


if __name__ == "__main__":
    src = sys.argv[1] if len(sys.argv) > 1 else "article-robots.json"
    data = json.load(open(os.path.join(HERE, src), encoding="utf-8"))
    out = os.path.join(HERE, data["slug"] + ".html")
    open(out, "w", encoding="utf-8").write(build(data))
    words = sum(len(b["text"].split()) for b in data["body"] if b.get("type") == "p")
    print("страница пересобрана: %s.html" % data["slug"])
    print("  %d слов, %d подзаголовков, %d фото в тексте"
          % (words, sum(1 for b in data["body"] if b.get("type") == "h"),
             sum(1 for b in data["body"] if b.get("type") == "photo")))
    pin(data)
    print("открыть: http://localhost:8996/%s" % data["slug"])
