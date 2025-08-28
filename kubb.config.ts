import { defineConfig } from '@kubb/core';
import { pluginClient } from '@kubb/plugin-client';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginReactQuery } from '@kubb/plugin-react-query';
import { pluginTs } from '@kubb/plugin-ts';

export default defineConfig(() => {
  return {
    name: 'tds-connector-api',
    root: '.',
    input: {
      path: 'http://172.22.0.23:8085/swagger/doc.json',
    },
    output: {
      path: './lib/gen',
    },
    plugins: [
        pluginOas(),
        pluginClient({
          baseURL: '/tdsc',
        }),
        pluginTs(),
        pluginReactQuery(),
    ],
  }
})