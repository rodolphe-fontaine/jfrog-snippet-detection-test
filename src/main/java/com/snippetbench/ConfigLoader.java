package com.snippetbench;

import org.apache.commons.lang3.StringUtils;

/**
 * First-party Java — uses declared commons-lang3 (package SCA), not inline snippet copies.
 */
public final class ConfigLoader {
  private ConfigLoader() {}

  public static String normalizeKey(String raw) {
    if (StringUtils.isBlank(raw)) {
      return "default";
    }
    return StringUtils.lowerCase(StringUtils.trim(raw));
  }
}
