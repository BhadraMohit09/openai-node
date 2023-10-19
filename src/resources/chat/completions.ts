// File generated from our OpenAPI spec by Stainless.

import * as Core from 'openai/core';
import { APIPromise } from 'openai/core';
import { APIResource } from 'openai/resource';
import { ChatCompletionRunner, ChatCompletionFunctionRunnerParams } from 'openai/lib/ChatCompletionRunner';
export { ChatCompletionRunner, ChatCompletionFunctionRunnerParams } from 'openai/lib/ChatCompletionRunner';
import {
  ChatCompletionStreamingRunner,
  ChatCompletionStreamingFunctionRunnerParams,
} from 'openai/lib/ChatCompletionStream';
export {
  ChatCompletionSnapshot,
  ChatCompletionStreamingRunner,
  ChatCompletionStreamingFunctionRunnerParams,
} from 'openai/lib/ChatCompletionStream';
export {
  RunnableFunction,
  RunnableFunctions,
  RunnableFunctionWithParse,
  RunnableFunctionWithoutParse,
  ParsingFunction,
} from 'openai/lib/RunnableFunction';
import { type BaseFunctionsArgs } from 'openai/lib/RunnableFunction';
import * as ChatCompletionsAPI from 'openai/resources/chat/completions';
import * as CompletionsAPI from 'openai/resources/completions';
import { Stream } from 'openai/streaming';

