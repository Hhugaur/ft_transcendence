LIBCURL = libcurl.a
LIBTERMBOX = libtermbox.a
TERMBOX_BINDING = src/termbox.c3i
CURL_BINDING = src/curl.c3i
C3C = c3c
SRCS = src/main.c3
BINDINGS = $(TERMBOX_BINDING) $(CURL_BINDING)
LIBS = $(LIBCURL) $(LIBTERMBOX)
EXTRACT_DIR = libs
TARBALL = $(EXTRACT_DIR).tar.gz

all: $(LIBS) $(BINDINGS) $(C3C) $(SRCS)
	$(C3C) compile $(SRCS) $(BINDINGS) $(LIBS)

extract: $(EXTRACT_DIR)

$(EXTRACT_DIR):
	tar -xvf $(TARBALL)

$(LIBCURL): extract

$(CURL_BINDING):
	wget https://raw.githubusercontent.com/c3lang/vendor/refs/heads/main/libraries/curl.c3l/curl.c3i
	mv curl.c3i src

.PHONY: all extract clean
