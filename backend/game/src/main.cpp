#include <node.h>
#include "utils.hpp"

void startGame(const v8::FunctionCallbackInfo<v8::Value> &args) {
	v8::Isolate* instance = args.GetIsolate();
	if(args.Length() != 2) {
		instance->ThrowException(v8::String::NewFromUtf8(instance, "wrong number of arguments").ToLocalChecked());
		return;
	}
	if(!args[0]->IsString() || !args[1]->IsString()) {
		instance->ThrowException(v8::String::NewFromUtf8(instance, "player names should be strings").ToLocalChecked());
		return;
	}
	std::string player1 = extractString(instance, args[0]);
	std::string player2 = extractString(instance, args[1]);
}

void Init(v8::Local<v8::Object> exports, v8::Local<v8::Value> _values, void *ptr) {
	(void)_values;
	(void)ptr;
	NODE_SET_METHOD(exports, "startGame", startGame);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init);
