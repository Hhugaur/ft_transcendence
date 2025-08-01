#include <node.h>
#include <node_api.h>

void Hello(const v8::FunctionCallbackInfo<v8::Value> &args) {
	v8::Isolate* instance = args.GetIsolate();
	instance->ThrowException(v8::String::NewFromUtf8(instance, "Hello World!").ToLocalChecked());
}

void Init(v8::Local<v8::Object> exports, v8::Local<v8::Value> _values, void *ptr) {
	(void)_values;
	(void)ptr;
	NODE_SET_METHOD(exports, "hello", Hello);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init);
