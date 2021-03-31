import { Headers as NodeHeaders } from 'node-fetch';

import { serializeJsonLines } from '@dg3/graphql';

describe('jsonlines serializer', () => {
  // typescript error -- they work the same but are differently typed
  const newHeaders = () => (new NodeHeaders() as unknown) as Headers;

  it('sets headers correctly', () => {
    const result = serializeJsonLines({}, newHeaders());
    expect(result.headers.get('Content-Type')).toEqual('application/jsonlines');
  });

  it('transforms single line jsonlines', () => {
    expect(
      serializeJsonLines(
        {
          UPDATE_INSTANCE: [
            {},
            {
              id: 'NQ==',
              'information:attribute.device_lifecycle_phase': 'in_production',
            },
          ],
        },
        newHeaders()
      ).body
    ).toEqual(
      'UPDATE_INSTANCE:{}\n{"id":"NQ==","information:attribute.device_lifecycle_phase":"in_production"}'
    );
  });
  it('transforms multiline jsonlines', () => {
    expect(
      serializeJsonLines(
        {
          CREATE_EDGE: [
            {},
            {
              type: 'should_satisfy',
              from: 'NQ==',
              to: {
                template_id: 'template:template.device_iem_1phase_pattern',
              },
              exists_from: 'now',
            },
          ],
          TERMINATE_EDGE: [
            {},
            {
              id: 'MTUw',
              exists_to: 'now',
            },
          ],
        },
        newHeaders()
      ).body
    ).toEqual(
      'CREATE_EDGE:{}\n{"type":"should_satisfy","from":"NQ==","to":{"template_id":"template:template.device_iem_1phase_pattern"},"exists_from":"now"}\nTERMINATE_EDGE:{}\n{"id":"MTUw","exists_to":"now"}'
    );
  });
});
