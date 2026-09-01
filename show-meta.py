# -*- coding: utf-8 -*-
"""Показывает метатеги одной страницы в текстовом виде.

Запуск:
    python show-meta.py имя-файла.html
    python show-meta.py имя-файла          (без .html тоже работает)
"""
import os, re, sys, html as ht

HERE = os.path.dirname(os.path.abspath(__file__))

if len(sys.argv) < 2:
    print("Укажите файл, например:")
    print("  python show-meta.py politics.html")
    raise SystemExit(1)

name = sys.argv[1]
if not name.endswith(".html"):
    name += ".html"
path = os.path.join(HERE, name)
if not os.path.isfile(path):
    print("Файл не найден: " + name)
    raise SystemExit(1)

h = open(path, encoding="utf-8").read()
head = h[:h.find("</head>")] if "</head>" in h else h

ORDER = ["title", "description",
         "og:type", "og:site_name", "og:title", "og:description", "og:url",
         "og:image", "og:image:width", "og:image:height", "og:image:alt",
         "twitter:card", "twitter:site", "twitter:title", "twitter:description",
         "twitter:image", "twitter:image:alt", "twitter:domain", "twitter:url"]

found = {}
for m in re.finditer(r'<meta[^>]+(?:property|name)="([^"]+)"[^>]+content="([^"]*)"', head):
    found.setdefault(m.group(1), ht.unescape(m.group(2)))
for m in re.finditer(r'<meta[^>]+content="([^"]*)"[^>]+(?:property|name)="([^"]+)"', head):
    found.setdefault(m.group(2), ht.unescape(m.group(1)))

t = re.search(r"<title>(.*?)</title>", head, re.S)
if t:
    found["title"] = ht.unescape(re.sub(r"<[^>]+>", "", t.group(1))).strip()
c = re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]*)"', head)

print("=" * 78)
print("СТРАНИЦА: " + name)
print("=" * 78)
for k in ORDER:
    v = found.get(k)
    if v is None:
        print("  %-22s — тега нет —" % k)
    else:
        print("  %-22s %s" % (k, v))
print("  %-22s %s" % ("canonical", ht.unescape(c.group(1)) if c else "— тега нет —"))

extra = [k for k in found if k not in ORDER]
if extra:
    print("\n  прочие теги в head:")
    for k in sorted(extra):
        print("    %-20s %s" % (k, found[k][:90]))

print("\nПРОВЕРКА")
card = found.get("twitter:card")
print("  тип карточки      : " + ("крупная с фото" if card == "summary_large_image"
                                  else "НЕ крупная (%s)" % (card or "тега нет")))
d = found.get("twitter:description") or found.get("og:description") or ""
print("  длина описания    : %d знаков%s" % (len(d), "  (X обрежет ~на 200)" if len(d) > 200 else ""))
img = found.get("twitter:image") or found.get("og:image")
print("  картинка          : " + (img if img else "НЕТ"))
if img and not img.startswith("https://"):
    print("    ! X требует https — картинка может не показаться")
