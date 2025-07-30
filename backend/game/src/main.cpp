#include <node.h>

void Hello(const v8::FunctionCallbackInfo<v8::Value> &args) {
	v8::Isolate* instance = args.GetIsolate();
	args.GetReturnValue().Set(v8::String::NewFromUtf8(instance, "Hello World!", v8::NewStringType::kNormal).ToLocalChecked());
}

void Init(v8::Local<v8::Object> exports) {
	NODE_SET_METHOD(exports, "hello", Hello);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init);