export class Completions extends APIResource {
  /**
   * Creates a model response for the given chat conversation.
   */
  create(
    body: ChatCompletionCreateParamsNonStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<ChatCompletion>;
  create(
    body: ChatCompletionCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ChatCompletionChunk>>;
  create(
    body: ChatCompletionCreateParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ChatCompletionChunk> | ChatCompletion>;
  create(
    body: ChatCompletionCreateParams,
    options?: Core.RequestOptions,
  ): APIPromise<ChatCompletion> | APIPromise<Stream<ChatCompletionChunk>> {
    return this.post('/chat/completions', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<ChatCompletion>
      | APIPromise<Stream<ChatCompletionChunk>>;
  }

  /**
   * A convenience helper for using function calls with the /chat/completions
   * endpoint which automatically calls the JavaScript functions you provide and
   * sends their results back to the /chat/completions endpoint, looping as long as
   * the model requests function calls.
   *
   * For more details and examples, see
   * [the docs](https://github.com/openai/openai-node#runFunctions)
   */
  runFunctions<FunctionsArgs extends BaseFunctionsArgs>(
    body: ChatCompletionFunctionRunnerParams<FunctionsArgs>,
    options?: Core.RequestOptions,
  ): ChatCompletionRunner;
  runFunctions<FunctionsArgs extends BaseFunctionsArgs>(
    body: ChatCompletionStreamingFunctionRunnerParams<FunctionsArgs>,
    options?: Core.RequestOptions,
  ): ChatCompletionStreamingRunner;
  runFunctions<FunctionsArgs extends BaseFunctionsArgs>(
    body:
      | ChatCompletionFunctionRunnerParams<FunctionsArgs>
      | ChatCompletionStreamingFunctionRunnerParams<FunctionsArgs>,
    options?: Core.RequestOptions,
  ): ChatCompletionRunner | ChatCompletionStreamingRunner {
    return body.stream ?
        ChatCompletionStreamingRunner.runFunctions(
          this,
          body as ChatCompletionStreamingFunctionRunnerParams<FunctionsArgs>,
          options,
        )
      : ChatCompletionRunner.runFunctions(
          this,
          body as ChatCompletionFunctionRunnerParams<FunctionsArgs>,
          options,
        );
  }

  /**
   * Creates a chat completion stream
   */
  stream(
    body: Omit<ChatCompletionCreateParamsStreaming, 'stream'> & { stream?: true },
    options?: Core.RequestOptions,
  ): ChatCompletionStreamingRunner {
    return ChatCompletionStreamingRunner.createChatCompletion(this, body, options);
  }
}

/**
 * Represents a chat completion response returned by model, based on the provided
 * input.
 */
export interface ChatCompletion {
  /**
   * A unique identifier for the chat completion.
   */
  id: string;

  /**
   * A list of chat completion choices. Can be more than one if `n` is greater
   * than 1.
   */
  choices: Array<ChatCompletion.Choice>;

  /**
   * The Unix timestamp (in seconds) of when the chat completion was created.
   */
  created: number;

  /**
   * The model used for the chat completion.
   */
  model: string;

  /**
   * The object type, which is always `chat.completion`.
   */
  object: string;

  /**
   * Usage statistics for the completion request.
   */
  usage?: CompletionsAPI.CompletionUsage;
}

export namespace ChatCompletion {
  export interface Choice {
    /**
     * The reason the model stopped generating tokens. This will be `stop` if the model
     * hit a natural stop point or a provided stop sequence, `length` if the maximum
     * number of tokens specified in the request was reached, `content_filter` if
     * content was omitted due to a flag from our content filters, or `function_call`
     * if the model called a function.
     */
    finish_reason: 'stop' | 'length' | 'function_call' | 'content_filter';

    /**
     * The index of the choice in the list of choices.
     */
    index: number;

    /**
     * A chat completion message generated by the model.
     */
    message: ChatCompletionsAPI.ChatCompletionMessage;
  }
}

/**
 * Represents a streamed chunk of a chat completion response returned by model,
 * based on the provided input.
 */
export interface ChatCompletionChunk {
  /**
   * A unique identifier for the chat completion. Each chunk has the same ID.
   */
  id: string;

  /**
   * A list of chat completion choices. Can be more than one if `n` is greater
   * than 1.
   */
  choices: Array<ChatCompletionChunk.Choice>;

  /**
   * The Unix timestamp (in seconds) of when the chat completion was created. Each
   * chunk has the same timestamp.
   */
  created: number;

  /**
   * The model to generate the completion.
   */
  model: string;

  /**
   * The object type, which is always `chat.completion.chunk`.
   */
  object: string;
}

export namespace ChatCompletionChunk {
  export interface Choice {
    /**
     * A chat completion delta generated by streamed model responses.
     */
    delta: Choice.Delta;

    /**
     * The reason the model stopped generating tokens. This will be `stop` if the model
     * hit a natural stop point or a provided stop sequence, `length` if the maximum
     * number of tokens specified in the request was reached, `content_filter` if
     * content was omitted due to a flag from our content filters, or `function_call`
     * if the model called a function.
     */
    finish_reason: 'stop' | 'length' | 'function_call' | 'content_filter' | null;

    /**
     * The index of the choice in the list of choices.
     */
    index: number;
  }

  export namespace Choice {
    /**
     * A chat completion delta generated by streamed model responses.
     */
    export interface Delta {
      /**
       * The contents of the chunk message.
       */
      content?: string | null;

      /**
       * The name and arguments of a function that should be called, as generated by the
       * model.
       */
      function_call?: Delta.FunctionCall;

      /**
       * The role of the author of this message.
       */
      role?: ChatCompletionsAPI.ChatCompletionRole;
    }

    export namespace Delta {
      /**
       * The name and arguments of a function that should be called, as generated by the
       * model.
       */
      export interface FunctionCall {
        /**
         * The arguments to call the function with, as generated by the model in JSON
         * format. Note that the model does not always generate valid JSON, and may
         * hallucinate parameters not defined by your function schema. Validate the
         * arguments in your code before calling your function.
         */
        arguments?: string;

        /**
         * The name of the function to call.
         */
        name?: string;
      }
    }
  }
}

/**
 * A chat completion message generated by the model.
 */
export interface ChatCompletionMessage {
  /**
   * The contents of the message.
   */
  content: string | null;

  /**
   * The role of the author of this message.
   */
  role: ChatCompletionRole;

  /**
   * The name and arguments of a function that should be called, as generated by the
   * model.
   */
  function_call?: ChatCompletionMessage.FunctionCall;
}

export namespace ChatCompletionMessage {
  /**
   * The name and arguments of a function that should be called, as generated by the
   * model.
   */
  export interface FunctionCall {
    /**
     * The arguments to call the function with, as generated by the model in JSON
     * format. Note that the model does not always generate valid JSON, and may
     * hallucinate parameters not defined by your function schema. Validate the
     * arguments in your code before calling your function.
     */
    arguments: string;

    /**
     * The name of the function to call.
     */
    name: string;
  }
}

export interface ChatCompletionMessageParam {
  /**
   * The contents of the message. `content` is required for all messages, and may be
   * null for assistant messages with function calls.
   */
  content: string | null;

  /**
   * The role of the messages author. One of `system`, `user`, `assistant`, or
   * `function`.
   */
  role: 'system' | 'user' | 'assistant' | 'function';

  /**
   * The name and arguments of a function that should be called, as generated by the
   * model.
   */
  function_call?: ChatCompletionMessageParam.FunctionCall;

  /**
   * The name of the author of this message. `name` is required if role is
   * `function`, and it should be the name of the function whose response is in the
   * `content`. May contain a-z, A-Z, 0-9, and underscores, with a maximum length of
   * 64 characters.
   */
  name?: string;
}

export namespace ChatCompletionMessageParam {
  /**
   * The name and arguments of a function that should be called, as generated by the
   * model.
   */
  export interface FunctionCall {
    /**
     * The arguments to call the function with, as generated by the model in JSON
     * format. Note that the model does not always generate valid JSON, and may
     * hallucinate parameters not defined by your function schema. Validate the
     * arguments in your code before calling your function.
     */
    arguments: string;

    /**
     * The name of the function to call.
     */
    name: string;
  }
}

/**
 * The role of the author of this message.
 */
export type ChatCompletionRole = 'system' | 'user' | 'assistant' | 'function';

/**
 * @deprecated ChatCompletionMessageParam should be used instead
 */
export type CreateChatCompletionRequestMessage = ChatCompletionMessageParam;

export type ChatCompletionCreateParams =
  | ChatCompletionCreateParamsNonStreaming
  | ChatCompletionCreateParamsStreaming;

export interface ChatCompletionCreateParamsBase {
  /**
   * A list of messages comprising the conversation so far.
   * [Example Python code](https://cookbook.openai.com/examples/how_to_format_inputs_to_chatgpt_models).
   */
  messages: Array<ChatCompletionMessageParam>;

  /**
   * ID of the model to use. See the
   * [model endpoint compatibility](https://platform.openai.com/docs/models/model-endpoint-compatibility)
   * table for details on which models work with the Chat API.
   */
  model:
    | (string & {})
    | 'gpt-4'
    | 'gpt-4-0314'
    | 'gpt-4-0613'
    | 'gpt-4-32k'
    | 'gpt-4-32k-0314'
    | 'gpt-4-32k-0613'
    | 'gpt-3.5-turbo'
    | 'gpt-3.5-turbo-16k'
    | 'gpt-3.5-turbo-0301'
    | 'gpt-3.5-turbo-0613'
    | 'gpt-3.5-turbo-16k-0613';

  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on their
   * existing frequency in the text so far, decreasing the model's likelihood to
   * repeat the same line verbatim.
   *
   * [See more information about frequency and presence penalties.](https://platform.openai.com/docs/guides/gpt/parameter-details)
   */
  frequency_penalty?: number | null;

  /**
   * Controls how the model calls functions. "none" means the model will not call a
   * function and instead generates a message. "auto" means the model can pick
   * between generating a message or calling a function. Specifying a particular
   * function via `{"name": "my_function"}` forces the model to call that function.
   * "none" is the default when no functions are present. "auto" is the default if
   * functions are present.
   */
  function_call?: 'none' | 'auto' | ChatCompletionCreateParams.FunctionCallOption;

  /**
   * A list of functions the model may generate JSON inputs for.
   */
  functions?: Array<ChatCompletionCreateParams.Function>;

  /**
   * Modify the likelihood of specified tokens appearing in the completion.
   *
   * Accepts a json object that maps tokens (specified by their token ID in the
   * tokenizer) to an associated bias value from -100 to 100. Mathematically, the
   * bias is added to the logits generated by the model prior to sampling. The exact
   * effect will vary per model, but values between -1 and 1 should decrease or
   * increase likelihood of selection; values like -100 or 100 should result in a ban
   * or exclusive selection of the relevant token.
   */
  logit_bias?: Record<string, number> | null;

  /**
   * The maximum number of [tokens](/tokenizer) to generate in the chat completion.
   *
   * The total length of input tokens and generated tokens is limited by the model's
   * context length.
   * [Example Python code](https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken)
   * for counting tokens.
   */
  max_tokens?: number | null;

  /**
   * How many chat completion choices to generate for each input message.
   */
  n?: number | null;

  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on
   * whether they appear in the text so far, increasing the model's likelihood to
   * talk about new topics.
   *
   * [See more information about frequency and presence penalties.](https://platform.openai.com/docs/guides/gpt/parameter-details)
   */
  presence_penalty?: number | null;

  /**
   * Up to 4 sequences where the API will stop generating further tokens.
   */
  stop?: string | null | Array<string>;

  /**
   * If set, partial message deltas will be sent, like in ChatGPT. Tokens will be
   * sent as data-only
   * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format)
   * as they become available, with the stream terminated by a `data: [DONE]`
   * message.
   * [Example Python code](https://cookbook.openai.com/examples/how_to_stream_completions).
   */
  stream?: boolean | null;

  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will
   * make the output more random, while lower values like 0.2 will make it more
   * focused and deterministic.
   *
   * We generally recommend altering this or `top_p` but not both.
   */
  temperature?: number | null;

  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the
   * model considers the results of the tokens with top_p probability mass. So 0.1
   * means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or `temperature` but not both.
   */
  top_p?: number | null;

  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor
   * and detect abuse.
   * [Learn more](https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids).
   */
  user?: string;
}

export namespace ChatCompletionCreateParams {
  export interface FunctionCallOption {
    /**
     * The name of the function to call.
     */
    name: string;
  }

  export interface Function {
    /**
     * The name of the function to be called. Must be a-z, A-Z, 0-9, or contain
     * underscores and dashes, with a maximum length of 64.
     */
    name: string;

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See the
     * [guide](https://platform.openai.com/docs/guides/gpt/function-calling) for
     * examples, and the
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format.
     *
     * To describe a function that accepts no parameters, provide the value
     * `{"type": "object", "properties": {}}`.
     */
    parameters: Record<string, unknown>;

    /**
     * A description of what the function does, used by the model to choose when and
     * how to call the function.
     */
    description?: string;
  }

  export type ChatCompletionCreateParamsNonStreaming =
    ChatCompletionsAPI.ChatCompletionCreateParamsNonStreaming;
  export type ChatCompletionCreateParamsStreaming = ChatCompletionsAPI.ChatCompletionCreateParamsStreaming;
}

/**
 * @deprecated Use ChatCompletionCreateParams instead
 */
export type CompletionCreateParams = ChatCompletionCreateParams;

export interface ChatCompletionCreateParamsNonStreaming extends ChatCompletionCreateParamsBase {
  /**
   * If set, partial message deltas will be sent, like in ChatGPT. Tokens will be
   * sent as data-only
   * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format)
   * as they become available, with the stream terminated by a `data: [DONE]`
   * message.
   * [Example Python code](https://cookbook.openai.com/examples/how_to_stream_completions).
   */
  stream?: false | null;
}

/**
 * @deprecated Use ChatCompletionCreateParamsNonStreaming instead
 */
export type CompletionCreateParamsNonStreaming = ChatCompletionCreateParamsNonStreaming;

export interface ChatCompletionCreateParamsStreaming extends ChatCompletionCreateParamsBase {
  /**
   * If set, partial message deltas will be sent, like in ChatGPT. Tokens will be
   * sent as data-only
   * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format)
   * as they become available, with the stream terminated by a `data: [DONE]`
   * message.
   * [Example Python code](https://cookbook.openai.com/examples/how_to_stream_completions).
   */
  stream: true;
}

/**
 * @deprecated Use ChatCompletionCreateParamsStreaming instead
 */
export type CompletionCreateParamsStreaming = ChatCompletionCreateParamsStreaming;

export namespace Completions {
  export import ChatCompletion = ChatCompletionsAPI.ChatCompletion;
  export import ChatCompletionChunk = ChatCompletionsAPI.ChatCompletionChunk;
  export import ChatCompletionMessage = ChatCompletionsAPI.ChatCompletionMessage;
  export import ChatCompletionMessageParam = ChatCompletionsAPI.ChatCompletionMessageParam;
  export import ChatCompletionRole = ChatCompletionsAPI.ChatCompletionRole;
  /**
   * @deprecated ChatCompletionMessageParam should be used instead
   */
  export import CreateChatCompletionRequestMessage = ChatCompletionsAPI.CreateChatCompletionRequestMessage;
  export import ChatCompletionCreateParams = ChatCompletionsAPI.ChatCompletionCreateParams;
  export import CompletionCreateParams = ChatCompletionsAPI.CompletionCreateParams;
  export import ChatCompletionCreateParamsNonStreaming = ChatCompletionsAPI.ChatCompletionCreateParamsNonStreaming;
  export import CompletionCreateParamsNonStreaming = ChatCompletionsAPI.CompletionCreateParamsNonStreaming;
  export import ChatCompletionCreateParamsStreaming = ChatCompletionsAPI.ChatCompletionCreateParamsStreaming;
  export import CompletionCreateParamsStreaming = ChatCompletionsAPI.CompletionCreateParamsStreaming;
  export import RunnableFunction = ChatCompletionsAPI.RunnableFunction;
  export import RunnableFunctions = ChatCompletionsAPI.RunnableFunctions;
  export import RunnableFunctionWithParse = ChatCompletionsAPI.RunnableFunctionWithParse;
  export import RunnableFunctionWithoutParse = ChatCompletionsAPI.RunnableFunctionWithoutParse;
  export import ParsingFunction = ChatCompletionsAPI.ParsingFunction;
  export import ChatCompletionRunner = ChatCompletionsAPI.ChatCompletionRunner;
  export import ChatCompletionStreamingRunner = ChatCompletionsAPI.ChatCompletionStreamingRunner;
}
