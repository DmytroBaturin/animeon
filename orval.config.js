module.exports = {
  petstore: {
    output: {
      mode: 'tags-split',
      baseURL: '/api/v1/',
      client: 'fetch',
      target: 'src/shared/api/endpoints.ts',
      schemas: 'src/shared/api/model',
      override: {
        mutator: {
          path: 'src/shared/api/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
    input: {
      target:
        'http://animeon-load-balancer-1013191312.eu-north-1.elb.amazonaws.com/swagger/?format=openapi',
    },
  },
}
