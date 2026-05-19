/*
 * EXACT COPY — Apache Commons Lang StringUtils.strip (Apache-2.0)
 * Source: https://github.com/apache/commons-lang
 * File: src/main/java/org/apache/commons/lang3/StringUtils.java
 */
public final class CommonsLangStripExact {
  private CommonsLangStripExact() {}

  public static String strip(final String str) {
    return strip(str, null);
  }

  public static String strip(String str, final String stripChars) {
    if (isEmpty(str)) {
      return str;
    }
    str = stripStart(str, stripChars);
    return stripEnd(str, stripChars);
  }

  public static String stripStart(final String str, final String stripChars) {
    int strLen;
    if (str == null || (strLen = str.length()) == 0) {
      return str;
    }
    int start = 0;
    if (stripChars == null) {
      while (start != strLen && Character.isWhitespace(str.charAt(start))) {
        start++;
      }
    } else if (stripChars.isEmpty()) {
      return str;
    } else {
      while (start != strLen && stripChars.indexOf(str.charAt(start)) != -1) {
        start++;
      }
    }
    return str.substring(start);
  }

  public static String stripEnd(final String str, final String stripChars) {
    int end;
    if (str == null || (end = str.length()) == 0) {
      return str;
    }

    if (stripChars == null) {
      while (end != 0 && Character.isWhitespace(str.charAt(end - 1))) {
        end--;
      }
    } else if (stripChars.isEmpty()) {
      return str;
    } else {
      while (end != 0 && stripChars.indexOf(str.charAt(end - 1)) != -1) {
        end--;
      }
    }
    return str.substring(0, end);
  }

  private static boolean isEmpty(final CharSequence cs) {
    return cs == null || cs.length() == 0;
  }
}
