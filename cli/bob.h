#ifndef BOB_H
#define BOB_H

#include <string.h>
#define NOB_IMPLEMENTATION
#include "nob.h"

#define DA(Type) struct { size_t size; size_t capacity; Type *items; }
#define CMD(name) Nob_Cmd name = {0};

int wget(char *file) {
	CMD(cmd);
	nob_cmd_append(&cmd, "wget", file);
	return nob_cmd_run(&cmd);
}

int extract(char *tarball) {
	CMD(cmd);
	nob_cmd_append(&cmd, "tar", "-xvf", tarball);
	return nob_cmd_run(&cmd);
}

int make(char *dir) {
	if(strcmp(dir, "") == 0) dir = ".";
	CMD(cmd);
	nob_cmd_append(&cmd, "make", "-C", dir);
	return nob_cmd_run(&cmd);
}

int mv(char *src, char *dst) {
	CMD(cmd);
	nob_cmd_append(&cmd, "mv", src, dst);
	return nob_cmd_run(&cmd);
}

#endif // BOB_H
