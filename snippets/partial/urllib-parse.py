# PARTIAL COPY — excerpt from CPython urllib.parse (PSF License)
# Source: https://github.com/python/cpython — Lib/urllib/parse.py
# Only urlparse result handling; not the full module.

from collections import namedtuple

_ParseResultBase = namedtuple(
    "ParseResult", "scheme netloc path params query fragment"
)
_ParseResultBase.__doc__ = """ParseResult(scheme, netloc, path, params, query, fragment)"""


class ParseResult(_ParseResultBase):
  __slots__ = ()

  @property
  def username(self):
    return self._userinfo()[0]

  @property
  def password(self):
    return self._userinfo()[1]

  @property
  def hostname(self):
    hostname = self._hostinfo()[0]
    if hostname and hostname[0] == "[" and hostname[-1] == "]":
      return hostname[1:-1]
    return hostname

  @property
  def port(self):
    port = self._hostinfo()[1]
    if port is not None:
      if port.isdigit() and port.isascii():
        port = int(port)
      else:
        raise ValueError(f"Port could not be cast to integer value as {port!r}")
    return port

  def _userinfo(self):
    netloc = self.netloc
    userinfo, have_info, hostinfo = netloc.rpartition("@")
    if have_info:
      username, have_password, password = userinfo.partition(":")
      if not have_password:
        password = None
    else:
      username = password = None
      hostinfo = netloc
    return username, password, hostinfo

  def _hostinfo(self):
    netloc = self.netloc
    _, _, hostinfo = netloc.rpartition("@")
    _, have_port, port = hostinfo.partition(":")
    if not have_port:
      port = None
    return hostinfo if not have_port else hostinfo[: -len(port) - 1], port
