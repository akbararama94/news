# -*- coding: utf-8 -*-
"""Проставляет метатеги (карточка для Twitter/X, Facebook, мессенджеров) всем статьям.

Домен в метатегах:  jezebel.news
Пути отображения (img src, href) НЕ трогаются — сайт продолжает работать с localhost.

Запуск:
    python build-meta.py            — обработать все страницы статей
    python build-meta.py файл.html  — только один файл
"""
import os, re, sys, glob, html as ht

HERE = os.path.dirname(os.path.abspath(__file__))
DOMAIN = "https://jezebel.news"        # домен только для метатегов
SITE_NAME = "Jezebel"
TWITTER_HANDLE = "@jezebel"

MARK_START = "<!-- ==== МЕТАТЕГИ (карточка для соцсетей). Генерируются build-meta.py ==== -->"
MARK_END = "<!-- ==== конец метатегов ==== -->"


def unesc(s):
    return ht.unescape(re.sub(r"<[^>]+>", "", s)).strip()


def esc(s):
    return ht.escape(s, quote=True)


def pick_image(article_html, page_html):
    """Главное фото статьи. Локальный путь -> адрес на домене, внешний -> как есть."""
    for m in re.finditer(r'<img[^>]+>', article_html):
        tag = m.group(0)
        src = None
        d = re.search(r'data-src="([^"]+)"', tag)
        s = re.search(r'\bsrc="([^"]+)"', tag)
        for cand in (d.group(1) if d else None, s.group(1) if s else None):
            if cand and not cand.startswith("data:"):
                src = cand
                break
        if not src:
            continue
        if src.startswith("http"):
            return src
        return DOMAIN + "/" + src.lstrip("/")
    m = re.search(r'<meta property="og:image" content="([^"]+)"', page_html)
    if m:
        v = ht.unescape(m.group(1))
        return v if v.startswith("http") else DOMAIN + "/" + v.lstrip("/")
    return None


def process(path):
    h = open(path, encoding="utf-8").read()
    if 'id="article-detail-container"' not in h:
        return None
    slug = os.path.basename(path)[:-5]

    a = re.search(r'<article[^>]*id="article-detail-container".*?</article>', h, re.S)
    art = a.group(0) if a else h

    m = re.search(r'<h1 class="title">(.*?)</h1>', art, re.S)
    title = unesc(m.group(1)) if m else slug.replace("-", " ")

    m = re.search(r'<h2 class="subtitle">(.*?)</h2>', art, re.S)
    desc = unesc(m.group(1)) if m else ""
    if not desc:
        m = re.search(r'<meta name="description" content="([^"]*)"', h)
        desc = ht.unescape(m.group(1)) if m else ""
    if not desc:
        m = re.search(r'<p>(.*?)</p>', art, re.S)
        desc = unesc(m.group(1))[:200] if m else ""
    if len(desc) > 300:
        desc = desc[:297].rsplit(" ", 1)[0] + "…"

    img = pick_image(art, h)
    url = DOMAIN + "/" + slug

    # вырезаем прежние теги, чтобы не плодить дубли
    h = re.sub(re.escape(MARK_START) + r".*?" + re.escape(MARK_END), "", h, flags=re.S)
    h = re.sub(r'[ \t]*<meta[^>]+(?:property|name)="(?:og:[^"]*|twitter:[^"]*|description)"[^>]*>[ \t]*\n?',
               "", h)
    h = re.sub(r'[ \t]*<link[^>]+rel="canonical"[^>]*>[ \t]*\n?', "", h)

    tags = [MARK_START,
            '<meta name="description" content="%s" />' % esc(desc),
            '<link rel="canonical" href="%s" />' % esc(url),
            '<meta property="og:type" content="article" />',
            '<meta property="og:site_name" content="%s" />' % esc(SITE_NAME),
            '<meta property="og:title" content="%s" />' % esc(title),
            '<meta property="og:description" content="%s" />' % esc(desc),
            '<meta property="og:url" content="%s" />' % esc(url),
            '<meta name="twitter:card" content="summary_large_image" />',
            '<meta name="twitter:site" content="%s" />' % esc(TWITTER_HANDLE),
            '<meta name="twitter:title" content="%s" />' % esc(title),
            '<meta name="twitter:description" content="%s" />' % esc(desc),
            '<meta name="twitter:domain" content="%s" />' % esc(DOMAIN.split("//")[1]),
            '<meta name="twitter:url" content="%s" />' % esc(url)]
    if img:
        tags += ['<meta property="og:image" content="%s" />' % esc(img),
                 '<meta property="og:image:secure_url" content="%s" />' % esc(img),
                 '<meta property="og:image:width" content="1200" />',
                 '<meta property="og:image:height" content="630" />',
                 '<meta property="og:image:alt" content="%s" />' % esc(title),
                 '<meta name="twitter:image" content="%s" />' % esc(img),
                 '<meta name="twitter:image:alt" content="%s" />' % esc(title)]
    tags.append(MARK_END)

    blockhtml = "\n" + "\n".join("    " + t for t in tags) + "\n"
    i = h.find("</head>")
    h = h[:i] + blockhtml + h[i:]
    open(path, "w", encoding="utf-8").write(h)
    return {"slug": slug, "title": title, "desc": desc, "img": img}


if __name__ == "__main__":
    files = [os.path.join(HERE, sys.argv[1])] if len(sys.argv) > 1 else \
        sorted(glob.glob(os.path.join(HERE, "*.html")))
    done = local = remote = noimg = 0
    for f in files:
        r = process(f)
        if not r:
            continue
        done += 1
        if not r["img"]:
            noimg += 1
        elif r["img"].startswith(DOMAIN):
            local += 1
        else:
            remote += 1
    print("страниц обработано: %d" % done)
    print("  фото с нашего домена (%s/assets/...): %d" % (DOMAIN, local))
    print("  фото по внешней ссылке (осталось как было): %d" % remote)
    print("  без фото: %d" % noimg)
