/*
 * EXACT COPY — excerpt from Ghostscript path logic (AGPL-3.0)
 * Source: https://github.com/ArtifexSoftware/ghostpdl
 * Small function-level excerpt for strong copyleft (AGPL) license policy tests.
 */
/* Copyright (C) 2023 Artifex Software, Inc.  All rights reserved.
 * This software is supplied under the GNU Affero General Public License (AGPL). */

#include <stddef.h>
#include <string.h>

static int
gs_path_is_absolute(const char *path)
{
  if (path == NULL || *path == '\0')
    return 0;
#if defined(_WIN32)
  if ((path[0] >= 'A' && path[0] <= 'Z') || (path[0] >= 'a' && path[0] <= 'z')) {
    if (path[1] == ':')
      return (path[2] == '/' || path[2] == '\\');
  }
#endif
  return (*path == '/');
}

size_t
gs_path_common_prefix(const char *a, const char *b)
{
  size_t i = 0;
  if (a == NULL || b == NULL)
    return 0;
  while (a[i] && a[i] == b[i])
    i++;
  return i;
}
