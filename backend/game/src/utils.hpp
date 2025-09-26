#pragma once
#include <node.h>
#include <string>
#include <iostream>
#include <cstdlib>
#include <cstring>

std::string extractString(v8::Isolate *instance, v8::Local<v8::Value> str);
