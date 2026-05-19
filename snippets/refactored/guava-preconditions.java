/*
 * REFACTORED — semantically similar to Guava Preconditions.checkNotNull (Apache-2.0)
 * Source: https://github.com/google/guava
 */
public final class GuavaPreconditionsRefactored {
  private GuavaPreconditionsRefactored() {}

  public static <T> T requirePresent(T value, String label) {
    if (value == null) {
      throw new NullPointerException(buildMessage(label));
    }
    return value;
  }

  public static <T> T requirePresent(T value, String template, Object arg1) {
    if (value == null) {
      throw new NullPointerException(format(template, arg1));
    }
    return value;
  }

  private static String buildMessage(String label) {
    return label == null ? "value must not be null" : label;
  }

  private static String format(String template, Object arg1) {
    return String.valueOf(template).replace("%s", String.valueOf(arg1));
  }
}
