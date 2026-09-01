"""Static file server for the jezebel site copy.

Отдаёт красивые адреса без .html:
    /politics      -> politics.html
    /              -> index.html
Старые адреса (/politics.html, /index.html) переадресуются на новые,
чтобы в адресной строке .html не оставался.
"""
import http.server, os, sys, functools, urllib.parse

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8996
ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def _clean_redirect(self):
        """Уводим на чистый адрес: .html убираем, /index и /index.html -> /."""
        parts = urllib.parse.urlsplit(self.path)
        p = parts.path
        if p in ("/index", "/index.html", "/index/"):
            target = "/"
        elif p.endswith(".html"):
            target = p[:-5]
        else:
            return False
        if parts.query:
            target += "?" + parts.query
        self.send_response(301)
        self.send_header("Location", target)
        self.send_header("Content-Length", "0")
        self.end_headers()
        return True

    def do_GET(self):
        if self._clean_redirect():
            return
        super().do_GET()

    def do_HEAD(self):
        if self._clean_redirect():
            return
        super().do_HEAD()

    def translate_path(self, path):
        fs = super().translate_path(path)
        # /politics -> politics.html
        if not os.path.exists(fs) and not os.path.splitext(fs)[1]:
            if os.path.isfile(fs + ".html"):
                return fs + ".html"
        return fs

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


if __name__ == "__main__":
    http.server.ThreadingHTTPServer(
        ("127.0.0.1", PORT),
        functools.partial(Handler, directory=ROOT),
    ).serve_forever()
