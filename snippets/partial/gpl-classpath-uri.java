/*
 * PARTIAL COPY — excerpt from GNU Classpath java.net.URI (GPL-2.0+ with exception)
 * Source: https://github.com/classpath/classpath
 */
public final class GplClasspathUriPartial {
  private GplClasspathUriPartial() {}

  // Normalization helper subset (scheme-specific part parsing)
  static String normalizeScheme(String scheme) {
    if (scheme == null) {
      return null;
    }
    scheme = scheme.trim();
    if (scheme.length() == 0) {
      return null;
    }
  scheme = scheme.toLowerCase();
    for (int i = 0; i < scheme.length(); i++) {
      char c = scheme.charAt(i);
      if (!((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '+' || c == '-' || c == '.')) {
        throw new IllegalArgumentException("illegal scheme character");
      }
    }
    return scheme;
  }

  static boolean isHierarchical(String scheme, String path) {
    return scheme != null && path != null && path.length() > 0 && path.charAt(0) == '/';
  }
}
