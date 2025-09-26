#include "bob.h"

void c3c() {
	wget("https://github.com/c3lang/c3c/releases/download/v0.7.5/c3-linux.tar.gz");
	extract("c3-linux.tar.gz");
}

void cli() {
	CMD(cmd);
	nob_cmd_append(&cmd, "c3c");
}

void build(bool clean) {
	c3c(clean);
	curl(clean);
	termbox(clean);
	cli(clean);
}


int main(int c, char **v) {
	NOB_GO_REBUILD_URSELF(c, v);
}
