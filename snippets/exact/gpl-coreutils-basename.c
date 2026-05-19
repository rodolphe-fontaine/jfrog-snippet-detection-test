/*
 * EXACT COPY — GNU coreutils basename.c helper (GPL-3.0-or-later)
 * Source: https://git.savannah.gnu.org/gitweb/?p=coreutils.git
 * File: src/basename.c
 */
/* Copyright (C) 1997-2024 Free Software Foundation, Inc.
   This file is part of the GNU coreutils package.
   GNU coreutils is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version. */

#include <stddef.h>
#include <string.h>

char *
base_name (char const *name)
{
  char const *base = name + strlen (name);
  while (base > name && base[-1] != '/')
    base--;
  return (char *) base;
}
