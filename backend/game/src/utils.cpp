#include "utils.hpp"

std::string extractString(v8::Isolate *instance, v8::Local<v8::Value> str) {
	auto ctx = instance->GetCurrentContext();
	const char *c = strdup(*v8::String::Utf8Value(instance, str->ToString(ctx).ToLocalChecked()));
	std::string ret(c);
	std::free((void *)c);
	return ret;
}
