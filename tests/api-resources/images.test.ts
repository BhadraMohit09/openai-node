// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OpenAI, { toFile } from 'openai';

const client = new OpenAI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource images', () => {
  test('createVariation: only required params', async () => {
    const responsePromise = client.images.createVariation({
      image: await toFile(Buffer.from('# my file contents'), 'README.md'),
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createVariation: required and optional params', async () => {
    const response = await client.images.createVariation({
      image: await toFile(Buffer.from('# my file contents'), 'README.md'),
      model: 'dall-e-2',
      n: 1,
      response_format: 'url',
      size: '256x256',
      user: 'user-1234',
    });
  });

  test('edit: only required params', async () => {
    const responsePromise = client.images.edit({
      image: await toFile(Buffer.from('# my file contents'), 'README.md'),
      prompt: 'A cute baby sea otter wearing a beret',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('edit: required and optional params', async () => {
    const response = await client.images.edit({
      image: await toFile(Buffer.from('# my file contents'), 'README.md'),
      prompt: 'A cute baby sea otter wearing a beret',
      mask: await toFile(Buffer.from('# my file contents'), 'README.md'),
      model: 'dall-e-2',
      n: 1,
      response_format: 'url',
      size: '256x256',
      user: 'user-1234',
    });
  });

  test('generate: only required params', async () => {
    const responsePromise = client.images.generate({ prompt: 'A cute baby sea otter' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('generate: required and optional params', async () => {
    const response = await client.images.generate({
      prompt: 'A cute baby sea otter',
      model: 'dall-e-3',
      n: 1,
      quality: 'standard',
      response_format: 'url',
      size: '256x256',
      style: 'vivid',
      user: 'user-1234',
    });
  });
});
